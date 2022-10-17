import taskIcon from "../icons/taskIcon";
import { Link } from "react-router-dom";
interface Props {
  paragraph: string;
  button: boolean;
}
const LoginSidebar = ({ paragraph, button }: Props) => {
  return (
    <div
      className="hidden lg:flex w-[30%] h-[100%] bg-[#2596be] flex-col justify-center"
      data-aos="fade-right"
    >
      <div className="w-[80%] h-[80%] m-auto flex flex-col justify-around items-start">
        <div className="flex">
          {taskIcon}
          <h2 className="text-[20px] text-white font-bold pl-[10px]">
            ToDo App
          </h2>
        </div>
        <p className="text-[25px] text-white">{paragraph}</p>
        {button ? (
          <Link
            to="/register"
            className="py-[10px] px-[10px] text-[#3B3B3B] font-bold bg-[#FFFFFF50] hover:bg-[#FFFFFF70] transition-all delay-75"
          >
            Get started!
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LoginSidebar;
