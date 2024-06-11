import "bootstrap/dist/css/bootstrap.min.css";
import "./Component/style/fremwork.css";
import Login from "./Component/Auth/login";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removed unused imports
import PrivateRoutes from "./Component/middleware/praivetRout";
import PersonalProfile from "./Component/Auth/Profile/informationUser.js";
import OpenProject from "./Component/Project/ProjectInformation/OpenProject.jsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Menu from "./Component/mainMnue/Menue.jsx";
import MainForm from "./Component/MainFor/Modul.jsx";
import Event from "./Component/Event/EventInformation.jsx";
import AnalyticsData from "./Component/Taples/AnaLitcsData/AnalyitcsInformation.jsx";
import BusinessPersonsMain from "./Component/Taples/BusinessPersons/BusinessPersonsInformation.jsx";
import PerformsnceAnalytcsMain from "./Component/Taples/PerformanceAnalitcs/PerformsnceAnalytcsInformation.jsx";
import PageNotFound from "./PageNotFound.js";
import Root from "./Component/Layout/Root.jsx";
import Projects from "./Component/Project/ProjectList.jsx";
import Product from "./Component/Product/ProductList.jsx";
import Dashboard from "./Component/Dashboard/dashboard/Dashboard.jsx";
import SettingInformation from "./Component/IT/Mange.jsx";
import UsersMange from "./Component/IT/UsersMange";
import Permission from "./Component/IT/MangmentInformation/MainData/ShowData/RoleAndPermission/Permission";
import Manger from "Component/Manger/Manger";
import Authorized from "Component/middleware/Anuthorized";
import Files from "Component/HR/HrMangemant/Files";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import FilesReceived from "./Component/HR/HrMangemant/FileRecievd/FilesRecived";
import Received from "Component/HR/HrMangemant/FileRecievd/Ricevid";
import ProjectDelay from "./Component/ProjectDelay/ProjectDelay";
import Assistance from "Component/Assistance/assIStanceTask/AssistanceSteper";
import ProjectMutual from "Component/Assistance/assIStanceTask/ProjectMuluat";
import DepartmentsList from "./Component/Assistance/TechnicalDepartments/DepartmentsList";
import ModuleEditUsers from "./Component/IT/MangmentInformation/MainData/ShowData/RoleAndPermission/EditUser";
import GetAllDataDelaysProject from "./Component/Assistance/TechnicalDepartments/getAllDataDelaysProject";
import GetAllDataProjectNotDelay from "./Component/Assistance/TechnicalDepartments/GetAllDataProjectNotDelay";
import ProjectsListAssistance from "./Component/Assistance/TechnicalDepartments/ProjectsList";
import ProjectDelayListAssistance from "./Component/Assistance/TechnicalDepartments/ProjectDelayListAssistacnce";
import MutualProjectClint from "Component/MutualProject/MutualProjectClaint";
import SetPermissionToGroup from "Component/IT/MangmentInformation/MainData/ShowData/RoleAndPermission/SetPermisition";
import HandelDataMutualProject from "Component/MutualProject/HandelDataMutualProject";
export default function App() {
  const { Rol } = useSelector((state) => state?.user);
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [stateRote, setStatRote] = useState(localStorage.getItem("statRote"));
  const queryClient = new QueryClient();
  const renderDefaultRoute = () => {
    switch (info?.user_type || Rol) {
      case "H.O.D":
        if (stateRote === "ProjectRote") {
          return <Route index element={<Projects />} />;
        } else if (stateRote === "QuantityTables") {
          return <Route index element={<BusinessPersonsMain />} />;
        } else if (stateRote === "Dashboard") {
          return <Route index element={<Dashboard />} />;
        } else {
          return null;
        }
      case "management":
      case "Employ":
        return <Route index element={<Projects />} />;
        break;
      case "IT":
        return <Route index element={<UsersMange />} />;
        break;
      case "HR":
        return <Route index element={<Files />} />;
        break;
      case "Assistance":
        if (stateRote === "AssistanceSection") {
          return <Route index element={<Assistance />} />;
        } else if (stateRote === "TechnicalDepartments") {
          return <Route index element={<DepartmentsList />} />;
        } else {
          return null;
        }
        break;
      default:
        return <Route path="Authorized" element={<Authorized />} />;
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/Home" element={<Root />}>
              {renderDefaultRoute()}
              <Route path="ProjectList" element={<Projects />} />
              <Route path="ProductList" element={<Product />} />
              <Route path="ProjectDelay" element={<ProjectDelay />} />
              <Route path="MainForm" element={<MainForm />} />
              <Route path="Event" element={<Event />} />
              <Route
                path="GeneralDataInformation"
                element={<SettingInformation />}
              />
              <Route path="MangeUser" element={<UsersMange />} />
              <Route path="AnalyticsData" element={<AnalyticsData />} />
              <Route path="Profile" element={<PersonalProfile />}></Route>
              <Route path="PermissionUsers/:id" element={<Permission />} />
              <Route
                path="BusinessPersonsMain"
                element={<BusinessPersonsMain />}
              />
              <Route
                path="PerformsnceAnalytcsMain"
                element={<PerformsnceAnalytcsMain />}
              />
              <Route path="HR" element={<Files />} />
              <Route path="OpenProject/:id" element={<OpenProject />} />
              <Route path="FilesReceived" element={<FilesReceived />} />
              <Route path="Assistance" element={<Assistance />} />
              <Route path="ProjectMutual" element={<ProjectMutual />} />
              <Route
                path="GetAllDataProjectNotDelay"
                element={<GetAllDataProjectNotDelay />}
              />
              <Route
                path="ProjectsListAssistance/:id"
                element={<ProjectsListAssistance />}
              />
              <Route
                path="ProjectDelayListAssistance/:id"
                element={<ProjectDelayListAssistance />}
              />
              <Route path="OpenProject/:id" element={<OpenProject />} />
              <Route path="Received/:id" element={<Received />} />
              <Route path="Authorized" element={<Authorized />} />
              <Route path="ModuleEditUsers/:id" element={<ModuleEditUsers />} />
              <Route
                path="getAllDataDelaysProject"
                element={<GetAllDataDelaysProject />}
              />
              <Route
                path="MutualProjectClint"
                element={<MutualProjectClint />}
              />
               <Route
                path="SetPermissionToGroup/:id"
                element={<SetPermissionToGroup />}
              />
                  <Route
                path="HandelDataMutualProject/:id"
                element={<HandelDataMutualProject />}
              />
            </Route>
            <Route path="/Edit/:id" element={<Edit />} />

            <Route path="/Main/menu" element={<Menu />} />
            <Route path="/Manger" element={<Manger />} />
            <Route path="/Authorized" element={<Authorized />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
