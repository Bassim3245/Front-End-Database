import {  ButtonSave } from "../../../Config/Content";
import { BackendUrl } from "../../../../redux/api/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ShowData from "./ShowData/ShowDataDepartment";
import { useTheme } from "@mui/material";
const DepartmentInfo = (props) => {
  const brief=props?.brief
  const departmentName=props?.departmentName
  const setBrief=props?.setBrief
  const setDepartmentName=props?.setDepartmentName
  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BackendUrl}/api/setData/Department`,
        {
          departmentName,
          brief,
        }
      );
      toast(response.data.message);
      setDepartmentName("");
      setBrief("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const theme=useTheme()
  return (
    <>
      <div className="">
        <ToastContainer /> 
        <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
          معلومات القسم
        </h2>
        <div className="sec-box mb-15">
          <form onSubmit={handlSubmit}>
            <input
              id="departmentName"
              type="text"
              style={{ direction: "rtl" }}
              className="form-control mt-3 mb-3"
              placeholder="اسم الاقسم"
              value={departmentName}
              data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
              onChange={(e) =>setDepartmentName(e.target.value)}
            />

            <input
              id="brief"
              type="text"
              style={{ direction: "rtl" }}
              className="form-control mt-3 mb-3 "
              data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
              placeholder="مختصر القسم"
              value={brief}
              onChange={(e) =>setBrief(e.target.value)}
            />
          </form>
        </div>
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handlSubmit}>
            Save
          </ButtonSave>
          <ShowData DataShowInformation={props.DataDepartment} label={"الاقسام"} themeMode={theme} />
        </div>
      </div>
    </>
  );
};
export default DepartmentInfo;
