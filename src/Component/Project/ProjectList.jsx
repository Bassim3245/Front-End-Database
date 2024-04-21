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
import { GridToolbar } from "@mui/x-data-grid";
import { Box, Button, useTheme } from "@mui/material";
import ModuleFormEditProject from "./MainFor/ModuleEditProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Config/Loader";
import StyledDataGrid from "../Config/StyledDataGrid";
import "./ProjectStyle.css";
import { setLanguage } from "../../redux/LanguageState";
import { useTranslation } from "react-i18next";
const Projects = () => {
  const { setProject, loading } = useSelector((state) => state.Project);
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
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
  const columns = [
    { field: "_id", headerName: "_id" },
    { field: "id", headerName: "ID", width: 33 },
    {
      field: "Code",
      headerName: "Code",
    },
    { field: "DepartmentID", headerName: " Department Name", flex: 2 },
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
    },
    {
      field: "MethodOption",
      headerName: "Method Option",
    },
    {
      field: "WorkNutrel",
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
      width: 250,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "250px",
              maxWidth: "100%",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              gap: "10px",
              flexWrap: "wrap",
            }}
            className="responsiveBOXaCTION"
          >
            {info.user_type === "H.O.D" || info.user_type === "management" ? (
              <>
                <Button
                  onClick={() => Delete(params?.row?._id)}
                  variant="contained"
                >
                  <DeleteIcon />
                </Button>
                <ModuleFormEditProject ProjectData={params?.row} />
              </>
            ) : null}
            <Button
              variant="contained"
              onClick={() => HandelOpen(params?.row?._id)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                style={{ fontSize: "21px" }}
              />
            </Button>
          </Box>
        );
      },
    },
  ];

  async function Delete(_id) {
    axios({
      method: "DELETE",
      url: `${BackendUrl}/api/deleteProject/${_id}`,
      headers: {
        token: token,
      },
    })
      .then((response) => {
        setDelete(toast.success(response?.data?.message));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const HandelOpen = (id) => {
    navigate(`/OpenProject/${id}`);
  };
  const fetchDataProject = () => {
    dispatch(getProjectByDepartment({ info, token }));
  };
  useEffect(() => fetchDataProject(), [dispatch, DeleteItem, setDelete]);
  const rows = setProject.map((item, index) => ({
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
            <MainForm fetchDataProject={fetchDataProject} />
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              "& .MuiDataGrid-cellContent": {
                textOverflow: "initial !important",
              },
            }}
          >
            <StyledDataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              gridTheme={{
                mainColor: "rgb(55, 81, 126)",
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
//     <>
//       <div className=" vh-100  " style={{ background: "#f1f5f9" }}>
//         <div className="  mb-2 w-100 d-flex justify-content-between ">
//           <Search
// // @ts-ignore
//           setProject={setProject} />
//           {info.user_type === "management" || info.user_type === "H.O.D" ? (
//             <MainForm fetchDataProject={fetchDataProject} />
//           ) : null}
//         </div>
//         <ToastContainer />
//         <TableContainer component={Paper}>
//           {!isLoading ? (
//             <Table aria-label="customized table">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>Action</StyledTableCell>
//                   <StyledTableCell>رمز الكتاب</StyledTableCell>
//                   {info.user_type === "H.O.D" ? (
//                     <>
//                       <StyledTableCell>مستوا الانجاز</StyledTableCell>
//                       <StyledTableCell>مستوا الاداء</StyledTableCell>
//                     </>
//                   ) : info.user_type === "management" ? (
//                     <>
//                       <StyledTableCell>مستوا الانجاز</StyledTableCell>
//                       <StyledTableCell>مستوا الاداء</StyledTableCell>
//                     </>
//                   ) : null}
//                   <StyledTableCell>تاريخ الانتهاء</StyledTableCell>
//                   <StyledTableCell>تاريخ الكتاب</StyledTableCell>
//                   <StyledTableCell>طريقة التحصيل</StyledTableCell>
//                   <StyledTableCell>طبيعة العمل</StyledTableCell>
//                   <StyledTableCell>الجهة المستفيدة</StyledTableCell>
//                   <StyledTableCell>رقم الطلب</StyledTableCell>
//                   <StyledTableCell>اسم المشروع</StyledTableCell>
//                   <StyledTableCell>اسم القسم</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               {setProject && Array.isArray(setProject) ? (
//                 setProject?.map(
//                   ({
//                     _id,
//                     DepartmentID,
//                     nameProject,
//                     NumberBook,
//                     beneficiary,
//                     MethodOption,
//                     CompletionRate,
//                     LevelPerformance,
//                     WorkNaturel,
//                     DateBook,
//                     DateClose,
//                     Code,
//                   }) => (
//                     <TableBody key={_id}>
//                       <StyledTableRow>
//                         <StyledTableCell>
//                           {info.user_type === "H.O.D" ? (
//                             <div className="d-flex justify-content-center f-wrap gap-2">
//                               <Button
//                                 onClick={() => Delete(_id)}
//                                 variant="outlined"
//                               >
//                                 <DeleteIcon />
//                               </Button>
//                               <ModuleFormEditProject
//                                 ProjectData={setProject}
//                                 ProjectID={_id}
//                               />
//                               <Button
//                                 variant="outlined"
//                                 onClick={() =>
//                                   // @ts-ignore
//                                   handelOpen(_id, DepartmentID._id, nameProject)
//                                 }
//                               >
//                                 <FontAwesomeIcon
//                                   icon={faPenToSquare}
//                                   size="lg"
//                                   style={{ fontSize: "21px" }}
//                                 />
//                               </Button>
//                             </div>
//                           ) : info.user_type === "management" ? (
//                             <>
//                               <div className="d-flex justify-content-center f-wrap gap-2">
//                                 <Button
//                                   variant="outlined"
//                                   onClick={() => handleEdit(_id)}
//                                 >
//                                   request edit
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   onClick={() =>
//                                     handelOpen(
//                                       _id,
//                                       // @ts-ignore
//                                       DepartmentID._id,
//                                       nameProject
//                                     )
//                                   }
//                                 >
//                                   open
//                                 </Button>
//                               </div>
//                             </>
//                           ) : (
//                             <Button
//                               variant="outlined"
//                               onClick={() =>
//                                 // @ts-ignore
//                                 handelOpen(_id, DepartmentID._id, nameProject)
//                               }
//                             >
//                               open
//                             </Button>
//                           )}
//                         </StyledTableCell>
//                         <StyledTableCell>{Code}</StyledTableCell>
//                         {info.user_type === "H.O.D" ? (
//                           <>
//                             <StyledTableCell>{CompletionRate}</StyledTableCell>
//                             <StyledTableCell>
//                               {LevelPerformance}
//                             </StyledTableCell>
//                           </>
//                         ) : info.user_type === "management" ? (
//                           <>
//                             <StyledTableCell>{CompletionRate}</StyledTableCell>
//                             <StyledTableCell>
//                               {LevelPerformance}
//                             </StyledTableCell>
//                           </>
//                         ) : null}
//                         <StyledTableCell>
//                           {formatDate(DateClose)}
//                         </StyledTableCell>
//                         <StyledTableCell>
//                           {formatDate(DateBook)}
//                         </StyledTableCell>
//                         <StyledTableCell>{MethodOption}</StyledTableCell>
//                         <StyledTableCell>{WorkNutrel}</StyledTableCell>
//                         <StyledTableCell>{beneficiary}</StyledTableCell>
//                         <StyledTableCell>{NumberBook}</StyledTableCell>
//                         <StyledTableCell>{nameProject}</StyledTableCell>
//                         <StyledTableCell>
//                           {DepartmentID.departmentName}
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     </TableBody>
//                   )
//                 )
//               ) : (
//                 <div>No Department</div>
//               )}
//             </Table>
//           ) : (
//             <div>loading...</div>
//           )}
//         </TableContainer>
//       </div>
//     </>
