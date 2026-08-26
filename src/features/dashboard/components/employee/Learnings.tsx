import { useState } from 'react'
import questions from '../../../../data/mockQuestions'
import { PiMinusSquareBold, PiPlusSquareBold } from 'react-icons/pi'

// Parent Component

const Learnings = () => {
  return (
    <div>
      <h1>Learnings</h1>
      {questions.map((qn) => <Question key={qn.id} {...qn}/>)}
    </div>
  )
}

export default Learnings


// Child Component

interface QuestionProps{
  id: number;
  question: string;
  answer: string
}

const Question = ({question, answer}: QuestionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <article className='border rounded p-3 mt-3'>
        <header className='flex justify-between'>
          <p className='font-semibold'>{question}</p>
          <button onClick={() => setIsOpen(!isOpen)} className='text-2xl' aria-expanded={isOpen}>
              {isOpen ? <PiMinusSquareBold/> : <PiPlusSquareBold/>}
          </button>
        </header>
        {isOpen && <p>{answer}</p>}
    </article>
  )
}