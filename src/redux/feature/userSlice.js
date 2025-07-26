import { createSlice } from "@reduxjs/toolkit";

// Try to load user from localStorage
const userFromStorage = localStorage.getItem("user");

const initialState = {
  isUserExist: !!userFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserExist = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    clearUser: (state) => {
      state.isUserExist = false;
      state.user = {};
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
