import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";

export const initialState = {
  loggedIn: false,
  username: undefined,
  jwt: undefined,
  error: undefined,
};

export const loginUser = createAsyncThunk("users/login", (props) => {
  const res = axios
    .post(`${BASE_URL}auth/login`, {
      email: props.email,
      password: props.password,
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
});

export const registerUser = createAsyncThunk("users/register", (props) => {
  const res = axios
    .post(`${BASE_URL}/auth/register`, {
      userName: props.username,
      email: props.email,
      password: props.password,
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      throw err;
    });
  return res;
});

export const clearError = createAction("user/clearError");

export const logout = createAction("user/logout");

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.jwt = action.payload.token;
      state.username = action.payload.username;
      window.location.href = "/";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loggedIn = false;
      state.jwt = "";
      state.error =
        action.error.message === "Request failed with status code 401"
          ? "Invalid email or password. Try again"
          : action.error.message;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.jwt = action.payload.token;
      state.username = action.payload.username;
      window.location.href = "/";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loggedIn = false;
      state.jwt = "";
      state.error = action.error.message;
    });
  },
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.username = undefined;
      state.jwt = undefined;
    },
  },
});

export default userSlice.reducer;
