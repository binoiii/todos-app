import React from "react";
import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import Navigation from "./Navigation";

const LandingPage = () => {
  return (
    <>
      <Navigation />
      <AddTodo />
      <Todos />
    </>
  );
};

export default LandingPage;
