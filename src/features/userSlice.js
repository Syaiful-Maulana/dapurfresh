import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    getUser: (state, {payload}) => {
      state.user = payload
    },
    setUser: (state, {payload}) => {
      state.user = payload
    }
  },
});

export const { getUser, setUser } = userSlice.actions;
export default userSlice.reducer;
