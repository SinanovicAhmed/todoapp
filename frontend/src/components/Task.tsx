import React from "react";
import deleteIcon from "../icons/deleteIcon";
import { useState } from "react";
interface Props {
  task: {
    _id: string;
    userID: string;
    categoryID: string;
    taskHeadline: string;
    taskText: string;
  };
  updateView: () => void;
}

const Task = (props: Props) => {
  const [deleteShow, setDeleteShow] = useState(false);

  const dragStartFunction = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("task", e.currentTarget.id);
  };

  const deleteTask = async () => {
    const response = await fetch(
      `http://localhost:5000/api/task/${props.task._id}`,
      {
        method: "DELETE",
      }
    ).then((res) => props.updateView());
  };
  return (
    <div
      id={props.task._id}
      draggable="true"
      onDragStart={dragStartFunction}
      className="w-[95%] min-h-[80px] rounded-md bg-white px-[5px] my-[4px] cursor-pointer"
      onMouseEnter={() => setDeleteShow(true)}
      onMouseLeave={() => setDeleteShow(false)}
    >
      <div className="flex justify-between border-b-2 border-[#2596be70] select-none">
        <h2 className="font-bold">{props.task.taskHeadline}</h2>
        {deleteShow && (
          <div onClick={deleteTask} className="grayscale">
            {deleteIcon}
          </div>
        )}
      </div>
      <p className="text-[13px] text-[#606060] select-none">
        {props.task.taskText}
      </p>
    </div>
  );
};

export default Task;
