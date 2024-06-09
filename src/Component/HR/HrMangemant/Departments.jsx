import * as React from "react";
import { Send, Share } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchDataAllDepartment } from "Component/Config/fetchData";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
export default function DepartmentInHr(props) {
  const [open, setOpen] = React.useState(false);
  const [departmentsData, setDepartmentsData] = React.useState([]);
  const [checkData, setCheckData] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    fetchDataAllDepartment,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  React.useEffect(() => {
    if (data) setDepartmentsData(data);
    console.log(data);
  }, [data]);
  const [checkedItems, setCheckedItems] = React.useState({});
  const [isActive, setIsActive] = React.useState({});
  React.useEffect(() => {
    const initialStates = data?.reduce((acc, item) => {
      acc[item?._id] =
        checkedItems[item._id] ||
        item?.sendProject ||
        (checkData &&
          checkData?.departmentId &&
          checkData?.departmentId?.includes(item?._id));
      return acc;
    }, {});
    setIsActive(initialStates || {});
  }, [checkedItems, data, checkData]);
  const handleCheckboxChange = (id) => () => {
    setIsActive((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state of the department
    }));
  };
  const token = localStorage.getItem("token");
  const getDataCheckByIdBookId = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataAllById/${props?.UploadId}`
      );
      setCheckData(response?.data?.response);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    console.log("asdas",isActive);
    getDataCheckByIdBookId();
  }, [open,]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(()=>{
console.log(isActive);
  },[isActive])

  const handleSubmit = async () => {
    try {
      const check = checkData ? checkData?._id : null;
      const response = await axios.put(
        `${BackendUrl}/api/sendProjectToDepartment/${props?.UploadId}`,
        { isActive, check },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        toast(response?.data?.message);
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
      <MenuItem onClick={handleClickOpen} className="m-0">
        <Share />
        <span className="ms-3">Send</span>
      </MenuItem>
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
            {departmentsData?.map((item) => (
              <FormControlLabel
                key={item?._id}
                control={
                  <Checkbox
                    checked={Boolean(isActive[item?._id])}
                    onChange={handleCheckboxChange(item?._id)}
                  />
                }
                label={item?.departmentName}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
