
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserExist:false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserExist = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isUserExist = false;
      state.user = {};
      
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
