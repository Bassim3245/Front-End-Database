import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice/userSlice";
function AppBarComponent({ drawerWidth }) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(() => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user")) || {};
    }
    return {};
  });
  const theme = useTheme();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#1e6a99",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {info?.user_type}
          <IconButton aria-label="logout" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Typography>
        <Typography variant="h6" noWrap component="p" sx={{ marginRight: 3 }}>
          {info?.name}
        </Typography>
        <Avatar alt="User Avatar" src="" />
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
