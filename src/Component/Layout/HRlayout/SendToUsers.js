import React, { useState, useEffect } from "react";
import { Share } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { fetchDataUser } from "../../Config/fetchData";
import { useQuery } from "react-query";
export default function SendToUsers(props) {
  const [open, setOpen] = useState(false);
  const [checkData, setCheckData] = useState([]);
  const [isActive, setIsActive] = useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    () => fetchDataUser(users.DepartmentID),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const [dataWithoutHOD, setDataWithoutHOD] = useState([]);
  useEffect(() => {
    setDataWithoutHOD(data?.filter((item) => item?.user_type !== "H.O.D"));
  }, [open]);
  useEffect(() => {
    const initialStates = data?.reduce((acc, item) => {
      acc[item?._id] =
        (isActive && isActive[item._id]) || // Check if isActive is defined before accessing its property
        (checkData &&
          checkData?.userId &&
          checkData?.userId.includes(item?._id));
      return acc;
    }, {});
    setIsActive(initialStates);
  }, [checkData]);
  const handleCheckboxChange = (id) => () => {
    setIsActive((prevState) => ({
      ...prevState,
      [id]: prevState && !prevState[id],
    }));
  };
  const getDataCheckByIdBooKId = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataAllCheckUserByById/${props?.id}`
      );
      setCheckData(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    getDataCheckByIdBooKId();
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async () => {
    try {
      const DepartmentID = users?.DepartmentID;
      const check = checkData ? checkData?._id : null;
      const response = await axios.put(
        `${BackendUrl}/api/CheckDataUserSend/${props?.id}`,
        { isActive, check, DepartmentID },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Share />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"List of Departments"}
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            {dataWithoutHOD ? (
              dataWithoutHOD?.map((item, index) => (
                <div key={item?._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(isActive && isActive[item?._id]) || false}
                        onChange={handleCheckboxChange(item?._id)}
                      />
                    }
                    label={item?.name}
                  />
                  <span className="text-secondary" style={{ fontSize: "13px" }}>
                    {item?.user_type}
                  </span>
                </div>
              ))
            ) : isLoading ? (
              <div>Loading.....</div>
            ) : null}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
