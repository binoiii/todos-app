import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
  credentials: {
    _id: "",
    name: "",
    token: "",
    isAuthenticated: false,
  },
  todos: [],
  loadingStatuses: {
    logIn: false,
    register: false,
    get: true,
    add: false,
    complete: false,
  },
  errorMessage: "",
};

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [
    { credentials, todos, loadingStatuses, errorMessage },
    dispatcher,
  ] = useReducer(AppReducer, initialState);

  console.log();

  const { _id, token } = credentials;

  const requestConfig = (id) => {
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    if (token || id) {
      config.headers["x-auth-token"] = token;
      config.headers["id"] = id;
    }
    return config;
  };

  const loginUser = async (credentials) => {
    try {
      const user = await axios.post("/login", credentials);
      dispatcher({
        type: "SUCCESS_LOGIN",
        payload: user.data,
      });
    } catch (err) {
      dispatcher({
        type: "ERROR_LOGIN",
        payload: err.response.data,
      });
    }
  };

  const registerUser = async (user) => {
    try {
      const newUser = await axios.post("/register", user);
      dispatcher({
        type: "SUCCESS_REGISTER",
        payload: newUser.data,
      });
    } catch (err) {
      dispatcher({
        type: "ERROR_REGISTER",
        payload: err.response.data.message,
      });
    }
  };

  const logoutUser = () => {
    dispatcher({
      type: "LOGOUT_USER",
    });
  };

  const clearErrorMessage = () => {
    dispatcher({
      type: "CLEAR_ERRORMESSAGE",
    });
  };

  const getTodos = async () => {
    try {
      const res = await axios.get("/api/todos", {
        params: {
          _id,
        },
      });
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

  const loadLocalCredentials = (credentials) => {
    dispatcher({
      type: "LOAD_LOCALCREDENTIALS",
      payload: credentials,
    });
  };

  const addTodo = async (todo) => {
    try {
      const res = await axios.post(
        `/api/todos/${_id}`,
        { todo },
        requestConfig()
      );
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
      await axios.delete(`/api/todos/${_id}`, requestConfig(id));
      dispatcher({ type: "COMPLETE_TODO", payload: id });
    } catch (err) {
      dispatcher({
        type: "ERROR_TODO",
        payload: err.response.data.error,
      });
    }
  };

  const editTodo = async (body) => {
    try {
      const res = await axios.put(`/api/todos/${_id}`, body, requestConfig());
      dispatcher({ type: "EDIT_TODO", payload: res.data.data });
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
        loginUser,
        logoutUser,
        registerUser,
        loadLocalCredentials,
        credentials: credentials,
        setLoadingStatus,
        loadingStatuses: loadingStatuses,
        errorMessage: errorMessage,
        clearErrorMessage,
        getTodos,
        todos: todos,
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
