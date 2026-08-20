import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Login({
  setCurrentUser,
  switchToSignup,
  switchToTeacherLogin
})
{
  const [userN, setUserN] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) =>
  {
    e.preventDefault();

    setLoading(true);

    const username = userN.trim();
    const initials = parentInitials.trim().toUpperCase();

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("user_n", username)
      .eq("parent_initials", initials)
      .maybeSingle();

    if (error)
    {
      console.error("Login error:", error);

      alert("There was a problem logging in.");
      setLoading(false);

      return;
    }

    if (!data)
    {
      alert("Incorrect username or parent initials.");
      setLoading(false);

      return;
    }

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
          width: "350px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Rooted in Learning
        </h1>

        <h2 style={{ textAlign: "center" }}>
          Student Login
        </h2>

        <form onSubmit={login}>

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
              marginBottom: "15px",
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
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <button
          onClick={switchToSignup}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Create Student Account
        </button>

        <button
          onClick={switchToTeacherLogin}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Teacher Sign In
        </button>

      </div>
    </div>
  );
}

export default Login;
