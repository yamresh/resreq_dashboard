import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";
import { config } from "../utils";
export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${config.API_URL}`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};
