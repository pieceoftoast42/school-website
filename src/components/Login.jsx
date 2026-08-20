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
  const [password, setPassword] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [loading, setLoading] = useState(false);


  const login = async (e) =>
  {
    e.preventDefault();

    setLoading(true);


    const cleanFirstName =
      firstName.trim();

    const cleanLastName =
      lastName.trim();

    const cleanInitials =
      parentInitials.trim().toUpperCase();



    const internalEmail =
      `${cleanFirstName.toLowerCase()}.${cleanLastName.toLowerCase()}@students.rootedinlearning.local`;


    try
    {

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: internalEmail,
          password: password,
        });


      if (authError)
      {
        console.error(authError);

        alert(
          "Invalid name or password."
        );

        setLoading(false);

        return;
      }



      const { data: studentData, error: studentError } =
        await supabase
          .from("students")
          .select("*")
          .eq(
            "auth_user_id",
            authData.user.id
          )
          .single();


      if (studentError || !studentData)
      {
        console.error(studentError);

        alert(
          "Student profile could not be found."
        );

        await supabase.auth.signOut();

        setLoading(false);

        return;
      }



      if (
        cleanInitials !==
        studentData.parent_initials
          .trim()
          .toUpperCase()
      )
      {
        alert(
          "Incorrect parent initials."
        );

        await supabase.auth.signOut();

        setLoading(false);

        return;
      }



      const loggedInUser =
      {
        id: studentData.id,

        authUserId:
          authData.user.id,

        firstName:
          studentData.first_name,

        lastName:
          studentData.last_name,

        teacher:
          studentData.teacher,

        parentInitials:
          studentData.parent_initials,

        readingMinutes:
          studentData.reading_minutes,
      };


      setCurrentUser(
        loggedInUser
      );
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

        <h2>
          Student Login
        </h2>


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
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />


          <input
            type="text"
            placeholder="Parent Initials"
            required
            maxLength="3"
            value={parentInitials}
            onChange={(e) =>
              setParentInitials(
                e.target.value.toUpperCase()
              )
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
