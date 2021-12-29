import React from "react";
import { useState, useEffect} from "react";
import './todoList.css';
import {GoTrashcan} from "react-icons/go";
import {MdModeEdit} from "react-icons/md";

function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [changeEdit, setChangeEdit] = useState(true);
    const [editTodo, setEditTodo] = useState(null);

    useEffect(() => {
        const temp = localStorage.getItem("any");
        const loadedItems = JSON.parse(temp);
        if(loadedItems) {
            setTodoList(loadedItems);
        }
    }, []);

    useEffect(() => {
        const temp = JSON.stringify(todoList);
        localStorage.setItem("any", temp);
    }, [todoList]);

    function handleSubmit(e){
        e.preventDefault();
        if(!todo){
            alert("Please enter a todo");
        }
        else if(todo && !changeEdit){
            setTodoList(
                todoList.map((item) => {
                    if(item.id === editTodo){
                        return {...item, name: todo};
                    }
                    return item;
                })
            );
            setChangeEdit(true);
            setTodo("");
            setEditTodo(""); 
        }
        else{
            const inputData = {id: new Date().getTime(),  name: todo};
            setTodoList([...todoList, inputData]);
            setTodo("");
        }
    }

    function handleDelete(key) {
        const newList = [...todoList].filter((item) => {return item.id !== key});
        setTodoList(newList);
    }

    function handleEdit(i){
        let editItem = todoList.find((item) => {
            return item.id === i});
        console.log(editItem);
        setChangeEdit(false);
        setTodo(editItem.name);
        setEditTodo(i);    
    }

    return (
        <div>
            <div>
                <input type="text" autoFocus placeholder="Todo List" value={todo} onChange={(e) => setTodo(e.target.value)} required/>
                {changeEdit ? <button className="btn" onClick={handleSubmit}>Add</button> : <button className="edit" onClick={handleSubmit}>Edit</button> }
            </div>
            <ul>
            { todoList.map((todo)=>{ 
                return(<div>
                    <span>
                    <li key={todo.id}>{todo.name}</li>
                    <div>
                        <MdModeEdit className="edit-icons" onClick={() => handleEdit(todo.id)}/>
                        <GoTrashcan className="icons" onClick={() => handleDelete(todo.id)}/> 
                    </div>
                    </span>
                    </div>)}) }
            </ul>
        </div>
    )
}

export default TodoList;