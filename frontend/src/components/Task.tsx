import React from "react";

interface Props {
  task: {
    _id: string;
    userID: string;
    categoryID: string;
    taskHeadline: string;
    taskText: string;
  };
}

const Task = ({ task }: Props) => {
  return (
    <div className="w-[95%] min-h-[80px] rounded-md bg-white px-[5px] my-[2px]">
      <h2 className="font-bold border-b-2 border-[#2596be70]">
        {task.taskHeadline}
      </h2>
      <p className="text-[13px] text-[#606060]">{task.taskText}</p>
    </div>
  );
};

export default Task;
