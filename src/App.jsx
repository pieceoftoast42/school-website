import { useState, useEffect } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Load last logged-in student
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
      setCurrentUser(savedUser);
    }

    // Create users array if it doesn't exist
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  // Save logged-in student
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  if (!currentUser) {
    return showLogin ? (
      <Login
        setCurrentUser={setCurrentUser}
        switchToSignup={() => setShowLogin(false)}
      />
    ) : (
      <Signup
        setCurrentUser={setCurrentUser}
        switchToLogin={() => setShowLogin(true)}
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