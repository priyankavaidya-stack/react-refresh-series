import { createSlice, nanoid } from "@reduxjs/toolkit"; 

const initialState = {
    todos: [{
        id: 1,
        text: "Meeting at 9 am",
        isEditing: false, // Added isEditing property
        completed: false
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                isEditing: false,
                completed: false
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => 
                todo.id !== action.payload
            )
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            state.todos = state.todos.map((todo) => 
            todo.id === id ? { ...todo, text} : todo );
        },
        toggleComplete: (state, action) => {
            const { id } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
              existingTodo.completed = !existingTodo.completed;
            }
        },
      
        toggleEdit: (state, action) => {
            const { id } = action.payload;
            state.todos = state.todos.map((todo) => 
            todo.id === id ? { ...todo, isEditing: !todo.isEditing} : todo)
        }
    }
})

//  exporting indivially reducers to use it a/c to requirement 
export const {addTodo, removeTodo, updateTodo, toggleComplete, toggleEdit} = todoSlice.actions

// exporting whole reducer function for maintaining store state in store.js
export default todoSlice.reducer