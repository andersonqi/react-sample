import * as types from "./types";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.ADMIN_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.ADMIN_LOAD:
      return {
        ...state,
        user: action.payload,
        error: false,
        loading: false,
      };
    case types.ADMIN_FAIL:
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
