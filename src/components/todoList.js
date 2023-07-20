import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    console.log("La lista se ha actualizado:", todoList);
  }, [todoList]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) => {
        console.log("Error al comunicarse con la API: ", error);
      });
  }, []);

  //Agregamos un manejador de eventos para cuando nuestro formulario sea usado
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  //Agregamos un manejador de eventos para el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodoItem = { title: newTodo, completed: false };
    setTodoList([...todoList, newTodoItem]);
    setNewTodo("");
  };

  //Agregamos un checkbox para identificar si la actividad esta marcada como completada
  const handleCheckboxChange = (index) => {
    const updatedTodoList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div className="todo-list">
      <h1>To-do List</h1>
      {todoList.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(index)}
          />
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        <button type="submit">Agregar To-Do</button>
      </form>
    </div>
  );
};

export default TodoList;
