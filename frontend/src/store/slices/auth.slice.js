import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
  username: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => ({
      ...action.payload,
    }),
    setUsername: (state, action) => ({
      ...state,
      username: action.payload,
    }),
    setToken: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    logOut: () => initialState,
  },
});

export const { setAuth, setUsername, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
