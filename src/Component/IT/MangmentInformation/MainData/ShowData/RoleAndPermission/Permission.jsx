import { useEffect, useState } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Header from "../../../../../Layout/Header";
import { BackendUrl } from "../../../../../../redux/api/axios";
import axios from "axios";
import StyledDataGrid from "../../../../../Config/StyledDataGrid";
import { useParams } from "react-router";
import { ColorLink } from "Component/Config/Content";
import { ButtonClearState } from "../../../../../Config/Content";
const Permission = (props) => {
  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "permissionName",
      headerName: "Permission",
      width: 200,
      cellClassName: "name-column--cell",
    },
  ];
  const [permissionData, setPermissionData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dataRoleAndPermission, setDataRoleAndPermission] = useState({});

  const [dataRoleUser, setDataRoleUser] = useState({});
  const { id } = useParams();
  const GroupId=props?.GroupId||""
  const getRoleAndUserId = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndUserId/${id}`
      );
      setDataRoleUser(response?.data);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getRoleAndUserId();
  }, []);

  const getDataPermission = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getAllDataPermission`
      );
      setPermissionData(response?.data?.response);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getDataPermission();
  }, []);

  const getDataPermissionAndRole = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndPermissionId/${id}`
      );
      setDataRoleAndPermission(response?.data);
      const selectedIds = response?.data?.permissionIds || [];
      console.log("hhhhh", selectedIds);
      setSelectionModel(selectedIds);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  const getDataPermissionAndRoleGroup = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataRoleIdAndPermissionIduseGrouID/${GroupId}`
      );
      setDataRoleAndPermission(response?.data);
      const selectedIds = response?.data?.permissionIds || [];
      setSelectionModel(selectedIds);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    props?.label === "setPermissionToGroup"
      ? getDataPermissionAndRoleGroup()
      : getDataPermissionAndRole();
  }, []);
  const rows = permissionData.map((item, index) => ({
    id: index + 1,
    _id: item?._id,
    permissionName: item?.permissionName,
  }));

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  const handleSetDataPermission = async () => {
    try {
      console.log("dfddddd", dataRoleAndPermission._id);
      const roleIdPermission = dataRoleAndPermission._id || null;
      const response = await axios.post(
        `${BackendUrl}/api/setPermissionAndRole`,
        { selectionModel, id, roleIdPermission }
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  const handelSetPermissionGroup = async () => {
    try {
      console.log("dfddddd", dataRoleAndPermission._id);
      const roleIdPermissionGroup = dataRoleAndPermission._id || null;
      const response = await axios.post(
        `${BackendUrl}/api/setPermissionAndRoletoEchGroup`,
        { selectionModel, GroupId, roleIdPermissionGroup }
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  return (
    <Box>
      <Header title="Permission" subTitle="List of Permission Data" />
      {props?.label === "setPermissionToGroup" ? (
        <ButtonClearState onClick={handelSetPermissionGroup}>
          data Group
        </ButtonClearState>
      ) : (
        <ColorLink onClick={handleSetDataPermission}>Save</ColorLink>
      )}

      <Box sx={{}}>
        <StyledDataGrid
          // autoHeight

          autoPageSize
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModelChange}
          gridTheme={{
            mainColor: "rgb(55, 81, 126)",
          }}
          rowSelectionModel={selectionModel}
          slots={{
            toolbar: GridToolbar,
          }}
          getRowHeight={() => "auto"}
          columnVisibilityModel={{
            _id: false,
          }}
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          // hideFooter={true}
        />
      </Box>
    </Box>
  );
};

export default Permission;
