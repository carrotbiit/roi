import { Background, Format, Scoring } from '../components/About'
import { Essentials } from '../components/Essentials'
import { Faq } from '../components/Faq'
import { Register } from '../components/Register'
import { RubricGrid } from '../components/RubricGrid'

/**
 * The reading order is a pace, not a list: the weighted board, then the dense
 * quote panel a teacher scans for facts, then the sequence of the day, then
 * the scale it is judged on, then one quiet paragraph, then questions, then
 * the action.
 */
export function Home() {
  return (
    <>
      <RubricGrid />
      <Essentials />
      <Format />
      <Scoring />
      <Background />
      <Faq />
      <Register />
    </>
  )
}
