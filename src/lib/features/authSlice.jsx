import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      name: "admin",
      mail: "a@a.a",
      password: "123",
      games: [],
      isConnected: false,
    },
  ],
  user: {
    name: "",
    mail: "",
    password: "",
    games: [],
    isConnected: false,
  },
  setMail: "",
  setPassword: "",
  setName: "",
  isError: false,
  error: {
    register: "Cette adresse mail est déjà utilisée.",
    login: "Adresse mail ou mot de passe invalide",
  },
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authRegister: (state) => {
      const user = state.users.find((u) => u.mail === state.setMail);
      if (!user) {
        state.users.push({
          ...state.user,
          name: state.setName,
          mail: state.setMail,
          password: state.setPassword,
        });
        state.isError = false;
        state.setName = "";
        state.setMail = "";
        state.setPassword = "";
      } else {
        state.isError = true;
      }
    },
    authLogin: (state) => {
      const user = state.users.find(
        (u) => u.mail === state.setMail && u.password === state.setPassword
      );
      if (user) {
        state.user = { ...user, isConnected: true };
        state.isError = false;
        state.setMail = "";
        state.setPassword = "";
      } else {
        state.isError = true;
      }
    },
    authLogout: (state) => {
      state.user = initialState.user;
    },
    authSetName: (state, action) => {
      state.setName = action.payload;
    },
    authSetMail: (state, action) => {
      state.setMail = action.payload;
    },
    authSetPassword: (state, action) => {
      state.setPassword = action.payload;
    },
    authResetError: (state) => {
      state.isError = false;
    },
  },
});

export const {
  authRegister,
  authLogin,
  authLogout,
  authSetName,
  authSetMail,
  authSetPassword,
  authResetError,
} = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
