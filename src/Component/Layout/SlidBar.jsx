import React, { useEffect } from "react";
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
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  Analytics,
  Dataset,
  Event,
  GroupAdd,
  PermDataSetting,
  StackedLineChart,
  WaterfallChart,
} from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice/userSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { BackendUrl } from "../../redux/api/axios";
import { setLanguage } from "../../redux/LanguageState";
const drawerWidth = 270;
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
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  // @ts-ignore
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const generalInfo = [
    { text: "Profile", icon: <PersonOutlinedIcon />, path: "Profile" },
  ];

  let Route1 = [];
  let Route2 = [];
  let Route3 = [];

  switch (info?.user_type) {
    case "IT":
      Route1 = [
        {
          text: "Management Users",
          icon: <GroupAdd />,
          path: "MangeUser",
        },
        {
          text: "General Data",
          icon: <PermDataSetting />,
          path: "GeneralDataInformation",
        },
      ];
      break;

    case "H.O.D":
      Route1 = [
        {
          text: "Dashboard",
          icon: <HomeOutlinedIcon />,
          path: "/Dashboard",
        },
        {
          text: "قائمة المشاريع",
          icon: <Dataset />,
          path: "ProjectList",
        },
        {
          text: "منتجات ",
          icon: <ReceiptOutlinedIcon />,
          path: "ProductList",
        },
        {
          text: "Event",
          icon: <Event />,
          path: "Event",
        },
      ];
      Route2 = [
        {
          text: "Business requirements analysis",
          icon: <Analytics />,
          path: "AnalyticsData",
        },
        {
          text: "Business representatives",
          icon: <WaterfallChart />,
          path: "BusinessPersonsMain",
        },
        {
          text: "Performance analytics",
          icon: <StackedLineChart />,
          path: "PerformsnceAnalytcsMain",
        },
        {
          text: "Calendar",
          icon: <CalendarTodayOutlinedIcon />,
          path: "calendar",
        },
      ];
      break;

    case "management":
      Route1 = [
        {
          text: "Project",
          icon: <Dataset />,
          path: "ProjectList",
        },
        {
          text: "Products received",
          icon: <ReceiptOutlinedIcon />,
          path: "ProductList",
        },
        {
          text: "Event",
          icon: <Event />,
          path: "Event",
        },
      ];
      Route2 = [
        {
          text: "Business requirements analysis",
          icon: <Analytics />,
          path: "AnalyticsData",
        },
        {
          text: "Business representatives",
          icon: <WaterfallChart />,
          path: "BusinessPersonsMain",
        },
        {
          text: "Performance analytics",
          icon: <StackedLineChart />,
          path: "PerformsnceAnalytcsMain",
        },
        {
          text: "Calendar",
          icon: <CalendarTodayOutlinedIcon />,
          path: "calendar",
        },
      ];
      break;
    case "Employ":
      Route1 = [
        {
          text: "Project",
          icon: <Dataset />,
          path: "ProjectList",
        },
      ];
    default:
      navigate("/Authorized");
  }
  return (
    // Anchor to male from dirction right
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
        {Route1?.map((item) => (
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
                  dir:rtl?.dir,
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
                  sx={{ opacity: open ? 1 : 0}}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
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
        {generalInfo?.map((item) => (
          <ListItem
            key={item.path}
            disablePadding
            sx={{ display: "block" }}
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
                //   bgcolor:
                //     location.pathname === item.path
                //       ? theme.palette.mode === "dark"
                //         ? grey[800]
                //         : grey[300]
                //       : null,
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
              <ListItemText
                primary="Logout"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  );
};
export default SideBar;
