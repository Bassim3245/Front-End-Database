import * as React from "react";
import { Send } from "@mui/icons-material";
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
import { useQuery } from "react-query";
import { fetchDataAllDepartment } from "Component/Config/fetchData";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";

export default function DepartmentInHr(props) {
  const [open, setOpen] = React.useState(false);
  const [departmentsData, setDepartmentsData] = React.useState([]);
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
  }, [data]);

  const [checkedItems, setCheckedItems] = React.useState({});
  const token = localStorage.getItem("token");

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
  const handleClose = async () => {
    try {
      console.log(checkedItems);
      const response = await axios.put(
        `${BackendUrl}/api/sendProjectToDepartment/${props?.UploadId}`,
        departmentsData.filter((item) => checkedItems[item._id]),
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  const handleClosetest = () => {
    setOpen(false);
  };
  return (
    <>
      <React.Fragment>
        <IconButton onClick={handleClickOpen}>
          <Send />
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
              {departmentsData.map((item, index) => (
                <FormControlLabel
                  key={item._id}
                  control={
                    <Checkbox
                      // disabled={item.sendProject ? true : false}
                      checked={checkedItems[item._id] || item.sendProject ? true : false}
                      onChange={handleCheckboxChange(item._id)}
                    />
                  }
                  label={item.departmentName}
                />
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosetest}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
