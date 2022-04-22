import React from "react";
import Todoform from "./Todoform";

const ManageTodo = ({ mode }) => {
  return (
    <>
      <Todoform mode={mode} />
    </>
  );
};

export default ManageTodo;
