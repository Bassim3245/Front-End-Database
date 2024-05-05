// import React, { useEffect, useState } from "react";
// import { Badge, Box, Drawer } from "@mui/material";
// import { IconButton, Typography } from "@mui/material";

// import SendToUsers from "./SendToUsers";
// export default function ReceiveData(props) {
//   const [state, setState] = useState({
//     right: false,
//   });


//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{
//         width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
//         zIndex: "99",
//       }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <>
//
//       </>
//     </Box>
//   );

//   return (
//     <div>
//       <React.Fragment>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="inherit"
//           sx={{ marginRight: 2 }}
//           onClick={toggleDrawer("right", true)}
//         >
//           <Badge badgeContent={props?.votes} color="error">
//             <MoveToInbox />
//           </Badge>
//         </IconButton>
//         <Drawer
//           sx={{ zIndex: "9999" }}
//           anchor={"right"}
//           open={state.right}
//           // onClose={toggleDrawer("right", false)}
//         >
//           {list("right")}
//         </Drawer>
//       </React.Fragment>
//     </div>
//   );
// }
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Badge, Typography } from "@mui/material";
import { CloudDownload, MoveToInbox, Share } from "@mui/icons-material";
import { useQuery } from "react-query";
import { getDatFileUploadByIdDepartment } from "../../Config/fetchData";
import { formatDate, getFileIcon } from "Component/Config/Function";
import { BackendUrl } from "../../../redux/api/axios";
import SendToUsers from "./SendToUsers";
const drawerWidth = 340;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
export default function ReceiveData(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const id = props?.info?.DepartmentID;
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "getDatFileUploadByIdDepartment",
    () => getDatFileUploadByIdDepartment(id), // Wrap getDatFileUploadByIdDepartment inside an arrow function
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
    const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = `${BackendUrl}/${file}`;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleDrawerOpen}
      >
        <Badge color="error">
          <MoveToInbox />
        </Badge>
      </IconButton>
      <Drawer
        sx={{
          zIndex: "9999",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <main>
          <Box className="content w-full">
            <Typography
              variant="h3"
              component="h3"
              className="p-relative "
              sx={{ textAlign: "center" }}
            >
              Files
            </Typography>
            <div className="files-page d-flex m-20 gap-20">
              <div className="files-content d-grid gap-20">
                {data?.length > 0 ? (
                  Array.isArray(data) &&
                  data?.map((item, index) => (
                    <Box className="file bg-white p-10 rad-10" key={item?._id}>
                      <IconButton
                        onClick={() => handleDownload(item?.UploadBookId?.file)}
                      >
                        <CloudDownload />
                      </IconButton>
                      <div className="icon txt-c">
                        {getFileIcon(item?.UploadBookId.file)}
                      </div>
                      <div className="txt-c mb-10 fs-14">
                        {item?.UploadBookId?.BookName}
                      </div>
                      <div className="info between-flex">
                        <Typography className="c-grey fs-13">
                          {item?.userId?.name}
                        </Typography>
                        <span>
                          {" "}
                          <SendToUsers />
                        </span>
                      </div>
                      <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
                        <span>{formatDate(item?.UploadBookId?.createdAt)}</span>
                      </div>
                    </Box>
                  ))
                ) : (
                  <Typography>No Data Found</Typography>
                )}
              </div>
            </div>
          </Box>
        </main>
      </Drawer>
    </Box>
  );
}
