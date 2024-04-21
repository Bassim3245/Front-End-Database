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
    refetch();
  }, [open]);
  const [checkedItems, setCheckedItems] = React.useState({});

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
    console.log(checkedItems);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    try {
      const response = await axios.put(`${BackendUrl}/api/sendProjectToDepartment`, checkedItems);
      console.log(response);
    console.log(checkedItems);
    } catch (error) {
      console.error(error);
    }
    // setOpen(false);
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
            {"list of Departments"}
          </DialogTitle>
          <DialogContent>
              <FormGroup>
                {data?.map((item, index) => (
                    <FormControlLabel
                      key={item?._id}
                      control={
                        <Checkbox
                          checked={checkedItems[item?.sendProject] || false}
                          onChange={() => handleCheckboxChange(item?._id)}
                        />
                      }
                      label={item?.departmentName}
                    ></FormControlLabel>
                ))}
              </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
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
