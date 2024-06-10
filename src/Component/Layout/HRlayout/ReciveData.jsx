import * as React from "react";
import {
  Box,
  Drawer,
  IconButton,
  styled,
  useTheme,
  Badge,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MoveToInbox } from "@mui/icons-material";
import { useQuery } from "react-query";
import { getDatFileUploadByIdDepartment } from "../../Config/fetchData";
import DatarecivedByHod from "./DatarecivedByHod";
import DataFileEmploy from "./DataFileEmploy";
import { ToastContainer } from "react-toastify";
const drawerWidth = 370;
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

  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer/>
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
          {props?.info?.user_type === "H.O.D" ? (
            <DatarecivedByHod data={data} />
          ) : (
            <DataFileEmploy info={props?.info} />
          )}
        </main>
      </Drawer>
    </Box>
  );
}
