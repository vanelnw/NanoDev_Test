import React from 'react'
import { Todo } from '../model/todoModel';
import TodoItem from './TodoItem';
import '../component/style.scss'
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios'
import { API_URL } from '../config';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
    let todosDone = todos.filter(t => t.isDone === true);
    const handleClear = () => {
        todosDone.map((todo) => {
            axios
                .delete<Todo[]>(`${API_URL}/${todo.id}`)
                .then((res) => {
                    console.log("Delette successful")
                })
        }
        );
        setTodos(todos.filter(todo => !todo.isDone))
    }
  return (
    <div className="todos">
      <div className='title'>
        <span>{`${todosDone.length}/${todos.length}`}</span>
        <button className="clear" type="submit" onClick={() => handleClear()}  style={{background:'orange'}}>
          <AiOutlineClose/>Clear done todos
        </button>
      </div>
      {todos &&
        todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          );
        })}
    </div>
  );
}

export default TodoList