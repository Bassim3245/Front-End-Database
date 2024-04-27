import { useEffect } from "react";
import "./Menue.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useGetDataInfo } from "../../redux/api/axios";
import AppBarComponent from "../Layout/AppBar";
import { Button } from "@mui/material";
function Product() {
  const Navigate = useNavigate();
  const info = useGetDataInfo();
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh();
    };
  }, []);
  const handleManger = () => {
    if (info?.user_type === "Manger") {
      Navigate("/Manger");
    } else {
      Navigate("/Authorized");
    }
  };
  const handleHR = () => {
    if (info?.user_type === "HR") {
      Navigate("/HR");
    } else {
      Navigate("/Authorized");
    }
  };
  const handleAutomate = () => {
    if (
      info?.user_type === "Employ" ||
      info?._user_type === "management" ||
      info?._user_type === "H.O.D"
    ) {
      Navigate("/");
    } else {
      Navigate("/Authorized");
    }
  };
  return (
    <>
      <div className="">
        {" "}
        <AppBarComponent />
      </div>
      <div className="Project vh-100 d-flex justify-content-center align-items-center">
        <div className="container boxContainer d-flex justify-content-center align-items-center  p-5 f-wrap gap-3">
          <div className="box ">
            <img
              src="/image/management.png"
              alt="Management"
              className="ImageLogoButton"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={handleHR}
            >
              HR
            </Button>
          </div>
          <div className="box ">
            <img
              src="/image/icons8-manager-100.png"
              alt="Management"
              className="ImageLogoButton"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={handleManger}
            >
              Manger
            </Button>
          </div>
          <div className="box ">
            <img
              src="/image/61394c37c8e507151a368d31_workflow-process.jpg"
              alt="Management"
              className="ImageLogoButton"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={handleAutomate}
            >
              Automate Operations
            </Button>
          </div>
          <div className="box ">
            <img
              src="/image/icons8-assistance-64.png"
              alt="Management"
              className="ImageLogoButton"
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={handleManger}
            >
              Assistance
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
