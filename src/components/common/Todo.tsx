import React from "react";
import type { TodoTypes } from "../../pages/common/TodoContainer"
import { useState } from "react";

interface TodoProps extends TodoTypes{
  handleDelete: (id: number) => void;   
}

const Todo = React.memo(({id, item, handleDelete}: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const capitalized = item ? item.charAt(0).toUpperCase() + item.slice(1): "";
  return (
    <div className="flex justify-between mt-5">
        <div>
            <input checked={isCompleted} onChange={() => setIsCompleted(!isCompleted)} type="checkbox" className="mr-2" />
            <p className={`inline ${isCompleted ? "line-through": ""}`}>{capitalized}</p>
        </div>
        <button onClick={() => handleDelete(id)} aria-label={`Delete ${item}`} className="bg-red-600 py-1 px-2 rounded cursor-pointer text-white">Delete</button>
    </div>
  )
})

export default Todo