import React from "react";
import {getUserA, getDashboard} from "./taskAnalytics.js";
import TaskList from "./TaskList";
import "./styles/Dashboard.css";

function Dashboard ({tasks,currentUser})
{
    const stats = getDashboard(tasks, currentUser);
    const userStats = getUserA(tasks, currentUser);
    const userTasks = tasks.filter(task =>
        task.assignedTo.some(assignment => (typeof assignment === "string" ? assignment : assignment.username) === currentUser));
    return (
    <div style={{padding: "20px", backgroundColor:"#d8d8d8dc", borderRadius:"20px"}}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <StatCard label="Total Tasks" value={userStats.owned} color="#4A90E2" />
        <StatCard label="Completed" value={userStats.completed} color="#50C878" />
        <StatCard label="Overdue" value={userStats.overdue} color="#E94E4E" />
      </div>
      <div style={{ marginTop: "40px" }}>
        <h2>Upcoming Deadlines</h2>
        {stats.upcoming.length === 0 ? 
        (
          <p>No upcoming tasks 🎉</p>
        ) : (
          <ul>
            {stats.upcoming.map(task => 
            (
              <li key={task.id}>
                <strong>{task.title}</strong> — due{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: "40px" }}>
        <h2>{currentUser}'s Stats</h2>
        <ul>
          <li>Owned Tasks: {userStats.owned}</li>
          <li>Collaborated Tasks: {userStats.collaborated}</li>
          <li>Completed: {userStats.completed}</li>
          <li>Overdue: {userStats.overdue}</li>
        </ul>
      </div>
      <div style={{marginTop: "40px"}}>
        <TaskList
          tasks={userTasks}
          currentUser={currentUser}
          saveTasks={updated => 
          {
            localStorage.setItem("tasks", JSON.stringify(updated));
          }}
        />
      </div>
    </div>
  );
}


const thStyle = 
{
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "8px"
};

const tdStyle = 
{
  borderBottom: "1px solid #eee",
  padding: "8px"
};


function StatCard({ label, value, color }) 
{
  return (
    <div
      style=
      {{
        flex: 1,
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: color,
        color: "white",
        textAlign: "center"
      }}
    >
      <h3>{label}</h3>
      <p style={{fontSize:"24px", margin:0}}>{value}</p>
    </div>
  );
}

export default Dashboard;
