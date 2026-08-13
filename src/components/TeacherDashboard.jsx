import React, { useState } from "react";

function TeacherDashboard({ setTeacherLoggedIn })
{
  const [selectedTeacher, setSelectedTeacher] = useState("All");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const teachers = [
    ...new Set(users.map((student) => student.teacher))
  ].sort();

  const filteredStudents =
    selectedTeacher === "All"
      ? users
      : users.filter(
          (student) => student.teacher === selectedTeacher
        );

  const sortedStudents = [...filteredStudents].sort(
    (a, b) => b.readingMinutes - a.readingMinutes
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Teacher Dashboard
      </h1>

      <h2 style={{ textAlign: "center" }}>
        Reading Scoreboard
      </h2>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "400px",
          margin: "30px auto",
          textAlign: "center",
        }}
      >
        <label>
          <strong>Sort by Teacher:</strong>
        </label>

        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            fontSize: "1rem",
          }}
        >
          <option value="All">
            All Teachers
          </option>

          {teachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          background: "white",
          padding: "30px",
          maxWidth: "800px",
          margin: "0 auto",
          borderRadius: "12px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Teacher</th>
              <th>Reading Minutes</th>
            </tr>
          </thead>

          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  {student.firstName} {student.lastName}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  {student.teacher}
                </td>

                <td
                  style={{
                    padding: "12px",
                    borderTop: "1px solid #ddd",
                    textAlign: "right",
                  }}
                >
                  {student.readingMinutes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedStudents.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No students found.
          </p>
        )}
      </div>

      <button
        onClick={() => setTeacherLoggedIn(false)}
        style={{
          display: "block",
          margin: "30px auto",
          padding: "10px 40px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TeacherDashboard;
