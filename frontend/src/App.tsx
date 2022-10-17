import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");

  AOS.init();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home
                user={user}
                userID={userID}
                setIsLoggedIn={setIsLoggedIn}
                setUserID={setUserID}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserID={setUserID}
              setUser={setUser}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
