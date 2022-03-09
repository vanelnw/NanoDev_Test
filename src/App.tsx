import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./component/InputField";
import TodoList from "./component/TodoList";
import { Todo } from "./model/todoModel";
import "./component/style.scss";
import axios from "axios";
import {API_URL} from './config'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      axios.post(
        `${API_URL}`
        ,{ id: Date.now(), name: todo, isDone: false }
      );
      setTodos([...todos, { id: Date.now(), name: todo, isDone: false }]);
    }
    setTodo("");
  };

  useEffect(() => {
    axios.get<Todo[]>(`${API_URL}`).then((res) => {
      if (res.data) setTodos(res.data);
    });
  }, []);

  return (
    <div className="root">
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
