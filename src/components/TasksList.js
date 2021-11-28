import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc,
} from '@firebase/firestore';
import Task from './Task';
import { useRef } from 'react';

const TasksList = () => {
  const tasksRef = collection(db, 'tasks');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const newTaskInput = useRef();

  const handleNewTask = async () => {
    setNewTask(!newTask);
    const taskValue = newTaskInput.current;
    if (newTask && taskValue.value) {
      await addDoc(tasksRef, {
        completed: false,
        createdAt: new serverTimestamp(),
        content: taskValue.value,
        userUID: 'Ohft9sfDxLObTRm6MUF8wvnqXw23',
      }).then();
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const handleEditTask = async (id, taskValue) => {
    if (taskValue !== '') {
      await updateDoc(doc(db, 'tasks', id), { ...doc, content: taskValue });
    }
  };

  useEffect(() => {
    const tasksQuery = query(
      tasksRef,
      (orderBy('createdAt', 'asc'),
      where('userUID', '==', 'Ohft9sfDxLObTRm6MUF8wvnqXw23'))
    );

    const getTasks = onSnapshot(tasksQuery, (snap) => {
      setTasks(
        snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    return getTasks;
  });
  return (
    <div className="tasks-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        );
      })}
      {newTask && (
        <input ref={newTaskInput} className="new-task-input" autoFocus />
      )}
      <button onClick={handleNewTask} className="new-task-btn">
        Add
      </button>
    </div>
  );
};

export default TasksList;
