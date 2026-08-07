import React, { useState } from "react";

function Signup({ setCurrentUser, switchToLogin })
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [parentInitials, setParentInitials] = useState("");

  const signup = (e) =>
  {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) =>
        u.firstName.toLowerCase() === firstName.toLowerCase() &&
        u.lastName.toLowerCase() === lastName.toLowerCase() &&
        u.teacher.toLowerCase() === teacher.toLowerCase()
    );

    if (exists)
    {
      alert("Student already exists");
      return;
    }

    const newStudent =
    {
      firstName,
      lastName,
      teacher,
      parentInitials: parentInitials.toUpperCase(),
      readingMinutes: 0
    };

    users.push(newStudent);

    localStorage.setItem("users", JSON.stringify(users));

    setCurrentUser(newStudent);
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Student</h2>

        <form onSubmit={signup}>

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

          <input
            type="text"
            placeholder="Parent Initials"
            required
            maxLength="3"
            value={parentInitials}
            onChange={(e) =>
              setParentInitials(e.target.value.toUpperCase())
            }
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Sign Up
          </button>

        </form>

        <button
          style={styles.switchBtn}
          onClick={switchToLogin}
        >
          Already Registered? Login
        </button>

      </div>
    </div>
  );
}

export default Signup;
