import React,{useState} from "react";
import axios from "axios";

function TodoList({todos, refreshTodo}){
    
    const [editingID,setEditingID]=useState(null);
    const [editingText,setEditingText]=useState("");
    const [editingDate,setEditingDate]=useState("");


    
    

    const deleteTodo = async(id) => {
        await axios.delete(`http://localhost:3000/api/todos/${id}`);
        refreshTodo();
    }

    const toggleComplete = async(todo) => {
        await axios.put(`http://localhost:3000/api/todos/${todo._id}`,{
            task: todo.task,
            completed: !todo.completed,
            dueDate:todo.dueDate
        });
        refreshTodo();
    }

    const saveTodo = async(todo) => {
        // console.log(todo)
        console.log("Sending update:", {
  task: editingText,
  completed: todo.completed,
  dueDate: editingDate,
});
        await axios.put(`http://localhost:3000/api/todos/${todo._id}`,{
            task: editingText,
            completed: todo.completed,
            dueDate : editingDate,
        });
        setEditingID(null);
        refreshTodo();
    }

    const startEditing = async(todo) => {
            setEditingID(todo._id);
            setEditingText(todo.task);
            setEditingDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0]:"");
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
                        <input 
                        type="date"
                        value={editingDate}
                        onChange={(e) => setEditingDate(e.target.value)}
                        />
                        <button onClick={()=> saveTodo(todo)}>Save</button>
                        <button onClick={() => setEditingID(null)}>Cancle</button>
                        </>
                    ):(

                        <>
                    <span 
                        style={{textDecoration: todo.completed ? "line-through": "",
                            color:todo.dueDate && new Date(todo.dueDate) < new Date()
                                ? "red": "black",
                        }}
                        onClick={()=>toggleComplete(todo)}
                        
                    >
                  
                    {todo.task}
                   {todo.dueDate && (
                    <span> {new Date(todo.dueDate).toLocaleDateString()} </span>
                    )}
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