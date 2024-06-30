import { Pagination, Paper, TablePagination } from "@mui/material";
import React from "react";

function CostumePagination({ setRowsPerPage, setPage, rowsPerPage, page, totalProject }) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper
        dir="ltr"
        sx={{
          flexGrow: 1,
          minWidth: "333px",
          p: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "3px dashed rgba(0, 0, 0, 0.15)",
        }}
      >
        <TablePagination
          component="div"
          count={totalProject}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .css-levciy-MuiTablePagination-displayedRows": {
              display: "none",
            },
            "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions":
              {
                display: "none",
              },
            "& .css-pdct74-MuiTablePagination-selectLabel": {
              display: "none",
            },
            "& .css-16c50h-MuiInputBase-root-MuiTablePagination-select": {
              borderRadius: "4px",
              padding: "10px",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            },
          }}
        />

        <Pagination
          count={Math.ceil(totalProject / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Paper>
    </div>
  );
}

export default CostumePagination;
