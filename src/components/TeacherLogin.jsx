import React, { useState } from "react";

function TeacherLogin({ setTeacherLoggedIn, switchToStudentLogin })
{
  const [password, setPassword] = useState("");

  const teacherLogin = (e) =>
  {
    e.preventDefault();

    if (password === "sparkylearning6138")
    {
      setTeacherLoggedIn(true);
    }
    else
    {
      alert("Incorrect teacher password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px 40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >

        <h2>Teacher Sign In</h2>

        <form onSubmit={teacherLogin}>

          <input
            type="password"
            placeholder="Teacher Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#333",
              color: "white",
              cursor: "pointer",
            }}
          >
            Teacher Sign In
          </button>

        </form>

        <button
          onClick={switchToStudentLogin}
          style={{
            background: "transparent",
            border: "none",
            color: "#1e1e1e",
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: "15px",
          }}
        >
          Back to Student Login
        </button>

      </div>

    </div>
  );
}

export default TeacherLogin;
