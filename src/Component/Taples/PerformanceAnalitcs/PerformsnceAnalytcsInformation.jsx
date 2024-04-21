import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getProjectByDepartment } from "../../../redux/ProjectSlice/ProjectAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { Button, useTheme, useThemeProps } from "@mui/material";
import Loader from "../../Config/Loader";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
function PerformsnceAnalytcsMain() {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [token, setToken] = useState(() => localStorage.getItem("token") || {});
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { setProject, isLoading } = useSelector((state) => state.Project);
  const fetchDataProject = () => {
    dispatch(getProjectByDepartment({ info, token }));
  };
  useEffect(() => fetchDataProject(), []);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  const getDataAsFileExcel = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getDateAsFileExcel`, {
        headers: {
          token: token,
        },
        responseType: "blob", // Set responseType to 'blob' to handle binary data
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "projects.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`projects p-20 ${
            theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
          }  rad-10 m-20 `}
          style={{ margin: "auto" }}
          dir={rtl?.dir}
        >
          <h2 className="mt-0 mb-20">{t("PerformsnceAnalytcsMain.title")}</h2>
          <div className="">
            <Button className="mb-3" onClick={getDataAsFileExcel}>
              {t("PerformsnceAnalytcsMain.ExportButton")}
            </Button>
            <Table
              striped
              bordered
              hover
              variant={theme.palette.mode === "dark" ? "dark" : ""}
              dir={rtl?.dir}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("PerformsnceAnalytcsMain.table.Notes")} </th>
                  <th>
                    {" "}
                    {t("PerformsnceAnalytcsMain.table.CompletionRatio")}{" "}
                  </th>
                  <th>{t("PerformsnceAnalytcsMain.table.OfferPrice")} </th>
                  <th>{t("PerformsnceAnalytcsMain.table.ProjectName")} </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(setProject) && setProject ? (
                  setProject.map((item, index) => (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{item?.comments}</td>
                      <td>{item?.CompletionRate}</td>
                      <td> {item?.OfferPrice}</td>
                      <td> {item?.nameProject}</td>
                    </tr>
                  ))
                ) : (
                  <div>
                    <p>data Not found</p>
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
export default PerformsnceAnalytcsMain;
