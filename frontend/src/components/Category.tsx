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
  return (
    <div className="w-[300px] min-h-[100px] bg-[#D3D3D3] rounded-md mx-[20px] my-[80px] pb-[15px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center pl-[10px] pt-[5px] pb-[15px]">
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
            5
          </h2>
        </div>
        {addedCategory ? (
          <div className="flex pb-[8px]">
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
      <div className="flex flex-col justify-center items-center">
        {tasks.map((task, i) => {
          if (task.categoryID === categoryID) {
            return <Task key={i} task={task} />;
          }
        })}
      </div>
    </div>
  );
};

export default Category;
