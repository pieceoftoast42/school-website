import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup({
  setCurrentUser,
  switchToLogin
})
{
  const [userN, setUserN] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async (e) =>
  {
    e.preventDefault();

    setLoading(true);

    const username = userN.trim();
    const first = firstName.trim();
    const last = lastName.trim();
    const teacherName = teacher.trim().toUpperCase();
    const initials = parentInitials.trim().toUpperCase();

    /*
     * Check whether the username already exists.
     */
    const {
      data: existingUser,
      error: checkError
    } = await supabase
      .from("students")
      .select("id")
      .eq("user_n", username)
      .maybeSingle();

    if (checkError)
    {
      console.error(
        "Username check error:",
        checkError
      );

      alert(
        "There was a problem checking the username."
      );

      setLoading(false);

      return;
    }

    if (existingUser)
    {
      alert(
        "That username is already taken."
      );

      setLoading(false);

      return;
    }

    /*
     * Create the student in Supabase.
     */
    const {
      data,
      error
    } = await supabase
      .from("students")
      .insert([
        {
          user_n: username,

          first_name: first,

          last_name: last,

          teacher: teacherName,

          parent_initials: initials,

          reading_minutes: 0,
        }
      ])
      .select()
      .single();

    if (error)
    {
      console.error(
        "Signup error:",
        error
      );

      alert(
        "There was a problem creating the account."
      );

      setLoading(false);

      return;
    }

    /*
     * Convert the Supabase row into the
     * format the rest of your React app uses.
     */
    const user =
    {
      id: data.id,

      userN: data.user_n,

      firstName: data.first_name,

      lastName: data.last_name,

      teacher: data.teacher,

      parentInitials: data.parent_initials,

      readingMinutes: data.reading_minutes,
    };

    setCurrentUser(user);

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "400px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >

        <h1 style={{ textAlign: "center" }}>
          Student Signup
        </h1>

        <form onSubmit={signup}>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            placeholder="Username"
            value={userN}
            onChange={(e) =>
              setUserN(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            placeholder="Teacher Name"
            value={teacher}
            onChange={(e) =>
              setTeacher(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            placeholder="Parent Initials"
            maxLength="3"
            value={parentInitials}
            onChange={(e) =>
              setParentInitials(
                e.target.value.toUpperCase()
              )
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        <button
          onClick={switchToLogin}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Signup;
