const { createSlice } = require("@reduxjs/toolkit");

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
  },
});

export const { authRegister, authLogin } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;
