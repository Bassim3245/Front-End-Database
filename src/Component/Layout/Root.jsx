import * as React from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./ToBar";
import SideBar from "./SlidBar";
import { getDesignTokens } from "./Thime";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { setLanguage } from "../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function Root() {
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const dispatch = useDispatch();
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state.language;
  });
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem("currentMode"))
      ? localStorage.getItem("currentMode")
      : "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  React.useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: rtl?.flexDirection }}>
        <CssBaseline />
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
          info={info}
        />

        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: "100%",
            maxWidth: "100%",
            height: "100vh",
            overflowX: rtl.dir === "rtl" ? "auto" : "hidden", // or "visible" based on your needs
          }}
        >
          <DrawerHeader
          // @ts-ignore
          />
          <ToastContainer
            // containerId="container_toast_id"
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            transition={Slide}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
