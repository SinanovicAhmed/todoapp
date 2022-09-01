import React from "react";
import taskIcon from "../icons/taskIcon";
interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  userID: string;
}
const Navbar = ({ user, setIsLoggedIn, setUserID }: Props) => {
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserID("");
  };
  return (
    <div className="w-[100%] h-[60px] bg-[#2596be] flex items-center justify-between pl-[50px]">
      {taskIcon}
      <div className="flex items-center">
        <h2 className="text-[20px] text-white">{user}</h2>
        <button
          onClick={logoutHandler}
          className="py-[8px] px-[10px] ml-[30px] mr-[50px] text-[#3B3B3B] font-bold bg-[#FFFFFF50] hover:bg-[#FFFFFF70] transition-all delay-75"
        >
          Log out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
