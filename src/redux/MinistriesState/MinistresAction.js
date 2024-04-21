import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl, token } from "../api/axios";
export const AddMinstries = createAsyncThunk(
  "Admin/About",
  async (formData, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/setMinistries`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: (formData)
      });
      if (response) {
        console.log(response);
        return response.data.message;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
export const getData = createAsyncThunk(
  "Admin/getDataMin",
  async (thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getData`,
        headers: {
          "token": token
        },
      });
      if (response || response?.data) {
        return response.data }
    } catch (error) {
      if (error.response && error.response.data.response.message) {
        return thunkAPI.rejectWithValue(error.response.data.response.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
