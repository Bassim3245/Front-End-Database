import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "../../Config/Content";
import { fetchDataAllDepartment } from "Component/Config/fetchData";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
export default function DepartmentsList() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const theme = useTheme();
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    fetchDataAllDepartment,
    {}
  );
  React.useEffect(() => {
    refetch();
  }, [open, message]);
  const navigate = useNavigate();
  const handleClickOpen = (Id) => {
    navigate(`/Home/AllProjectsEchDepartment/${Id}`);
  };
  return (
    <React.Fragment>
      <Table
        striped
        bordered
        hover
        // dir="rtl"
        variant={theme?.palette?.mode === "dark" ? "dark" : ""}
      >
        <thead>
          <tr>
            <>
              <th>#</th>
              <th>اسماء الاقسام</th>
              <th>رموز الاقسام</th>
              <th>اجراء</th>
            </>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <>
                <td>{data?.departmentName}</td>
                <td>{data?.brief}</td>
              </>
              <td>
                {/* <ButtonSave
                      className="ms-3"
                      onClick={() => deleteById(data?._id)}
                    >
                      حذف
                    </ButtonSave> */}
                <ButtonClearState onClick={() => handleClickOpen(data._id)}>
                  open
                </ButtonClearState>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </React.Fragment>
  );
}
