import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "../../../../Config/Content";
import { toast } from "react-toastify";
import { BackendUrl } from "../../../../../redux/api/axios";
import axios from "axios";
export default function ShowData(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [message, setMessage] = React.useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const deleteById = async (id) => {
    try {
      const response = await axios.delete(
        `${BackendUrl}/api/deleteByIdWorkN/${id}`
      );
      if (response) {
        setMessage(response?.data?.message);
        toast(message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
        <DialogContent>
          <Table
            striped
            bordered
            hover
            dir="rtl"
            variant={`${theme?.palette?.mode === "dark" ? "dark" : ""}`}
          >
            <thead>
              <tr>
                <>
                  <th>#</th>
                  <th>اسم الجهة المستفيدة</th>
                  <th>اجراء</th>
                </>
              </tr>
            </thead>
            <tbody>
              {props?.DataNatural?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data?.workNaturalData}</td>
                  <td>
                    <ButtonSave
                      className="ms-3"
                      onClick={()=>deleteById(data?._id)}
                    >
                      حذف
                    </ButtonSave>
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
