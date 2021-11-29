import React, { useRef, useState } from 'react';
import { db } from '../Firebase';
import {
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Task = ({ task }) => {
  const [editTask, setEditTask] = useState(false);
  const editTaskInput = useRef();
  const { content, id } = task;

  const handleEditTask = async (id, taskValue) => {
    if (taskValue !== '') {
      await updateDoc(doc(db, 'tasks', id), {
        content: taskValue,
        lastUpdatedAt: new serverTimestamp(),
      });
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div className="task">
      {!editTask ? (
        <>
          <p>{content}</p>
          <div className="task-icons">
            <FaEdit
              onClick={() => {
                setEditTask(true);
              }}
            />
            <FaTrash
              onClick={() => {
                handleDeleteTask(id);
              }}
            />
          </div>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditTask(id, editTaskInput.current.value);
            setEditTask(false);
          }}
        >
          <input
            className="edit-task-input"
            defaultValue={content}
            ref={editTaskInput}
            autoFocus
          />
          <button className="edit-task-btn" type="submit">
            Edit
          </button>
        </form>
      )}
    </div>
  );
};

export default Task;
