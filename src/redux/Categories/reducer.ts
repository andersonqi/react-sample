import * as types from "./types";
import { Property } from "../../types/property";

const INITIAL_STATE = {
  categories: [],
  currentCategory: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.CATEGORIES_CREATE:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        error: false,
        loading: false,
      };
    case types.CATEGORIES_LOAD:
      return {
        ...state,
        categories: action.payload,
        error: false,
        loading: false,
      };
    case types.CATEGORIE_LOAD:
      return {
        ...state,
        currentCategory: action.payload,
        error: false,
        loading: false,
      };
    case types.CATEGORIE_DELETE:
      return {
        ...state,
        categories: state.categories.filter(
          (property: Property) => property.id !== action.payload
        ),
        error: false,
        loading: false,
      };
    case types.CATEGORIES_FAIL:
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
