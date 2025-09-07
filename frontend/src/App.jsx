import { useEffect, useState } from 'react'
import axios from "axios";
import TodoForm from './components/todoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos,setTodos]=useState([]);   

  const fetchTodos = async () =>
    {
            try {
                const res = await axios.get("http://localhost:3000/api/todos");
                setTodos(res.data);
            } catch (err) {
                console.error(err);
  
};
    };

useEffect(() =>{
  fetchTodos()
},[])



  return (
    <>
     <h1>To-Do Application</h1>
     <TodoForm onTodoUpdate={fetchTodos} />
     <TodoList todos={todos} refreshTodo={fetchTodos} />
    </>
  )
}

export default App
