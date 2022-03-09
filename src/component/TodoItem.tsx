import React, { useState } from "react";
import { Todo } from "../model/todoModel";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../config";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, setTodos, todos }) => {
  const handleDelete = (id: number) => {
    axios.delete<Todo[]>(`${API_URL}/${id}`).then((res) => {
      console.log("delete successful");
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: Number) => {
    axios
      .put<Todo[]>(`${API_URL}/${id}`, {
        id,
        name: todo.name,
        isDone: true,
      })
      .then((res) => {
        console.log("delete successful");
      });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  const [isShown, setIsShown] = useState(false);

    return (
      <div className="todoItem">
        <div
          className="blocName"
          onMouseOver={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => handleDone(todo.id)}
        >
            {todo.isDone ? (
              <>
                <AiOutlineCheck className="doneIcon" />
                <s>{todo.name.toUpperCase()}</s>
              </>
            ) : (
                <>
                  <div className={isShown ? "iconShow" : "iconHide"}></div>
                  <span>{todo.name.toUpperCase()}</span>
                </>
            )}
          
        </div>
        <span className="icon">
          <AiOutlineClose onClick={() => handleDelete(todo.id)} />
        </span>
      </div>
    );
};

export default TodoItem;
