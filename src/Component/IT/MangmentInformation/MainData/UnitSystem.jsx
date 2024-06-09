import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendUrl } from "../../../../redux/api/axios";
import { ButtonSave } from "../../../Config/Content";
import { useTheme } from "@mui/material";
import ShowDataUnitAndRole from "./ShowData/ShowDataUnitAndRole";
function UnitSystem() {
  const [Unit, setUnit] = useState("");
  const [open, setOpen] = useState(true);
  const [dataSystemUnit, setDataSystemUnit] = useState([]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${BackendUrl}/api/setSystemUnit`, {
        data: { Unit },
      });
      toast(response?.data?.message);
      setUnit("");
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };
  const getDataSystemUnit= async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/UnitSystemShowData`);
      setDataSystemUnit(response?.data?.response);
    } catch (error) {
      toast.error(error?.response?.data?.message);

    }
  };
  // @ts-ignore
  useEffect(() => getDataSystemUnit, [Unit,open]);
  const handleEdit = () => {
    setOpen(!open);
  };
  const theme=useTheme()
  return (
    <div className="">
      {/* <ToastContainer /> */}
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        نظام الوحدات
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
        ادراج الوحدة
      </p>
      <form onSubmit={handleSubmit}>
        <input
         data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          type="text"
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder=" كتابة الوحدة"
          value={Unit}
          onChange={(e) => setUnit(e?.target?.value)}
          required
        />
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <ShowDataUnitAndRole dataSystemUnit={dataSystemUnit} themeMode={theme} 
// @ts-ignore
          label={"UnitSystem"}/>
        </div>
      </form>
    </div>
  );
}

export default UnitSystem;
