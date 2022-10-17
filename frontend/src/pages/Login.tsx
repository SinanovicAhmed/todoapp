import LoginSidebar from "../components/LoginSidebar";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { isGeneratorFunction } from "util/types";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
const paragraph =
  "Welcome to ToDo app. If you dont have account you can create one bellow!";

const Login = ({ setIsLoggedIn, setUserID, setUser }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseMsg = await response.json();
    console.log(responseMsg);
    if (responseMsg.status === "succesfull") {
      setIsLoggedIn(true);
      setUserID(responseMsg.id);
      setUser(responseMsg.username);
      navigate("/");
    } else {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <LoginSidebar paragraph={paragraph} button={true} />
      <div
        className="w-[100%] lg:w-[70%] flex flex-col items-center justify-center"
        data-aos="fade"
      >
        <h1 className="pb-[30px] text-[30px] text-[#2596be] font-bold">
          Login
        </h1>
        {error ? (
          <p className="text-rose-500">Wrong username or password</p>
        ) : (
          ""
        )}
        <form
          className="w-[280px] sd:w-[400px] flex flex-col"
          onSubmit={handleLogin}
        >
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Username
          </label>
          <input
            className={`border border-[#3B3B3B60] ${
              error ? "border-2 border-rose-500" : ""
            }`}
            value={username}
            onChange={(e) => {
              setError(false);
              setUsername(e.target.value);
            }}
            required
          ></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Password
          </label>
          <input
            type="password"
            className={`border border-[#3B3B3B60] mb-[20px] ${
              error ? "border-2 border-rose-500" : ""
            }`}
            value={password}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
            required
          />
          <button className="px-[20px] py-[5px] bg-[#2596be] rounded m-auto text-white text-bold">
            LogIn
          </button>
        </form>
        <p className="pt-[10px]">
          If you dont have account created{" "}
          <Link to="/register" className="text-[#2596be] hover:text-[#0000FF]">
            Register Here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
