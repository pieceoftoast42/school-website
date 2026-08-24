import React, {
  useEffect,
  useState
} from "react";

import { supabase } from "../supabaseClient";

import "./Teach.css";


function TeacherDashboard({
  setCurrentUser,
  switchToStudentLogin
})
{
  const [students, setStudents] =
    useState([]);

  const [selectedTeacher, setSelectedTeacher] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);


  /*
   * Load students from Supabase
   */

  const loadStudents = async () =>
  {
    setLoading(true);


    const {
      data,
      error
    } = await supabase
      .from("students")
      .select("*")
      .order(
        "reading_minutes",
        {
          ascending: false
        }
      );


    if (error)
    {
      console.error(error);

      alert(
        "Unable to load the student scoreboard."
      );

      setLoading(false);

      return;
    }


    setStudents(
      data || []
    );

    setLoading(false);
  };


  /*
   * Load students when dashboard opens
   */

  useEffect(() =>
  {
    loadStudents();
  }, []);


  /*
   * Get all available teachers
   */

  const teachers = [
    ...new Set(
      students.map(
        (student) =>
          student.teacher
            ? student.teacher.toUpperCase()
            : ""
      )
    )
  ]
    .filter(Boolean)
    .sort();


  /*
   * Filter students by teacher
   */

  const filteredStudents =
    selectedTeacher === "ALL"
      ? students
      : students.filter(
          (student) =>
            student.teacher &&
            student.teacher.toUpperCase() ===
              selectedTeacher
        );


  /*
   * Delete student
   */

  const deleteStudent = async (
    student
  ) =>
  {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${student.first_name} ${student.last_name}?`
      );


    if (!confirmed)
    {
      return;
    }


    const {
      error
    } = await supabase
      .from("students")
      .delete()
      .eq(
        "id",
        student.id
      );


    if (error)
    {
      console.error(error);

      alert(
        "There was a problem deleting the student."
      );

      return;
    }


    setStudents(
      (currentStudents) =>
        currentStudents.filter(
          (currentStudent) =>
            currentStudent.id !==
            student.id
        )
    );
  };


  /*
   * Teacher logout
   */

  const logout = () =>
  {
    setCurrentUser(null);

    switchToStudentLogin();
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center"
        }}
      >
        Teacher Dashboard
      </h1>


      <h2
        style={{
          textAlign: "center"
        }}
      >
        Reading Scoreboard
      </h2>


      {/* Teacher Filter */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >

        <label>
          Sort by Teacher:
        </label>


        <select
          value={selectedTeacher}
          onChange={(e) =>
            setSelectedTeacher(
              e.target.value
            )
          }
          style={{
            padding: "8px",
            minWidth: "200px",
          }}
        >

          <option value="ALL">
            ALL TEACHERS
          </option>


          {teachers.map(
            (teacher) => (
              <option
                key={teacher}
                value={teacher}
              >
                {teacher}
              </option>
            )
          )}

        </select>

      </div>


      {/* Scoreboard */}

      <div
        style={{
          background: "white",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >

        {loading ? (

          <h3
            style={{
              textAlign: "center"
            }}
          >
            Loading students...
          </h3>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr>

                <th
                  align="left"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  #
                </th>


                <th
                  align="left"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  First Name
                </th>


                <th
                  align="left"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  Last Name
                </th>


                <th
                  align="left"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  Teacher
                </th>


                <th
                  align="right"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  Reading Minutes
                </th>


                <th
                  align="center"
                  style={{
                    padding: "10px",
                    borderBottom:
                      "1px solid #ccc",
                  }}
                >
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length ===
              0 ? (

                <tr>

                  <td
                    colSpan="6"
                    align="center"
                    style={{
                      padding: "20px",
                    }}
                  >
                    No students found.
                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (
                    student,
                    index
                  ) => (

                    <tr
                      key={
                        student.id
                      }
                    >

                      <td
                        style={{
                          padding: "10px",
                        }}
                      >
                        {index + 1}
                      </td>


                      <td
                        style={{
                          padding: "10px",
                        }}
                      >
                        {student.first_name}
                      </td>


                      <td
                        style={{
                          padding: "10px",
                        }}
                      >
                        {student.last_name}
                      </td>


                      <td
                        style={{
                          padding: "10px",
                        }}
                      >
                        {student.teacher
                          ? student.teacher.toUpperCase()
                          : ""}
                      </td>


                      <td
                        align="right"
                        style={{
                          padding: "10px",
                        }}
                      >
                        {
                          student.reading_minutes
                        }
                      </td>


                      <td
                        align="center"
                        style={{
                          padding: "10px",
                        }}
                      >

                        <button
                          onClick={() =>
                            deleteStudent(
                              student
                            )
                          }
                          style={{
                            padding:
                              "6px 12px",
                            cursor:
                              "pointer",
                          }}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        )}

      </div>


      {/* Refresh */}

      <button
        onClick={
          loadStudents
        }
        style={{
          display: "block",
          margin:
            "25px auto 10px",
          padding:
            "10px 25px",
          cursor:
            "pointer",
        }}
      >
        Refresh Scoreboard
      </button>


      {/* Logout */}

      <button
        onClick={logout}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px 40px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

    </div>
  );
}


export default TeacherDashboard;
