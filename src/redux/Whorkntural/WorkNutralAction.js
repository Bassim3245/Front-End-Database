import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
export const AddWorkNutral = createAsyncThunk(
  "workNutral/add",
  async ({workNaturalData}, thunkAPI) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/setWorkNatural`, {workNaturalData}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
export const getDataNatural = createAsyncThunk(
  "workNutral/getData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getDataNatural`);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
