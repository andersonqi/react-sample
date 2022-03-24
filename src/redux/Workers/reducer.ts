import * as types from "./types";

const INITIAL_STATE = {
  workers: [],
  currentWorker: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.WORKERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.WORKERS_CREATE:
      return {
        ...state,
        workers: [...state.workers, action.payload],
        error: false,
        loading: false,
      };
    case types.WORKERS_LOAD:
      return {
        ...state,
        workers: action.payload,
        error: false,
        loading: false,
      };
    case types.WORKER_LOAD:
      return {
        ...state,
        currentWorker: action.payload,
        error: false,
        loading: false,
      };
    case types.WORKERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
