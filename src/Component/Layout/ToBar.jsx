import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Nonfiction from "./Notifction"; // Corrected typo in import
import { Logout } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice/userSlice";
import { setLanguage } from "../../redux/LanguageState";
import { useTranslation } from "react-i18next";

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, rtl, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: rtl?.flexDirection === "row" ? drawerWidth : null,
    marginRight: rtl?.flexDirection === "row-reverse" ? drawerWidth : null,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const TopBar = ({ open, handleDrawerOpen, setMode, info }) => {
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  const dispatch = useDispatch();

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDirectionArabic = () => {
    const language = "ar";
    i18n.changeLanguage("ar");
    localStorage.setItem("language", "ar");
    dispatch(setLanguage(language));
  };

  const handleDirectionEnglish = () => {
    const language = "en";
    i18n.changeLanguage("en");
    dispatch(setLanguage(language));
    localStorage.setItem("language", "en");
  };
  useEffect(() => {
    const currentLanguage = localStorage.getItem("language");
  }, []);

  return (
    <AppBar
      position="fixed"
      // @ts-ignore
      open={open}
      rtl={rtl}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#1e6a99",
      }}
    >
      {" "}
      {/* Added rtl prop */}
      <Toolbar sx={{ flexDirection: rtl?.flexDirection }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginLeft: rtl?.flexDirection === "row-reverse" ? 5 : null,
            marginRight: rtl?.flexDirection === "row" ? 5 : null, // Corrected indentation
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" sx={{ fontSize: "20px" }}>
          {t("appBar.userName", { name: info?.name })}
        </Typography>
        <Box flexGrow={1} />
        <Stack direction={"row"}>
          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <LightModeOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <DarkModeOutlinedIcon />
            </IconButton>
          )}
          <Nonfiction /> {/* Corrected component name to match import */}
          <IconButton
            color="inherit"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Person2OutlinedIcon
                fontSize="small"
                sx={{ marginRight: "10px" }}
              />
              {t("appBar.dropdown.profile")}
            </MenuItem>
            {rtl.flexDirection === "row" ? (
              <MenuItem onClick={handleDirectionArabic}>
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ marginRight: "10px" }}
                />
                {t("appBar.dropdown.languageArabic")}
              </MenuItem>
            ) : (
              <MenuItem onClick={handleDirectionEnglish}>
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ marginRight: "10px" }}
                />
                {t("appBar.dropdown.languageEnglish")}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Logout fontSize="small" sx={{ marginRight: "10px" }} />
              {t("appBar.dropdown.logout")}
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
