import { Cached } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";

function RefreshButtonData({ setRefreshButton }) {
  const handleRefresh = () => {
    setRefreshButton((prev) => !prev);
  };
  return (
    <div className="posisionRefersh">
      <Fab color="secondary" aria-label="add" onClick={handleRefresh}>
        <span className="refreshButton">
          <Cached />
        </span>
      </Fab>
    </div>
  );
}

export default RefreshButtonData;
