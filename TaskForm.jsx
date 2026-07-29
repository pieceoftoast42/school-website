import React, {useState} from "react";
import './styles/TaskCard.css';
function TaskForm({tasks, saveTasks, currentUser})
{
    const[title, setTitle] = useState("");
    const[desc, setDesc] = useState("");
    const[due, setDue] = useState("");
    const[priority, setPriority] = useState("Low");
    const[collab, setCollab] = useState([""]);
    const [owner, setOwner] = useState("");
    const addCollaborator = () => setCollab([...collab, ""]);
    const updateCollaborator = (i,val) => 
    {
        const updated = [...collab];
        updated[i] = val;
        setCollab(updated);
    };
    const removeCollaborator = (i) => 
    {
        setCollab(collab.filter((_, idx) => idx !== i));
    };

    const createTask = (e) =>
    {
        e.preventDefault();
        const collaboratorsUsernames = collab.filter(c => c.trim() !== "");
        const assignedToUsers = 
        [
            {username: currentUser, status: "accepted"},
            ...collaboratorsUsernames.map(username => ({ username: username, status: "pending" }))
        ];
        const newTask = 
        {
            id: crypto.randomUUID(),
            title,
            description: desc,
            dueDate:due,
            priority, 
            assignedTo: assignedToUsers,
            status:"open",
            owner: currentUser,
        };

        let allTasks = [];
        const stored = localStorage.getItem('all_tasks_shared');
        if (stored)
        {
        allTasks = JSON.parse(stored);
        }
  
        saveTasks([...allTasks, newTask]);
        setTitle("");
        setDesc("");
        setDue("");
        setPriority("Low");
        setCollab([""]);
    };
    
    return(
    <div style={{ marginBottom: "40px" }}>
      <h2>Create New Task</h2>
      <form onSubmit={createTask}>
        <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required style = {{padding: "8px", borderRadius:"4px", border: "1px solid black"}}
        /><br /><br />
        <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required style = {{padding: "8px", borderRadius:"4px", border: "1px solid black"}}
        ></textarea><br /><br />
        <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        required style = {{padding: "8px", borderRadius:"4px", border: "1px solid black"}}
        /><br /><br />

        <label>Priority: </label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
        required style = {{padding: "8px", borderRadius:"4px", border: "1px solid black"}}
        >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        </select>

        <h3>Collaborators</h3>

        {collab.map((c, index) => (
          <div key={index}>
            <input
            type="text"
            placeholder="Collaborator username"
            value={c}
            onChange={(e) => updateCollaborator(index, e.target.value)}
            style = {{padding: "10px", marginRight:"5px", borderRadius:"4px", border: "1px solid black", marginBottom:"10px"}}
            />
            {index > 0 && (
              <button type="button" onClick={() => removeCollaborator(index)}
              required style = {{padding: "8px", marginRight:"5px", borderRadius:"4px", border: "1px solid black"}}
              >
            Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addCollaborator}>
          + Add Collaborator
        </button>

        <br /><br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
