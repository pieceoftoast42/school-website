import React from "react";
import TaskCard from "./TaskCard";

function TaskList ({tasks, saveTasks})
{
    return(
    <div>
      <h2>Your Tasks</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => 
      (
        <TaskCard
          key={task.id}
          task={task}
          tasks={tasks}
          saveTasks={saveTasks}
        />
      ))}
    </div>
    );
}

export default TaskList;