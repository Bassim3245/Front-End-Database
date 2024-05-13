// @ts-ignore
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router";
import moment from "moment";
import { BackendUrl } from "../../redux/api/axios";
import MainForm from "./MainFor/Modul";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartment } from "../../redux/ProjectSlice/ProjectAction";
import Header from "../Layout/Header.jsx";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Divider, MenuItem, useTheme } from "@mui/material";
import ModuleFormEditProject from "./MainFor/ModuleEditProject";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Config/Loader";
import StyledDataGrid from "../Config/StyledDataGrid";
import "./ProjectStyle.css";
import { setLanguage } from "../../redux/LanguageState";
import { useTranslation } from "react-i18next";
import { OpenInNew } from "@mui/icons-material";
import Swal from "sweetalert2";
import DropDownGrid from "Component/Config/CustomMennu";
const Projects = () => {
  const { setProject, loading } = useSelector((state) => state?.Project);
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
    // @ts-ignore
    dispatch(getProjectByDepartment({ info, token }));
  };
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
              {info.user_type === "H.O.D" || info.user_type === "management"
                ? [
                    <ModuleFormEditProject
                      key="edit"
                      ProjectData={params?.row}
                    />,
                    <MenuItem
                      key="delete"
                      onClick={() => Delete(params?.row?._id)}
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
  async function Delete(_id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    try {
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // @ts-ignore
        const response = await axios({
          method: "DELETE",
          url: `${BackendUrl}/api/deleteProject/${_id}`,
          headers: {
            token: token,
          },
        });

        setDelete(toast.success(response?.data?.message));
        setAnchorEl(null);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const HandelOpen = (id) => {
    navigate(`/OpenProject/${id}`);
  };
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
            {info?.user_type === "H.O.D" || info?.user_type === "management" ? (
              <MainForm fetchDataProject={fetchDataProject} />
            ) : null}
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              "& .MuiDataGrid-cellContent": {
                // textOverflow: "initial !important",
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
