import LoginSidebar from "../components/LoginSidebar";
import { Link } from "react-router-dom";
const Register = () => {
  const paragraph =
    "Welcome to ToDo app. You are few click away from creating your account!";
  return (
    <div className="h-screen w-screen flex">
      <LoginSidebar paragraph={paragraph} button={false} />
      <div className="w-[100%] lg:w-[70%] flex flex-col items-center justify-center">
        <h1 className="pb-[30px] text-[30px] text-[#2596be] font-bold">
          Register
        </h1>
        <form className="w-[280px] sd:w-[400px] flex flex-col">
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Username
          </label>
          <input className="border border-[#3B3B3B60]" required></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Password
          </label>
          <input
            type="password"
            className="border border-[#3B3B3B60]"
            required
          ></input>
          <label className="text-[#2596be] font-bold pt-[20px] pb-[5px]">
            Email
          </label>
          <input
            type="email"
            className="border border-[#3B3B3B60] mb-[20px]"
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
