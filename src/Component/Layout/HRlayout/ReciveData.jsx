
import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { MoveToInbox } from "@mui/icons-material";
export default function ReceiveData() {
  const [state, setState] = useState({
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
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
          <MoveToInbox />
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
