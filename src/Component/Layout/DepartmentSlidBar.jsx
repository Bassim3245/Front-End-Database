import * as React from "react";
import { Box, Drawer } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
export default function DepartmentSlidBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        zIndex: "99",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ marginTop: "60px" }}
      >
        <Typography>hello word</Typography>
      </div>
    </Box>
  );
  return (
    <div>
      <React.Fragment>
        <IconButton color="inherit" onClick={toggleDrawer("right", true)}>
          <NotificationsOutlinedIcon />
        </IconButton>{" "}
        <Drawer
          anchor={"right"}
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
