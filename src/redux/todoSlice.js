import { createSlice } from '@reduxjs/toolkit';


const TodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};


const saveTodosInLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todo: TodosFromLocalStorage(), 
  },
  reducers: {
    addTodo: (state, action) => {
      state.todo.push({ title: action.payload.title, completed: false });
      saveTodosInLocalStorage(state.todo); 
    },
    removeTodo: (state, action) => {
      state.todo.splice(action.payload.index, 1);
      saveTodosInLocalStorage(state.todo); 
    },
    editTodo: (state, action) => {
      const { index, newTitle } = action.payload;
      state.todo[index].title = newTitle;
      saveTodosInLocalStorage(state.todo); 
    },
    toggleTodo: (state, action) => {
      const { index } = action.payload;
      state.todo[index].completed = !state.todo[index].completed;
      saveTodosInLocalStorage(state.todo); 
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
