import React, { useState } from "react";

function TeacherLogin({
  switchToStudentLogin,
  switchToTeacherDashboard
})
{
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const login = (e) =>
  {
    e.preventDefault();

    const teacherPassword =
      "sparkylearning6138";


    if (password === teacherPassword)
    {
      setError("");
      setPassword("");

      switchToTeacherDashboard();
    }
    else
    {
      setError(
        "Incorrect teacher password."
      );

      setPassword("");
    }
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
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.15)",
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
      boxSizing: "border-box",
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

    backButton:
    {
      background: "transparent",
      border: "none",
      color: "#1e1e1e",
      cursor: "pointer",
      textDecoration: "underline",
      marginTop: "10px",
      fontSize: "0.9rem",
    },

    error:
    {
      color: "red",
      marginBottom: "15px",
    },
  };


  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2>
          Teacher Sign In
        </h2>


        <form onSubmit={login}>

          <input
            type="password"
            placeholder="Teacher Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />


          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}


          <button
            type="submit"
            style={styles.button}
          >
            Sign In
          </button>

        </form>


        <button
          type="button"
          style={styles.backButton}
          onClick={switchToStudentLogin}
        >
          Back to Student Login
        </button>

      </div>

    </div>
  );
}

export default TeacherLogin;
