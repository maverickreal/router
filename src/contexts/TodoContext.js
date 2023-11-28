import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [],
    addTodo: () => { },
    deleteTodo: () => { },
    updateTodo: () => { },
    toggleComplete: () => { }
});

export const useTodo = () => useContext(TodoContext);
export const TodoProvider = TodoContext.Provider;