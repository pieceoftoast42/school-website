import React, { useState } from "react";
import "./styles/LoginSignup.css";

function Signup({ setCurrentUser, switchToLogin }) 
{
  const [userN, setUserN] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => 
  {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.userN === userN);
    if (exists) 
    {
      alert("User already exists");
      return;
    }
    const newUser = {userN, password};
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setCurrentUser(userN);
  };
    const styles = 
    {
      container: 
      {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      },
      card: 
      {
        background: "#ffffff",
        padding: "30px 40px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        textAlign: "center",
      },
      heading: 
      {
        marginBottom: "20px",
        fontSize: "1.6rem",
        color: "#333",
      },
      input: 
      {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1rem",
      },
      button: 
      {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#333",
        color: "white",
        cursor: "pointer",
        marginBottom: "10px",
      },
      buttonHover: 
      {
        backgroundColor: "#1e1e1e",
      },
      switchBtn: 
      {
        background: "transparent",
        border: "none",
        color: "#1e1e1e",
        cursor: "pointer",
        textDecoration: "underline",
        marginTop: "10px",
        fontSize: "0.9rem",
      },
      switchBtnHover: 
      {
        color: "#555",
     },
    };
  return (
  <div style={styles.container}>
      <div style={styles.card}>
      <h2 style={styles.heading}>Create Account</h2>
      <form onSubmit={signup}>
        <input
          type="text"
          placeholder="Username"
          required
          value={userN}
          onChange={(e) => setUserN(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
      <button style={styles.switchBtn} onClick={switchToLogin}>
        Already have an account? Login
      </button>
    </div>
    </div>
  );
}

export default Signup;
