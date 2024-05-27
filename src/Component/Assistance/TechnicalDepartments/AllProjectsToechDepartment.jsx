import * as React from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartment } from "../../../redux/ProjectSlice/ProjectAction";
import { formatDate } from "../../Config/Function";
import DataProductByProjectId from "./ProductDatabyProjectId";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton, useTheme } from "@mui/material";
export default function AllProjectsEchDepartment() {
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

  React.useEffect(() => {
    fetchDataProject();
  }, [id]); // Added dependency on `id` to refetch data when `id` changes

  return (
    <React.Fragment>
      <div className="m-4">
        <Table
          striped
          bordered
          hover
          className=""
          variant={theme?.palette?.mode === "dark" ? "dark" : ""}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Department Name</th>
              <th>Project Name</th>
              <th>Number Book</th>
              <th>Beneficiary</th>
              <th>Method Option</th>
              <th>Work Nature</th>
              <th>Date Request</th>
              <th>Date Close</th>
              <th>Date Start</th>
              <th>Date End</th>
              <th>Action</th>
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
                    <td>{data?.WorkNatural}</td>
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
                        <DataProductByProjectId ProjectID={data._id} />
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
    </React.Fragment>
  );
}
