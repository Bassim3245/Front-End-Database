import * as React from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartment } from "../../../redux/ProjectSlice/ProjectAction";
import { formatDate } from "../../Config/Function";
import DataProductByProjectId from "./ProductDatabyProjectId";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import { useTranslation } from "react-i18next";
export default function AllProjectsEchDepartment() {
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setProject, loading } = useSelector((state) => state?.Project);
  const [info] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [token] = React.useState(() => localStorage.getItem("token"));
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const [openProjectId, setOpenProjectId] = React.useState(null);

  const handelOpen = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };

  const fetchDataProject = () => {
    const departmentID = id;
    dispatch(getProjectByDepartment({ departmentID, info, token }));
  };
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  React.useEffect(() => {
    getPermmission();
  }, []);
  React.useEffect(() => {
    fetchDataProject();
  }, [id]); // Added dependency on `id` to refetch data when `id` changes
const {t}=useTranslation();
  return (
    <div
      className={`projects p-20 ${
        theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
      }  rad-10 m-20 `}
      style={{ margin: "auto" }}
      dir={rtl.dir}
    >
      <div className="" style={{ overflowX: "auto" }}>
        <Table
          striped
          bordered
          hover
          dir={rtl.dir}
          className=""
          variant={theme?.palette?.mode === "dark" ? "dark" : ""}
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
            {setProject ? (
              setProject.map((data, index) => (
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
                      {openProjectId ? (
                        <Button onClick={() => handelOpen(data._id)}>
                          <KeyboardArrowDown />
                        </Button>
                      ) : (
                        <Button onClick={() => handelOpen(data._id)}>
                          <KeyboardArrowUp />
                        </Button>
                      )}
                    </td>
                  </tr>
                  {openProjectId === data._id && (
                    <tr>
                      <td colSpan={13}>
                        <DataProductByProjectId
                          ProjectID={data._id}
                          roles={roles}
                          Permission={Permission}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div>
                <h4>no data found</h4>
              </div>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
