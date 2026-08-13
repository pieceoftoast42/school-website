import { useState, useEffect } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";

function App()
{
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Teacher states
  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
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


  // Teacher has successfully entered the password
  if (teacherLoggedIn)
  {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center"
        }}
      >
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


  // Show the teacher password page
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


  // Student login/signup
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
        switchToTeacherLogin={() => setShowTeacherLogin(true)}
      />
    );
  }


  // Student home page
  return (
    <Home
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default App;
