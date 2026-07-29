import React, { useState } from "react";
import "./styles/TaskCard.css";

function TaskCard({ task, tasks, saveTasks }) {
  const [editing, setEditing] = useState(false);
  const [updated, setUpdated] = useState(task);

  const deleteTask = () => {
    const filter = tasks.filter((t) => t.id !== task.id);
    saveTasks(filter);
  };

  const saveEdit = () => {
    const updatedList = tasks.map((t) =>
      t.id === task.id ? updated : t
    );
    saveTasks(updatedList);
    setEditing(false);
  };

  return (
    <div className="task-card">
      {!editing ? (
        <>
        <h3 className="task-title">{task.title}</h3>
        <p className="task-info">{task.description}</p>
        <p className="task-info">Due: {task.dueDate}</p>
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
        {task.priority}
        </span>
        <p className="task-info">
        Collaborators: {task.assignedTo.join(", ") || "None"}
        </p>
        <div className="card-buttons">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={deleteTask}>
        Delete
        </button>
        </div>
        </>
      ) : (
        <>
        <input
        value={updated.title}
        onChange={(e) =>
        setUpdated({ ...updated, title: e.target.value })
            }
          />
        <textarea
        value={updated.description}
        onChange={(e) =>
        setUpdated({ ...updated, description: e.target.value })
        }
        ></textarea>

        <input
        type="date"
        value={updated.dueDate}
        onChange={(e) =>
        setUpdated({ ...updated, dueDate: e.target.value })
        }
          />

        <select
        value={updated.priority}
        onChange={(e) =>
        setUpdated({ ...updated, priority: e.target.value })
        }
        >
         <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        </select>

          <br /><br />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
