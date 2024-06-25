import { useEffect, useState } from "react";
import { Box, Divider, MenuItem } from "@mui/material";
import Header from "../Layout/Header";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartmentDelay } from "../../redux/ProjectSlice/ProjectAction";
import moment from "moment";
import { HourglassBottom, OpenInNew } from "@mui/icons-material";
import DropDownGrid from "../Config/CustomMennu";
import ModuleFormEditProject from "../MainFor/ModuleEditProject";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Delete,
  hasPermission,
  renderMenuItem,
  sendProjectEndTime,
} from "../Config/Function";
import GridTemplate from "Component/Config/GridTemplet";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import { useTranslation } from "react-i18next";
const ProjectDelay = () => {
  const [DeleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { setProject, loading } = useSelector((state) => state?.Project);
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const LabelCancelSendProjectDelay="CancelSendProjectDelay";
  const token = localStorage.getItem("token") || {};
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  useEffect(() => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, []);
  const columns = [
    { field: "_id", headerName: "_id", hideable: false },
    { field: "id", headerName: "ID", width: 33 },
    {
      field: "Code",
      headerName: t("ProjectList.Code"),
      flex: 1,
    },
    { field: "DepartmentID", headerName: " Department Name" },
    {
      field: "nameProject",
      headerName: t("ProjectList.nameProject"),
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "NumberBook",
      headerName: t("ProjectList.NumberBook"),
      flex: 1,
    },
    {
      field: "beneficiary",
      headerName: t("ProjectList.beneficiary"),
      flex: 2,
    },
    {
      field: "MethodOption",
      headerName: t("ProjectList.MethodOption"),
      flex: 1,
    },
    {
      field: "WorkNatural",
      headerName: t("ProjectList.DateBook"),
      flex: 1,
    },

    {
      field: "DateBook",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.DateBook"),
      flex: 1,
    },
    {
      field: "DateClose",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.DateClose"),
      flex: 1,
    },
    {
      field: "startTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.startTime"),
      flex: 1,
    },
    {
      field: "endTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: t("ProjectList.endTime"),
      flex: 1,
    },
    {
      field: "Action",
      headerName: t("ProjectList.Action"),
      headerAlign: "center",
      flex: 1,
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
                      setAnchorEl,
                      LabelCancelSendProjectDelay
                    ),
                  HourglassBottom,
                  " Project Cancel Delay"
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
  const fetchDataProject = () => {
    // @ts-ignore
    const departmentID = info?.DepartmentID;
    dispatch(getProjectByDepartmentDelay({ departmentID, info, token }));
  };
  useEffect(() => {
    fetchDataProject();
  }, []);
  const HandelOpen = (id) => {
    navigate(`/Home/OpenProject/${id}`);
  };
  const rows = setProject?.map((item, index) => ({
    id: index + 1,
    ...item,
    DepartmentID: item?.DepartmentID?.departmentName,
  }));
  return (
    <Box dir={rtl?.dir}>
      <Header
        title={t("tableDelayProject.title")}
        subTitle={t("tableDelayProject.subTitle")}
      />
      <GridTemplate rows={rows} columns={columns} />
    </Box>
  );
};
export default ProjectDelay;
