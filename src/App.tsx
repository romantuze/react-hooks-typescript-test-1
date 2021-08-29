import React, {useEffect, useState, useMemo} from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
  todos?: TodoItem[];
};

interface  TodoItem  { 
  id: string | number;
  title: string;
  isDone?: boolean;
};

interface AppProps {
  todosProp: TodoItem[]
}

const App: React.FC<AppProps> = ({todosProp}) => {

  const [todos, setTodos] = useState<TodoItem[]>([]); 
  const [filter, setFilter] = useState<'all' | 'undone'>('all');
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {       
    if (todosProp) { 
      setFilter('all');
      setTodos(todosProp)
    }
  },[]);

  const filteredTodos = useMemo(() => {
    if (filter==='all') return todos;
    return todos.filter((todo) => (filter === 'undone' ? !todo.isDone : false));
  },[filter,todos]);

  const computedDoneCount = useMemo(() => {
    return todos.filter((todo) => (filter === 'undone' ? true : false)).length;
  },[todos]);

  function addTodo ()  { 
    let title = prompt('What to do?'); 
    if (title) {      
      let newTodo = {
        id: Date.now(), 
        title,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
    }    
  };

  const markAsDone = (todo: TodoItem) => {
    let index = todos.findIndex((i) =>  i.id === todo.id);
    if (index >= 0) {
      let newTodos = todos.slice();
      newTodos[index].isDone = true;
      setTodos(newTodos);
    }
    let done = doneCount + 1;
    setDoneCount(done);
  };

  const markAsUndone = (todo: TodoItem) =>  {
    let index = todos.findIndex((i) =>  i.id === todo.id);
    if (index >= 0) {
      let newTodos = [...todos];
      newTodos[index].isDone = false;
      setTodos(newTodos);
    }
    let done = (doneCount > 0) ? (doneCount - 1) : 0;
    setDoneCount(done);
  };

  const deleteTodo = (todo: TodoItem) => {
    let index = todos.findIndex((i) =>  i.id === todo.id);
    if (index >= 0) {
      let newTodos = todos.filter((i) => i.id !== todo.id);
      setTodos(newTodos);
    }
    let done = (todo.isDone === true) ? (doneCount - 1) : doneCount;
    setDoneCount(done);
  };

  const onFilterButtonClick = (e: any) => {
    e.preventDefault();
    if (filter === 'all') {
      setFilter('undone');
    }
    else {
      setFilter('all');
    }
  };

  return (
    <div>
      <p>{ `${doneCount} / ${todos.length}`}</p> 
      <ul>
        {filteredTodos
          .map((todo) => (
            <li key={todo.id}>
              <p>{`${todo.isDone ? '✅ ' : ''}${todo.title}`}</p>
              <button
                onClick={() => {
                  todo.isDone ? markAsUndone(todo) : markAsDone(todo);
                }}>
                {'Done'}
              </button>
              <button onClick={() => { deleteTodo(todo) }}>{'Delete'}</button>
            </li>
          ))}
      </ul>
      <button onClick={() => addTodo()}>{'Add'}</button>
      <button onClick={(e) => onFilterButtonClick(e)}>        
        {`Show ${filter === 'all' ? 'undone' : 'all'} todos`}
      </button>
      <ExpensiveTree />
    </div>
  );
};

function ExpensiveTree() {
  let now = performance.now();
  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 1000ms
  }
  return null;
}

export default App;
