import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup({ setCurrentUser, switchToLogin })
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [loading, setLoading] = useState(false);


  const formatTeacherName = (name) =>
  {
    return name.trim().toUpperCase();
  };


  const signup = async (e) =>
  {
    e.preventDefault();

    setLoading(true);


    const formattedFirstName =
      firstName.trim();

    const formattedLastName =
      lastName.trim();

    const formattedTeacher =
      formatTeacherName(teacher);

    const formattedInitials =
      parentInitials.trim().toUpperCase();


    try
    {
      const { data: existingStudents, error: checkError } =
        await supabase
          .from("students")
          .select("*")
          .ilike("first_name", formattedFirstName)
          .ilike("last_name", formattedLastName)
          .ilike("teacher", formattedTeacher);


      if (checkError)
      {
        console.error(checkError);
        alert(
          "There was a problem checking for the student."
        );
        setLoading(false);
        return;
      }


      if (
        existingStudents &&
        existingStudents.length > 0
      )
      {
        alert("Student already exists.");
        setLoading(false);
        return;
      }


      const { data, error } =
        await supabase
          .from("students")
          .insert([
            {
              first_name: formattedFirstName,
              last_name: formattedLastName,
              teacher: formattedTeacher,
              parent_initials: formattedInitials,
              reading_minutes: 0,
            },
          ])
          .select()
          .single();


      if (error)
      {
        console.error(error);

        alert(
          "There was a problem creating the student account."
        );

        setLoading(false);
        return;
      }


      const newCurrentUser =
      {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        teacher: data.teacher,
        parentInitials: data.parent_initials,
        readingMinutes: data.reading_minutes,
      };


      setCurrentUser(newCurrentUser);


      setFirstName("");
      setLastName("");
      setTeacher("");
      setParentInitials("");
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
          Create Student
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
