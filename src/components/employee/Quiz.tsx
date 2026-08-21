import { useState } from "react"
import questions from "../../data/mock/questions";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<{[key:number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const handleNextQn = () => {
     if(!selectedAns[currentIndex]){
        setError("Please select answer before proceeding...");
        return;
     }
     setError("");
     if(currentIndex < questions.length -1){
        setCurrentIndex(currentIndex + 1);
     }else{
        setShowResults(true);
     }
  }

  const handlePreviousQn = () => {
    if(currentIndex > 0){
        setCurrentIndex(currentIndex -1);
    }
  }

  const calculateScore = () => {
     let score = 0;
     questions.forEach((question, index) => {
        if(selectedAns[index] === question.answer) score++;
     })

     const percentage = (score / questions.length) * 100;
     const grade = percentage >= 80 ? "Excellent":
                   percentage >= 50 ? "Good": "Needs Improvement"

     return {score, grade}
  }

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAns({});
    setShowResults(false);
  }

  if(showResults){
    const {score, grade} = calculateScore();
    return <>
        <h3 className="text-2xl">Exam Completed</h3>
        <p className="my-5">Your Score: {score} / {questions.length} ({grade})</p>
        <button onClick={resetQuiz} className="border rounded p-2 cursor-pointer">Reset Quiz</button>
    </>
  }

  return (
    <div>
        <h1>Quiz</h1>
        <h3 className="mt-5 text-xl text-center">Questions {currentIndex + 1} of {questions.length}</h3>
        <p className="my-5 text-xl">{currentIndex + 1}. {questions[currentIndex].question}</p>
        {questions[currentIndex].options.map((option) => (
            <button 
                onClick={() => setSelectedAns({...selectedAns, [currentIndex]: option})} 
                key={option} className={`mr-3 px-3 py-1 cursor-pointer border rounded ${selectedAns[currentIndex] === option ? "bg-green-200": ""}`}>{option}
            </button>
        ))}
        <div className="mt-10">
            <button onClick={handlePreviousQn} className="p-2 cursor-pointer border rounded mr-3">Previous Question</button>
            <button onClick={handleNextQn} className="p-2 cursor-pointer border rounded">{currentIndex === questions.length-1 ? "Submit Answers" : "Next Question"}</button>
        </div>
        <p className="text-red-500 mt-5">{error}</p>
    </div>
  )
}

export default Quiz