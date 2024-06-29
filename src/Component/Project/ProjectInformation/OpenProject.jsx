import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BottomSend, ColorLink, StyledInputBase } from "../../Config/Content";
import { Table } from "react-bootstrap";
import Module from "../../MainFor/ModuleInsertProduct";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import AllowEdit from "./AlllowEdit";
import { Slide, ToastContainer, toast } from "react-toastify";
import { fetchDataProduct } from "../../Config/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction";
import ModuleEdit from "../../MainFor/ModulEditProducts";
import { Button, useTheme } from "@mui/material";
import ModulToploadFilePricedTechnical from "../../MainFor/ModulToploadFilePricedTechnical";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/LanguageState";
import Loader from "Component/Config/Loader";
import {
  CustomNoRowsOverlay,
  Delete,
  FormatDataNumber,
  hasPermission,
  sumDataProjectIQD,
} from "../../Config/Function";
import { getRoleAndUserId } from "../../../redux/RoleSlice/rolAction";
import AllowDelate from "./AllowDelete";
import "react-toastify/dist/ReactToastify.css";
import AutocompleteExample from "../../Config/AutoCompletSearch";
import RefreshButtonData from "../../Config/RefreshButton";
import { clearState } from "../../../redux/ProductSlice/ProductSlice";

const FormatTextarea2 = ({ data }) => {
  if (typeof data !== "string") {
    console.warn("FormatTextarea: Input data is not a string.");
    return null;
  }

  let formattedData = data.replace(/_/g, "<br/>").replace(/-/g, "\n-");
  if (formattedData.startsWith("\n")) {
    formattedData = formattedData.substring(1);
  }

  return <p dangerouslySetInnerHTML={{ __html: formattedData }} />;
};

export default function OpenProject() {
  const { id } = useParams();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoading] = useState(false);
  const { products, loading } = useSelector((state) => state?.products);
  const [deleteItem, setDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshButton, setRefreshButton] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products || "");
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { rtl } = useSelector((state) => state?.language);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayProductByProjectName(id));
  }, []);
  useEffect(() => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, [dispatch, info?._id, token, refreshButton, message]);
  useEffect(() => {
    console.log(products);
    dispatch(setLanguage());
  }, [dispatch]);

  useEffect(() => {
    const fetchDataByProjectId = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BackendUrl}/api/getProjectById/${id}`
        );
        if (response.data) {
          setDataProject(response?.data);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataByProjectId();
  }, [deleteItem, anchorEl, refreshButton, id]);

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
    // dispatch(clearState());
    window.history.back();
  };

  const productRows = useMemo(() => {
    return Array.isArray(filteredProducts)
      ? filteredProducts.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td dir="rtl">
              <FormatTextarea2 data={item?.nameProduct} />
            </td>
            <td>{FormatDataNumber(item?.Price)}</td>
            <td>{item?.PriceType}</td>
            <td>{item?.Quantity}</td>
            <td>{item?.percent}</td>
            <td>{item?.PriceConvert}</td>
            <td>{item?.comments}</td>
            <td>{item?.description}</td>
            <td>{FormatDataNumber(item?.Quantity * item?.Price)}</td>
            <td>{item?.UnitId?.Unit}</td>
            <td className="d-flex gap-2 f-wrap">
              {item?.allowRequest || info?.user_type === "H.O.D" ? (
                <ModuleEdit
                  item={item}
                  getDataProduct={fetchDataProduct}
                  ProjectWorkNatural={dataProject?.WorkNatural}
                />
              ) : (
                <AllowEdit Id={item?._id} label="AllowEdit" title="تعديل" />
              )}
              {item?.allowRequestDelete || info?.user_type === "H.O.D" ? (
                <BottomSend
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
                  {t("ProductList.table.Delete")}
                </BottomSend>
              ) : (
                <AllowDelate Id={item?._id} label="AllowDelete" title="حذف" />
              )}
            </td>
          </tr>
        ))
      : [];
  }, [filteredProducts, t, info, token, dataProject]);

  return (
    <div className={`w-100`}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loadingProject ? (
        <div className="eventLoaderCenter">
          <Loader />
        </div>
      ) : (
        <>
          <div className="pb-3 d-flex justify-content-between">
            <ColorLink onClick={handleBack}>
              {t("ProductList.BackButton")}
            </ColorLink>
            <AutocompleteExample
              products={products}
              setFilteredProducts={setFilteredProducts}
              filteredProducts={filteredProducts}
            />
          </div>
          <div
            className={`p-3 rad-10 ${
              theme?.palette?.mode === "dark" ? "bg-dark" : "bg-eee"
            }`}
          >
            <div className="mb-3">
              {!dataProject?.SendProject ? (
                <>
                  <div dir={rtl?.dir}>
                    <h2>{t("ProductList.title")}</h2>
                  </div>
                  <div className="d-flex justify-content-center gap-2 ms-2 me-2 mb-2">
                    {products && (
                      <>
                        {hasPermission(
                          roles?.send_project_from_Employ_to_HOD?._id,
                          Permission?.permissionIds
                        ) ? (
                          <BottomSend
                            onClick={handleSend}
                            className="me-2"
                            variant="outlined"
                          >
                            {t("ProductList.SendButton")}
                          </BottomSend>
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
                    )}
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
                  <p style={{ textAlign: "center" }}>Project has been sent</p>
                </div>
              )}
              {Array.isArray(filteredProducts) &&
              filteredProducts?.length > 0 ? (
                !dataProject?.SendProject &&
                (filteredProducts ? (
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
                        <th>{t("ProductList.table.ProductName")}</th>
                        <th>{t("ProductList.table.Price")}</th>
                        <th>{t("ProductList.table.PriceType")}</th>
                        <th>{t("ProductList.table.Quantity")}</th>
                        <th>{t("ProductList.table.AdditionPercentage")}</th>
                        <th>{t("ProductList.table.priceConvert")}</th>
                        <th>{t("ProductList.table.Notes")}</th>
                        <th>{t("ProductList.table.Specifications")}</th>
                        <th>{t("ProductList.table.Total")}</th>
                        <th>{t("ProductList.table.Unit")}</th>
                        <th>{t("ProductList.table.Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productRows}
                      <tr>
                        <td colSpan={10}>المجموع</td>
                        <td>{sumDataProjectIQD(products).totalIQD} IQD</td>
                        <td>{sumDataProjectIQD(products).totalOther} USD</td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <h3>data has been sent</h3>
                  </div>
                ))
              ) : (
                <div>
                  <CustomNoRowsOverlay />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <RefreshButtonData setRefreshButton={setRefreshButton} />
    </div>
  );
}
