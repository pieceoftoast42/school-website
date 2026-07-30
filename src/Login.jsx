import React, { useState } from "react";

function Login({ setCurrentUser, switchToSignup })
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");

  const login = (e) =>
  {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const match = users.find(
      (u) =>
        u.firstName.toLowerCase() === firstName.toLowerCase() &&
        u.lastName.toLowerCase() === lastName.toLowerCase() &&
        u.teacher.toLowerCase() === teacher.toLowerCase()
    );

    if (!match)
    {
      alert("Student not found");
      return;
    }

    setCurrentUser(match);
  };

  const styles =
  {
    authContainer:
    {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
    },
    authCard:
    {
      background: "#ffffff",
      padding: "30px 40px",
      borderRadius: "12px",
      width: "350px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      textAlign: "center",
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
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2>Student Login</h2>

        <form onSubmit={login}>
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Teacher"
            required
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <button style={styles.switchBtn} onClick={switchToSignup}>
          New Student? Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;