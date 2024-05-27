import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Divider, MenuItem } from "@mui/material";
import Header from "../Layout/Header";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import StyledDataGrid from "../Config/StyledDataGrid";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartmentDelay } from "../../redux/ProjectSlice/ProjectAction";
import moment from "moment";
import { HourglassBottom, OpenInNew } from "@mui/icons-material";
import DropDownGrid from "../Config/CustomMennu";
import ModuleFormEditProject from "../Project/MainFor/ModuleEditProject";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "../Config/Function";
const ProjectDelay = () => {
  const [DeleteItem, setDelete] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
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
    { field: "id", headerName: "ID" },
    {
      field: "Code",
      headerName: "Code",
    },
    { field: "DepartmentID", headerName: " Department Name" },
    {
      field: "nameProject",
      headerName: "Project Name",

      cellClassName: "name-column--cell",
    },
    {
      field: "NumberBook",
      headerName: "Number Book",
    },
    {
      field: "beneficiary",
      headerName: "Beneficiary",
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
      headerName: "Date Request",
    },
    {
      field: "DateClose",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Date Close",
    },
    {
      field: "startTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Starting Date",
    },
    {
      field: "endTime",
      valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
      headerName: "Expiry Date",
    },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
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
          </div>
        );
      },
    },
  ];

  const fetchDataProject = () => {
    // @ts-ignore
    dispatch(getProjectByDepartmentDelay({ info, token }));
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
    DepartmentID: item?.DepartmentID?.departmentName,
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
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default ProjectDelay;
