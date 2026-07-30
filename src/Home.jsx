import React, { useState } from "react";

function Home({ currentUser, setCurrentUser })
{
  const [minutes, setMinutes] = useState("");

  const addMinutes = () =>
  {
    const amount = parseInt(minutes);

    if (isNaN(amount) || amount <= 0)
    {
      alert("Please enter a valid number of minutes.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
    {
      if (
        user.firstName === currentUser.firstName &&
        user.lastName === currentUser.lastName &&
        user.teacher === currentUser.teacher
      )
      {
        return {
          ...user,
          readingMinutes: user.readingMinutes + amount,
        };
      }

      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCurrentUser = {
      ...currentUser,
      readingMinutes: currentUser.readingMinutes + amount,
    };

    setCurrentUser(updatedCurrentUser);

    setMinutes("");
  };

  const logout = () =>
  {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const styles =
  {
    container:
    {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    card:
    {
      backgroundColor: "white",
      width: "500px",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      textAlign: "center",
    },

    title:
    {
      marginBottom: "25px",
    },

    input:
    {
      width: "100%",
      padding: "10px",
      marginTop: "15px",
      marginBottom: "15px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },

    button:
    {
      width: "100%",
      padding: "10px",
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "10px",
    },

    logout:
    {
      width: "100%",
      padding: "10px",
      backgroundColor: "#c0392b",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          Rooted in Learning:
          <br />
          Growing Minds, Growing Futures
        </h1>

        <h2>
          Welcome {currentUser.firstName} {currentUser.lastName}!
        </h2>

        <h3>
          Teacher: {currentUser.teacher}
        </h3>

        <hr />

        <h2>
          Total Reading Minutes
        </h2>

        <h1>{currentUser.readingMinutes}</h1>

        <input
          type="number"
          min="1"
          placeholder="Enter reading minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={addMinutes}
          style={styles.button}
        >
          Add Minutes
        </button>

        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Home;