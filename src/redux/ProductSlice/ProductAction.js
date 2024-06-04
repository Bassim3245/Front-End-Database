import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl, info, token } from "../api/axios";
import axios from "axios";
export const displayProductByProjectName = createAsyncThunk(
  "Products/display/",
  async (id, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataByProjectName/${id}`,
      });
      if(response){
        return response.data;

      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const displaySingleProduct = createAsyncThunk(
  "Product/display/Product",
  async (ProductID, thunkAPI) => {
    try {
      const response = axios({
        method: "get",
        url: `${BackendUrl}/api/Employ/Data/Product/${ProductID}`,
        headers: {
          "content-type": "application/json; charset=utf-8",
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      if (response) {
        return response;
      }
    } catch (error) {
      if (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const sendDATA = createAsyncThunk(
  "Product/sendData",
  async (Id, thunkAPI) => {
    try {
      const response = await axios.put(`${BackendUrl}/api/SendProduct/${Id}`);
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  }
);
export const RemoveProduct = createAsyncThunk(
  "Employ/RemoveProduct",
  async (productID, thunkAPI) => {
    try {
      const response = axios({
        method: "delete",
        url: `${BackendUrl}/api/Employ/Product/Delete/${productID}`,
        headers: { token: token },
      });
      if (response) {
        return response;
      }
    } catch (error) {
      if (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);
