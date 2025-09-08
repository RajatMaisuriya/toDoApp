import React,{useState} from "react";
import axios from "axios";

function TodoForm({onTodoUpdate}){
    const[task,setTask] = useState("");
    const[dueDate,setDueDate] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(dueDate);
        if(!task) return;
        await axios.post("http://localhost:3000/api/todos",
        {
            task,
            dueDate,
        });
        setTask("");
        setDueDate("");
        // window.dispatchEvent(new Event("todoUpdated"));
        onTodoUpdate();
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={task}
            onChange={(e)=> setTask(e.target.value)}
            placeholder="Enter todo."
            />
            <input
            type="date"
            value={dueDate}
            onChange={(e)=> setDueDate(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;

