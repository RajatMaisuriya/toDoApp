import React,{useState} from "react";
import axios from "axios";

function TodoForm({onTodoUpdate}){
    const[task,setTask] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!task) return;
        await axios.post("http://localhost:3000/api/todos",{task});
        setTask("");
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
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;

