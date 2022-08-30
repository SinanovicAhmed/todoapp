import LoginSidebar from "../components/LoginSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { isGeneratorFunction } from "util/types";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const paragraph =
  "Welcome to ToDo app. If you dont have account you can create one bellow!";

const Login = ({ setIsLoggedIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      //provjera dodati kasnije kada dodje backend
      console.log(username, password);
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <LoginSidebar paragraph={paragraph} button={true} />
      <div className="w-[100%] lg:w-[70%] flex flex-col items-center justify-center">
        <h1 className="pb-[30px] text-[30px] text-[#2596be] font-bold">
          Login
        </h1>
        <form
          className="w-[280px] sd:w-[400px] flex flex-col"
          onSubmit={handleLogin}
        >
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Username
          </label>
          <input
            className="border border-[#3B3B3B60]"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          ></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Password
          </label>
          <input
            type="password"
            className="border border-[#3B3B3B60] mb-[20px]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
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
