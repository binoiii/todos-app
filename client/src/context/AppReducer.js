import * as actions from "../util/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case actions.SUCCESS_LOGIN:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          _id: action.payload._id,
          name: action.payload.name,
          token: action.payload.token,
          isAuthenticated: true,
        },
        loadingStatuses: { ...state.loadingStatuses, logIn: false },
      };

    case actions.ERROR_LOGIN:
      return {
        ...state,
        errorMessage: action.payload.message,
        loadingStatuses: { ...state.loadingStatuses, logIn: false },
      };

    case actions.LOGOUT_USER:
      return {
        ...state,
        token: null,
        _id: null,
        credentials: {},
        todos: [],
        loadingStatuses: { ...state.loadingStatuses, get: true },
      };

    case actions.SUCCESS_REGISTER:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          _id: action.payload._id,
          name: action.payload.name,
          token: action.payload.token,
          isAuthenticated: true,
        },
        loadingStatuses: { ...state.loadingStatuses, register: false },
      };

    case actions.ERROR_REGISTER:
      return {
        ...state,
        errorMessage: action.payload,
        loadingStatuses: { ...state.loadingStatuses, register: false },
      };

    case actions.CLEAR_ERRORMESSAGE:
      return {
        ...state,
        errorMessage: "",
      };

    case actions.GET_TODOS:
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, get: false },
        todos: action.payload,
      };

    case actions.LOAD_LOCALCREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };

    case actions.ADD_TODO:
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, add: false },
        todos: [...state.todos, action.payload],
      };

    case actions.COMPLETE_TODO:
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, complete: false },
        todos: state.todos.filter(({ _id }) => _id !== action.payload),
      };

    case actions.EDIT_TODO:
      const todo = state.todos.find(({ _id }) => _id === action.payload._id);
      todo.todo = action.payload.todo;
      return { ...state };

    case actions.SET_LOADING:
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, ...action.payload },
      };

    case actions.ERROR_TODO:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
