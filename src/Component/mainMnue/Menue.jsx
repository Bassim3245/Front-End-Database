import { useEffect, useState } from "react";
import "./Menue.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../Layout/AppBar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import { useTranslation } from "react-i18next";

function Manue() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const token = localStorage.getItem("token") || {};
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);
  const getPermission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    console.log(Permission?.permissionIds);
    getPermission();
  }, []);
  const hasPermission = (role, permissions) => {
    return Array.isArray(permissions) && permissions.includes(role);
  };
  const dataRout = [
    {
      image: "/image/task-management.png",
      name: t("mainMune.ProjectsManager"),
      url: "/Home",
      statRote: "ProjectRote",
      checkPermission: roles?.Project_Manger?._id,
    },
    {
      image: "/image/business-report.png",
      name: t("mainMune.Dashboards"),
      url: "/Home",
      statRote: "Dashboard",
      checkPermission: roles?.M_Dashboards?._id,
    },
    {
      image: "/image/folder.png",
      name: t("mainMune.QuantityTables"),
      url: "/Home",
      statRote: "QuantityTables",
      checkPermission: roles?.Quantity_Tables?._id,
    },
    {
      image: "/image/information-technology.png",
      name: t("mainMune.InformationTechnology"),
      url: "/Home",
      statRote: "default",
      checkPermission: roles?.Information_Technology?._id,
    },
    {
      image: "/image/icons8-assistance-64.png",
      name: t("mainMune.Assistance"),
      url: "/Home",
      statRote: "AssistanceSection",
      checkPermission: roles?.Assistance_Task?._id,
    },
    {
      image: "/image/company-department.png",
      name: t("mainMune.TechnicalDepartments"),
      url: "/Home",
      statRote: "TechnicalDepartments",
      checkPermission: roles?.Technical_Departmernt?._id,
    },
    {
      image: "/image/management.png",
      name: t("mainMune.HumanResource"),
      url: "/Home",
      statRote: "default",
      checkPermission: roles?.Human_Resource?._id,
    },
  ];
  const handleRole = (url, state) => {
    localStorage.setItem("statRote", state);
    window.location.href = url;
  };
  return (
    <>
      <div className="">
        <AppBarComponent />
      </div>
      <div className="Project vh-100 d-flex justify-content-center align-items-center">
        <div className="container boxContainer d-flex justify-content-center align-items-center p-5 f-wrap gap-3">
          {dataRout.map((item, index) => {
            const hasAccess = hasPermission(
              item?.checkPermission,
              Permission?.permissionIds
            );
            return hasAccess ? (
              <div className="box" key={index}>
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="ImageLogoButton"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3"
                  onClick={() => handleRole(item?.url, item?.statRote)}
                >
                  {item?.name}
                </Button>
              </div>
            ) : (
              <div key={index} className="box unauthorized">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="ImageLogoButton"
                />
                <Button variant="contained" color="secondary" className="mt-3">
                  {t("Authorized")}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Manue;
