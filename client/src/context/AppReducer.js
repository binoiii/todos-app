export default (state, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
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

    case "ERROR_LOGIN":
      return {
        ...state,
        errorMessage: action.payload.message,
        loadingStatuses: { ...state.loadingStatuses, logIn: false },
      };

    case "LOGOUT_USER":
      return {
        ...state,
        token: null,
        _id: null,
        credentials: {},
        todos: [],
        loadingStatuses: { ...state.loadingStatuses, get: true },
      };

    case "SUCCESS_REGISTER":
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

    case "ERROR_REGISTER":
      return {
        ...state,
        errorMessage: action.payload,
        loadingStatuses: { ...state.loadingStatuses, register: false },
      };

    case "CLEAR_ERRORMESSAGE":
      return {
        ...state,
        errorMessage: "",
      };

    case "GET_TODOS":
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, get: false },
        todos: action.payload,
      };

    case "LOAD_LOCALCREDENTIALS":
      return {
        ...state,
        credentials: action.payload,
      };

    case "ADD_TODO":
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, add: false },
        todos: [...state.todos, action.payload],
      };

    case "COMPLETE_TODO":
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, complete: false },
        todos: state.todos.filter(({ _id }) => _id !== action.payload),
      };

    case "EDIT_TODO":
      const todo = state.todos.find(({ _id }) => _id === action.payload._id);
      todo.todo = action.payload.todo;
      return { ...state };

    case "SET_LOADING":
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, ...action.payload },
      };

    case "ERROR_TODO":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
