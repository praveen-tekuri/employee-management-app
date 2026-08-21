
export interface Question{
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const questions:Question[] = [
  { id: 1, question: "What is React?", options: ["Library", "Framework"], answer: "Library" },
  { id: 2, question: "What is JSX?", options: ["JS Syntax", "CSS"], answer: "JS Syntax" },
  { id: 3, question: "What is a Hook?", options: ["Function", "Class"], answer: "Function" }
];

export default questions;