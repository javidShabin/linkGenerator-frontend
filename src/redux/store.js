import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/feature/userSlice"; // Correct import path

export const store = configureStore({
  reducer: {
    user: userReducer, // Registered the 'user' slice correctly
  },
});
