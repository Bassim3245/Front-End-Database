import * as React from "react";
import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { BackendUrl } from "../../../../../../redux/api/axios";
import { toast } from "react-toastify";
import {
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserById, getRole } from "../../../../..//Config/fetchData";
import { useQuery } from "react-query";
import { useParams } from "react-router";

export default function ModuleEditUsers(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token") || {};
  const [name, setUname] = useState("");
  const [username, setUsername] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUser_type] = useState("");
  const [DepartmentID, setDepartmentId] = useState("");
  const [dataDepartment, setDataDepartment] = useState([]);
  const { id } = useParams();
  const userId = id;
  console.log("dsaslhf;", userId);
  const { isLoadingDataUser, data, isError, error, isFetching, refetch } =
  
    useQuery("DataUserEdit", () => getDataUserById(userId, token), {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    });
  // const { isLoading, dataRole, refetch } = useQuery("getRole", getRole, {});
  React.useEffect(() => {
    if(userId){
      refetch();
    }
  }, [userId]);
  React.useEffect(() => {
    if (data) {
      setUname(data?.name);
      setUsername(data?.username);
      setPassword(data?.password);
      setPhone(data?.Phone);
      setUser_type(data?.user_type);
      setDepartmentId(data?.DepartmentID);
    }
  }, [open]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getData/Department`
        );
        if (response) {
          setDataDepartment(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const HandleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("password", password || "");
      formData.append("Phone", Phone || "");
      formData.append("username", username || "");
      formData.append("user_type", user_type || "");
      formData.append("DepartmentID", DepartmentID || "");
      const response = await axios.put(
        `${BackendUrl}/api/updateUserById/${userId}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        localStorage.setItem("user", JSON.stringify(response?.data?.response));
        props?.setDataUser(true);
        setOpen(false);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating user.");
      }
    }
  };
  return (
    <div>
      <DialogTitle>{" User Edit"}</DialogTitle>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          margin: "10px",
        }}
        component="form"
        onSubmit={(e) => HandleSubmit(e)}
      >
        <TextField
          fullWidth
          label="Name"
          id="fullWidth"
          className="mb-3"
          name="name"
          value={name}
          onChange={(e) => setUname(e.target.value)}
        />
        <TextField
          fullWidth
          label="username"
          id="fullWidth"
          name="username"
          className="mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          id="fullWidth"
          className="mb-3"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-select-currency"
          sx={{ width: "500px", maxWidth: "100%" }}
          className="mb-4 me-3"
          select
          label="Role"
          name="user_type"
          value={user_type}
          onChange={(e) => setUser_type(e.target.value)}
        >
          <MenuItem value="HR">HR </MenuItem>
          <MenuItem value="H.O.D">Head of Department </MenuItem>
          <MenuItem value="Employ">Employ </MenuItem>
          <MenuItem value="Management">Management </MenuItem>
          <MenuItem value="IT">IT </MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Phone"
          id="priceField"
          className="mb-3"
          name="Phone"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          id="outlined-select-currency"
          sx={{ width: "500px", maxWidth: "100%" }}
          className="mb-4 me-3"
          select
          label="Departments "
          name="DepartmentID"
          value={DepartmentID}
          onChange={(e) => setDepartmentId(e.value.target)}
        >
          {dataDepartment?.map((option) => (
            <MenuItem key={option?._id} value={option?._id}>
              {option?.departmentName}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label="Role "
            name="Role"
            value={DepartmentID}
            onChange={(e) => setDepartmentId(e.value.target)}
          >
            {dataRole?.map((option) => (
              <MenuItem key={option?._id} value={option?._id}>
                {option?.RoleName}
              </MenuItem>
            ))}
          </TextField> */}
      </Box>
    </div>
  );
}
