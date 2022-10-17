import Task from "../components/Task";
import deleteIcon from "../icons/deleteIcon";
import updateIcon from "../icons/updateIcon";
import confirmIcon from "../icons/confirmIcon";
import React from "react";
import { useState } from "react";
interface Props {
  categoryName: string;
  addedCategory: boolean;
  categoryID: string;
  updateView: () => void;
  tasks: {
    _id: string;
    userID: string;
    categoryID: string;
    taskHeadline: string;
    taskText: string;
  }[];
}

const Category = ({
  categoryName,
  addedCategory,
  categoryID,
  updateView,
  tasks,
}: Props) => {
  const [inputModal, toggleInputModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(categoryName);

  //filtriranje taskova koje pripadaju kategorijama
  const tasksCount = tasks.filter(
    (task) => task.categoryID === categoryID
  ).length;

  const deleteCategory = async () => {
    const response = await fetch(
      `http://localhost:5000/api/categories/${categoryID}`,
      {
        method: "DELETE",
      }
    ).then((res) => updateView());
  };
  const updateCategory = async () => {
    const response = await fetch(
      `http://localhost:5000/api/categories/${categoryID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      }
    ).then((res) => {
      updateView();
      toggleInputModal(false);
    });
  };
  const dragOverFunction = async (e: React.DragEvent<HTMLDivElement>) => {
    const taskID = e.dataTransfer.getData("task");

    const response = await fetch(`http://localhost:5000/api/task/${taskID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryID: categoryID }),
    }).then((res) => {
      updateView();
    });
  };
  return (
    <div
      className="w-[300px] min-h-[100px] bg-[#D3D3D3] rounded-md mx-[20px] my-[80px]"
      data-aos="fade-up"
    >
      <div className="flex justify-between items-center border-b-2 pb-[5px]">
        <div className="flex items-center pl-[10px] pt-[5px] ">
          {inputModal ? (
            <div className="flex">
              <input
                className="w-[150px]"
                value={updatedName}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
              />
              <div
                onClick={updateCategory}
                className="cursor-pointer hover:scale-110"
              >
                {confirmIcon}
              </div>
            </div>
          ) : (
            <h2 className="font-bold transition-all">{categoryName}</h2>
          )}

          <h2 className="rounded-full bg-[#BEBEBE] w-[25px] h-[25px] text-center ml-[5px]">
            {tasksCount}
          </h2>
        </div>
        {addedCategory ? (
          <div className="flex h-[100%] items-center">
            <div
              onClick={() => toggleInputModal(!inputModal)}
              className="hover:cursor-pointer"
            >
              {updateIcon}
            </div>
            <div
              onClick={deleteCategory}
              className="mr-[10px] ml-[5px] hover:cursor-pointer"
            >
              {deleteIcon}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        onDrop={dragOverFunction}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col justify-center items-center min-h-[70px]"
      >
        {tasks.map((task, i) => {
          if (task.categoryID === categoryID) {
            return <Task key={i} task={task} updateView={updateView} />;
          }
        })}
      </div>
    </div>
  );
};

export default Category;
