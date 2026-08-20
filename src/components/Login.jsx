import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Login({
  setCurrentUser,
  switchToSignup,
  switchToTeacherLogin
})
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [loading, setLoading] = useState(false);


  const login = async (e) =>
  {
    e.preventDefault();

    setLoading(true);


    const formattedFirstName =
      firstName.trim();

    const formattedLastName =
      lastName.trim();

    const formattedTeacher =
      teacher.trim().toUpperCase();


    try
    {
      /*
       * Look for the student in the Supabase
       * students table.
       *
       * ilike makes the search ignore capitalization.
       *
       * For example:
       *
       * john
       * JOHN
       * John
       *
       * will all match.
       */
      const { data, error } =
        await supabase
          .from("students")
          .select("*")
          .ilike(
            "first_name",
            formattedFirstName
          )
          .ilike(
            "last_name",
            formattedLastName
          )
          .ilike(
            "teacher",
            formattedTeacher
          )
          .limit(1)
          .single();


      /*
       * If Supabase couldn't find the student,
       * show an error.
       */
      if (error || !data)
      {
        console.error(error);

        alert(
          "Student not found. Please check your name and teacher."
        );

        setLoading(false);
        return;
      }


      /*
       * Convert the Supabase database format
       * into the format the rest of your React
       * application currently uses.
       */
      const loggedInUser =
      {
        id: data.id,

        firstName:
          data.first_name,

        lastName:
          data.last_name,

        teacher:
          data.teacher,

        parentInitials:
          data.parent_initials,

        readingMinutes:
          data.reading_minutes || 0,
      };


      /*
       * Send the student information back to App.jsx.
       */
      setCurrentUser(loggedInUser);
    }
    catch (error)
    {
      console.error(error);

      alert(
        "Something went wrong while logging in."
      );
    }


    setLoading(false);
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

    teacherBtn:
    {
      background: "transparent",
      border: "none",
      color: "#555",
      cursor: "pointer",
      textDecoration: "underline",
      marginTop: "15px",
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
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            style={styles.input}
          />


          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            style={styles.input}
          />


          <input
            type="text"
            placeholder="Teacher Name"
            required
            value={teacher}
            onChange={(e) =>
              setTeacher(e.target.value)
            }
            style={styles.input}
          />


          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>


        <button
          style={styles.switchBtn}
          onClick={switchToSignup}
          disabled={loading}
        >
          Don't have an account? Sign up
        </button>


        <br />


        <button
          style={styles.teacherBtn}
          onClick={switchToTeacherLogin}
          disabled={loading}
        >
          Teacher Sign In
        </button>

      </div>

    </div>
  );
}

export default Login;
