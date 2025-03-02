import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;
  // Fetch To-Do List from API
  useEffect(() => {
    axios
      .get(`/trackings/logs/${loggedInUser.id}/habit`)
      .then((res) => setTasks(res.data));
    //   .catch(() => toast.error("Failed to load tasks"));
  }, []);

  // Handle Checkbox Change (Log Completion)
  const handleCheck = async (taskId) => {
    try {
      await axios.post("/logs", { tracking_id: taskId, quantity: 1 });
      //   toast.success("Task logged successfully!");
    } catch {
      //   toast.error("Failed to log task");
    }
  };

  if (!tasks?.length) return null;
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">To-Do List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input type="checkbox" onChange={() => handleCheck(task.id)} />
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
