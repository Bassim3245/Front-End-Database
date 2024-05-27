// @ts-ignore
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import moment from "moment";
import MainForm from "./MainFor/Modul";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartment } from "../../redux/ProjectSlice/ProjectAction";
import Header from "../Layout/Header.jsx";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Divider, MenuItem, useTheme } from "@mui/material";
import ModuleFormEditProject from "./MainFor/ModuleEditProject";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Config/Loader";
import "./ProjectStyle.css";
import { setLanguage } from "../../redux/LanguageState";
import { useTranslation } from "react-i18next";
import { HourglassBottom, OpenInNew } from "@mui/icons-material";
import DropDownGrid from "Component/Config/CustomMennu";
import { Delete, hasPermission, sendProjectEndTime } from "../Config/Function";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
const Projects = () => {
  const { setProject, loading } = useSelector((state) => state?.Project);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const token = localStorage.getItem("token") || {};
  const dispatch = useDispatch();
  const [DeleteItem, setDelete] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const theme = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fetchDataProject = () => {
    const departmentID = info.DepartmentID;
    dispatch(getProjectByDepartment({ departmentID, info, token }));
  };
  const renderMenuItem = (key, onClick, IconComponent, text) => (
    <MenuItem key={key} onClick={onClick} disableRipple>
      <IconComponent />
      <span className="ms-2">{text}</span>
    </MenuItem>
  );
  const columns = [
    { field: "_id", headerName: "_id", hideable: false },
    { field: "id", headerName: "ID", width: 33 },
    {
      field: "Code",
      headerName: "Code",
    },
    { field: "DepartmentID", headerName: " Department Name", flex: 1.5 },
    {
      field: "nameProject",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "NumberBook",
      headerName: "Number Book",
    },
    {
      field: "beneficiary",
      headerName: "Beneficiary",
      flex: 2,
    },
    {
      field: "MethodOption",
      headerName: "Method Option",
    },
    {
      field: "WorkNatural",
      headerName: "Work Naturel",
    },
    {
      field: "DateBook",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      flex: 1,
      headerName: "Date Request",
    },
    {
      field: "DateClose",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      flex: 1,
      headerName: "Date Close",
    },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <DropDownGrid>
              {hasPermission(
                roles?.Update_data_project?._id,
                Permission?.permissionIds
              ) && (
                <ModuleFormEditProject key="edit" ProjectData={params?.row} />
              )}

              {hasPermission(
                roles?.Delete_data_project?._id,
                Permission?.permissionIds
              ) &&
                renderMenuItem(
                  "delete",
                  () => Delete(params?.row?._id, setDelete, setAnchorEl),
                  DeleteIcon,
                  "Delete"
                )}

              {hasPermission(
                roles?.Delay_Projects?._id,
                Permission?.permissionIds
              ) &&
                renderMenuItem(
                  "projectDelay",
                  () =>
                    sendProjectEndTime(
                      params?.row?._id,
                      token,
                      setDelete,
                      setAnchorEl
                    ),
                  HourglassBottom,
                  "Project Delay"
                )}
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => HandelOpen(params.row._id)}
                disableRipple
              >
                <OpenInNew />
                <span className="ms-2"> Open Project</span>
              </MenuItem>
            </DropDownGrid>
          </div>
        );
      },
    },
  ];
  const HandelOpen = (id) => {
    navigate(`/Home/OpenProject/${id}`);
  };
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    console.log(Permission?.permissionIds);
    getPermmission();
  }, []);
  useEffect(() => fetchDataProject(), [dispatch, DeleteItem, setDelete]);
  const rows = setProject?.map((item, index) => ({
    id: index + 1,
    ...item,
    DepartmentID: item.DepartmentID?.departmentName,
  }));

  return (
    <div style={{ width: "100%" }} dir={rtl?.dir}>
      {loading ? (
        <div className="position-absolute" style={{ top: "50%", left: "50%" }}>
          <Loader />
        </div>
      ) : (
        <Box className="containerCustomGridTable">
          <Header
            title={t("ProjectTable.title")}
            subTitle={t("ProjectTable.subTitle")}
            dir={rtl?.dir}
          />
          <ToastContainer />
          <Box className={"mb-2"}>
            {/* {info?.user_type === "H.O.D" || info?.user_type === "management" ? (
              <MainForm fetchDataProject={fetchDataProject} />
            ) : null} */}
            {hasPermission(
              roles?.Add_data_project?._id,
              Permission?.permissionIds
            ) ? (
              <MainForm fetchDataProject={fetchDataProject} />
            ) : null}
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              "& .MuiDataGrid-cellContent": {
                // textOverflow: "initial !important",
              },
              "& .css-128fb87-MuiDataGrid-toolbarContainer": {
                // textOverflow: "initial !important",
                backgroundColor: "rgb(55, 81, 126)",
              },
              "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root": {
                color: "white",
              },
            }}
          >
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              // gridTheme={{
              //   mainColor: "rgb(55, 81, 126)",
              // }}
              onStateChange={(state) => {
                // console.log("asdadasdasdasd====>", state);
              }}
              theme={theme}
              rows={rows}
              // @ts-ignore
              columns={columns}
              columnVisibilityModel={{
                _id: false,
              }}
              getRowId={(row) => row.id}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};
export default Projects;
