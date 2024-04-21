import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material"; // Removed Typography import
import Header from "../../../../../Layout/Header"; // Corrected import path
import { BackendUrl } from "../../../../../../redux/api/axios";
import axios from "axios";
import { toast } from "react-toastify";

const Permission = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, // Increased width of ID column to 150
    {
      field: "permissionName",
      headerName: "Permission",
      width: 200,
      cellClassName: "name-column--cell",
    },
  ];

  const [permissionData, setPermissionData] = useState([]); // Initialized PermissionData as an empty array
  const [selectionModel, setSelectionModel] = useState([]);

  const getDataPermission = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getAllDataPermission`
      );
      setPermissionData(response?.data?.response);
      console.log(response?.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    console.log(selectionModel);
    getDataPermission();
  }, [selectionModel]);

  // @ts-ignore
  const rows =
    permissionData?.map((item, index) => {
      return {
        id: index + 1,
        permissionName: item?.permissionName,
      };
    }) ?? [];

  const handleSelectionModelChange = (item) => {
    const selectedIDs = new Set(item);
    const selectedRowData = rows.filter((row) =>
      selectedIDs.has(row.id.toString())
    );
    console.log(item);
    console.log(selectedRowData);
    setSelectionModel(selectedRowData);
  };

  return (
    <Box>
      <Header title="Permission" subTitle="List of Permission Data" />{" "}
      {/* Updated subTitle */}
      <Box sx={{ height: 650, mx: "auto" }}>
        <DataGrid
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={selectionModel}
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Permission;
