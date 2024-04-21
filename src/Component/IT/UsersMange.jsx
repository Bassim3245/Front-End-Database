import  { useEffect, useState } from "react";
import Register from "./MangmentInformation/MainData/Register";
import InformationUsers from "./MangmentInformation/MainData/ShowData/informationUsers.jsx";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { useTheme } from "@mui/material";
function UsersMange() {
  const [dataDepartment, setDataDepartment] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [dataEmploy, setDataEmploy] = useState([]);
  const [brief, setBrief] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getData/Department`
        );
        if (response) {
          setDataDepartment(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [departmentName, brief]);
  const theme = useTheme();
  useEffect(() => {}, []);
  return (
    <div className=" w-100 mt-2 container  mb-4">
      <div>
        <div>
          <Register
            DataDepartment={dataDepartment}
            setDataEmploy={setDataEmploy}
            theme={theme}
          />
        </div>
        <div className="mt-5  bg-eee" style={{ marginBottom: "10px" }}>
          <InformationUsers dataEmploy={dataEmploy} theme={theme} />
        </div>
      </div>
    </div>
  );
}
export default UsersMange;
