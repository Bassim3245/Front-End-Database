import { useEffect, useState } from "react";
import Register from "./MangmentInformation/MainData/Register";
import InformationUsers from "./MangmentInformation/MainData/ShowData/informationUsers.jsx";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { Fab, useTheme } from "@mui/material";
import { Cached } from "@mui/icons-material";
import { setLanguage } from "../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
function UsersMange() {
  const [dataDepartment, setDataDepartment] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [dataEmploy, setDataEmploy] = useState(false);
  const [brief, setBrief] = useState("");
  const [RefreshButton, setRefreshButton] = useState(false);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
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
  const handleRefresh = () => {
    setRefreshButton((prev) => !prev); // Toggle the refresh state
  };
  return (
    <div className=" w-100 mt-2  mb-4">
      <div>
        <div dir={rtl?.dir}>
          <Register
            DataDepartment={dataDepartment}
            setDataEmploy={setDataEmploy}
            theme={theme}
          />
        </div>
        <div className="mt-5" style={{ marginBottom: "10px" }} dir={rtl?.dir}>
          <InformationUsers
            dataEmploy={dataEmploy}
            theme={theme}
            RefreshButton={RefreshButton}
          />
        </div>
        <div className="posisionRefersh">
          <Fab color="secondary" aria-label="add" onClick={handleRefresh}>
            <span className="refreshButton">
              <Cached />
            </span>
          </Fab>
        </div>
      </div>
    </div>
  );
}
export default UsersMange;
