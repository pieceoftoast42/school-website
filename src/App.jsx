import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";

function App()
{
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("All");

  useEffect(() =>
  {
    const savedUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (savedUser)
    {
      setCurrentUser(savedUser);
    }

    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(savedUsers);
  }, []);

  useEffect(() =>
  {
    if (currentUser)
    {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    }
    else
    {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);


  /*
   * TEACHER DASHBOARD
   */
  if (teacherLoggedIn)
  {
    const allUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    // Get unique teacher names
    const teachers = [
      ...new Set(
        allUsers.map((student) => student.teacher)
      )
    ].sort();

    // Filter students based on selected teacher
    const filteredStudents =
      selectedTeacher === "All"
        ? allUsers
        : allUsers.filter(
            (student) =>
              student.teacher === selectedTeacher
          );

    // Sort highest minutes first
    const sortedStudents = [...filteredStudents].sort(
      (a, b) =>
        b.readingMinutes - a.readingMinutes
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


        {/* Teacher Filter */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            width: "400px",
            margin: "30px auto",
            textAlign: "center",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.15)",
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
              setSelectedTeacher(e.target.value)
            }
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
              <option
                key={teacher}
                value={teacher}
              >
                {teacher}
              </option>
            ))}

          </select>

        </div>


        {/* Scoreboard */}
        <div
          style={{
            background: "white",
            padding: "30px",
            maxWidth: "800px",
            margin: "0 auto",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.15)",
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
                  }}
                >
                  #
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Student
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Teacher
                </th>

                <th
                  style={{
                    padding: "12px",
                    textAlign: "right",
                  }}
                >
                  Reading Minutes
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
                        borderTop:
                          "1px solid #ddd",
                      }}
                    >
                      {index + 1}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderTop:
                          "1px solid #ddd",
                      }}
                    >
                      {student.firstName}{" "}
                      {student.lastName}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderTop:
                          "1px solid #ddd",
                      }}
                    >
                      {student.teacher}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        borderTop:
                          "1px solid #ddd",
                        textAlign: "right",
                        fontWeight: "bold",
                      }}
                    >
                      {student.readingMinutes}
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


        {/* Teacher Logout */}
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
          }}
        >
          Logout
        </button>

      </div>
    );
  }


  /*
   * TEACHER PASSWORD LOGIN
   */
  if (showTeacherLogin)
  {
    return (
      <TeacherLogin
        setTeacherLoggedIn={setTeacherLoggedIn}
        switchToStudentLogin={() =>
        {
          setShowTeacherLogin(false);
          setShowLogin(true);
        }}
      />
    );
  }


  /*
   * STUDENT LOGIN / SIGNUP
   */
  if (!currentUser)
  {
    if (!showLogin)
    {
      return (
        <Signup
          setCurrentUser={setCurrentUser}
          switchToLogin={() =>
            setShowLogin(true)
          }
        />
      );
    }

    return (
      <Login
        setCurrentUser={setCurrentUser}
        switchToSignup={() =>
          setShowLogin(false)
        }
        switchToTeacherLogin={() =>
          setShowTeacherLogin(true)
        }
      />
    );
  }


  /*
   * STUDENT HOME PAGE
   */
  return (
    <Home
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default App;
