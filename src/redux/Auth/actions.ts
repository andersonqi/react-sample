import * as types from "./types";
import { LoginPayload } from "../../types/auth";
import axios from "axios";
import config from "../../config/api";
import jwtDecode from "jwt-decode";

export const loadAdmin = (payload: any) => {
  return {
    type: types.ADMIN_LOAD,
    payload,
  };
};

export const login = (data: LoginPayload) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      `${config.api_url}/auth/admin/login`,
      data
    );
    if (response.data.status === "ok") {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      let info: any = jwtDecode(response.data.access_token);
      dispatch(loadAdmin(info.user));
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

export const me = () => async (dispatch: any) => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.post(`${config.api_url}/auth/admin/me`, {
      token: token,
    });
    if (response.data.status === "ok") {
      dispatch(loadAdmin(response.data.user));
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

export const loadCurrrentUser = (user: any) => async (dispatch: any) => {
  dispatch(loadAdmin(user));
};
