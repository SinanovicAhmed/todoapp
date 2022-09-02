import { useState } from "react";

interface Props {
  userID: string;
  updateView: () => void;
  categoriesCount: number;
}

const HomeBar = ({ userID, updateView, categoriesCount }: Props) => {
  const [taskHeader, setTaskHeader] = useState("");
  const [taskText, setText] = useState("");
  const disableButton = categoriesCount > 3;
  const addCategory = async () => {
    const response = await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        categoryName: "Untitled",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => updateView());
  };
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/task", {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
        categoryID: "123", //defaultna kategorija
        taskHeadline: taskHeader,
        taskText: taskText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => updateView());
  };
  return (
    <div className="w-[100%] flex flex-col md:flex-row mt-[20px] justify-around items-center">
      <form
        onSubmit={addTask}
        className="flex flex-col items-center md:flex-row"
      >
        <input
          onChange={(e) => setText(e.target.value)}
          className="bg-[#D3D3D3] p-[8px] mr-[5px] rounded my-[3px]"
          type="string"
          required
          placeholder="Enter task content"
        />
        <input
          onChange={(e) => setTaskHeader(e.target.value)}
          className="bg-[#D3D3D3] p-[8px] mr-[5px] rounded my-[3px]"
          type="string"
          required
          placeholder="Enter task headline"
        />
        <button className="px-[20px] py-[5px] bg-[#2596be] rounded text-white text-bold my-[5px]">
          Add task
        </button>
      </form>
      <button
        disabled={disableButton}
        onClick={addCategory}
        className={`px-[20px] py-[5px] bg-[#2596be] rounded text-white text-bold transition-all my-[5px]${
          disableButton ? "bg-[#A0A0A0]" : ""
        }`}
      >
        + New category
      </button>
    </div>
  );
};

export default HomeBar;
