import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");
const user = localStorage.getItem("authUser");

const initialState = {
  token: token ? token : null,
  user: user ? JSON.parse(user) : null,
};

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;

      if (isTokenExpired(token)) {
        state.token = null;
        state.user = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        return;
      }

      state.token = token;
      state.user = user;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
