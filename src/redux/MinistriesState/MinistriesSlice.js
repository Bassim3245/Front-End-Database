import { createSlice } from "@reduxjs/toolkit";
import { AddMinstries, getData } from "./MinistresAction";
const MinistriesState = createSlice({
  name: "Ministries",
  initialState: {
    Ministries: [],
    isError: false,
    isSuccess: false,
    isLoading: null,
    message: "",
    
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddMinstries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddMinstries.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(AddMinstries.rejected, (state, { payload }) => {
        state.isError = true;
        state.message = payload;
      });
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, { payload:{response} }) => {
        state.Ministries = response;
        state.isLoading = false;
      })
      .addCase(getData.rejected, (state, { payload }) => {
        state.message = "error";
      })
  }
});
export default MinistriesState.reducer
export const userSelector = (state) => state.Ministries;
