import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi'

interface FaqProps{
    question: string;
    answer: string;
    id: number;
    openId: number | null;
    toggleQuestion: (id: number) => void
}

const Faq = ({question, answer, id, openId, toggleQuestion}: FaqProps) => {

  const isOpen = openId === id;
  
  return (
    <article className='border p-4 rounded mt-3'>
        <header className='flex justify-between'>
            <p className='font-semibold'>{question}</p>
            <button onClick={() => toggleQuestion(id)} aria-expanded={isOpen} aria-controls={`faq-answer-${id}`} className='cursor-pointer hover:text-blue-600'>
                {isOpen ? <BiMinusCircle className='text-2xl'/> : <BiPlusCircle className='text-2xl'/>}
            </button>
        </header>
        {isOpen && <p className='mt-4'>{answer}</p>}
    </article>
  )
}

export default Faq