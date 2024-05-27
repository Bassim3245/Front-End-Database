import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackendUrl } from "../../../../redux/api/axios";
import { ButtonSave } from "../../../Config/Content";
import { useTheme } from "@mui/material";
import ShowDataUnitAndRole from "./ShowData/ShowDataUnitAndRole";
import { useQuery } from "react-query";
import { getRole } from "../../../Config/fetchData";
function RoleSystem() {
  const [RoleName, setRoleName] = useState("");
  const [open, setOpen] = useState(true);
  const [RoleData, setRoleData] = useState([]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${BackendUrl}/api/SetRole`, {
        RoleName: RoleName,
      });
      toast(response?.data?.message);
      setRoleName("");
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
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
      <ToastContainer />
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        نظام الصلاحيات
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
        ادراج الصلاحية
      </p>
      <form onSubmit={handleSubmit}>
        <input
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          type="text"
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6 mb-3"
          placeholder=" كتابة الصلاحية"
          value={RoleName}
          onChange={(e) => setRoleName(e?.target?.value)}
          required
        />
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <ShowDataUnitAndRole themeMode={theme} label={"Role"} />
        </div>
      </form>
    </div>
  );
}

export default RoleSystem;
