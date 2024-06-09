import "./Event.css";
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { Button, ThemeProvider, createTheme, useTheme } from "@mui/material";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { useQuery } from "react-query";
import { GetDataEventByDepartmentId } from "../Config/fetchData";
import Loader from "../Config/Loader";
const Event = () => {
  const [info, setInfo] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [votes, setVotes] = useState(0);
  // @ts-ignore
  const [dataDepartment, setDataDepartment] = useState([]);
  const departmentId = info?.DepartmentID;
  useEffect(() => {
    const pusher = new Pusher("981e65db6d4dc90983b4", {
      cluster: "us3",
      // @ts-ignore
      encrypted: true,
    });
    const channel = pusher.subscribe("poll");
    channel.bind("vote", (data) => {
      console.log(data);
      setVotes((prevVotes) => prevVotes + 1);
    });
    return () => {
      pusher.unsubscribe("poll");
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getData/Department`
        );
        if (response) {
          setDataDepartment(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "dataSendByUser",
    () => GetDataEventByDepartmentId(departmentId),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      // refetchInterval: 5000,
    }
  );
  const theme = createTheme({
    direction: "rtl",
  });
  const themeMode = useTheme();
  const handleAccept = async (ProductId, eventId) => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/ProductRequestEditAllow/${ProductId}/${eventId}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleAcceptDelete = async (ProductId, eventId) => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/productRequestDeleteAllow/${ProductId}/${eventId}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const formatDate = (Data) => {
    const date = new Date(Data);
    return moment(date).format(" h:m:s YYYY/MM/DD ");
  };
  return (
    <>
      {isLoading && (
        <div className="eventLoaderCenter">
          <Loader />
        </div>
      )}
      <ThemeProvider theme={theme}>
        {/* <ToastContainer /> */}
        <section
          className={`section ${
            themeMode.palette.mode === "dark" ? "bg-dark" : ""
          } w-100`}
        >
          <div className="container">
            <div className="d-flex justify-content-between p-3 gap-3 ">
              <Form.Select
                aria-label="Default select example"
                data-bs-theme={themeMode.palette.mode === "dark" ? "dark" : ""}
              >
                <option>اختيار القسم</option>
                {dataDepartment?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item?.departmentName}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                data-bs-theme={themeMode.palette.mode === "dark" ? "dark" : ""}
              >
                <option> العنوان الوظيفي</option>
                <option value="اداري"> اداري </option>
                <option value="موظف">موظف</option>
              </Form.Select>
            </div>
            <div>
              {" "}
              <button className="btn buttonEvent">
                اختيار حسب القسم والصلاحية
              </button>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="align-items-center row">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-4">
                    <div className="candidate-list-widgets">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="selection-widget">
                            <select
                              data-bs-theme={
                                themeMode.palette.mode === "dark" ? "dark" : ""
                              }
                              className="form-select"
                              data-trigger="true"
                              name="choices-single-filter-orderby"
                              id="choices-single-filter-orderby"
                              aria-label="Default select example"
                            >
                              <option value="ne">الاحدث</option>
                              <option value="od">الاقدم</option>
                              <option value="rd">عشوائي</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="selection-widget mt-2 mt-lg-0">
                            <select
                              data-bs-theme={
                                themeMode.palette.mode === "dark" ? "dark" : ""
                              }
                              className="form-select"
                              data-trigger="true"
                              name="choices-candidate-page"
                              id="choices-candidate-page"
                              aria-label="Default select example"
                            >
                              <option value="df">الكل</option>
                              <option value="ne">8 عنصر لكل صفحة</option>
                              <option value="ne">12 عنصر لكل صفحة</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {data && data != undefined ? (
                  // @ts-ignore
                  data?.map((item, index) => (
                    <div key={index} className={`candidate-list `}>
                      <div
                        className={`candidate-list-box card mt-4`}
                        style={{
                          background: `${
                            themeMode.palette.mode === "dark" ? "#121212" : ""
                          }`,
                        }}
                      >
                        <div className="p-4 card-body">
                          <div className="align-items-center row">
                            <div className="col-auto">
                              <div className="candidate-list-images">
                                <a href="#">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt=""
                                    className="avatar-md img-thumbnail rounded-circle"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="candidate-list-content mt-3 mt-lg-0">
                                <h5 className="fs-19 mb-0">
                                  <a
                                    className="primary-link"
                                    href="#"
                                    style={{
                                      color: `${
                                        themeMode.palette.mode === "dark"
                                          ? themeMode.palette.text.primary
                                          : ""
                                      }`,
                                    }}
                                  >
                                    {item?.userId?.name}
                                  </a>
                                </h5>
                                <p
                                  className=""
                                  style={{
                                    color: `${
                                      themeMode.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.7)"
                                        : ""
                                    }`,
                                  }}
                                >
                                  {item?.departmentId?.departmentName ===
                                  "H.O.D" ? (
                                    <p
                                      style={{
                                        color: `${
                                          themeMode.palette.mode === "dark"
                                            ? "rgba(255, 255, 255, 0.7)"
                                            : ""
                                        }`,
                                      }}
                                    >
                                      {" "}
                                      Head Of Department
                                    </p>
                                  ) : (
                                    item?.departmentId?.departmentName
                                  )}
                                </p>
                                <ul className="list-inline mb-0 text-muted">
                                  <li
                                    className="list-inline-item"
                                    style={{
                                      color: `${
                                        themeMode.palette.mode === "dark"
                                          ? themeMode.palette.text.disabled
                                          : ""
                                      }`,
                                    }}
                                  >
                                    {item.actions === "Add"
                                      ? `${item?.userId?.name} added Product to ${item?.projectId?.nameProject}`
                                      : item.actions === "edit"
                                      ? `${item?.userId?.name} request Edit`
                                      : item.actions === "send"
                                      ? `${item?.userId?.name} send the Project `
                                      : item.actions === "delete"
                                      ? `${item?.userId?.name} delete the Project `
                                      : item.actions === "AllowEdit"
                                      ? `${item?.userId?.name} approved the request to modify the product `
                                      : item.actions === "AllowEdit"
                                      ? `${item?.userId?.name} approved the request to delete the product `
                                      : item.actions === "addProject"
                                      ? `${item?.userId?.name} added the project to the ${item?.departmentId?.departmentName} Department  `
                                      : null}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                                <span className="badge bg-soft-secondary fs-14 mt-1">
                                  {item?.userId?.user_type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="favorite-icon m-3" dir="rtl">
                            {item?.actions === "edit" ? (
                              !item?.productId?.allowRequest ? (
                                <div>
                                  <Button
                                    variant="text"
                                    onClick={() =>
                                      handleAccept(
                                        item?.productId?._id,
                                        item._id
                                      )
                                    }
                                  >
                                    accept request edit
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <p> Don</p>
                                </div>
                              )
                            ) : item?.actions === "Delete" ? (
                              !item?.productId?.allowRequestDelete ? (
                                <div>
                                  <Button
                                    variant="text"
                                    onClick={() =>
                                      handleAcceptDelete(
                                        item?.productId?._id,
                                        item._id
                                      )
                                    }
                                  >
                                    accept Request Delate
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <p> Don </p>
                                </div>
                              )
                            ) : item?.actions === "send" ? (
                              <div>
                                <Button variant="text">send</Button>
                              </div>
                            ) : item.actions === "Add" ? null : null}
                            <div className="mt-3">
                              {" "}
                              <p
                                className=""
                                style={{ color: "rgba(33, 37, 41, 0.75)" }}
                              >
                                {" "}
                                {formatDate(item?.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="testimagenotfoun ">
                      {" "}
                      <img src="/image/3d-yellow-bell-with-exclamation-point.jpg" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="mt-4 pt-2 col-lg-12">
                <nav aria-label="Page navigation example">
                  <div className="pagination job-pagination mb-0 justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" tabIndex={-1} href="#">
                        <i className="mdi mdi-chevron-double-left fs-15" />
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <i className="mdi mdi-chevron-double-right fs-15" />
                      </a>
                    </li>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </ThemeProvider>
    </>
  );
};

export default Event;
