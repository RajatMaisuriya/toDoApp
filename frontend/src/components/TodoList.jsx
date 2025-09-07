import React,{useState} from "react";
import axios from "axios";

function TodoList({todos, refreshTodo}){
    
    const [editingID,setEditingID]=useState(null);
    const [editingText,setEditingText]=useState("");


    
    

    const deleteTodo = async(id) => {
        await axios.delete(`http://localhost:3000/api/todos/${id}`);
        refreshTodo();
    }

    const toggleComplete = async(todo) => {
        await axios.put(`http://localhost:3000/api/todos/${todo._id}`,{
            task: todo.task,
            completed: !todo.completed
        });
        refreshTodo();
    }

    const saveTodo = async(editingText,todo) => {
        // console.log(todo)
        await axios.put(`http://localhost:3000/api/todos/${todo._id}`,{
            task: editingText,
            completed: todo.completed
        });
        setEditingID(null);
        refreshTodo();
    }

    const startEditing = async(todo) => {
            setEditingID(todo._id);
            setEditingText(todo.task);
    }

    return(
        <ul>
            {todos.map((todo)=>(
                <li key={todo._id}>
                    {editingID === todo._id ? (
                        <>
                        <input type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)} />
                        <button onClick={()=> saveTodo(editingText,todo)}>Save</button>
                        <button onClick={() => setEditingID(null)}>Cancle</button>
                        </>
                    ):(

                        <>
                    <span 
                        style={{textDecoration: todo.completed ? "line-through": ""}}
                        onClick={()=>toggleComplete(todo)}
                    >
                  
                    {todo.task}
                    </span>
                    <button onClick={() => startEditing(todo)}>Edit</button>
                    <button onClick={()=> deleteTodo(todo._id)}>Delete</button>
                    </>
                )}
                </li>
                
            )
            )}
        </ul>
    )
}

export default TodoList;