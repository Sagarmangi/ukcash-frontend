import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/",
        { auth_token: token },
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
