import axios from "axios";
import * as types from "./types";
import config from "../../config/api";

export const createAdmin = (data: any) => async (dispatch: any) => {
  try {
    let response = await axios.post(`${config.api_url}/admins/create`, data);
    if (response.data.status === "ok") {
      dispatch({
        type: types.ADMINS_CREATE,
        payload: response.data.admin,
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

export const getAdmins = () => async (dispatch: any) => {
  try {
    let response = await axios.get(`${config.api_url}/admins/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.ADMINS_LOAD,
        payload: response.data.admins,
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

export const getAdmin = (id: number) => async (dispatch: any) => {
  try {
    let response = await axios.get(`${config.api_url}/admins/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.ADMIN_LOAD,
        payload: response.data.admin,
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

export const updateAdmin =
  (id: number | any, data: any) => async (dispatch: any) => {
    try {
      let response = await axios.put(`${config.api_url}/admins/${id}`, data);
      if (response.data.status === "ok") {
        dispatch({
          type: types.ADMIN_LOAD,
          payload: response.data.admin,
        });
        return { error: false };
      }
    } catch (error) {
      return { error: true };
    }
  };

export const changePassword =
  (id: number | any, data: any) => async (dispatch: any) => {
    try {
      let response = await axios.put(
        `${config.api_url}/admins/${id}/changePassword`,
        data
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.ADMIN_LOAD,
          payload: response.data.admin,
        });
        return { error: false };
      }
    } catch (error) {
      return { error: true };
    }
  };

export const deleteAdmin = (id: number | any) => async (dispatch: any) => {
  try {
    let response = await axios.delete(`${config.api_url}/admins/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.ADMIN_DELETE,
        payload: id,
      });
      return {
        error: false,
      };
    }
  } catch (err) {
    return { error: true };
  }
};
