import * as types from "./types";

const initState = {
  currentSetting: {},
  loading: false,
  message: "",
  showMessage: false,
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case types.GET_SETTING: {
      return {
        ...state,
        loading: false,
        currentSetting: action.payload,
      };
    }
    case types.UPDATE_SETTING: {
      return {
        ...state,
        loading: false,
        currentSetting: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
