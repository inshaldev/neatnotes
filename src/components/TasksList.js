import React, { useEffect } from 'react';
import { db } from '../Firebase';
import { collection, onSnapshot, query, where } from '@firebase/firestore';

const TasksList = () => {
  useEffect(() => {
    const tasksRef = collection(db, 'tasks');
    const tasksQuery = query(
      tasksRef,
      where('userUID', '==', 'Ohft9sfDxLObTRm6MUF8wvnqXw23')
    );

    const getTasks = async () => {
      const tasksData = [];
      onSnapshot(tasksQuery, (snap) => {
        snap.docs.forEach((task) => {
          tasksData.push(task.data());
        });
      });
    };

    return getTasks();
  }, []);
  return <div className="tasks-list"></div>;
};

export default TasksList;
