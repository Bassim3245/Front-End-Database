// @ts-ignore
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import StyledDataGrid from "Component/Config/StyledDataGrid";
const GridTemplate = ({ columns, rows }) => {
  const theme = useTheme();
  return (
    <div style={{ width: "100%" }}>
      {/* <Box className="containerCustomGridTable"> */}
      <Box
        sx={{
          fontSize: "20px",
          "& .MuiDataGrid-cellContent": {
            // textOverflow: "initial !important",
          },
          "& .css-128fb87-MuiDataGrid-toolbarContainer": {
            // textOverflow: "initial !important",
            // backgroundColor: "rgb(55, 81, 126)",
          },
          "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root": {
            // color: "white",
          },
          height: 650,
          mx: "auto",
          width: "calc(100% - 10px)",
          maxWidth: "100%",
        }}
      >
        <StyledDataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          gridTheme={{
            mainColor: "rgb(55, 81, 126)",
          }}
          onStateChange={(state) => {
            // console.log("asdadasdasdasd====>", state);
          }}
          theme={theme}
          getRowHeight={() => "auto"}
          rows={rows}
          columns={columns}
          columnVisibilityModel={{
            _id: false,
          }}
          getRowId={(row) => row.id}
        />
        {/* </Box> */}
      </Box>
    </div>
  );
};
export default GridTemplate;
