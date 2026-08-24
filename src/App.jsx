import React, { useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";


function App()
{
  const [currentUser, setCurrentUser] =
    useState(null);

  const [page, setPage] =
    useState("login");


  const switchToSignup = () =>
  {
    setPage("signup");
  };


  const switchToLogin = () =>
  {
    setPage("login");
  };


  const switchToTeacherLogin = () =>
  {
    setPage("teacherLogin");
  };


  const switchToStudentLogin = () =>
  {
    setPage("login");
  };


  const switchToTeacherDashboard = () =>
  {
    setPage("teacherDashboard");
  };


  /*
   * Student Home
   */

  if (
    currentUser &&
    page === "home"
  )
  {
    return (
      <Home
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    );
  }


  /*
   * Teacher Dashboard
   */

  if (
    page === "teacherDashboard"
  )
  {
    return (
      <TeacherDashboard
        setCurrentUser={setCurrentUser}
        switchToStudentLogin={
          switchToStudentLogin
        }
      />
    );
  }


  /*
   * Teacher Login
   */

  if (
    page === "teacherLogin"
  )
  {
    return (
      <TeacherLogin
        switchToStudentLogin={
          switchToStudentLogin
        }

        switchToTeacherDashboard={
          switchToTeacherDashboard
        }
      />
    );
  }


  /*
   * Student Signup
   */

  if (
    page === "signup"
  )
  {
    return (
      <Signup
        setCurrentUser={
          (user) =>
          {
            setCurrentUser(user);

            setPage("home");
          }
        }

        switchToLogin={
          switchToLogin
        }
      />
    );
  }


  /*
   * Student Login
   */

  return (
    <Login
      setCurrentUser={
        (user) =>
        {
          setCurrentUser(user);

          setPage("home");
        }
      }

      switchToSignup={
        switchToSignup
      }

      switchToTeacherLogin={
        switchToTeacherLogin
      }
    />
  );
}


export default App;
