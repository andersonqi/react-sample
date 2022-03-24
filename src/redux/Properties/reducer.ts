import * as types from "./types";
import { Property } from "../../types/property";

const INITIAL_STATE = {
  properties: [],
  currentProperty: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.PROPERTIES_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.PROPERTIES_CREATE:
      return {
        ...state,
        properties: [...state.properties, action.payload],
        error: false,
        loading: false,
      };
    case types.PROPERTIES_LOAD:
      return {
        ...state,
        properties: action.payload,
        error: false,
        loading: false,
      };
    case types.PROPERTIE_LOAD:
      return {
        ...state,
        currentProperty: action.payload,
        error: false,
        loading: false,
      };
    case types.PROPERTIE_DELETE:
      return {
        ...state,
        properties: state.properties.filter(
          (property: Property) => property.id !== action.payload
        ),
        error: false,
        loading: false,
      };
    case types.PROPERTIES_FAIL:
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
