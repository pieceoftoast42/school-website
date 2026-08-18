import React, { useState } from "react";

function TeacherDashboard({ setTeacherLoggedIn })
{
  const [selectedTeacher, setSelectedTeacher] =
    useState("All");

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );


  /*
   * Create a unique list of teachers.
   * Capitalization is ignored.
   */
  const teacherMap = {};

  users.forEach((student) =>
  {
    if (!student.teacher)
    {
      return;
    }

    const teacherName =
      student.teacher.trim();

    const teacherKey =
      teacherName.toLowerCase();

    if (!teacherMap[teacherKey])
    {
      teacherMap[teacherKey] =
        teacherName;
    }
  });


  const teachers =
    Object.values(teacherMap).sort(
      (a, b) =>
        a.toLowerCase().localeCompare(
          b.toLowerCase()
        )
    );


  /*
   * Filter students by teacher.
   */
  const filteredStudents =
    selectedTeacher === "All"
      ? users
      : users.filter(
          (student) =>
            student.teacher &&
            student.teacher
              .trim()
              .toLowerCase() ===
              selectedTeacher
                .trim()
                .toLowerCase()
        );


  /*
   * Sort highest minutes first.
   */
  const sortedStudents =
    [...filteredStudents].sort(
      (a, b) =>
        (b.readingMinutes || 0) -
        (a.readingMinutes || 0)
    );


  /*
   * Delete a student.
   */
  const deleteStudent = (studentToDelete) =>
  {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${studentToDelete.firstName} ${studentToDelete.lastName}?`
    );


    if (!confirmDelete)
    {
      return;
    }


    const updatedUsers = users.filter(
      (student) =>
        !(
          student.firstName ===
            studentToDelete.firstName &&
          student.lastName ===
            studentToDelete.lastName &&
          student.teacher
            .trim()
            .toLowerCase() ===
            studentToDelete.teacher
              .trim()
              .toLowerCase()
        )
    );


    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    setUsers(updatedUsers);
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Teacher Dashboard
      </h1>


      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Reading Scoreboard
      </h2>



      {/* Teacher Dropdown */}

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "400px",
          maxWidth: "90%",
          margin: "0 auto 30px auto",
          textAlign: "center",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.15)",
          boxSizing: "border-box",
        }}
      >

        <label>
          <strong>
            Sort by Teacher:
          </strong>
        </label>


        <br />


        <select
          value={selectedTeacher}
          onChange={(e) =>
            setSelectedTeacher(
              e.target.value
            )
          }
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        >

          <option value="All">
            ALL TEACHERS
          </option>


          {teachers.map((teacher) => (

            <option
              key={teacher}
              value={teacher}
            >
              {teacher.toUpperCase()}
            </option>

          ))}

        </select>

      </div>



      {/* Scoreboard */}

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.15)",
          overflowX: "auto",
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

              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom:
                    "2px solid #ddd",
                }}
              >
                #
              </th>


              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom:
                    "2px solid #ddd",
                }}
              >
                Student
              </th>


              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom:
                    "2px solid #ddd",
                }}
              >
                Teacher
              </th>


              <th
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom:
                    "2px solid #ddd",
                }}
              >
                Reading Minutes
              </th>


              <th
                style={{
                  padding: "12px",
                  textAlign: "center",
                  borderBottom:
                    "2px solid #ddd",
                }}
              >
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {sortedStudents.map(
              (student, index) => (

                <tr key={index}>

                  <td
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {index + 1}
                  </td>


                  <td
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {student.firstName}{" "}
                    {student.lastName}
                  </td>


                  <td
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {student.teacher
                      ? student.teacher.toUpperCase()
                      : "UNKNOWN"}
                  </td>


                  <td
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    {student.readingMinutes || 0}
                  </td>


                  <td
                    style={{
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >

                    <button
                      onClick={() =>
                        deleteStudent(student)
                      }
                      style={{
                        padding:
                          "6px 12px",
                        cursor: "pointer",
                        backgroundColor:
                          "#d9534f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>


        {sortedStudents.length === 0 && (

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            No students found.
          </p>

        )}

      </div>



      {/* Logout */}

      <button
        onClick={() =>
        {
          setTeacherLoggedIn(false);
          setSelectedTeacher("All");
        }}
        style={{
          display: "block",
          margin: "30px auto",
          padding: "10px 40px",
          cursor: "pointer",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#333",
          color: "white",
          fontSize: "1rem",
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default TeacherDashboard;
