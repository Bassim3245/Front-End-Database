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
  async ({ departmentID, info, token, rowsPerPage, page }, thunkAPI) => {
    const isAuthorizedUser = ["H.O.D", "management", "Assistance"].includes(
      info?.user_type
    );
    const url = isAuthorizedUser
      ? `${BackendUrl}/api/getProjects?departmentID=${departmentID}&rowsPerPage=${rowsPerPage}&page=${page}`
      : `${BackendUrl}/api/getDataByUserID?userId=${info?._id}&rowsPerPage=${rowsPerPage}&page=${page}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getProjectByDepartmentDelay = createAsyncThunk(
  "GetALL/getProjectByDepartmentDelay",
  async ({ departmentID, info, token, rowsPerPage, page }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getallDataByDepartmentAndUserIDWhendelayCheckIsTure?DepartmentId=${departmentID}&&page=${page}&rowsPerPage=${rowsPerPage}`,
        headers: {
          Accept: "application/json",
          token: token,
        },
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const getDataAllByIdProjectMutual = createAsyncThunk(
  "GetALL/getDataAllByIdProjectMutual",
  async ({ DepartmentId, token }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataAllByIdProjectMutual/${DepartmentId}`,
        headers: {
          Accept: "application/json",
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
export const getProjectByDepartmentMutualById = createAsyncThunk(
  "GetALL/getProjectByDepartmentMutualById",
  async ({ DepartmentId, token }, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataByDepartmentId/${DepartmentId}`,
        headers: {
          Accept: "application/json",
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
