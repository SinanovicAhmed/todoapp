import LoginSidebar from "../components/LoginSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const paragraph =
    "Welcome to ToDo app. You are few click away from creating your account!";

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseMsg = await response.json();
    console.log(responseMsg);
    if (responseMsg.msg === "User exists") {
      setError(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="h-screen w-screen flex">
      <LoginSidebar paragraph={paragraph} button={false} />
      <div
        className="w-[100%] lg:w-[70%] flex flex-col items-center justify-center"
        data-aos="fade"
      >
        <h1 className="pb-[30px] text-[30px] text-[#2596be] font-bold">
          Register
        </h1>
        {error ? (
          <p className="text-rose-500">Username or email already in use!</p>
        ) : (
          ""
        )}
        <form
          className="w-[280px] sd:w-[400px] flex flex-col"
          onSubmit={register}
        >
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
            }}
            className={`border border-[#3B3B3B60] ${
              error ? "border-2 border-rose-500" : ""
            }`}
            required
          ></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border border-[#3B3B3B60]"
            required
          ></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            type="email"
            className={`border border-[#3B3B3B60] mb-[20px] ${
              error ? "border-2 border-rose-500" : ""
            }`}
          ></input>
          <button className="px-[20px] py-[5px] bg-[#2596be] rounded m-auto text-white text-bold">
            Register
          </button>
        </form>
        <p className="pt-[10px]">
          Already have account?{" "}
          <Link to="/login" className="text-[#2596be] hover:text-[#0000FF]">
            Login Here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
