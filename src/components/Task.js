import React, { useRef, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Tasks.css';

const Task = ({ task, handleDeleteTask, handleEditTask }) => {
  const [editTask, setEditTask] = useState(false);
  const editTaskInput = useRef();
  const { content, id } = task;
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
