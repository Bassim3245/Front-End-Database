import React, { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Button, useTheme } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  getProjectByDepartment,
  getProjectByDepartmentDelay,
} from "../../../redux/ProjectSlice/ProjectAction";
import { CustomNoRowsOverlay, formatDate } from "../../Config/Function";
import DataProductByProjectId from "./ProductDatabyProjectId";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import CostumePagination from "../../Config/CostumPagination";
const AllProjectsEchDepartment = ({ id, Label }) => {
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { setProject, loading, totalProject } = useSelector(
    (state) => state?.Project
  );
  const { rtl } = useSelector((state) => state?.language);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [token] = useState(() => localStorage.getItem("token"));
  const [openProjectId, setOpenProjectId] = useState(null);
  const handleOpen = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };
  const fetchDataProject = useCallback(() => {
    const departmentID = id;
    const action =
      Label === "Delay" ? getProjectByDepartmentDelay : getProjectByDepartment;
    dispatch(action({ departmentID, info, token, page, rowsPerPage }));
  }, [dispatch, id, Label, info, token,rowsPerPage,page]);

  const getPermission = useCallback(() => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, [dispatch, info, token]);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  useEffect(() => {
    fetchDataProject();
  }, [fetchDataProject, id]);

  return (
    
    <div
      className={`projects p-20 ${
        theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
      } rad-10 m-20`}
      style={{ margin: "auto" }}
      dir={rtl.dir}
    >
      <div style={{ overflowX: "auto" }}>
        <Table
          striped
          bordered
          hover
          dir={rtl.dir}
          className=""
          variant={theme.palette.mode === "dark" ? "dark" : ""}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>{t("ProjectList.Code")}</th>
              <th>{t("ProjectList.Department")}</th>
              <th>{t("ProjectList.nameProject")}</th>
              <th>{t("ProjectList.NumberBook")}</th>
              <th>{t("ProjectList.beneficiary")}</th>
              <th>{t("ProjectList.MethodOption")}</th>
              <th>{t("ProjectList.WorkNatural")}</th>
              <th>{t("ProjectList.DateBook")}</th>
              <th>{t("ProjectList.DateClose")}</th>
              <th>{t("ProjectList.startTime")}</th>
              <th>{t("ProjectList.endTime")}</th>
              <th>{t("ProjectList.Action")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={13} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : setProject && setProject?.length > 0 ? (
              setProject?.map((data, index) => (
                <React.Fragment key={data._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data?.Code}</td>
                    <td>{data?.DepartmentID?.departmentName}</td>
                    <td>{data?.nameProject}</td>
                    <td>{data?.NumberBook}</td>
                    <td>{data?.beneficiary}</td>
                    <td>{data?.MethodOption}</td>
                    <td>{data?.WorkNatural?.workNaturalData}</td>
                    <td>{formatDate(data?.DateBook)}</td>
                    <td>{formatDate(data?.DateClose)}</td>
                    <td>{formatDate(data?.DateStart)}</td>
                    <td>{formatDate(data?.DateEnd)}</td>
                    <td>
                      <Button onClick={() => handleOpen(data?._id)}>
                        {openProjectId === data?._id ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </Button>
                    </td>
                  </tr>
                  {openProjectId === data?._id && (
                    <tr>
                      <td colSpan={13}>
                        <DataProductByProjectId
                          ProjectID={data?._id}
                          roles={roles}
                          Permission={Permission}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={13} style={{ textAlign: "center" }}>
                <CustomNoRowsOverlay />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <CostumePagination
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalProject={totalProject}
        />
      </div>
    </div>
  );
};

AllProjectsEchDepartment.propTypes = {
  id: PropTypes?.string?.isRequired,
  Label: PropTypes?.string?.isRequired,
};
export default React.memo(AllProjectsEchDepartment);
