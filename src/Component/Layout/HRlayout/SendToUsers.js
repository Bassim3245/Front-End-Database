import * as React from "react";
import { Send, Share } from "@mui/icons-material";
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
import { BackendUrl, useGetDataInfo } from "../../../redux/api/axios";
import { fetchDataUser } from "../../Config/fetchData";
import { useQuery } from "react-query";
export default function SendToUsers(props) {
  const [open, setOpen] = React.useState(false);
  const [departmentsData, setDepartmentsData] = React.useState([]);
  const [checkData, setCheckData] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [users, setUsers] = React.useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    () => fetchDataUser(users.DepartmentID),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const [checkedItems, setCheckedItems] = React.useState({});
  const token = localStorage.getItem("token");
  const getDataCheckByIdBooKId = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataAllById/${props?.UploadId}`
      );
      setCheckData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDataCheckByIdBooKId();
  }, [open]);

  const handleCheckboxChange = (itemId) => (event) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: event.target.checked,
    }));
    setDepartmentsData((prevDepartmentsData) =>
      prevDepartmentsData.map((item) =>
        item._id === itemId ? { ...item, checked: event.target.checked } : item
      )
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/sendProjectToDepartment/${props?.UploadId}`,
        departmentsData.filter((item) => checkedItems[item._id]),
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
      <React.Fragment>
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
              {data
                ?.filter((item) => item.user_type !== "H.O.D") // Filter out items with user_type === "H.O.D"
                .map((item, index) => (
                  <div key={item?._id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // disabled={checkData ? true : false}
                          // checked={
                          //   checkedItems[item._id] ||
                          //   item.sendProject ||
                          //   (checkData &&
                          //     checkData?.departmentId &&
                          //     checkData?.departmentId?.includes(item._id))
                          //     ? true
                          //     : false
                          // }
                          onChange={handleCheckboxChange(item?._id)}
                        />
                      }
                      label={item?.name}
                    />
                    <span className="text-secondary" style={{fontSize:"13px"}}>{item?.user_type}</span>
                  </div>
                ))}
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
      </React.Fragment>
    </>
  );
}
