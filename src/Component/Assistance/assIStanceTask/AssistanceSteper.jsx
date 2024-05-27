import React, { useState } from "react";
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import FormData from "./FormaData";
import MutualProject from "./MutualProject";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
export default function CustomizedSteppers(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [secondaryData, setSecondaryData] = React.useState({});
  const [DateBook, setDateBook] = React.useState("");
  const [DateClose, setDateClose] = useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [formData, setFormData] = React.useState({
    nameProject: "",
    NumberBook: "",
    PersonCharge: "",
    WorkNatural: "",
    beneficiary: "",
    MethodOption: "",
    Stage: "",
    CompletionRate: "",
    LevelPerformance: "",
    Description: "",
    nameProduct: "",
    comments: "",
  });
  const [token, setToken] = React.useState(() => {
    return localStorage.getItem("token") || {};
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BackendUrl}/api/setProjectCommon`,
        { formData, secondaryData, endTime, startTime, DateClose, DateBook },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response && response.data) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleNextAndSaveData = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = ["Select Mode Price Offer", "Create an ad"];
  const dataSteps = [
    // @ts-ignore
    <FormData
      formData={formData}
      // HandleSubmit={HandleSubmit}
      setDateBook={setDateBook}
      setStartTime={setStartTime}
      setDateClose={setDateClose}
      setEndTime={setEndTime}
      handleInputChange={handleInputChange}
    />,
    <MutualProject
      setSecondaryData={setSecondaryData}
      HandleSubmit={HandleSubmit}
    />,
  ];
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    localStorage.setItem("formData",formData)
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  // const HandelSubmitData = () => {
  //   console.log("Ss", MainData);
  //   console.log("Ss", secondaryData);
  // };
  return (
    <Box sx={{ width: "100%" }}>
      <ToastContainer/>
      <Stepper activeStep={activeStep} sx={{ overflowX: "auto" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: "20px", mb: 4 }}>{dataSteps[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={HandleSubmit}>saveData</Button>
            ) : null}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
// import React, { useEffect, useState } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Box, Button, Divider, MenuItem } from "@mui/material";
// import Header from "../Layout/Header";
// import { BackendUrl } from "../../redux/api/axios";
// import axios from "axios";
// import StyledDataGrid from "../Config/StyledDataGrid";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { getProjectByDepartmentDelay } from "../../redux/ProjectSlice/ProjectAction";
// import moment from "moment";
// import { HourglassBottom, OpenInNew } from "@mui/icons-material";
// import DropDownGrid from "../Config/CustomMennu";
// import ModuleFormEditProject from "../Project/MainFor/ModuleEditProject";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Delete } from "../Config/Function";
// import MainForm from "Component/Project/MainFor/Modul";
// const Assistance = () => {
//   const [DeleteItem, setDelete] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dataRoleUser, setDataRoleUser] = useState({});
//   const { setProject, loading } = useSelector((state) => state?.Project);
//   const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
//   const token = localStorage.getItem("token") || {};
//   const { rtl } = useSelector((state) => {
//     return state?.language;
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const columns = [
//     { field: "_id", headerName: "_id", hideable: false },
//     { field: "id", headerName: "ID" },
//     {
//       field: "Code",
//       headerName: "Code",
//     },
//     { field: "DepartmentID", headerName: " Department Name" },
//     {
//       field: "nameProject",
//       headerName: "Project Name",

//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "NumberBook",
//       headerName: "Number Book",
//     },
//     {
//       field: "beneficiary",
//       headerName: "Beneficiary",
//     },
//     {
//       field: "MethodOption",
//       headerName: "Method Option",
//     },
//     {
//       field: "WorkNatural",
//       headerName: "Work Naturel",
//     },

//     {
//       field: "DateBook",
//       valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//       headerName: "Date Request",
//     },
//     {
//       field: "DateClose",
//       valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//       headerName: "Date Close",
//     },
//     {
//       field: "startTime",
//       valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//       headerName: "Starting Date",
//     },
//     {
//       field: "endTime",
//       valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//       headerName: "Expiry Date",
//     },
//     {
//       field: "Action",
//       headerName: "Action",
//       headerAlign: "center",
//       renderCell: (params) => {
//         return (
//           <div>
//             <DropDownGrid>
//               {info.user_type === "H.O.D" || info.user_type === "management"
//                 ? [
//                     <ModuleFormEditProject
//                       key="edit"
//                       ProjectData={params?.row}
//                     />,
//                     <MenuItem
//                       key="delete"
//                       onClick={() =>
//                         Delete(params?.row?._id, token, setDelete, setAnchorEl)
//                       }
//                       disableRipple
//                     >
//                       <DeleteIcon />
//                       <span className="ms-2">Delete</span>
//                     </MenuItem>,
//                   ]
//                 : null}
//               <Divider sx={{ my: 0.5 }} />
//               <MenuItem
//                 onClick={() => HandelOpen(params.row._id)}
//                 disableRipple
//               >
//                 <OpenInNew />
//                 <span className="ms-2"> Open Project</span>
//               </MenuItem>
//             </DropDownGrid>
//           </div>
//         );
//       },
//     },
//   ];

//   const fetchDataProject = () => {
//     // @ts-ignore
//     dispatch(getProjectByDepartmentDelay({ info, token }));
//   };
//   useEffect(() => {
//     fetchDataProject();
//   }, []);
//   const HandelOpen = (id) => {
//     navigate(`/OpenProject/${id}`);
//   };
//   const rows = setProject?.map((item, index) => ({
//     id: index + 1,
//     ...item,
//     DepartmentID: item?.DepartmentID?.departmentName,
//   }));
//   return (
//     <Box>
//       <Header title="Project Delays" subTitle="List of Project Delays" />
//       <Box className={"mb-2"}>
//               <MainForm fetchDataProject={fetchDataProject} />
//           </Box>
//       <Box sx={{ height: 650, mx: "auto" }}>
//         <StyledDataGrid
//           checkboxSelection
//           //   onRowSelectionModelChange={handleSelectionModelChange}
//           gridTheme={{
//             mainColor: "rgb(55, 81, 126)",
//           }}
//           //   rowSelectionModel={selectionModel}
//           slots={{
//             toolbar: GridToolbar,
//           }}
//           columnVisibilityModel={{
//             _id: false,
//           }}
//           rows={rows}
//           columns={columns}
//           getRowId={(row) => row._id}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Assistance;
