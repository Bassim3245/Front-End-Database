import React, { useEffect, useState } from "react";
import { Box, Divider, Fab, MenuItem } from "@mui/material";
import Header from "../../Layout/Header";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataAllByIdProjectMutual,
  getDataAllByIdProjectMutualDelay,
  getProjectByDepartmentMutualById,
} from "../../../redux/ProjectSlice/ProjectAction";
import moment from "moment";
import { Cached, HourglassBottom, OpenInNew } from "@mui/icons-material";
import DropDownGrid from "../../Config/CustomMennu";
import ModuleFormEditProject from "../../MainFor/ModuleEditProject";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Delete,
  hasPermission,
  renderMenuItem,
  sendProjectEndTime,
} from "../../Config/Function";
import Loader from "Component/Config/Loader";
import GridTemplate from "../../Config/GridTemplet";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
import SendToUsers from "Component/Layout/HRlayout/SendToUsers";
import RefreshButtonData from "../../Config/RefreshButton";
import SendDataProjectToEmployFromHOD from "../../MutualProject/SendDataProjectToEmployFromHOD";

const ProjectMutual = (props) => {
  const [DeleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { setProject, loading, totalProject } = useSelector(
    (state) => state?.Project
  );
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const token = localStorage.getItem("token") || {};
  const [RefreshButton, setRefreshButton] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    getPermmission();
  }, [RefreshButton]);
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const { t } = useTranslation();
  const columns = [
    { field: "_id", headerName: "_id", hideable: false },
    { field: "id", headerName: "ID", width: 44 },
    {
      field: "Code",
      headerName: t("ProjectList.Code"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1,
    },
    {
      field: "DepartmentID",
      headerName: t("ProjectList.Department"),
      minWidth: "150px",
      maxWidth: "175px",
      flex: 1.5,
      renderCell: (params) => {
        return Array.isArray(params.value)
          ? params.value.map((dept) => dept.departmentName).join(", ")
          : params.value;
      },
    },
    {
      field: "nameProject",
      headerName: t("ProjectList.nameProject"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1.5,
    },
    {
      field: "NumberBook",
      headerName: t("ProjectList.NumberBook"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "beneficiary",
      headerName: t("ProjectList.beneficiary"),

      minWidth: "150px",
      maxWidth: "200px",
      flex: 1.5,
    },
    {
      field: "MethodOption",
      headerName: t("ProjectList.MethodOption"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "WorkNatural",
      headerName: t("ProjectList.WorkNatural"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "DateBook",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.DateBook"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "DateClose",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.DateClose"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "startTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.startTime"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "endTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.endTime"),
      minWidth: "100px",
      maxWidth: "150px",
      flex: 1,
    },
    {
      field: "Action",
      headerName: t("ProjectList.Action"),
      headerAlign: "center",
      width: 44,
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
                  () => Delete(params?.row?._id, setDelete, setAnchorEl, token),
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
              {props.label === "getDataMutualToEchDepartment" ? (
                <SendDataProjectToEmployFromHOD />
              ) : null}
              <MenuItem
                onClick={() => HandelOpen(params.row._id)}
                disableRipple
              >
                <OpenInNew size="large" />
                <span className="ms-2"> Open Project</span>
              </MenuItem>
            </DropDownGrid>
          </div>
        );
      },
    },
  ];
  const fetchDataProject = () => {
    // @ts-ignore
    const DepartmentId = info?.DepartmentID;
    const params = { DepartmentId, token, rowsPerPage, page };

    if (props.label === "getDataMutualToEchDepartment") {
      dispatch(getProjectByDepartmentMutualById(params));
      return;
    }

    if (props?.ProjectDelayLabel === "ProjectDelayLabel") {
      dispatch(getDataAllByIdProjectMutualDelay(params));
      return;
    }

    dispatch(getDataAllByIdProjectMutual(params));
  };

  useEffect(() => {
    fetchDataProject();
  }, [RefreshButton]);
  const HandelOpen = (id) => {
    navigate(`/Home/HandelDataMutualProject/${id}`);
  };
  const rows = setProject?.map((item, index) => ({
    id: index + 1,
    ...item,
    WorkNatural: item?.WorkNatural?.workNaturalData,
    DepartmentID: Array.isArray(item?.MutualProjectId?.DepartmentID)
      ? item.MutualProjectId.DepartmentID?.map((department) => ({
          departmentName: department?.departmentName,
        }))
      : item?.MutualProjectId?.DepartmentID,
  }));
  useEffect(() => {
    if (Array.isArray(setProject)) {
      rows?.forEach((item, index) => {
        // console.log(`Item  DepartmentID:`, item?.DepartmentID);
      });
    }
  }, [setProject]);
  return (
    <>
      {loading ? (
        <div
          className="hhhhhhh"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "9999",
          }}
        >
          <Loader />
        </div>
      ) : (
        <Box dir={rtl?.dir}>
          <Header
            title={
              props?.ProjectDelayLabel === "ProjectDelayLabel"
                ? t("tableDelayProject.title")
                : t("ProjectList.title")
            }
            subTitle={
              props?.ProjectDelayLabel === "ProjectDelayLabel"
                ? t("tableDelayProject.title")
                : t("ProjectList.title")
            }
            dir={rtl?.dir}
          />
          <GridTemplate
            rows={rows}
            columns={columns}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            page={page}
            rowsPerPage={rowsPerPage}
            totalProject={totalProject}
          />
        </Box>
      )}
      <RefreshButtonData setRefreshButton={setRefreshButton} />
    </>
  );
};
export default ProjectMutual;
