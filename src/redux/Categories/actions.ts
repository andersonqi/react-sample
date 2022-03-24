import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getCategories = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/categories/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.CATEGORIES_LOAD,
        payload: response.data.categories,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const createCategory = (data: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      `${config.api_url}/categories/create`,
      data
    );
    if (response.data.status === "ok") {
      dispatch({
        type: types.CATEGORIES_CREATE,
        payload: response.data.category,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const getCategory = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/categories/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.CATEGORIE_LOAD,
        payload: response.data.category,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const updateCategory =
  (id: number, data: any) => async (dispatch: any) => {
    try {
      const response = await axios.put(
        `${config.api_url}/categories/${id}`,
        data
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.CATEGORIE_LOAD,
          payload: response.data.category,
        });
        return {
          error: false,
        };
      }
    } catch (error) {
      return {
        error: true,
      };
    }
  };

export const deleteCategory = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.delete(`${config.api_url}/categories/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.CATEGORIE_DELETE,
        payload: id,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};
