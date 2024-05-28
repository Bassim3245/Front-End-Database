import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BackendUrl } from "../api/axios";
const getRoleAndUserId = createAsyncThunk(
  "auth/getPermissionByUIserId",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BackendUrl}/api/getDataRoleIdAndPermissionId/${userId}`,
        headers: {
          Accept: "application/json",
          token: token,
        },
      });
      if (response || response?.data) {
        return response?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { getRoleAndUserId };
