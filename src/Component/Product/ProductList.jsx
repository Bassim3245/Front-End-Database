import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { getDataBySendUserProjectAndProduct } from "../Config/fetchData";
import DataProductByProjectIsSend from "./DataProductByProjectIsSend";
import "./STyle.css";
import Loader from "../Config/Loader";
import { Table } from "react-bootstrap";
import { IconButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import { CancelScheduleSend, Send } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { ToastContainer, toast } from "react-toastify";
function Product() {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const DepartmentID = info.DepartmentID;
  const { t } = useTranslation();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const theme = useTheme();

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
      // refetchInterval: 5000,
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
      // Check if the user clicked "نعم"
      if (result.isConfirmed) {
        await axios
          .put(
            `${BackendUrl}/api/CancelSendProject/${id}`,
            {},
            {
              headers: {
                token: token,
              },
            }
          )
          .then((response) => {
            if (response) {
              console.log(response.data);
              toast(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("User clicked لا or closed the dialog");
      }
    });
  };
  const handelSendData = (id) => {
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
        await axios
          .put(
            `${BackendUrl}/api/sendProjectToManger/${id}`,
            {},
            {
              headers: {
                token: token,
              },
            }
          )
          .then((response) => {
            if (response) {
              console.log(response.data);
              toast(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("User clicked لا or closed the dialog");
      }
    });
  };
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
          <ToastContainer />
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
                      <td>{index + 1}</td>
                      <td>{Project?.DepartmentID?.departmentName}</td>
                      <td>{Project?.nameProject}</td>
                      <td style={{ direction: "rtl" }}>
                        {formatDate(Project?.createdAt)}
                      </td>
                      <td>{Project?.userId?.name}</td>
                      <td>{Project?.userId?.Phone}</td>
                      <td>
                        <div className=" ">
                          <DataProductByProjectIsSend
                            projectId={Project?._id}
                          />
                          <IconButton onClick={() => showSwal(Project?._id)}>
                            <CancelScheduleSend />
                          </IconButton>
                          <IconButton
                            onClick={() => handelSendData(Project?._id)}
                          >
                            <Send />
                          </IconButton>
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
