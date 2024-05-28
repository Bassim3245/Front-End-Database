import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  styled,
  useTheme,
  Typography,
  Tooltip,
  List,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  Analytics,
  CloudUpload,
  Dataset,
  Event,
  GroupAdd,
  Home,
  HourglassBottom,
  PermDataSetting,
  Person,
  StackedLineChart,
  WaterfallChart,
} from "@mui/icons-material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice/userSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { BackendUrl } from "../../redux/api/axios";
import { setLanguage } from "../../redux/LanguageState";
import { getRoleRedux, setRolesRedux } from "../../redux/RoleSlice/RoleSlice";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import Loader from "Component/Config/Loader";
import { hasPermission } from "Component/Config/Function";
const drawerWidth = 340;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideBar = ({ open, handleDrawerClose }) => {
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state?.language;
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  let Route1 = [];
  let Route2 = [];
  const [stateRote, setStatRote] = useState(localStorage.getItem("statRote"));
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const token = localStorage.getItem("token") || {};
  const { Permission, roles, loading } = useSelector(
    (state) => state?.RolesData
  );
  // @ts-ignore
const location=useLocation()
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    console.log(Permission?.permissionIds);
    getPermmission();
  }, [navigate,location?.pathname]);
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRoleRedux());
    console.log(stateRote);
  }, [dispatch]);
  useEffect(() => {
    const updatedRoles = {
      ...roles,
      Add_General_Data: {
        ...roles.Add_General_Data,
        value: true, // Update the value
      },
    };
    dispatch(setRolesRedux(updatedRoles));
  }, []);

  switch (stateRote) {
    case "default":
      Route1 = [
        {
          text: "List Projects",
          icon: <Dataset />,
          path: "ProjectList",
          checkPermission: roles?.View_data_project?._id,
        },
        {
          text: "Management Users",
          icon: <GroupAdd />,
          path: "MangeUser",
          checkPermission: roles?.ADD_Data_Users?._id,
        },
        {
          text: "General Data",
          icon: <PermDataSetting />,
          path: "GeneralDataInformation",
          checkPermission: roles?.Add_General_Data?._id,
        },
        {
          text: "Files",
          icon: <Dataset />,
          path: "HR",
          checkPermission: roles?.View_data_project?._id,
        },
        {
          text: "Products received",
          icon: <ReceiptOutlinedIcon />,
          path: "FilesReceived",
          checkPermission: roles?.view_data_Received?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    case "Dashboard":
      Route1 = [
        {
          text: "Dashboard",
          icon: <Home />,
          path: "/Home",
          checkPermission: roles?.view_data_dashboard?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    case "ProjectRote":
      Route1 = [
        {
          text: " List Projects",
          icon: <Dataset />,
          path: "ProjectList",
          checkPermission: roles?.View_data_project?._id,
        },
        {
          text: "Projects delivered ",
          icon: <ReceiptOutlinedIcon />,
          path: "ProductList",
          checkPermission: roles?.view_data_send?._id,
        },
        {
          text: "Delayed projects",
          icon: <HourglassBottom />,
          path: "ProjectDelay",
          checkPermission: roles?.view_data_delay_Project?._id,
        },

        {
          text: "Event",
          icon: <Event />,
          path: "Event",
          checkPermission: roles?.view_notifction?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    case "QuantityTables":
      Route1 = [
        {
          text: "Business requirements analysis",
          icon: <Analytics />,
          path: "AnalyticsData",
          checkPermission: roles?.view_data_Business_requirements_analysis?._id,
        },
        {
          text: "Business representatives",
          icon: <WaterfallChart />,
          path: "BusinessPersonsMain",
          checkPermission: roles?.view_data_Business_representatives?._id,
        },
        {
          text: "Performance analytics",
          icon: <StackedLineChart />,
          path: "PerformsnceAnalytcsMain",
          checkPermission: roles?.view_data_Performance_analytics?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    case "AssistanceSection":
      Route1 = [
        {
          text: "Assistance",
          icon: <Dataset />,
          path: "Assistance",
          checkPermission: roles?.form_Mutual_projects?._id,
        },
        {
          text: "Project Mutual",
          icon: <Dataset />,
          path: "ProjectMutual",
          checkPermission: roles?.view_data_mutual_projects?._id,
        },
        {
          text: "Files",
          icon: <CloudUpload />,
          path: "HR",
          checkPermission: roles?.view_filles?._id,
        },
        {
          text: "Products received",
          icon: <ReceiptOutlinedIcon />,
          path: "FilesReceived",
          checkPermission:
            roles?.data_project_send_from_HOD_to_HR_Assistance?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    case "TechnicalDepartments":
      Route1 = [
        {
          text: "departments list",
          icon: <Analytics />,
          path: "DepartmentsList",
          checkPermission: roles?.Technical_Department?._id,
        },
        {
          text: "Event",
          icon: <Event />,
          path: "Event",
          checkPermission: roles?.Event_Assistance?._id,
        },
        {
          text: "Profile",
          icon: <Person />,
          path: "profile",
          checkPermission: roles?.show_Profile?._id,
        },
      ];
      break;
    default:
      navigate("*");
  }
  const routeTest = [];
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    let isAuthorized = routeTest.every((item) =>
      hasPermission(item?.checkPermission, Permission?.permissionIds)
    );
    if (!isAuthorized) {
      setAuthorized(false);
      navigate("/Home/Authorized");
    }
  }, [routeTest, Permission, navigate]);
  if (!authorized) {
    return null;
  }
  return (
    // Anchor to male from dirction right
    <>
      {loading && <Loader />}
      <Drawer variant="permanent" open={open} anchor={rtl?.anchor}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Avatar
          sx={{
            mx: "auto",
            width: open ? 88 : 44,
            height: open ? 88 : 44,
            my: 1,
            border: "2px solid grey",
            transition: "0.25s",
          }}
          alt="Remy Sharp"
          src={
            info.image
              ? `${BackendUrl}/${info.image}`
              : "https://media.allure.com/photos/5a26c1d8753d0c2eea9df033/3:4/w_1262,h_1683,c_limit/mostbeautiful.jpg"
          }
        />
        <Typography
          align="center"
          sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}
        >
          {info.name}
        </Typography>
        <Typography
          align="center"
          sx={{
            fontSize: open ? 15 : 0,
            transition: "0.25s",
            color: theme.palette.info.main,
          }}
        >
          {info.user_type}
        </Typography>
        <Divider />
        <List dir={rtl.dir}>
          {Route1?.map((item) => {
            // Check if the user has permission to view this item
            const hasAccess = hasPermission(
              item?.checkPermission,
              Permission?.permissionIds
            );
            return (
              hasAccess && (
                <React.Fragment key={item.path}>
                  <ListItem
                    disablePadding
                    sx={{ display: "block" }}
                    dir={rtl.dir}
                  >
                    <Tooltip title={open ? null : item.text} placement="left">
                      <ListItemButton
                        onClick={() => {
                          navigate(item.path);
                        }}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          dir: rtl?.dir,
                          bgcolor:
                            location.pathname === item.path
                              ? theme.palette.mode === "dark"
                                ? grey[800]
                                : grey[300]
                              : null,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                </React.Fragment>
              )
            );
          })}
        </List>
        <Divider />
        <List dir={rtl.dir}>
          {Route2?.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block" }}
              dir={rtl.dir}
            >
              <Tooltip title={open ? null : item.text} placement="left">
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? grey[800]
                          : grey[300]
                        : null,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List dir={rtl.dir}>
          <ListItem disablePadding sx={{ display: "block" }} dir={rtl.dir}>
            <Tooltip title={open ? null : "Logout"} placement="left">
              <ListItemButton
                onClick={() => {
                  dispatch(logout());
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
        <Button
          sx={{
            position: "absolute",
            bottom: "0px",
            mb: "10px",
            backgroundColor: "#e91e63",
            color: "white",
          }}
          onClick={() => {
            localStorage.removeItem("statRote");
            navigate("/Main/menu");
          }}
        >
          {" "}
          back
        </Button>
      </Drawer>
    </>
  );
};
export default SideBar;
