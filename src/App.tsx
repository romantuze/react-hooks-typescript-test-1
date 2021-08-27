import React, {useEffect, useState, useMemo} from 'react';
import logo from './logo.svg';
import './App.css';



type Props = {
  todos?: TodoItem[];
};

// type TodoItem =
interface  TodoItem  { 
  id: string | number;
  title: string;
  isDone?: boolean;
};

interface AppProps {
  todosProp: TodoItem[]
}

const App: React.FC<AppProps> = ({todosProp}) => {

  const [todos, setTodos] = useState<TodoItem[]>([]); // props.todos


  const [filter, setFilter] = useState<'all' | 'undone'>('all');
  const [doneCount, setDoneCount] = useState(0);

  const [filtrTodos,setFiltrTodos] = useState<TodoItem[]>([]); 

 /* const getFiltrTodos = () => {
    let newTodos = todos.filter((todo) => (filter === 'undone' ? !todo.isDone : false));
    if (filter === 'undone') return newTodos;
    return todos;
  }*/
  


  useEffect(() => {   
    
    if (todosProp) { // props.todos
      setFilter('all');
      setTodos(todosProp)
    }


  },[]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => (filter === 'undone' ? !todo.isDone : false));
  },[filter,todos]);

  function addTodo ()  { // title?: string
    /*let title: string = "";*/

    //if (!title) {
     
    //}
    let title = prompt('What to do?'); 

    if (title) {
      
      let newTodo = {
        id: +Date.now(), // Date.now
        title,
        isDone: false,
      };

      setTodos([...todos, newTodo]);
    }

    
  };




  const markAsDone = (todo: TodoItem) => {
    /*let id = todo.id;
    let index = todos.indexOf(id);*/
    let index = todos.findIndex((i) =>  i.id === todo.id);

    if (index >= 0) {
      //let newTodos = todos.splice(index, 1);
      let newTodos = todos.filter((i) => i.id !== index);
      setTodos(newTodos);
    }

    setDoneCount(todos.length);
  };

  const markAsUndone = (todo: TodoItem) =>  {
    const index = todos.slice().findIndex((item) => todo.id);

    if (index >= 0) {

      //todos.splice(index, 1, {...todo, isDone: false});
      let newTodos = todos.filter((i) => i.id !== index);
      newTodos.splice(index, 1, {...todo, isDone: false});

      setTodos([...newTodos]);
    }

    let done = todos.length - 1;
    setDoneCount(done);

  };

  const deleteTodo = (todo: TodoItem) => {

    let index = todos.findIndex((i) =>  i.id === todo.id);

    //const index = todos.indexOf(todo.id);

    if (index >= 0) {
      //todos.splice(index, 1);
      let newTodos = todos.filter((i) => i.id !== todo.id);

      setTodos(newTodos);
    }
  };

  const onFilterButtonClick = (e: any) => {
    e.preventDefault();
    if (filter === 'all') {
      setFilter('undone');
  }
    else {
      setFilter('all');
    }


   

    //setFilter((filter === 'all') ? 'all' : 'undone');
  };




//todos.count
  return (
    <div>
      <p>{`${doneCount} / ${todos.length}`}</p> 
      <ul>
        {filteredTodos
          //.filter((todo) => (filter === 'undone' ? !todo.isDone : false))
          .map((todo) => (
            <li key={todo.id}>
              <p>{`${todo.isDone ? '✅ ' : ''}${todo.title}`}</p>
              <button
                onClick={() => {
                  todo.isDone ? markAsDone(todo) : markAsUndone(todo);
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
