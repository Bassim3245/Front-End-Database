import HrLayoutAppBr from "Component/Layout/HRlayout/HRLayoutAppBar";
import "./Style/HrHomePage.css";
import { Outlet } from "react-router";
function HR() {
  return (
    <div className="vh-100">
      <HrLayoutAppBr />
      <div className="HomeHr h-100 ">
        <div className="m-5 w-100 h-100 pt-3 ContainerInfoHr" style={{overflow:"auto", backgroundColor:"#f1f5f9"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HR;
