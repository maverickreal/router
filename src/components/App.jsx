import { useState, useEffect } from "react";
import { TodoProvider } from "../contexts";
import { TodoItem, TodoForm } from "./index.js";

export const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => setTodos(curTodos => [...curTodos, { ...todo, id: Date.now() }]);
    const deleteTodo = id => setTodos(curTodos => curTodos.filter(td => td.id !== id));
    const updateTodo = (id, todo) => setTodos(curTodos => curTodos.map(td => td.id === id ? todo : td));
    const toggleComplete = id => setTodos(curTodos => curTodos.map(td => td.id === id ? { ...td, completed: !td.completed } : td));

    useEffect(() => {
        const localStoreTodos = localStorage.getItem('todos');
        if (localStoreTodos) {
            const todosJson = JSON.parse(localStoreTodos);
            if (todosJson.length) {
                setTodos(todosJson);
            }
        }
    }, []);

    useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)), [todos]);

    return (
        <TodoProvider value={{ todos, setTodos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
            <div className="bg-[#394900] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-orange-50">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                            todos.map(todo =>
                                <div key={todo.id} className='w-full'>
                                    <TodoItem todo={todo} />
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}