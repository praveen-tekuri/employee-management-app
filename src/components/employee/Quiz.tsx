import { useEffect, useMemo, useRef, useState } from "react"
import questions from "../../data/mock/questions";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<{[key:number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [examRunning, setExamRunning] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clearTimer = () => {
    if(intervalRef.current){
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
  }

  const startExam = () => {
    setExamStarted(true);
    setExamRunning(true);
    setShowResults(false);
    setCurrentIndex(0);
    setSelectedAns({});
    setTimeLeft(60);
    
    clearTimer();
    intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev > 0 ? prev -1: 0);
    },1000);
  }

  const pauseExam = () => {
    clearTimer();
    setExamRunning(false);
  }

  const resumeExam = () => {
    if(!examRunning && timeLeft > 0){
        setExamRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => prev > 0 ? prev -1: 0);
        },1000)
    }
  }

  const handleSubmitExam = () => {
    clearTimer();
    setExamRunning(false);
    setShowResults(true);
  }

  useEffect(() => {
    if(timeLeft === 0 && examRunning){
        handleSubmitExam();
    }
  },[timeLeft, examRunning]);

  useEffect(() => {
     return () => clearTimer();
  },[])

  const handleNextQn = () => {
     if(!selectedAns[currentIndex]){
        setError("Please select answer before proceeding...");
        return;
     }
     setError("");
     if(currentIndex < questions.length -1){
        setCurrentIndex(currentIndex + 1);
     }else{
        handleSubmitExam();
     }
  }

  const handlePreviousQn = () => {
    if(currentIndex > 0){
        setCurrentIndex(currentIndex -1);
    }
  }

  const calculateScore = useMemo(() => {
     let score = 0;
     questions.forEach((question, index) => {
        if(selectedAns[index] === question.answer) score++;
     })

     const percentage = (score / questions.length) * 100;
     const grade = percentage >= 80 ? "Excellent":
                   percentage >= 50 ? "Good": "Needs Improvement"

     return {score, grade}
  },[selectedAns])

  const resetQuiz = () => {
    startExam();
  }

  const progressBarWidth = (timeLeft / 60) * 100;
  const getProgressBarColor = () => {
    if(timeLeft > 40) return "bg-green-500";
    if(timeLeft > 20) return "bg-yellow-500";
    return "bg-red-500";
  }

  if(showResults){
    const {score, grade} = calculateScore;
    return <>
        <h3 className="text-2xl">Exam Completed</h3>
        <p className="my-5">Your Score: {score} / {questions.length} ({grade})</p>
        <button onClick={resetQuiz} className="border rounded p-2 cursor-pointer">Reset Quiz</button>
    </>
  }

  return (
    <div>
        <h1>Quiz</h1>
            {showResults && (<>
            
            </>)}
            {!examStarted ? (
                <div className="flex justify-center">
                    <button onClick={startExam} className="p-2 border rounded cursor-pointer">Start Exam</button>
                </div>
            ): (
                <>
                    <div className="flex flex-col items-end">
                        <p className="mt-5">Status: {examRunning ? "Exam Running...": "Exam Paused"}</p>
                        <p className="mt-2">Time Left: {timeLeft} seconds</p>
                        <div className={`${getProgressBarColor()} mt-5 h-4 rounded transition-all duration-500`} style={{width: `${progressBarWidth}%`}}></div>
                    </div>
                    <h3 className="mt-5 text-xl text-center">Questions {currentIndex + 1} of {questions.length}</h3>
                    <p className="mt-10 text-xl">{currentIndex + 1}. {questions[currentIndex].question}</p>
                    {questions[currentIndex].options.map((option) => (
                        <button 
                            onClick={() => setSelectedAns({...selectedAns, [currentIndex]: option})} 
                            key={option} className={`mr-3 px-3 py-1 mt-5 cursor-pointer border rounded ${selectedAns[currentIndex] === option ? "bg-green-200": ""}`}>{option}
                        </button>
                    ))}
                    <div className="mt-10">
                        <button onClick={handlePreviousQn} className="p-2 cursor-pointer border rounded mr-3">Previous Question</button>
                        <button disabled={currentIndex === questions.length-1} onClick={handleNextQn} className={`p-2 cursor-pointer border rounded ${currentIndex === questions.length -1 ? "hidden": ""}`}>Next Question</button>
                    </div>
                    <p className="text-red-500 mt-5">{error}</p>
                    <div className="mt-10 flex flex-row items-end justify-end gap-6">
                        <button onClick={pauseExam} className="p-2 border rounded cursor-pointer">Pause Exam</button>
                        <button onClick={resumeExam} className="p-2 border rounded cursor-pointer">Resume Exam</button>
                        <button onClick={handleSubmitExam} className="p-2 border bg-green-400 rounded cursor-pointer">Submit Exam</button>
                    </div>
                </>
            )}
    </div>
  )
}

export default Quiz