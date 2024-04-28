import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl, token } from "../api/axios";
export const getDataDepartmentID = createAsyncThunk(
  "getDataDepartmentID/",
  async ({DepartmentID}, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataById/${DepartmentID}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.response.message) {
        return thunkAPI.rejectWithValue(error.response.data.response.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
export const getallDepartment = createAsyncThunk(
  "getallDataDepartment/",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getData/Department`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.response.message) {
        return thunkAPI.rejectWithValue(error.response.data.response.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

