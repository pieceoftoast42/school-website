import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup({ setCurrentUser, switchToLogin })
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [password, setPassword] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [loading, setLoading] = useState(false);


  const signup = async (e) =>
  {
    e.preventDefault();

    setLoading(true);


    const cleanFirstName =
      firstName.trim();

    const cleanLastName =
      lastName.trim();

    const cleanTeacher =
      teacher.trim().toUpperCase();

    const cleanInitials =
      parentInitials.trim().toUpperCase();



    const internalEmail =
      `${cleanFirstName.toLowerCase()}.${cleanLastName.toLowerCase()}@students.rootedinlearning.local`;


    try
    {

      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: internalEmail,
          password: password,
        });


      if (authError)
      {
        console.error(authError);

        alert(authError.message);

        setLoading(false);

        return;
      }



      if (!authData.user)
      {
        alert(
          "Account could not be created."
        );

        setLoading(false);

        return;
      }



      const { data: studentData, error: studentError } =
        await supabase
          .from("students")
          .insert([
            {
              auth_user_id: authData.user.id,
              first_name: cleanFirstName,
              last_name: cleanLastName,
              teacher: cleanTeacher,
              parent_initials: cleanInitials,
              reading_minutes: 0,
            },
          ])
          .select()
          .single();


      if (studentError)
      {
        console.error(studentError);


        await supabase.auth.signOut();

        alert(
          "Account was created, but the student profile could not be saved."
        );

        setLoading(false);

        return;
      }



      const newCurrentUser =
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
        newCurrentUser
      );
    }
    catch (error)
    {
      console.error(error);

      alert(
        "Something went wrong while creating the account."
      );
    }


    setLoading(false);
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
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.15)",
      textAlign: "center",
    },

    heading:
    {
      marginBottom: "20px",
      fontSize: "1.6rem",
      color: "#333",
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
  };


  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.heading}>
          Create Account
        </h2>


        <form onSubmit={signup}>

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


          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
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
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>


        <button
          style={styles.switchBtn}
          onClick={switchToLogin}
          disabled={loading}
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  );
}

export default Signup;
