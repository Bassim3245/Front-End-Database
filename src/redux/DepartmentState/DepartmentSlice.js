import { createSlice } from "@reduxjs/toolkit";
import { getDataDepartmentID ,getallDepartment} from "./DepartmentAction";
const DepartmentSlice = createSlice({
  name: "Department",
  initialState: {
    department: [],
    isError: false,
    isSuccess: false,
    isLoading: null,
    message: "",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataDepartmentID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataDepartmentID.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.department=payload
      })
      .addCase(getDataDepartmentID.rejected, (state, { payload }) => {
        state.message = "error";
      })
      builder
      .addCase(getallDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallDepartment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.department=payload
      })
      .addCase(getallDepartment.rejected, (state, { payload }) => {
        state.message = "error";
      })
  }
});
export default DepartmentSlice.reducer
export const userSelector = (state) => state.Department;
