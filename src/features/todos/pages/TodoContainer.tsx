import { useCallback, useState, type FormEvent } from "react"
import Todo from "../components/Todo";

export interface TodoTypes{
    id: number;
    item: string
}

const TodoContainer = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<TodoTypes[]>([]);
  
  const handleTodoList = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!todo.trim()) return;
    setTodoList((prev) => [...prev, {id: Date.now(), item: todo}]);
    setTodo("");
  }

  const handleDelete = useCallback((id:number) => {
     setTodoList((prev) => prev.filter((el) => el.id !== id));
  },[])
  
  return (
    <div className="w-[50%] mx-auto">
        <h1>Todo List</h1>
        <form onSubmit={handleTodoList}>
            <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" className="border rounded p-2 w-full" placeholder="Add todo"/>
        </form>
        {todoList.length < 1 && <h3 className="mt-5">No todos Added</h3>}
        {todoList.map((el) => <Todo key={el.id} {...el} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default TodoContainer