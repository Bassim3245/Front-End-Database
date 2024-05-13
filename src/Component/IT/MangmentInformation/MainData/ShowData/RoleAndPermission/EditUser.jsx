import * as React from "react";
import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { BackendUrl } from "../../../../../../redux/api/axios";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { getallDepartment } from "../../../../../../redux/DepartmentState/DepartmentAction";
import { getDataUserById } from "../../../../..//Config/fetchData";
import { useQuery } from "react-query";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ModuleEdit(props) {
  const { department, isLoading } = useSelector((state) => {
    return state?.Department;
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token") || {};
  const id = props?.id;
  const { isLoadingDataUser, data, isError, error, isFetching } = useQuery(
    "DataUser",
    () => getDataUserById(id, token),
    {
      // refetchInterval: 500,
    }
  );

  const [name, setUname] = useState("");
  const [username, setUsername] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUser_type] = useState("");
  const [DepartmentID, setDepartmentId] = useState("");
  const [dataDepartment, setDataDepartment] = useState([]);
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
  // React.useEffect(() => {
  //   // @ts-ignore
  //   console.log("thise data", data);
  //   dispatch(getallDepartment());
  // }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getData/Department`
        );
        if (response) {
          setDataDepartment(response.data);
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
        `${BackendUrl}/api/updateUserById/${id}`,
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
        console.log(response.data);
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
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button className="btn" onClick={handleClickOpen}>
        {" "}
        <Edit />{" "}
      </Button>
      <Dialog
        open={open}
        // @ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        TransitionProps={{ timeout: 600 }}
      >
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
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={(e) => HandleSubmit(e)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
