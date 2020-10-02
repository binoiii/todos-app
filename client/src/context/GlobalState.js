import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
  todos: [],
  loadingStatuses: {
    get: true,
    add: false,
    complete: false,
  },
};

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(AppReducer, initialState);

  const getTodos = async () => {
    try {
      const res = await axios.get("/api/v1/todos");
      dispatcher({
        type: "GET_TODOS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatcher({
        type: "ERROR_TODO",
        payload: err.response.data.error,
      });
    }
  };

  const addTodo = async (todo) => {
    const config = {
      headers: {
        "Contenxt-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/todos", todo, config);
      dispatcher({
        type: "ADD_TODO",
        payload: res.data.data,
      });
    } catch (err) {
      dispatcher({
        type: "ERROR_TODO",
        payload: err.response.data.error,
      });
    }
  };

  const completeTodo = async (id) => {
    try {
      await axios.delete(`/api/v1/todos/${id}`);
      dispatcher({ type: "COMPLETE_TODO", payload: id });
    } catch (err) {
      dispatcher({
        type: "ERROR_TODO",
        payload: err.response.data.error,
      });
    }
  };

  const editTodo = async (todo) => {
    try {
      await axios.put(`/api/v1/todos/${todo._id}`, { todo: todo.todo });
      dispatcher({ type: "EDIT_TODO", payload: todo });
    } catch (err) {
      dispatcher({
        type: "ERROR_TODO",
        payload: err.response.data.error,
      });
    }
  };

  const setLoadingStatus = (loadingStatus) => {
    dispatcher({
      type: "SET_LOADING",
      payload: loadingStatus,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        loadingStatuses: state.loadingStatuses,
        setLoadingStatus,
        getTodos,
        addTodo,
        completeTodo,
        editTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
