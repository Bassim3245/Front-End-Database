import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { VisuallyHiddenInput } from "../../Config/Content";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ModulToploadFilePricedTechnical({
  ProjectId,
  DepartmentID,
  t
}) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("filePricedTechnical", file);
      formData.append("projectId", ProjectId);
      formData.append("departmentId", DepartmentID);
      const response = await axios.post(
        `${BackendUrl}/api/setPricedTechnical`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        toast(response?.data?.response);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
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
        {t("ProductList.ButtonUpload")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Priced Techniical offers"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{ width: "100%", mt: "6px" }}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
