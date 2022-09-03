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
  const dragStartFunction = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("task", e.currentTarget.id);
  };
  return (
    <div
      id={task._id}
      draggable="true"
      onDragStart={dragStartFunction}
      className="w-[95%] min-h-[80px] rounded-md bg-white px-[5px] my-[4px] cursor-pointer"
    >
      <h2 className="font-bold border-b-2 border-[#2596be70] select-none">
        {task.taskHeadline}
      </h2>
      <p className="text-[13px] text-[#606060] select-none">{task.taskText}</p>
    </div>
  );
};

export default Task;
