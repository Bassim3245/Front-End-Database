import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { getDataBySendUserProjectAndProduct } from "../Config/fetchData";
import DataProductByProjectIsSend from "./DataProductByProjectIsSend";
import "./STyle.css";
import Loader from "../Config/Loader";
import { Table } from "react-bootstrap";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
function Product() {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const DepartmentID = info.DepartmentID;
  const formatDate = (Data) => {
    const date = new Date(Data);
    return moment(date).format(" HH:mm YYYY/MM/DD ");
  };
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "dataSendByUser",
    () => getDataBySendUserProjectAndProduct(DepartmentID),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    }
  );
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state?.language;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <div>
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div
          className={` container projects p-20 ${
            theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
          } rad-10 m-20 container`}
          style={{ margin: "auto", width: "100%", maxWidth: "100%" }}
          dir={rtl?.dir}
        >
          <h2 className="mt-0 mb-20">{t("ProjectListReceive.title")}</h2>
          <div className="" style={{ overflowX: "auto" }}>
            <Table
              striped
              bordered
              hover
              variant={theme.palette.mode === "dark" ? "dark" : ""}
              dir={rtl?.dir}
            >
              <thead>
                <tr>
                  <td>#</td>
                  <td>{t("ProjectListReceive.table.DepartmentName")}</td>
                  <td> {t("ProjectListReceive.table.ProjectName")}</td>
                  <td> {t("ProjectListReceive.table.date")}</td>
                  <td>{t("ProjectListReceive.table.sender")}</td>
                  <td> {t("ProjectListReceive.table.SenderPhone")}</td>
                  <td>{t("ProjectListReceive.table.Action")}</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data?.map((Project, index) => (
                    <tr key={index}>
                      <td className="text-right">{index + 1}</td>
                      <td className="text-right">
                        {Project?.DepartmentID?.departmentName}
                      </td>
                      <td className="text-right">{Project?.nameProject}</td>
                      <td className="text-right" style={{ direction: "rtl" }}>
                        {formatDate(Project?.createdAt)}
                      </td>
                      <td>{Project?.userId?.name}</td>
                      <td>{Project?.userId?.Phone}</td>
                      <td className="text-right">
                        <div className=" ">
                          <DataProductByProjectIsSend
                            projectId={Project?._id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
export default Product;
