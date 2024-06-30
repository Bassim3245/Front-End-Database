// @ts-ignore
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StyledDataGrid from "Component/Config/StyledDataGrid";
import { CustomNoRowsOverlay } from "./Function";
import CostumePagination from "./CostumPagination";

const GridTemplate = ({
  columns,
  rows,
  setRowsPerPage,
  setPage,
  rowsPerPage,
  page,
  totalProject
}) => {
  const theme = useTheme();
  const isWidth760 = useMediaQuery("(max-width:760px)");
  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            boxShadow:
              " 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
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
            hideFooter={true} // This line hides the footer
            pagination
            autoPageSize
            pageSize={8} // Number of rows per page
          />
       <CostumePagination
         setRowsPerPage={setRowsPerPage}
         setPage={setPage}
         page={page}
         rowsPerPage={rowsPerPage}
         totalProject={totalProject}
       />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default GridTemplate;
