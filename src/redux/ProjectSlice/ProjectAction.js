import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl, token } from "../api/axios";
import axios from "axios";
export const AddProject = createAsyncThunk(
  "/Offers/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/setProject`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        data: formData,
      });
      if (response || response?.data) {
        return response;
      }
    } catch (error) {
      if (error || error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);
export const getProjectByDepartment = createAsyncThunk(
  "GetALL/getProjectByDepartment",
  async ({ departmentID, info, token }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url:
          info?.user_type === "H.O.D" || info?.user_type === "management"|| info?.user_type === "Assistance"
            ? `${BackendUrl}/api/getProjects/${departmentID}`
            : `${BackendUrl}/api/getDataByUserID/${info?._id} `,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      if (response || response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error || error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const getProjectByDepartmentDelay = createAsyncThunk(
  "GetALL/getProjectByDepartmentDelay",
  async ({ info, token }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url:
          info?.user_type === "H.O.D"
            ? `${BackendUrl}/api/getallDataByDepartmentAndUserIDWhendelayCheckIsTure`
            : `${BackendUrl}/api/getDataByUserID/${info?._id} `,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      if (response || response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error || error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);
export const getProjectByDepartmentMutual = createAsyncThunk(
  "GetALL/getProjectByDepartmentMutual",
  async ({ info, token }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataAllByIdProjectMutual`,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      if (response || response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error || error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);
