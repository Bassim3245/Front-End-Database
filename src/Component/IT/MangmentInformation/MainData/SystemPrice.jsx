import {  useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendUrl } from "../../../../redux/api/axios";
import { ButtonSave } from "../../../Config/Content";
import PriceSystemShowData from "./ShowData/SystemShowData";
import { useTheme } from "@mui/material";
function SystemPrice() {
  const [Price, setPrice] = useState("");
  const [percent, setPercent] = useState("");
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("Price", Price);
      formData.append("percent", percent);
      formData.append("PriceLabel",label);
      const response = await axios.post(
        `${BackendUrl}/api/setSystemPrice`,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      toast(response.data.message);
      setPercent("");
      setPrice("");
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
      {/* <ToastContainer /> */}
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        نظام التسعير
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" >
        ادراج السعر
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-outline flex-fill mb-3">
          <label className="form-label" htmlFor="user_type">
            Type User:
          </label>
          <select
            data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
            className="form-control p-10 rad-6 mb-3 form-select"
            name="user_type"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="Eur">EUR</option>
            <option value="IQD">IQD</option>
          </select>
        </div>
        <input
          type="text"
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder="كتابة سعر "
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          style={{ direction: "rtl" }}
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          className="form-control p-10 rad-6"
          placeholder="كتابة النسبة"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          required
        />
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <PriceSystemShowData 
// @ts-ignore
          themeMode={theme} />
        </div>
      </form>
    </div>
  );
}

export default SystemPrice;
