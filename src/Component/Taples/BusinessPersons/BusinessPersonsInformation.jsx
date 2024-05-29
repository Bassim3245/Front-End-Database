import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByDepartment } from "../../../redux/ProjectSlice/ProjectAction";
import { Button, useTheme } from "@mui/material";
import * as XLSX from "xlsx"; // Import xlsx library
import saveAs from "file-saver";
import Loader from "../../Config/Loader";
import { setLanguage } from "../../../redux/LanguageState";
import { useTranslation } from "react-i18next";
function BusinessPersonsMain() {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [token, setToken] = useState(() => localStorage.getItem("token") || {});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setProject, isLoading } = useSelector((state) => state?.Project);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const fetchDataProject = () => {
    const departmentID = info.DepartmentID;
    dispatch(getProjectByDepartment({ departmentID, info, token }));
  };
  useEffect(() => fetchDataProject(), []);
  const theme = useTheme();
  const exportToExcel = () => {
    const fileName = "AnalyticsData.xlsx";
    const filteredData = setProject.map((item) => ({
      الملاحظات: item?.comments,
      مستواالاداء: item?.LevelPerformance,
      اسم_الموظف: item?.userId?.name,
      اسم_المشروع: item?.nameProject,
    }));
    const ws = XLSX.utils.json_to_sheet(filteredData);
    // Define header styles
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center" },
      fill: { bgColor: "eeee" },
    };
    // Apply header styles to the header row
    Object.keys(filteredData[0]).forEach((key, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      ws[cellAddress].s = headerStyle;
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      compression: true,
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(excelData, fileName);
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
          dir={rtl.dir}
        >
          <h2 className="mt-0 mb-20"> {t("BusinessPersonsMain.title")}</h2>
          <Button className="" onClick={exportToExcel}>
            {t("BusinessPersonsMain.ExportButton")}
          </Button>
          <div className="">
            <Table
              striped
              bordered
              hover
              variant={theme.palette.mode === "dark" ? "dark" : ""}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("BusinessPersonsMain.table.ProjectName")} </th>
                  <th>{t("BusinessPersonsMain.table.ThePerson")} </th>
                  <th> {t("BusinessPersonsMain.table.PerformanceLevel")} </th>

                  <th>{t("BusinessPersonsMain.table.Notes")} </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(setProject) && setProject ? (
                  setProject.map((item, index) => (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td> {item?.nameProject}</td>
                      <td> {item?.userId?.name}</td>
                      <td>{item?.LevelPerformance}</td>
                      <td>{item.comments}</td>
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
export default BusinessPersonsMain;
