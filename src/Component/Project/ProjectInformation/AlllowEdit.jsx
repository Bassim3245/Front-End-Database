import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ButtonClearState, ButtonSave } from "../../Config/Content";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function AllowEdit(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const handleSend = async () => {
    try {
      const url =
        props?.label === "AllowDelete"
          ? `${BackendUrl}/api/productRequestDeletePage/${props?.Id}`
          : `${BackendUrl}/api/ProductRequestEdit/${props?.Id}`;

      // Sending the request based on the label
      const response = await axios?.put(url, {}, { headers: { token } });

      // Show success toast notification
      toast?.success(response.data.message);
      setOpen(false);
    } catch (error) {
      // Show error toast notification
      toast?.error(error.response.data.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      {props?.label === "AllowEdit" ? (
        <ButtonSave onClick={handleOpen}>طلب تعديل</ButtonSave>
      ) : props?.label === "AllowDelete" ? (
        <ButtonClearState onClick={handleOpen}>طلب حذف</ButtonClearState>
      ) : null}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h3 className="text-center m-4"> ارسال طلب {props?.title}</h3>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonClearState className="" onClick={handleSend}>
              ارسال
            </ButtonClearState>
            <ButtonSave className="" onClick={handleClose}>
              غلق
            </ButtonSave>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
