import React from "react";
import deleteIcon from "../icons/deleteIcon";
import updateIcon from "../icons/updateIcon";
import confirmIcon from "../icons/confirmIcon";
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
  const [optionsShow, setOptionsShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedHeader, setUpdatedHeader] = useState(props.task.taskHeadline);
  const [updatedText, setUpdatedText] = useState(props.task.taskText);
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
  const editTask = async () => {
    const response = await fetch(
      `http://localhost:5000/api/task/contentUpdate/${props.task._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskHeadline: updatedHeader,
          taskText: updatedText,
        }),
      }
    ).then((res) => {
      setEditing(false);
      props.updateView();
    });
  };
  return (
    <div
      id={props.task._id}
      draggable="true"
      onDragStart={dragStartFunction}
      className="w-[95%] min-h-[80px] rounded-md bg-white px-[5px] my-[4px] cursor-pointer"
      onMouseEnter={() => setOptionsShow(true)}
      onMouseLeave={() => setOptionsShow(false)}
      data-aos="fade"
    >
      <div className="flex justify-between border-b-2 border-[#2596be70] select-none">
        {editing ? (
          <input
            className="font-bold border w-[60%] bg-slate-100"
            value={updatedHeader}
            onChange={(e) => setUpdatedHeader(e.target.value)}
          />
        ) : (
          <h2 className="font-bold">{props.task.taskHeadline}</h2>
        )}

        {optionsShow && (
          <div className="flex">
            {editing ? (
              <div onClick={editTask} className="grayscale">
                {confirmIcon}
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => {
                setEditing(!editing);
              }}
              className="grayscale"
            >
              {updateIcon}
            </div>
            <div onClick={deleteTask} className="grayscale pl-[5px]">
              {deleteIcon}
            </div>
          </div>
        )}
      </div>
      {editing ? (
        <input
          className="text-[13px] w-[60%] text-[#606060] border bg-slate-100"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
      ) : (
        <p className="text-[13px] text-[#606060] select-none">
          {props.task.taskText}
        </p>
      )}
    </div>
  );
};

export default Task;
