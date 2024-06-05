import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColorLink } from "../../Config/Content";
import { Table } from "react-bootstrap";
import Module from "../MainFor/ModuleInsertProduct";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import AllowEdit from "./AlllowEdit";
import { ToastContainer, toast } from "react-toastify";
import { fetchDataProduct } from "../../Config/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction";
import ModuleEdit from "../MainFor/ModulEditProducts";
import { Button, useTheme } from "@mui/material";
import ModulToploadFilePricedTechnical from "../MainFor/ModulToploadFilePricedTechnical";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
import Loader from "Component/Config/Loader";
import { Delete, hasPermission } from "../../Config/Function";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import AllowDelate from "./AllowDelete";
export default function OpenProject() {
  const { id } = useParams();
  console.log(id);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoading] = useState(false);
  const { products, loading } = useSelector((state) => state?.products);
  const [DeleteItem, setDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    detDataProductById();
  }, [message, dispatch]);
  useEffect(() => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, []);

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const detDataProductById = () => {
    dispatch(displayProductByProjectName(id));
  };
  useEffect(() => detDataProductById(), [DeleteItem]);
  const fetchDataByProjectId = async () => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const response = await axios.get(
        `${BackendUrl}/api/getProjectById/${id}`
      );
      if (response.data) {
        setDataProject(response?.data);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  const handleSend = async () => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/sendProject/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response?.data) {
        toast.success(response?.data?.message);
        setMessage(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleBack = () => {
    window.history.back(-1);
  };
  useEffect(() => {
    fetchDataByProjectId();
  }, [DeleteItem, anchorEl]);

  return (
    <div className={`w-100 `}>
      <ToastContainer />
      {loadingProject ? (
        <div className="eventLoaderCenter">
          <Loader />
        </div>
      ) : (
        <>
          <div className="p-5 d-block">
            <ColorLink onClick={handleBack}>
              {t("ProductList.BackButton")}
            </ColorLink>
          </div>
          <div
            className={`container  p-3 rad-10 ${
              theme?.palette?.mode === "dark" ? "bg-dark" : "bg-eee"
            }`}
          >
            <ToastContainer />
            <div className=" mb-3">
              {!dataProject?.SendProject ? (
                <>
                  <div dir={rtl?.dir}>
                    <h2>{t("ProductList.title")}</h2>
                  </div>
                  <div className="d-flex justify-content-center gap-2 ms-2 me-2 mb-2">
                    {products ? (
                      <>
                        {hasPermission(
                          roles?.send_project_from_Employ_to_HOD?._id,
                          Permission?.permissionIds
                        ) ? (
                          <Button
                            onClick={() => handleSend(products?._id)}
                            className="me-2"
                            variant="outlined"
                          >
                            {t("ProductList.SendButton")}
                          </Button>
                        ) : (
                          <Button
                            className="me-2"
                            variant="contained"
                            color="secondary"
                          >
                            {t("Authorized to send")}
                          </Button>
                        )}

                        <ModulToploadFilePricedTechnical
                          t={t}
                          DepartmentID={dataProject?.DepartmentID}
                          ProjectId={dataProject?._id}
                        />
                      </>
                    ) : null}
                    <Module
                      t={t}
                      getDataProduct={fetchDataProduct}
                      DepartmentID={dataProject?.DepartmentID}
                      ProjectId={dataProject?._id}
                      ProjectWorkNatural={dataProject?.WorkNatural}
                    />
                  </div>
                </>
              ) : (
                <div className="w-100">
                  {" "}
                  <p style={{ textAlign: "center" }}>Project has been send</p>
                </div>
              )}
              {!(
                // @ts-ignore
                dataProject?.SendProject
              ) &&
                (products ? (
                  <Table
                    striped
                    bordered
                    hover
                    variant={`${theme?.palette?.mode === "dark" ? "dark" : ""}`}
                    dir={rtl?.dir}
                    responsive
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t("ProductList.table.ProductName")} </th>
                        <th>{t("ProductList.table.Price")}</th>
                        <th>{t("ProductList.table.PriceType")}</th>
                        <th>{t("ProductList.table.Quantity")}</th>
                        <th>{t("ProductList.table.AdditionPercentage")}</th>
                        <th>{t("ProductList.table.priceConvert")}</th>
                        <th>{t("ProductList.table.Notes")}</th>
                        <th>{t("ProductList.table.Specifications")}</th>
                        <th>{t("ProductList.table.Unit")}</th>
                        <th>{t("ProductList.table.Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products ? (
                        Array.isArray(products) &&
                        products?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.nameProduct}</td>
                            <td>{item?.Price}</td>
                            <td>{item?.PriceType}</td>
                            <td>{item?.Quantity}</td>
                            <td>{item?.percent}</td>
                            <td>{item?.PriceConvert}</td>

                            <td>{item?.comments}</td>
                            <td>{item?.description}</td>
                            <td>{item?.UnitId?.Unit}</td>

                            <td className=" d-flex gap-2 f-wrap">
                              <div>
                                {item?.allowRequest ||
                                info?.user_type === "H.O.D" ? (
                                  <div className="d-flex">
                                    <ModuleEdit
                                      item={item}
                                      getDataProduct={fetchDataProduct}
                                      // @ts-ignore
                                      ProjectWorkNatural={
                                        dataProject?.WorkNatural
                                      }
                                    />
                                  </div>
                                ) : (
                                  <>
                                    {/* <Button>Delete</Button> */}
                                    <div className="d-flex gap-2">
                                      <AllowEdit
                                        Id={item?._id}
                                        label="AllowEdit"
                                        title="تعديل"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                              <div>
                                {item?.allowRequestDelete ||
                                info?.user_type === "H.O.D" ? (
                                  <div className="d-flex">
                                    <Button
                                      onClick={() =>
                                        Delete(
                                          item?._id,
                                          setDelete,
                                          setAnchorEl,
                                          token,
                                          "DeleteProduct"
                                        )
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    {/* <Button>Delete</Button> */}
                                    <div className="d-flex gap-2">
                                      <AllowDelate
                                        Id={item?._id}
                                        label="AllowDelete"
                                        title="حذف"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div>
                          <p>No Data Found</p>
                        </div>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <div className=" d-flex justify-content-center align-item-center">
                    {" "}
                    data not found
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
