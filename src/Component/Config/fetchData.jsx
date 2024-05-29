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
export const fetchDataAllDepartment = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getData/Department`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDataUserById = async (id, token) => {
  try {
    console.log("ddd",id);
    const response = await axios({
      method: "get",
      url: `${BackendUrl}/api/getDataUserById/${id}`,
      headers: {
        Accept: "application/json",
        token: token,
      },
    });
    if (response && response?.data) {
      // console.log(response.data?.response);
      return response?.data?.response;
    }
  } catch (error) {
    return error.response.data.message;
  }
};
export const getDataProject = async (info, token) => {
  try {
    const response = await axios({
      method: "get",
      url:
        info?.user_type === "H.O.D" || info?.user_type === "management"
          ? `${BackendUrl}/api/getProjects`
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
      return error.response.data.message;
    }
  }
};
export const getDatFileUploadByIdDepartment = async (id) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataFileUploadBySelectTheIdFromHrTOdEPARTMENT/${id}`
    );
    if (response) {
      return response?.data;
    }
  } catch (error) {
    if (error || error.response) {
      return error.response.data.message;
    }
  }
};

export const fetchDataUser = async (id) => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getallDataUser/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      error.response
        ? `Error response: ${error.response.data.message}`
        : `Network error: ${error.message}`
    );
  }
};
export const getDatFileUploadByIdDepartmentToSendEmploy = async (id) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataFileBySendFilefromHOD/${id}`
    );
    if (response) {
      console.log("tt", response);
      return response?.data;
    }
  } catch (error) {
    if (error || error.response) {
      return error.response.data.message;
    }
  }
};
export const getDataHasBeenSendByDepartmentToManger = async (token) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataHasBeenSendByDepartmentToManger`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response) {
      console.log("tt", response);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
};

export const getDataFileINMangerSection = async (id, token) => {
  try {
    const response = await axios.get(
      `${BackendUrl}/api/getDataFileINMangerSection/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response) {
      console.log("tt", response);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
};

export const getRole = async (token) => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getRole`);
    if (response) {
      console.log("tt", response);
      return response.data.response;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
};
export const getAllProJECTaNDcOUNT5 = async (token) => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getNumberOfProjectsCurrently`);
    if (response) {
      console.log("tt", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
};

