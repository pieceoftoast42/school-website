import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Home({ currentUser, setCurrentUser })
{
  const [minutes, setMinutes] = useState("");
  const [parentInitials, setParentInitials] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);



  const loadLeaderboard = async () =>
  {
    const { data, error } =
      await supabase
        .from("students")
        .select("*")
        .order("reading_minutes", {
          ascending: false
        });


    if (error)
    {
      console.error(error);

      alert(
        "Unable to load the reading leaderboard."
      );

      return;
    }


    setLeaderboard(data || []);
  };


  useEffect(() =>
  {
    loadLeaderboard();
  }, []);



  const updateMinutes = async (amount) =>
  {
    if (!currentUser)
    {
      return;
    }


    if (
      isNaN(amount) ||
      amount === 0
    )
    {
      alert(
        "Please enter a valid number of minutes."
      );

      return;
    }


 
    if (
      parentInitials.trim().toUpperCase() !==
      currentUser.parentInitials
        .trim()
        .toUpperCase()
    )
    {
      alert("Incorrect parent initials.");

      return;
    }


    setLoading(true);


    try
    {

      const newTotal =
        Math.max(
          0,
          currentUser.readingMinutes + amount
        );



      const { data, error } =
        await supabase
          .from("students")
          .update({
            reading_minutes: newTotal
          })
          .eq("id", currentUser.id)
          .select()
          .single();


      if (error)
      {
        console.error(error);

        alert(
          "There was a problem updating your reading minutes."
        );

        setLoading(false);

        return;
      }



      const updatedCurrentUser =
      {
        ...currentUser,

        readingMinutes:
          data.reading_minutes,
      };


      setCurrentUser(
        updatedCurrentUser
      );



      setMinutes("");
      setParentInitials("");



      await loadLeaderboard();
    }
    catch (error)
    {
      console.error(error);

      alert(
        "Something went wrong while updating your minutes."
      );
    }


    setLoading(false);
  };



  const addMinutes = () =>
  {
    const amount =
      parseInt(minutes);


    if (
      isNaN(amount) ||
      amount <= 0
    )
    {
      alert(
        "Please enter a positive number of minutes."
      );

      return;
    }


    updateMinutes(amount);
  };



  const subtractMinutes = () =>
  {
    const amount =
      parseInt(minutes);


    if (
      isNaN(amount) ||
      amount <= 0
    )
    {
      alert(
        "Please enter a positive number of minutes."
      );

      return;
    }



    updateMinutes(-amount);
  };



  const logout = () =>
  {
    setCurrentUser(null);
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center"
        }}
      >
        Rooted in Learning:
        <br />
        Growing Minds, Growing Futures
      </h1>


      <h2
        style={{
          textAlign: "center"
        }}
      >
        Welcome {currentUser.firstName}{" "}
        {currentUser.lastName}
      </h2>


      <h3
        style={{
          textAlign: "center"
        }}
      >
        Teacher:{" "}
        {currentUser.teacher.toUpperCase()}
      </h3>


      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "50px",
          marginTop: "40px",
        }}
      >

        {/* =========================
            READING MINUTES CARD
        ========================== */}

        <div
          style={{
            background: "white",
            padding: "30px",
            width: "300px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >

          <h2
            style={{
              textAlign: "center"
            }}
          >
            Your Reading Minutes
          </h2>


          <h1
            style={{
              textAlign: "center"
            }}
          >
            {currentUser.readingMinutes}
          </h1>


          <input
            type="number"
            min="1"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) =>
              setMinutes(e.target.value)
            }
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
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />


          <button
            onClick={addMinutes}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {loading
              ? "Updating..."
              : "Add Minutes"}
          </button>


          <button
            onClick={subtractMinutes}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Updating..."
              : "Subtract Minutes"}
          </button>

        </div>


        {/* =========================
            LEADERBOARD
        ========================== */}

        <div
          style={{
            background: "white",
            padding: "30px",
            width: "400px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >

          <h2
            style={{
              textAlign: "center"
            }}
          >
            Reading Leaderboard
          </h2>


          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr>

                <th align="left">
                  #
                </th>

                <th align="left">
                  Student
                </th>

                <th align="left">
                  Teacher
                </th>

                <th align="right">
                  Minutes
                </th>

              </tr>

            </thead>


            <tbody>

              {leaderboard.map(
                (student, index) => (

                  <tr key={student.id}>

                    <td>
                      {index + 1}
                    </td>


                    <td>
                      {student.first_name}
                    </td>


                    <td>
                      {student.teacher.toUpperCase()}
                    </td>


                    <td align="right">
                      {student.reading_minutes}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          LOGOUT
      ========================== */}

      <button
        onClick={logout}
        style={{
          display: "block",
          margin: "40px auto",
          padding: "10px 40px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

    </div>
  );
}


export default Home;
