import React, { useEffect, useState, useRef } from 'react';
import { tasksRef } from '../Firebase';
import { getDocs, orderBy, query, where } from '@firebase/firestore';
import Task from './Task';
import AddTask from './AddTask';
import { useAuth } from '../contexts/Context';
import { useNavigate } from 'react-router';
import SignOut from './SignOut';
import { PropagateLoader } from 'react-spinners';

const TasksList = () => {
  const { currentUser, globalLoadingState, setGlobalLoadingState } = useAuth();
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const newTaskInput = useRef();

  useEffect(() => {
    const checkUser = () => {
      if (!currentUser) {
        navigate('/login');
      }
    };
    return checkUser();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      const tasksQuery = query(
        tasksRef,
        (where('userUID', '==', currentUser.uid),
        orderBy('lastUpdatedAt', 'asc'))
      );

      const getTasks = async () => {
        const docsData = [];
        await getDocs(tasksQuery).then((snap) => {
          snap.docs.forEach((doc) => {
            docsData.push({ ...doc.data(), id: doc.id });
          });
        });
        setTasks(docsData);
        setGlobalLoadingState(false);
      };
      getTasks();
    }
  });

  return (
    <>
      {!globalLoadingState && !loadingState ? (
        <div className="tasks-list">
          <h1 className="tasks-heading">Tasks</h1>
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
          {newTask && (
            <input ref={newTaskInput} className="new-task-input" autoFocus />
          )}
          <div className="task-btns">
            <SignOut setLoadingState={setLoadingState} />
            <AddTask
              newTask={newTask}
              setNewTask={setNewTask}
              newTaskInput={newTaskInput}
            />
          </div>
        </div>
      ) : (
        <div className="loader-div">
          <PropagateLoader size={30} color={'#2a52be'} speedMultiplier={2} />
        </div>
      )}
    </>
  );
};

export default TasksList;
