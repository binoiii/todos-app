export default (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        loadingStatuses: { ...state.loadingStatuses, get: false },
        todos: action.payload,
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
