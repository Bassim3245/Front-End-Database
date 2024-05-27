import { useEffect, useState } from "react";
import "./Menue.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../Layout/AppBar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
function Product() {
  const Navigate = useNavigate();
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const token = localStorage.getItem("token") || {};
  const { Rol } = useSelector((state) => state.user);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);
  const dispatch = useDispatch();
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    console.log(Permission?.permissionIds);
    getPermmission();
  }, []);
  const hasPermission = (role, permissions) => {
    console.log(role);
    console.log(permissions);
    return Array.isArray(permissions) && permissions.includes(role);
  };
  let Route = [];
  switch (Rol || info?.user_type) {
    case "IT":
      Route = [
        {
          image: "/image/information-technology.png",
          name: "Information Technology",
          url: info?.user_type === "IT" ? "/Home" : "/Authorized",
          statRote: "default",
        },
      ];
      break;
    case "Assistance":
      Route = [
        {
          image: "/image/icons8-assistance-64.png",
          name: "Assistance",
          url: info?.user_type === "Assistance" ? "/Home" : "/Authorized",
          statRote: "AssistanceSection",
        },
        {
          image: "/image/company-department.png",
          name: "Technical Departments",
          url: info?.user_type === "Assistance" ? "/Home" : "/Authorized",
          statRote: "TechnicalDepartments",
        },
      ];
      break;
    case "H.O.D":
      Route = [
        {
          image: "/image/task-management.png",
          name: "Projects Manager",
          url: info?.user_type === "H.O.D" ? "/Home" : "/Authorized",
          statRote: "ProjectRote",
        },
        {
          image: "/image/business-report.png",
          name: "Dashboards",
          url: info?.user_type === "H.O.D" ? "/Home" : "/Authorized",
          statRote: "Dashboard",
        },
        {
          image: "/image/folder.png",
          name: "Store Data",
          url:
            info?.user_type === "management" || info?.user_type === "H.O.D"
              ? "/Home"
              : "/Authorized",
          statRote: "QuantityTables",
        },
        {
          image: "/image/task-management.png",
          name: "Projects received ",
          url: info?.user_type === "Employ" ? "/Manger" : "/Authorized",
          statRote: "default",
        },
        {
          image: "/image/inventory-management.png",
          name: "Projects delivered",
          url: info?.user_type === "management" ? "/Manger" : "/Authorized",
          statRote: "default",
        },
        {
          image: "/image/deadline.png",
          name: "Delayed projects",
          url: info?.user_type === "H.O.D" ? "/Manger" : "/Authorized",
          statRote: "default",
        },
      ];
      break;
    case "Employ":
      Route = [
        {
          image: "/image/task-management.png",
          name: "Projects Manager",
          url: info?.user_type === "Employ" ? "/Home" : "/Authorized",
          statRote: "ProjectRote",
        },
      ];
      break;
    case "HR":
      Route = [
        {
          image: "/image/management.png",
          name: "Human Resource",
          url: info?.user_type === "HR" ? "/Home" : "/Authorized",
          statRote: "default",
        },
      ];
      break;

    default:
      Navigate("*");
      break;
  }
  const dataMenu = [
    {
      image: "/image/inventory-management.png",
      name: "Projects delivered",
      url: info?.user_type === "management" ? "/Manger" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/deadline.png",
      name: "Delayed projects",
      url: info?.user_type === "H.O.D" ? "/Manger" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/information-technology.png",
      name: " Information Technology",
      url: info?.user_type === "IT" ? "/Home" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/task-management.png",
      name: "Projects Manger ",
      url: info?.user_type === "H.O.D" ? "/Home" : "/Authorized",
      statRote: "ProjectRote",
    },
    {
      image: "/image/business-report.png",
      name: "Dashboards ",
      url: info?.user_type === "H.O.D" ? "/Dashboards" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/folder.png",
      name: " Store Data ",
      url:
        info?.user_type === "management" || info?.user_type === "H.O.D"
          ? "/Home"
          : "Authorized",
      statRote: "QuantityTables",
    },
  ];
  const dataRout = [
    {
      image: "/image/task-management.png",
      name: "Projects Manager",
      url: info?.user_type === "H.O.D" ? "/Home" : "/Authorized",
      statRote: "ProjectRote",
    },
    {
      image: "/image/business-report.png",
      name: "Dashboards",
      url: info?.user_type === "H.O.D" ? "/Home" : "/Authorized",
      statRote: "Dashboard",
    },
    {
      image: "/image/folder.png",
      name: "Store Data",
      url:
        info?.user_type === "management" || info?.user_type === "H.O.D"
          ? "/Home"
          : "/Authorized",
      statRote: "QuantityTables",
    },
    {
      image: "/image/task-management.png",
      name: "Projects received ",
      url: info?.user_type === "Employ" ? "/Manger" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/inventory-management.png",
      name: "Projects delivered",
      url: info?.user_type === "management" ? "/Manger" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/deadline.png",
      name: "Delayed projects",
      url: info?.user_type === "H.O.D" ? "/Manger" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/information-technology.png",
      name: "Information Technology",
      url: info?.user_type === "IT" ? "/Home" : "/Authorized",
      statRote: "",
    },
    {
      image: "/image/icons8-assistance-64.png",
      name: "Assistance",
      url: info?.user_type === "Assistance" ? "/Home" : "/Authorized",
      statRote: "AssistanceSection",
    },
    {
      image: "/image/company-department.png",
      name: "Technical Departments",
      url: info?.user_type === "Assistance" ? "/Home" : "/Authorized",
      statRote: "TechnicalDepartments",
    },
    {
      image: "/image/task-management.png",
      name: "Projects Manager",
      url: info?.user_type === "Employ" ? "/Home" : "/Authorized",
      statRote: "ProjectRote",
    },
    {
      image: "/image/management.png",
      name: "Human Resource",
      url: info?.user_type === "HR" ? "/Home" : "/Authorized",
      statRote: "",
    },
  ];
  const handleRole = (url, state) => {
    localStorage.setItem("statRote", state);
    window.location.href = url;
  };
  return (
    <>
      <div className="">
        {" "}
        <AppBarComponent />
      </div>
      <div className="Project vh-100 d-flex justify-content-center align-items-center">
        <div className="container boxContainer d-flex justify-content-center align-items-center  p-5 f-wrap gap-3">
          {Route.map((item, index) => (
            <div className="box " key={index}>
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
          ))}
        </div>
      </div>
    </>
  );
}
export default Product;
