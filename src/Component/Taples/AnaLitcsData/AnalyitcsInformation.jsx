import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllDataProductBYdepartmentId } from "../../Config/fetchData"; // Corrected function name
import { useQuery } from "react-query";
import { Button, useTheme } from "@mui/material";
import * as XLSX from "xlsx"; // Import xlsx library
import saveAs from "file-saver";
import Loader from "../../Config/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../redux/LanguageState";
import { useTranslation } from "react-i18next";
import CostumePagination from "../../Config/CostumPagination";
import RefreshButtonData from "../../Config/RefreshButton";
function AnalyticsData() {
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [refreshButton, setRefreshButton] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const { t } = useTranslation();
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "DataProductByDEPARTMENT",
    () =>
      getAllDataProductBYdepartmentId(info?.DepartmentID, rowsPerPage, page),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, refreshButton, refetch]); // Added refetch to dependency array
  // Function to export data as Excel
  const exportToExcel = () => {
    const fileName = "AnalyticsData.xlsx";
    const filteredData = data.map((item) => ({
      الملاحظات: item?.comments,
      طبيعةالعمل: item.projectId?.WorkNatural,
      الجهةالمستفيدة: item.projectId?.beneficiary,
      المواصفات: item?.description,
      الكمية: item?.Quantity,
      اسم_المنتج: item?.nameProduct,
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
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Save workbook
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
    <div className="w-100">
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`projects p-20  ${
            theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
          }  rad-10 m-20 `}
          style={{ margin: "auto" }}
          dir={rtl?.dir}
        >
          <h2 className="mt-0 mb-20"> {t("AnalyticsData.title")}</h2>
          <Button className="mb-" onClick={exportToExcel}>
            {t("AnalyticsData.ExportButton")}
          </Button>
          <div className="">
            <Table
              striped
              bordered
              hover
              variant={theme.palette.mode === "dark" ? "dark" : ""}
              dir={rtl?.dir}
              responsive
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("AnalyticsData.table.NameProduct")}</th>

                  <th>{t("AnalyticsData.table.WorkNatural")}</th>
                  <th>{t("AnalyticsData.table.Specifications")}</th>
                  <th>{t("AnalyticsData.table.Quantity")}</th>

                  <th>{t("AnalyticsData.table.BeneficiaryEntity")}</th>

                  <th>{t("AnalyticsData.table.Notes")}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.nameProduct}</td>
                      <td>{item?.projectId?.WorkNatural}</td>
                      <td>{item?.description}</td>
                      <td>{item?.Quantity}</td>
                      <td>{item?.projectId?.beneficiary}</td>
                      <td>{item?.comments}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      // @ts-ignore
                      colSpan="7"
                    >
                      data Not found
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
            />
          </div>
        </div>
      )}
      <RefreshButtonData setRefreshButton={setRefreshButton} />
    </div>
  );
}

export default AnalyticsData;
