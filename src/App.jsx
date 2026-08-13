import { useState, useEffect } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";

function App()
{
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);

  useEffect(() =>
  {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser)
    {
      setCurrentUser(savedUser);
    }

    if (!localStorage.getItem("users"))
    {
      localStorage.setItem("users", JSON.stringify([]));
    }
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

  if (teacherLoggedIn)
  {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Teacher Dashboard</h1>

        <p>
          Teacher successfully signed in.
        </p>

        <button
          onClick={() => setTeacherLoggedIn(false)}
        >
          Logout
        </button>
      </div>
    );
  }

  if (!currentUser)
  {
    if (!showLogin)
    {
      return (
        <Signup
          setCurrentUser={setCurrentUser}
          switchToLogin={() => setShowLogin(true)}
        />
      );
    }

    return (
      <Login
        setCurrentUser={setCurrentUser}
        switchToSignup={() => setShowLogin(false)}
        switchToTeacherLogin={() => setTeacherLoggedIn("login")}
      />
    );
  }

  return (
    <Home
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default App;
