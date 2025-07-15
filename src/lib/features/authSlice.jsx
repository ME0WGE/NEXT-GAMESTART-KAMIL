import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // --------------------------------------------------------------------|
  // --------------------- Array of registered users --------------------|
  users: [
    {
      name: "admin",
      mail: "a@a.a",
      password: "123",
      games: [],
      isConnected: false,
    },
  ],
  // --------------------------------------------------------------------|
  // ------------------------- user object ------------------------------|
  user: {
    name: "",
    mail: "",
    password: "",
    description: "",
    games: [],
    isConnected: false,
  },
  setMail: "",
  setPassword: "",
  setName: "",
  setDescription: "",
  isError: false,
  error: {
    register: "Cette adresse mail est déjà utilisée.",
    login: "Adresse mail ou mot de passe invalide",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  // --------------------------------------------------------------------|
  // --------------------------- Reducers -------------------------------|
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
    authGetUser: (state) => {
      state.user = state.users.find((u) => u.isConnected === true);
    },
    authSetDescription: (state, action) => {
      state.user.description = action.payload;
    },
    authSetName: (state, action) => {
      state.user.name = action.payload;
    },
    authLogout: (state) => {
      state.user = initialState.user;
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

// --------------------------------------------------------------------|
// ---------------------------- Exports -------------------------------|
export const {
  authRegister,
  authLogin,
  authLogout,
  authSetMail,
  authSetPassword,
  authResetError,
  authGetUser,
  authSetDescription,
  authSetName,
} = AuthSlice.actions;

export default AuthSlice.reducer;
