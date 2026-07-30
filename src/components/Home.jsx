import React, { useState, useEffect } from "react";

function Home({ currentUser, setCurrentUser })
{
  const [minutes, setMinutes] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const loadLeaderboard = () =>
  {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const sortedUsers = users.sort(
      (a, b) => b.readingMinutes - a.readingMinutes
    );

    setLeaderboard(sortedUsers);
  };


  useEffect(() =>
  {
    loadLeaderboard();
  }, []);


  const addMinutes = () =>
  {
    const amount = parseInt(minutes);

    if (isNaN(amount) || amount <= 0)
    {
      alert("Please enter a valid number of minutes.");
      return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];


    const updatedUsers = users.map((user) =>
    {
      if (
        user.firstName === currentUser.firstName &&
        user.lastName === currentUser.lastName &&
        user.teacher === currentUser.teacher
      )
      {
        return {
          ...user,
          readingMinutes: user.readingMinutes + amount
        };
      }

      return user;
    });


    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    const updatedCurrentUser =
    {
      ...currentUser,
      readingMinutes: currentUser.readingMinutes + amount
    };


    setCurrentUser(updatedCurrentUser);

    setMinutes("");

    loadLeaderboard();
  };


  const logout = () =>
  {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };


  return (
    <div style={{
      minHeight:"100vh",
      backgroundColor:"#f5f5f5",
      padding:"40px"
    }}>

      <h1 style={{textAlign:"center"}}>
        Rooted in Learning:
        <br/>
        Growing Minds, Growing Futures
      </h1>


      <h2 style={{textAlign:"center"}}>
        Welcome {currentUser.firstName} {currentUser.lastName}
      </h2>

      <h3 style={{textAlign:"center"}}>
        Teacher: {currentUser.teacher}
      </h3>



      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"50px",
        marginTop:"40px"
      }}>


        {/* Reading Entry */}
        <div style={{
          background:"white",
          padding:"30px",
          width:"300px",
          borderRadius:"12px",
          textAlign:"center"
        }}>

          <h2>
            Your Reading Minutes
          </h2>

          <h1>
            {currentUser.readingMinutes}
          </h1>


          <input
            type="number"
            placeholder="Minutes read"
            value={minutes}
            onChange={(e)=>setMinutes(e.target.value)}
            style={{
              width:"90%",
              padding:"10px"
            }}
          />


          <button
            onClick={addMinutes}
            style={{
              width:"100%",
              marginTop:"15px",
              padding:"10px"
            }}
          >
            Add Minutes
          </button>

        </div>



        {/* Leaderboard */}
        <div style={{
          background:"white",
          padding:"30px",
          width:"400px",
          borderRadius:"12px"
        }}>

          <h2 style={{textAlign:"center"}}>
            Leaderboard
          </h2>


          {leaderboard.map((student,index)=>(

            <div
              key={index}
              style={{
                padding:"10px",
                borderBottom:"1px solid #ddd"
              }}
            >

              <strong>
                {index + 1}. {student.firstName}
              </strong>

              <br/>

              Teacher:
              {" "}
              {student.teacher}

              <br/>

              Minutes:
              {" "}
              {student.readingMinutes}

            </div>

          ))}

        </div>


      </div>



      <button
        onClick={logout}
        style={{
          display:"block",
          margin:"40px auto",
          padding:"10px 40px"
        }}
      >
        Logout
      </button>


    </div>
  );
}


export default Home;
