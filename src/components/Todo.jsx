import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, editTodo, toggleTodo } from '../redux/todoSlice'; // Adjust the path as necessary

const Todo = () => {
  const [todoInput, setTodoInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todo);

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      dispatch(addTodo({ title: todoInput }));
      setTodoInput('');
    }
  };

  const handleRemoveTodo = (index) => {
    dispatch(removeTodo({ index }));
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditInput(todos[index].title);
  };

  const handleUpdateTodo = () => {
    if (editInput.trim()) {
      dispatch(editTodo({ index: editIndex, newTitle: editInput }));
      setEditIndex(null); 
      setEditInput(''); 
    }
  };

  const handleToggleTodo = (index) => {
    dispatch(toggleTodo({ index }));
  };

  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='flex flex-col justify-center items-center min-w-[600px] min-h-[450px] rounded-2xl bg-gray-400 shadow-md shadow-black mx-20 px-10'>
        <h1 className='text-5xl font-bold text-black'>Todo App</h1>
        <input
          className='w-full mt-10 h-10 bg-transparent border-2 border-black rounded-xl p-3 outline-none text-black placeholder:text-black placeholder:font-medium'
          type="text"
          placeholder='Add Todo'
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        /><br />
        <button
          className="px-5 py-2 rounded-lg bg-gray-400 font-medium text-xl border-2 border-black text-black hover:text-gray-400 hover:bg-black hover:border-gray-400"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <div className='w-full p-2 mt-5'>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className='p-2 bg-transparent border-2 border-black px-5 text-lg font-medium rounded-3xl text-black mt-2'>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(index)} // Toggle completed state
                />
                <span className={todo.completed ? 'line-through text-black' : ''}>
                  {editIndex === index ? (
                    <>
                      <input
                        className='border-2 border-black rounded-lg p-1 mr-2'
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                      />
                      <button
                        className='px-2 py-1 bg-green-500 text-white rounded-lg'
                        onClick={handleUpdateTodo}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      {todo.title}
                      <button
                        className='ml-4 text-blue-500'
                        onClick={() => handleEditTodo(index)}
                      >
                        Edit
                      </button>
                      <button
                        className='ml-4 text-red-500'
                        onClick={() => handleRemoveTodo(index)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
