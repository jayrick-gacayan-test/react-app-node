import React, { useState, useReducer, useEffect } from 'react';
import axiosFetch from '../layouts/useAxiosFetch';
import axios from 'axios';

/* Components */
import TodoList from './TodoList';
import TodoForm from './TodoForm';

import '../custom.style/todo.style.css';
import { baseURL } from '../../utils/baseURL';


const TodoContainer = () => {

    const initialState = {
        id : null,
        name : "",
        title : "",
        completed : false
    }
    
    const [ editing, setEditing ] = useState(false); // checks if editing is enable
    const [ currentTodo, setCurrentTodo ] = useState(initialState); // getting the current todo
    const [ loading, isLoading ] = useState(false);
    const reducer = (state, action) => {
        switch(action.type){
            case "ADD":
                return [ ...state, action.todo ];
            case "DELETE": 
                return state.filter(
                    todo => { return todo.id !== action.id }
                );
            case "HANDLE_TODO_TASK":
                return state.map(
                    (todo) => {
                        return todo.id === action.id? 
                            { ...todo, completed: !todo.completed } : todo;
                    }
                );
            case "EDIT":
                console.log("Action and state: ", action, state); 
                return state;
            case "UPDATE":
                return state.map(
                    (todo) => {
                        return todo.id === action.todoData.id ? action.todoData : todo;
                    }
                );
            case "SET_TODOS" :
                return action.todos;
            default : return state;
        }
    }

    const [ todos, dispatch ] = useReducer(reducer, []); // use reducer
    
    useEffect(
        () => {
            function fetchTodos(){
                axios({
                        url: baseURL + "/api/todos",
                        method: "GET"
                    })
                    .then((res) => {
                        dispatch({
                            type: "SET_TODOS",
                            todos: res.data
                        })
                    });
            }//end of function fetchTodos();

            isLoading(true)
            
            const fetchTodosTimeout = setTimeout(()=> {
                fetchTodos();
                isLoading(false);
            }, 2000);

            return () => {
                clearTimeout(fetchTodosTimeout);
            }
        },
        [ ]
    );

    /* crude methods */
    const addTodo = (todo) => {
        const { title, name } = todo;
        
        axiosFetch(baseURL + "/api/todos/create",
                    "POST",
                    { title, name })
            .then((res) => {
                const { id, title, name, completed } = res.data;
                alert("Title " + title + " and " + name 
                            + "with an id " + res.data.id 
                            + " has been successfully added.");

                dispatch({ type: "ADD", todo: { id, title, name, completed }});
            });
        
        toSetEditingAndCurrentTodo(false, initialState);

    }

    const deleteTodo = (id) => {
        axiosFetch(baseURL + "/api/todos/" + id,
                    "DELETE")
            .then((res) => {
                alert(res.data.message);
            });

        dispatch({ type: "DELETE", id : id });
        toSetEditingAndCurrentTodo(false, initialState);
    }

    const handleTodoTask = (id) => {
        const todoCurrent = todos.filter((todo) => { return todo.id === id; });
        
        axiosFetch(baseURL + "/api/todos/" + id,
                    "PUT",
                    { completed : !todoCurrent[0].completed })
            .then((res) => {
                alert(res.data.message);
            }); 

        dispatch({ type: "HANDLE_TODO_TASK", id: id });
    }

    const editTodo = (todo) => {
        toSetEditingAndCurrentTodo(true, todo);
        dispatch({ type: "EDIT", todo: todo });
    }

    const updateTodo = (todo) =>{
        
        const { title, name } = todo;

        axiosFetch(baseURL + "/api/todos/" + todo.id,
                    "PUT",
                    { name, title })
            .then((res) => {
                console.log("Response ", res);
                alert(res.data.message);
            });

        toSetEditingAndCurrentTodo(false, initialState);
        dispatch({ type: "UPDATE", todoData: todo });
    }

    function toSetEditingAndCurrentTodo(editing, currentTodo){
        setEditing(editing);
        setCurrentTodo(currentTodo);
    }

    return (
        <div className="container-fluid margin-big-top">
            <div className="container-fluid p-5 bg-primary text-white text-center">
                <h1>Todo Page</h1>
                <p>Resize this responsive page to see the effect!</p> 
            </div>
                
            <div className="container mt-5">
                <div>
                    <div>
                        <p className="lead font-weight-bold font-size-3 text-center">{ !editing ? "Add" : "Edit" } todo</p>
                        <TodoForm 
                            isEditing={ editing } 
                            todoAction={ !editing ? addTodo : updateTodo }
                            currentTodo={ currentTodo }
                        />
                    </div>
                    <ul>
                        {
                            
                        todos.length > 0 ? 
                            (<TodoList todos={ todos }
                                handleTodoTask={ handleTodoTask }
                                deleteTodo={ deleteTodo }
                                editTodo={ editTodo }/>) :
                            (<li>No todo task yet.</li>) 
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoContainer;