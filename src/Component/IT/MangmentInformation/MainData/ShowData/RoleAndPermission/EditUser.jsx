import * as React from "react";
import { useState, useEffect } from "react";
import { Box, MenuItem, TextField, DialogTitle } from "@mui/material";
import axios from "axios";
import { BackendUrl } from "../../../../../../redux/api/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllDataUserById } from "../../../../../../redux/userSlice/authActions";

export default function ModuleEditUsers(props) {
  const { dataUserById, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [departmentID, setDepartmentId] = useState("");
  const [dataDepartment, setDataDepartment] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getAllDataUserById({ id, token }));
    }
  }, [id, dispatch, token]);

  useEffect(() => {
    if (dataUserById) {
      setName(dataUserById.name || "");
      setUsername(dataUserById.username || "");
      setPhone(dataUserById.Phone || "");
      setPassword(dataUserById.password || "");
      setUserType(dataUserById.user_type || "");
      setDepartmentId(dataUserById.DepartmentID || "");
    }
  }, [dataUserById]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/getData/Department`);
        if (response) {
          setDataDepartment(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("Phone", phone);
      formData.append("user_type", userType);
      formData.append("DepartmentID", departmentID);

      const response = await axios.put(
        `${BackendUrl}/api/updateUserById/${id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.response));
        props.setDataUser(true);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while updating user.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <DialogTitle>User Edit</DialogTitle>
      <Box
        sx={{ maxWidth: "100%", margin: "10px" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Name"
          className="mb-3"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Username"
          className="mb-3"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          className="mb-3"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone"
          className="mb-3"
          name="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          fullWidth
          select
          label="Role"
          className="mb-4 me-3"
          name="user_type"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="H.O.D">Head of Department</MenuItem>
          <MenuItem value="Employ">Employee</MenuItem>
          <MenuItem value="Management">Management</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Departments"
          className="mb-4 me-3"
          name="DepartmentID"
          value={departmentID}
          onChange={(e) => setDepartmentId(e.target.value)}
        >
          {dataDepartment.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.departmentName}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </Box>
      </Box>
    </div>
  );
}
