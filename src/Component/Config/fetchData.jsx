import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
export const fetchDataFromAPIDataProject = async (DepartmentID) => {
  const token = localStorage.getItem("token") || {};
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getAllDataOfProductForDepartmentID/${DepartmentID}`,
      {
        // @ts-ignore
        headers: {
          token: token,
        },
      }
    );
    return response.data.response;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const fetchDataProduct = async (projectID) => {
  const token = localStorage.getItem("token") || {};
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataByProjectName/${projectID}`,
      {
        // @ts-ignore
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDataByProjectID = async (projectID) => {
  const token = localStorage.getItem("token") || {};
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataProjectById/${projectID}`,
      {
        // @ts-ignore
        headers: {
          token: token,
        },
      }
    );
    return response?.data?.response;
  } catch (error) {
    console.log(error);
  }
};
export const getAllDataProductBYdepartmentId = async (DepartmentID) => {
  const token = localStorage.getItem("token") || {};
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getAllDataProductBYdepartmentId/${DepartmentID}`,
      {
        // @ts-ignore
        headers: {
          token: token,
        },
      }
    );
    return response.data.response;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getDataBySendUserProjectAndProduct = async (DepartmentID) => {
  const token = localStorage.getItem("token") || {};
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataBySendUserProjectAndProduct/${DepartmentID}`,
      {
        // @ts-ignore
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const GetDataEventByDepartmentId = async (DepartmentId) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getEvent/${DepartmentId}`
    );
    if (response) {
      return response?.data?.response;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDataSystemPrice = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getDataSystemPrice`);
    return response?.data?.response;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};
export const fetchDataAllDepartment= async () => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getData/Department`
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};