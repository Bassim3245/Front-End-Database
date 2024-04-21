import { createSlice } from "@reduxjs/toolkit";
import { AddWorkNutral, getDataNatural } from "./WorkNutralAction";
const initialState = {
  getDtaInfo: [],
  isSuccess: false,
  isError: false,
  message: "",
  loading: null,
};
const WorkNaturalSlice = createSlice({
  name: "natural",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddWorkNutral.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddWorkNutral.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(AddWorkNutral.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDataNatural.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataNatural.fulfilled, (state, action) => {
        state.getDtaInfo = action.payload;
        state.loading = false;
      })
      .addCase(getDataNatural.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default WorkNaturalSlice.reducer;
export const userSelector = (state) => state.Services;
