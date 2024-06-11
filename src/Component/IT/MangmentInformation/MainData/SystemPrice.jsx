import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendUrl } from "../../../../redux/api/axios";
import { ButtonSave } from "../../../Config/Content";
import PriceSystemShowData from "./ShowData/SystemShowData";
import { useTheme } from "@mui/material";
function SystemPrice() {
  const [typePrice, setTypePrice] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("typePrice", typePrice);

      const response = await axios.post(
        `${BackendUrl}/api/setSystemPrice`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast(response?.data?.message);
        setTypePrice("");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };

  const handleEdit = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  return (
    <div className="">
      {/* < /> */}
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        نظام التسعير
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15">ادراج السعر</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder="نوع السعر "
          value={typePrice}
          onChange={(e) => setTypePrice(e.target.value)}
          required
        />

        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <PriceSystemShowData
            // @ts-ignore
            themeMode={theme}
          />
        </div>
      </form>
    </div>
  );
}

export default SystemPrice;
