import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Vercel runs everything in `api/` as a function; `vite dev` does not. This
 * serves the same handler over the dev server so the ticker works locally,
 * reading API_KEY from .env exactly as the deployed function reads it from the
 * project's environment variables.
 */
function devApi(): Plugin {
  return {
    name: 'roi-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/ticker', (_req, res) => {
        void (async () => {
          try {
            const mod = await server.ssrLoadModule('/api/ticker.ts')
            const response: Response = await mod.GET()
            res.statusCode = response.status
            response.headers.forEach((value, name) => res.setHeader(name, value))
            res.end(await response.text())
          } catch (error) {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ error: String(error) }))
          }
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /* Hand .env to the dev-only handler. The empty prefix loads unprefixed keys,
     which is the point: API_KEY must never reach the client bundle. */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApi()],
    build: {
      // One document per page. Anything not listed here is not built.
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('index.html', import.meta.url)),
          sponsor: fileURLToPath(new URL('sponsor.html', import.meta.url)),
          volunteer: fileURLToPath(new URL('volunteer.html', import.meta.url)),
        },
      },
    },
  }
})
