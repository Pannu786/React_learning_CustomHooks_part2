import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  
  const [tasks, setTasks] = useState([]);

  const { isLoadin: myloadhaha, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTask = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: 'https://react-http-get-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={myloadhaha}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
