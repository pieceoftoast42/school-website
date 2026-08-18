import React, { useState, useEffect } from "react";

function Home({ currentUser, setCurrentUser })
{
  const [minutes, setMinutes] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const loadLeaderboard = () =>
  {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.sort((a, b) => b.readingMinutes - a.readingMinutes);

    setLeaderboard(users);
  };

  useEffect(() =>
  {
    loadLeaderboard();
  }, []);

  const addMinutes = () =>
  {
    const amount = parseInt(minutes);

    if (isNaN(amount) || amount <= 0)
    {
      alert("Please enter a valid number of minutes.");
      return;
    }

    if (
      parentInitials.toUpperCase() !==
      currentUser.parentInitials.toUpperCase()
    )
    {
      alert("Incorrect parent initials.");
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

    const updatedCurrentUser =
    {
      ...currentUser,
      readingMinutes: currentUser.readingMinutes + amount,
    };

    setCurrentUser(updatedCurrentUser);

    setMinutes("");
    setParentInitials("");

    loadLeaderboard();
  };

  const logout = () =>
  {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Rooted in Learning:
        <br />
        Growing Minds, Growing Futures
      </h1>

      <h2 style={{ textAlign: "center" }}>
        Welcome {currentUser.firstName} {currentUser.lastName}
      </h2>

      <h3 style={{ textAlign: "center" }}>
    Teacher:{" "}
    {currentUser.teacher
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
    )}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "50px",
          marginTop: "40px",
        }}
      >
        {/* Reading Minutes Card */}
        <div
          style={{
            background: "white",
            padding: "30px",
            width: "300px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Your Reading Minutes
          </h2>

          <h1 style={{ textAlign: "center" }}>
            {currentUser.readingMinutes}
          </h1>

          <input
            type="number"
            placeholder="Minutes Read"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <input
            type="text"
            placeholder="Parent Initials"
            maxLength="3"
            value={parentInitials}
            onChange={(e) =>
              setParentInitials(e.target.value.toUpperCase())
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={addMinutes}
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Add Minutes
          </button>
        </div>

        {/* Leaderboard */}
        <div
          style={{
            background: "white",
            padding: "30px",
            width: "400px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Reading Leaderboard
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left">#</th>
                <th align="left">Student</th>
                <th align="left">Teacher</th>
                <th align="right">Minutes</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{student.firstName}</td>

                  <td>{student.teacher}</td>

                  <td align="right">
                    {student.readingMinutes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={logout}
        style={{
          display: "block",
          margin: "40px auto",
          padding: "10px 40px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
