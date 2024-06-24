// @ts-ignore
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StyledDataGrid from "Component/Config/StyledDataGrid";
import { CustomNoRowsOverlay } from "./Function";

const GridTemplate = ({ columns, rows }) => {
  const theme = useTheme();
  const isWidth760 = useMediaQuery("(max-width:760px)");
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <Box sx={{}}>
          <StyledDataGrid
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
              // pagination: GridPagination,
            }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
            gridTheme={{
              mainColor: "rgb(55, 81, 126)",
            }}
            onStateChange={(state) => {
              // console.log("State change: ", state);
            }}
            // autoHeight
            theme={theme}
            getRowHeight={() => (isWidth760 ? null : "auto")}
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              _id: false,
            }}
            getRowId={(row) => row.id}
            // hideFooter={true} // This line hides the footer
            pagination
            autoPageSize
            pageSize={8} // Number of rows per page
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default GridTemplate;
