import { createSlice } from "@reduxjs/toolkit";
import { displayProductByProjectName } from "./ProductAction";
const EmployState = {
  products: [],
  isSuccess: false,
  isError: null,
  message: "",
  loading: false,
};
const ProductSlice = createSlice({
  name: "products",
  initialState: EmployState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.products = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayProductByProjectName.pending, (state) => {
        state = { ...state, loading: true };
      })
      .addCase(displayProductByProjectName.fulfilled, (state, action) => {
        if (action?.payload) {
          state.isError = false;
          state.isSuccess = true;
          state.products = action?.payload;
          state.loading = false;
        }
      })
      .addCase(displayProductByProjectName.rejected, (state, { payload }) => {
        state.isError = true;
        state.loading = false;
        state.isSuccess = false;
      });
  },
});
export default ProductSlice.reducer;
export const userSelector = (state) => state.Employ;
export const { clearState } = ProductSlice.actions;
