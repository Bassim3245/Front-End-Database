import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDataBySendUserProjectAndProduct } from "../Config/fetchData";
import DataProductByProjectIsSend from "./DataProductByProjectIsSend";
import "./STyle.css";
import Loader from "../Config/Loader";
import { Table } from "react-bootstrap";
import { MenuItem, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import { CancelScheduleSend, Send } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { ToastContainer, toast } from "react-toastify";
import DropDownGrid from "Component/Config/CustomMennu";
import { CustomNoRowsOverlay, formatDate } from "../Config/Function";
import PropTypes from "prop-types";
function Product({ Label }) {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const DepartmentID = info.DepartmentID;
  const { t } = useTranslation();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const theme = useTheme();
  const { rtl } = useSelector((state) => state?.language);
  const dispatch = useDispatch();
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "dataSendByUser",
    () => getDataBySendUserProjectAndProduct(DepartmentID),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const showSwal = (id) => {
    Swal.fire({
      title: "هل تريد الاستمرار؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${BackendUrl}/api/CancelSendProject/${id}`,
            {},
            { headers: { token: token } }
          );
          if (response) {
            console.log(response.data);
            toast(response.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("User clicked لا or closed the dialog");
      }
    });
  };

  const handleSendData = (id) => {
    Swal.fire({
      title: "هل تريد الاستمرار؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${BackendUrl}/api/sendProjectToManger/${id}`,
            {},
            { headers: { token: token } }
          );
          if (response) {
            console.log(response.data);
            toast(response.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("User clicked لا or closed the dialog");
      }
    });
  };
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div
      className={`container projects p-20 ${
        theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
      } rad-10 m-20`}
      style={{ margin: "auto", width: "100%", maxWidth: "100%" }}
      dir={rtl?.dir}
    >
      <ToastContainer />
      <h2 className="mt-0 mb-20">{t("ProjectListReceive.title")}</h2>
      <div style={{ overflowX: "auto" }}>
        {Array.isArray(data) && data.length > 0 ? (
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
                <td>{t("ProjectListReceive.table.ProjectName")}</td>
                <td>{t("ProjectListReceive.table.date")}</td>
                <td>{t("ProjectListReceive.table.sender")}</td>
                <td>{t("ProjectListReceive.table.SenderPhone")}</td>
                <td>{t("ProjectListReceive.table.Action")}</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((Project, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Project?.DepartmentID?.departmentName}</td>
                    <td>{Project?.nameProject}</td>
                    <td>{formatDate(Project?.createdAt)}</td>
                    {Label === "ProductListReceivedAssistance" ? (
                      <>
                        <td>{Project?.MutualProjectId?.ProjectManger?.name}</td>
                        <td>
                          {Project?.MutualProjectId?.ProjectManger?.Phone}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{Project?.userId?.name}</td>
                        <td>{Project?.userId?.Phone}</td>
                      </>
                    )}

                    <td className="d-flex text-center">
                      <DropDownGrid className="p-0">
                        <MenuItem onClick={() => showSwal(Project?._id)}>
                          <span className="me-2">
                            <CancelScheduleSend />
                          </span>
                          Cancel sending
                        </MenuItem>
                        <MenuItem onClick={() => handleSendData(Project?._id)}>
                          <span className="me-2">
                            <Send />
                          </span>
                          Send
                        </MenuItem>
                      </DropDownGrid>
                      <span className="ms-3">
                        <DataProductByProjectIsSend projectId={Project?._id} />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <CustomNoRowsOverlay />
        )}
      </div>
    </div>
  );
}
Product.propTypes = {
  DepartmentID: PropTypes.string,
  data: PropTypes.array,
  Label: PropTypes?.string?.isRequired,
};

export default React.memo(Product);
