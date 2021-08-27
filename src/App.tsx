
import React, {useEffect, useState} from 'react';

type Props = {
  todos?: TodoItem[];
};

type TodoItem = {
  id: string | number;
  title: string;
  isDone?: boolean;
};

const App: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>(props.todos);
  const [filter, setFilter] = useState<'all' | 'undone'>('all');
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (props.todos.length) {
      setFilter('all');
    }
  });

  const addTodo = (title?: string) => {
    if (!title) {
      title = prompt('What to do?');
    }

    if (!title) {
      todos.push({
        id: +Date.now,
        title,
      });
    }

    setTodos(todos);
  };

  const markAsDone = (todo: TodoItem) => {
    const index = todos.indexOf(todo.id);

    if (index >= 0) {
      todos.splice(index, 1);

      setTodos(todos);
    }

    setDoneCount(todos.length);
  };

  const markAsUndone = (todo: TodoItem) => {
    const index = todos.slice().findIndex((item) => todo.id);

    if (index >= 0) {
      todos.splice(index, 1, {...todo, isDone: false});

      setTodos(todos);
    }

    setDoneCount(todos.length--);
  };

  const deleteTodo = (todo: TodoItem) => {
    const index = todos.indexOf(todo.id);

    if (index >= 0) {
      todos.splice(index, 1);

      setTodos(todos);
    }
  };

  const onFilterButtonClick = () => {
    setFilter(filter === 'all' ? 'all' : 'undone');
  };

  return (
    <div>
      <p>{`${doneCount} / ${todos.count}`}</p>
      <ul>
        {todos
          .filter((todo) => (filter === 'undone' ? !todo.isDone : false))
          .map((todo) => (
            <div key={`${todo.id}`}>
              <p>{`${todo.isDone ? '✅ ' : ''}${todo.title}`}</p>
              <button
                onClick={() => {
                  todo.isDone ? markAsDone(todo) : markAsUndone(todo);
                }}>
                {'Done'}
              </button>
              <button onClick={deleteTodo}>{'Delete'}</button>
            </div>
          ))}
      </ul>
      <button onClick={() => addTodo()}>{'Add'}</button>
      <button onClick={() => onFilterButtonClick()}>
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