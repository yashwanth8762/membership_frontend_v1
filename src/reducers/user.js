import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  id: "",
  name: "",
  role: "",
  email_id: "",
  access_token: "",
  refresh_token: "",
  profile_pic: "",
  is_change_password: false,
  is_logged_in: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialValue;
    },
    passwordChanged: (state) => {
      state.value.is_change_password = false;
    },
    setLanguage: (state, action) => {
      state.value.language = action.payload;
    },
  },
});

export const { login, logout, passwordChanged, setLanguage } =
  userSlice.actions;

export default userSlice.reducer;
