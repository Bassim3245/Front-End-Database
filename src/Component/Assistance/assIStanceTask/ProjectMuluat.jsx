import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Divider, MenuItem } from "@mui/material";
import Header from "../../Layout/Header";
import { BackendUrl } from "../../../redux/api/axios";
import axios from "axios";
import StyledDataGrid from "../../Config/StyledDataGrid";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectByDepartmentDelay,
  getProjectByDepartmentMutual,
} from "../../../redux/ProjectSlice/ProjectAction";
import moment from "moment";
import { HourglassBottom, OpenInNew } from "@mui/icons-material";
import DropDownGrid from "../../Config/CustomMennu";
import ModuleFormEditProject from "../../Project/MainFor/ModuleEditProject";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "../../Config/Function";
const ProjectMutual = () => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [DeleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataRoleUser, setDataRoleUser] = useState({});
  const { setProject, loading } = useSelector((state) => state?.Project);
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const token = localStorage.getItem("token") || {};
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    { field: "_id", headerName: "_id", hideable: false },
    { field: "id", headerName: "ID" ,flex: 1, },
    {
      field: "Code",
      headerName: "Code",
    },
    { field: "DepartmentID", headerName: " Department Name",flex: 1 },
    {
      field: "nameProject",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "NumberBook",
      headerName: "Number Book",
      flex: 1,
    },
    {
      field: "beneficiary",
      headerName: "Beneficiary",
      flex: 1,
    },
    {
      field: "MethodOption",
      headerName: "Method Option",
      flex: 1,
    },
    {
      field: "WorkNatural",
      headerName: "Work Naturel",
      flex: 1,
    },

    {
      field: "DateBook",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Date Request",
      flex: 1
    },
    {
      field: "DateClose",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Date Close",
      flex: 1
    },
    {
      field: "startTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Starting Date",
      flex: 1
    },
    {
      field: "endTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Expiry Date",
      flex: 1
    },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <DropDownGrid>
              {info.user_type === "H.O.D" || info.user_type === "management"
                ? [
                    <ModuleFormEditProject
                      key="edit"
                      ProjectData={params?.row}
                    />,
                    <MenuItem
                      key="delete"
                      onClick={() =>
                        Delete(params?.row?._id, token, setDelete, setAnchorEl)
                      }
                      disableRipple
                    >
                      <DeleteIcon />
                      <span className="ms-2">Delete</span>
                    </MenuItem>,
                  ]
                : null}
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => HandelOpen(params.row._id)}
                disableRipple
              >
                <OpenInNew />
                <span className="ms-2"> Open Project</span>
              </MenuItem>
            </DropDownGrid>
            <div>params.row.DepartmentID[0]</div>
          </div>
        );
      },
    },
  ];

  const fetchDataProject = () => {
    // @ts-ignore
    dispatch(getProjectByDepartmentMutual({ info, token }));
  };
  useEffect(() => {
    fetchDataProject();
  }, []);
  const HandelOpen = (id) => {
    navigate(`/OpenProject/${id}`);
  };
  const rows = setProject?.map((item, index) => ({
    id: index + 1,
    ...item,
    DepartmentID: Array.isArray(item?.MutualProjectId?.DepartmentID)
      ? item?.MutualProjectId?.DepartmentID.map((department) => ({
          departmentName: department.departmentName, // Adjust this line based on actual structure
        }))
      : item.DepartmentID, // Preserve original value if it's not an array
  }));
  return (
    <Box>
      <Header title="Project Delays" subTitle="List of Project Delays" />
      <Box sx={{ height: 650, mx: "auto" }}>
        <StyledDataGrid
          checkboxSelection
          //   onRowSelectionModelChange={handleSelectionModelChange}
          gridTheme={{
            mainColor: "rgb(55, 81, 126)",
          }}
          //   rowSelectionModel={selectionModel}
          slots={{
            toolbar: GridToolbar,
          }}
          columnVisibilityModel={{
            _id: false,
          }}
          rows={rows}
          columns={columns}
          getRowId={(row) => row?._id}
        />
      </Box>
    </Box>
  );
};
export default ProjectMutual;
