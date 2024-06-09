import  { useEffect, useState } from "react";
import DepartmentInfo from "./MangmentInformation/MainData/DepartmentInf";
import Minstries from "./MangmentInformation/MainData/InsertMinstries";
import MethodOption from "./MangmentInformation/MainData/MethodOption";
import NturalInformation from "./MangmentInformation/MainData/NturalInformation";
import SystemPrice from "./MangmentInformation/MainData/SystemPrice";
import ImageInsert from "./MangmentInformation/MainData/ImageInsert";
import UnitSystem from "./MangmentInformation/MainData/UnitSystem";
import "./style.css";
import { useTheme } from "@mui/material";
import RoleSystem from "./MangmentInformation/MainData/Role";
function SettingInformation() {
  const [departmentName, setDepartmentName] = useState("");
  const [brief, setBrief] = useState("");
  const theme = useTheme();
  return (
    <>
      <div className=" w-100 ">
        <div className="d-flex justify-content-center">
          <h1 className="">ادارة المعلومات الاساسية</h1>
        </div>
        <div className="  settings-page  gap-20  mt-5 ">
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <Minstries theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <DepartmentInfo
              theme={theme}
              departmentName={departmentName}
              setDepartmentName={setDepartmentName}
              brief={brief}
              setBrief={setBrief}
            />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <MethodOption theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <NturalInformation theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <SystemPrice theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <ImageInsert 
// @ts-ignore
            theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <UnitSystem theme={theme} />
          </div>
          <div
            className={`p-20 ${
              theme.palette.mode === "dark" ? "dark" : ""
            } rad-10`}
          >
            <RoleSystem theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingInformation;
