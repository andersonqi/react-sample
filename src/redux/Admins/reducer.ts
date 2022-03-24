import * as types from "./types";
import { Admin } from "../../types/admins";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  admins: [],
  currentAdmin: {},
};

const reducers = (state = initState, action: any) => {
  switch (action.type) {
    case types.ADMINS_CREATE: {
      return {
        ...state,
        loading: false,
        admins: [...state.admins, action.payload],
      };
    }
    case types.ADMINS_LOAD: {
      return {
        ...state,
        loading: false,
        admins: action.payload,
      };
    }
    case types.ADMIN_LOAD: {
      return {
        ...state,
        loading: false,
        currentAdmin: action.payload,
      };
    }
    case types.ADMIN_DELETE: {
      return {
        ...state,
        loading: false,
        admins: state.admins.filter(
          (item: Admin) => item.id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};

export default reducers;
