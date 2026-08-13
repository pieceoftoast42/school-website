import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";

function App()
{
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const [showTeacherLogin, setShowTeacherLogin] = useState(false);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);

  useEffect(() =>
  {
    const savedUser =
      JSON.parse(localStorage.getItem("currentUser"));

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


  // Teacher Dashboard
  if (teacherLoggedIn)
  {
    return (
      <TeacherDashboard
        setTeacherLoggedIn={setTeacherLoggedIn}
      />
    );
  }


  // Teacher Password Login
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


  // Student Login / Signup
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


  // Student Home
  return (
    <Home
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
}

export default App;
