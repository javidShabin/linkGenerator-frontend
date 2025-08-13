import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const storedUser = localStorage.getItem("user");
const initialState = storedUser
  ? { isUserExist: true, user: JSON.parse(storedUser) }
  : { isUserExist: false, user: {} };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserExist = true;
      state.user = action.payload;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.isUserExist = false;
      state.user = {};

      // Remove from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
