import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import './styles/general.css';

function App() 
{
const [currentUser, setCurrentUser] = useState(null);
const [mode, setMode] = useState("login");
const [tasks, setTasks] = useState([]);
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
if (currentUser) 
{
const saved = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
setTasks(saved);
}
}, [currentUser]);

const saveTasks = (updated) => 
{
setTasks(updated);
if (currentUser) 
{
localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(updated));
}
};

const logout = () => 
{
  setCurrentUser(null);
  Navigate("/login")
}

if (!currentUser) {
return mode === "login" ? (
<Login setCurrentUser={setCurrentUser} switchToSignup={() => setMode("signup")} />
) : (
<Signup setCurrentUser={setCurrentUser} switchToLogin={() => setMode("login")} />
);
}

return ( 
<Router>
<div style={{ display: "flex", height: "100vh" }}>
<div
style={{
background: "#1e1e1e",
color: "white",
width: isOpen ? "200px" : "60px",
overflow: "hidden",
paddingTop: "20px",
}}
>
<button
style={{
width: "100%",
background: "#333",
color: "white",
border: "none",
padding: "10px",
cursor: "pointer",
}}
onClick={() => setIsOpen(!isOpen)}
>
{isOpen ? "←" : "→"} 
  </button>
      <div style={{ padding: "10px", marginTop: "20px" }}>
        <p>Logged in as:</p>
        <strong>{currentUser}</strong>
      </div>

      <button
        style={{
          width: "100%",
          background: "#333",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={logout}
      >
        Logout
      </button>

      <nav style={{ padding: "10px", marginTop: "20px" }}>
        <Link
          to="/"
          style={{ color: "white", display: "block", marginBottom: "20px" }}
        >
          {isOpen ? "Dashboard" : ""}
        </Link>
        <Link
          to="/taskform"
          style={{ color: "white", display: "block", marginBottom: "10px" }}
        >
          {isOpen ? "Create Task" : ""}
        </Link>
      </nav>
    </div>
    <div style={{ flexGrow:1, padding: "20px", overflowY: "auto" }}>
      <h1>PinTask</h1>
      <Routes>
        <Route
          path="/taskform"
          element={
            <>
              <TaskForm tasks={tasks} saveTasks={saveTasks} currentUser = {currentUser}/>
              <TaskList tasks={tasks} saveTasks={saveTasks} />
            </>
          }
        />
        <Route path="/" element={<Dashboard tasks={tasks} />} />
      </Routes>
    </div>
  </div>
</Router>
);
}

export default App;
