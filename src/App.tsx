import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
