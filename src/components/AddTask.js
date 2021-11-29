import { addDoc, serverTimestamp } from '@firebase/firestore';
import { tasksRef } from '../Firebase';
import { AiOutlinePlus } from 'react-icons/ai';

const AddTask = ({ newTask, setNewTask, newTaskInput }) => {
  const handleNewTask = async () => {
    setNewTask(!newTask);
    const taskValue = newTaskInput.current;
    if (newTask && taskValue.value) {
      await addDoc(tasksRef, {
        completed: false,
        lastUpdatedAt: new serverTimestamp(),
        content: taskValue.value,
        userUID: 'Ohft9sfDxLObTRm6MUF8wvnqXw23',
      }).then();
    }
  };
  return (
    <button onClick={handleNewTask} className="new-task-btn">
      <AiOutlinePlus />
    </button>
  );
};

export default AddTask;
