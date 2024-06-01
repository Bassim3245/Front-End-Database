import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "../../Config/Content";
import { fetchDataAllDepartment } from "Component/Config/fetchData";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
import Header from "../../Layout/Header";
export default function DepartmentsList({ Path }) {
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const [info] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const token = localStorage.getItem("token") || {};
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    fetchDataAllDepartment,
    {}
  );
  React.useEffect(() => {
    refetch();
  }, [open, message]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, []);
  React.useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  const handleClickOpen = (Id) => {
    navigate(`${Path}/${Id}`);
  };
  return (
    <>
      <Header
        title={t("tableDelayProject.title")}
        subTitle={t("tableDelayProject.subTitle")}
      />
      <Table
        striped
        bordered
        hover
        dir={rtl?.dir}
        variant={theme?.palette?.mode === "dark" ? "dark" : ""}
      >
        <thead>
          <tr>
            <>
              <th>#</th>
              <th>{t("DepartmentTable.DepartmentName")}</th>
              <th>{t("DepartmentTable.Action")}</th>
            </>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data?.departmentName}</td>
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
      </Table>
    </>
  );
}
