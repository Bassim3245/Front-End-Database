import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "../../../../Config/Content";
import { BackendUrl } from "../../../../../redux/api/axios";
import axios from "axios";
import { toast } from "react-toastify";
export default function ShowData() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [dataMethodOption, setDataMethodOption] = React.useState([]);
  const handleClickOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};
  const getDataMethodOtion = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getDataMethodOption`);
      setDataMethodOption(response?.data?.response);

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  // @ts-ignore
  React.useEffect(() => getDataMethodOtion, [open]);
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        البيانات المدرجة
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <Table striped bordered hover dir="rtl" variant={theme?.palette?.mode === "dark" ? "dark" : ""}>
            <thead>
              <tr>
                <>
                  <th>#</th>
                  <th>Method otion</th>
                  <th>Action</th>
                </>
              </tr>
            </thead>
            <tbody>
              {dataMethodOption?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.MethodOption}</td>
                  <td>
                    <ButtonSave className="ms-3">حذف</ButtonSave>
                    <ButtonClearState>تعديل</ButtonClearState>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>{" "}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            غلق
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
