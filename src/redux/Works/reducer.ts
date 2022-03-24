import * as types from "./types";

const INITIAL_STATE = {
  works: [],
  currentWork: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.WORKS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.WORKS_LOAD:
      return {
        ...state,
        works: action.payload,
        error: false,
        loading: false,
      };
    case types.WORK_LOAD:
      return {
        ...state,
        currentWork: action.payload,
        error: false,
        loading: false,
      };
    case types.WORKS_FAIL:
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
