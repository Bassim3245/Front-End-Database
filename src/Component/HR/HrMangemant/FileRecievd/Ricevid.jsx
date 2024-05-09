import HrLayoutAppBr from "Component/Layout/HRlayout/HRLayoutAppBar";
import "../../Style/HrHomePage.css";
import DataFileINHrSection from "./showOfferPrice";
import { useParams } from "react-router";
function Received() {
  const {id}=useParams()
  return (
    <div className="vh-100">
      <HrLayoutAppBr />
      <div className="HomeHr h-100 ">
        <div className="m-5 w-100 h-100 pt-3 ContainerInfoHr" style={{overflow:"auto", backgroundColor:"#f1f5f9"}}>
            <DataFileINHrSection id={id}/>
        </div>
      </div>
    </div>
  );
}
export default Received;
