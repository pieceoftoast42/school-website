import React, { useEffect, useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";

import { supabase } from "./supabaseClient";


function App()
{
  const [currentUser, setCurrentUser] =
    useState(null);

  const [page, setPage] =
    useState("login");

  const [loading, setLoading] =
    useState(true);



  const loadStudent = async (authUser) =>
  {
    if (!authUser)
    {
      setCurrentUser(null);
      setLoading(false);
      return;
    }


    const { data, error } =
      await supabase
        .from("students")
        .select("*")
        .eq(
          "auth_user_id",
          authUser.id
        )
        .single();


    if (error || !data)
    {
      console.error(error);

      setCurrentUser(null);
      setLoading(false);

      return;
    }


    setCurrentUser({
      id: data.id,

      authUserId:
        authUser.id,

      firstName:
        data.first_name,

      lastName:
        data.last_name,

      teacher:
        data.teacher,

      parentInitials:
        data.parent_initials,

      readingMinutes:
        data.reading_minutes,
    });


    setPage("home");
    setLoading(false);
  };



  useEffect(() =>
  {
    const checkSession = async () =>
    {
      const {
        data: { session }
      } = await supabase.auth.getSession();


      if (session)
      {
        await loadStudent(
          session.user
        );
      }
      else
      {
        setLoading(false);
      }
    };


    checkSession();



    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      async (_event, session) =>
      {
        if (session)
        {
          await loadStudent(
            session.user
          );
        }
        else
        {
          setCurrentUser(null);
        }
      }
    );


    return () =>
    {
      authListener.subscription.unsubscribe();
    };
  }, []);



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



  if (loading)
  {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>
          Loading...
        </h2>
      </div>
    );
  }



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



  if (
    page === "teacherDashboard"
  )
  {
    return (
      <TeacherDashboard
        setCurrentUser={setCurrentUser}
      />
    );
  }



  if (
    page === "teacherLogin"
  )
  {
    return (
      <TeacherLogin
        switchToStudentLogin={
          switchToStudentLogin
        }

        switchToTeacherDashboard={() =>
          setPage("teacherDashboard")
        }
      />
    );
  }



  if (page === "signup")
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
