import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ButtonClearState, ButtonSave } from "../../Config/Content";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Style for the modal box
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

// AllowEdit component
export default function AllowDelate(props) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSend = async () => {
    if (!token) {
      toast.error("Token is missing");
      return;
    }
    try {
      // Determine the URL based on the label
      const url = `${BackendUrl}/api/productRequestDeletePage/${props?.Id}`;

      // Send the request
      const response = await axios.put(url, {}, { headers: { token } });

      // Show success toast notification
      toast.success(response?.data?.message);
      setOpen(false);
    } catch (error) {
      // Show error toast notification
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <ButtonClearState onClick={handleOpen}>
        {t("ProductList.table.RequistDelete")}
      </ButtonClearState>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h3 className="text-center m-4">
            {t("ProductList.table.RequistSendDelete")}{" "}
          </h3>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonClearState onClick={handleSend}>
              {" "}
              {t("ProductList.table.send")}
            </ButtonClearState>
            <ButtonSave onClick={handleClose}>
              {" "}
              {t("ProductList.table.close")}
            </ButtonSave>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
