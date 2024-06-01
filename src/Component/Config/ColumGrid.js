// import ModuleFormEditProject from "Component/Project/MainFor/ModuleEditProject";
// import DropDownGrid from "./CustomMennu";
// import { hasPermission, renderMenuItem, sendProjectEndTime } from "./Function";
// import { GridDeleteIcon } from "@mui/x-data-grid";
// import { HourglassBottom, OpenInNew } from "@mui/icons-material";
// import { Divider, MenuItem } from "@mui/material";
// import moment from "moment";

// const columns = [
//   { field: "_id", headerName: "_id", hideable: false },
//   { field: "id", headerName: "ID" },
//   {
//     field: "Code",
//     headerName: "Code",
//   },
//   { field: "DepartmentID", headerName: " Department Name" },
//   {
//     field: "nameProject",
//     headerName: "Project Name",

//     cellClassName: "name-column--cell",
//   },
//   {
//     field: "NumberBook",
//     headerName: "Number Book",
//   },
//   {
//     field: "beneficiary",
//     headerName: "Beneficiary",
//   },
//   {
//     field: "MethodOption",
//     headerName: "Method Option",
//   },
//   {
//     field: "WorkNatural",
//     headerName: "Work Naturel",
//   },

//   {
//     field: "DateBook",
//     valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//     headerName: "Date Request",
//   },
//   {
//     field: "DateClose",
//     valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//     headerName: "Date Close",
//   },
//   {
//     field: "startTime",
//     valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//     headerName: "Starting Date",
//   },
//   {
//     field: "endTime",
//     valueFormatter: (params) => moment(params.value).format("YYYY/MM/DD"),
//     headerName: "Expiry Date",
//   },
//   {
//     field: "Action",
//     headerName: "Action",
//     headerAlign: "center",
//     renderCell: (params) => {
//       return (
//         <div>
//           <DropDownGrid>
//             {hasPermission(
//               roles?.Update_data_project?._id,
//               Permission?.permissionIds
//             ) && <ModuleFormEditProject key="edit" ProjectData={params?.row} />}

//             {hasPermission(
//               roles?.Delete_data_project?._id,
//               Permission?.permissionIds
//             ) &&
//               renderMenuItem(
//                 "delete",
//                 () => Delete(params?.row?._id, setDelete, setAnchorEl, token),
//                 GridDeleteIcon,
//                 "Delete"
//               )}
//             {hasPermission(
//               roles?.Delay_Projects?._id,
//               Permission?.permissionIds
//             ) &&
//               renderMenuItem(
//                 "projectDelay",
//                 () =>
//                   sendProjectEndTime(
//                     params?.row?._id,
//                     token,
//                     setDelete,
//                     setAnchorEl
//                   ),
//                 HourglassBottom,
//                 "Project Delay"
//               )}
//             <Divider sx={{ my: 0.5 }} />
//             <MenuItem onClick={() => HandelOpen(params.row._id)} disableRipple>
//               <OpenInNew />
//               <span className="ms-2"> Open Project</span>
//             </MenuItem>
//           </DropDownGrid>
//         </div>
//       );
//     },
//   },
// ];
