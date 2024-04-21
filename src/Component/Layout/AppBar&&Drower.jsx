import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  Toolbar,
  IconButton,
  Divider,
  Typography,
  ListItemButton,
  ListItemText,
  ListItem,
  CssBaseline,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import {
  AccountBox,
  Analytics,
  Business,
  Notifications,
  Settings,
  TableView,
} from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@mui/material";
import { getDataDepartmentID } from "../../redux/DepartmentState/DepartmentAction";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
const drawerWidth = 240;
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
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
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
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();
  const [getDataNot, setDataNot] = React.useState(
    localStorage.getItem("votes")
  );
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const DepartmentID = info.DepartmentID;
  const [Padding, setPadding] = React.useState("0");
  const { department } = useSelector((state) => state.Department);
  const handleDrawerOpen = () => {
    setOpen(true);
    setPadding("150px");
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNonfiction = () => {
    Navigate("/Event");
  };
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDataDepartmentID(DepartmentID));
    console.log(department);
  }, []);
  const [votes, setVotes] = React.useState(0);
  const [departmentId, setDepartmentId] = React.useState(null);
  React.useEffect(() => {
    const pusher = new Pusher("981e65db6d4dc90983b4", {
      cluster: "us3",
      encrypted: true,
    });
    const channel = pusher.subscribe("poll");
    channel.bind("vote", (eventData) => {
      console.log("departmentId:", eventData?.departmentId);
      if (eventData?.departmentId == info?.DepartmentID) {
        setDepartmentId(eventData?.departmentId);
        setVotes((prevVotes) => {
          return prevVotes ? prevVotes + 1 : 0;
        });
      }
      toast(eventData?.message || null);
    });
    return () => {
      pusher.unsubscribe("poll");
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {info.name}({info.user_type})
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <div className="d-flex justify-content-center align-items-center ">
              <Typography sx={{ fontSize: "20px" }}>
                {department.departmentName}
              </Typography>
            </div>
            {info.user_type === "H.O.D" ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  sx={{ marginRight: 2 }}
                  onClick={handleNonfiction}
                >
                  <Badge badgeContent={votes} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </div>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className={open ? `hight:${Padding}` : ""}>
          <Box className="me-5">
            <img src="/image/image.png" width={"50px"} alt="Logo"></img>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {info &&
        (info.user_type === "H.O.D" || info.user_type === "management") ? (
          <List>
            {info.user_type === "H.O.D" && (
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/Admin/Dashboard");
                    }}
                  >
                    <IconButton  style={{ color: "#9c27b0" }}>
                      <HomeIcon />
                    </IconButton>
                    <ListItemText
                      primary={"الاحصائيات"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/admin/List");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <FontAwesomeIcon icon={faDatabase} />
                    </IconButton>
                    <ListItemText
                      primary={" البيانات الرئيسية"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/Product/list");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <TableView />
                    </IconButton>
                    <ListItemText
                      primary={" بيانات المنتج المستلمة"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/AnalyticsData");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <Analytics />
                    </IconButton>
                    <ListItemText
                      primary={" تحليل متطلبات الاعمال"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/BusinessPersonsMain");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <Business />
                    </IconButton>
                    <ListItemText
                      primary={"المكلفين بالاعمال"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/PerformsnceAnalytcsMain");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <FontAwesomeIcon icon={faChartLine} />
                    </IconButton>
                    <ListItemText
                      primary={" تحليل الاداء"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {info.user_type === "management" && (
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/admin/List");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <FontAwesomeIcon icon={faDatabase} />
                    </IconButton>
                    <ListItemText
                      primary={" البيانات الرئيسية"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        ) : (
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                Navigate("/admin/List");
              }}
            >
              <IconButton color="" style={{ color: "#9c27b0" }}>
                <FontAwesomeIcon icon={faDatabase} />
              </IconButton>
              <ListItemText
                primary={" البيانات الرئيسية"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        )}
        <Divider />
        {info &&
        (info.user_type === "H.O.D" || info.user_type === "management") ? (
          <List>
            {info.user_type === "H.O.D" && (
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/Event");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <Notifications />
                    </IconButton>
                    <ListItemText
                      primary={"الاعلانات"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      onClick={() => {
                        Navigate("/Profile");
                      }}
                    >
                      <IconButton color="" style={{ color: "#9c27b0" }}>
                        <AccountBox />
                      </IconButton>
                      <ListItemText
                        primary={"معلومت اليوزر"}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <ExitToAppIcon />
                    </IconButton>
                    <ListItemText
                      primary={"تسجيل الخروج"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {info.user_type === "management" && (
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      Navigate("/admin/MainData");
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <Settings />
                    </IconButton>
                    <ListItemText
                      primary={"الاعدادات"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <IconButton color="" style={{ color: "#9c27b0" }}>
                      <ExitToAppIcon />
                    </IconButton>
                    <ListItemText
                      primary={"تسجيل الخروج"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        ) : (
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                dispatch(logout());
              }}
            >
              <IconButton color="" style={{ color: "#9c27b0" }}>
                <ExitToAppIcon />
              </IconButton>
              <ListItemText
                primary={"تسجيل الخروج"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </Drawer>
    </Box>
  );
}
