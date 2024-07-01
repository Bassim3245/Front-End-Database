import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction";
import { useTranslation } from "react-i18next";
import OfferPriceMain from "../../Product/OfferPrice/OfferPrice";
import { hasPermission } from "../../Config/Function";
import ModuleEdit from "Component/MainFor/ModulEditProducts";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import RefreshButtonData from "Component/Config/RefreshButton";
const DataProductByProjectId = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { products, loading } = useSelector((state) => state.products);
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoading] = useState(false);
  const projectId = props?.ProjectID;
  const [refreshButton, setRefreshButton] = useState(false);
  const getDataProductById = () => {
    dispatch(displayProductByProjectName(projectId));
  };
  useEffect(() => {
    getDataProductById();
  }, [dispatch, open]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchDataByProjectId = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BackendUrl}/api/getProjectById/${projectId}`
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
  }, [refreshButton, projectId]);
  return (
    <>
      <div className="w-100 ">
        {loading && <div>loading..</div>}
        <div className="mb-3">
          <div className="mb-2">
            {hasPermission(
              props?.roles.view_data_price_offer._id,
              props?.Permission?.permissionIds
            ) && <OfferPriceMain projectId={projectId} />}
          </div>
          <Table
            bordered
            variant={theme.palette.mode === "dark" ? "dark" : ""}
            dir="rtl"
            responsive
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{t("ProductList.table.ProductName")}</th>
                <th>{t("ProductList.table.Notes")}</th>
                <th>{t("ProductList.table.Specifications")}</th>
                <th>{t("ProductList.table.Quantity")}</th>
                <th>{t("ProductList.table.Unit")}</th>
                <th>{t("ProductList.table.Price")}</th>
                <th> {t("ProductList.table.PriceType")}</th>
                <th> {t("ProductList.table.priceConvert")}</th>
                <th> {t("ProductList.table.Action")}</th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                Array.isArray(products) &&
                products.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.nameProduct}</td>
                    <td>{item?.comments}</td>
                    <td>{item?.description}</td>
                    <td>{item?.Quantity}</td>
                    <td>{item?.UnitId?.Unit}</td>
                    <td>{item?.Price}</td>
                    <td>{item?.PriceConvert || "0"}</td>
                    <td>{item?.PriceType}</td>
                    <td>
                      <ModuleEdit
                        item={item}
                        getDataProduct={products}
                        ProjectWorkNatural={dataProject?.WorkNatural}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <h4>no data found</h4>
                </div>
              )}
            </tbody>
          </Table>
        </div>
        <RefreshButtonData setRefreshButton={setRefreshButton} />
      </div>
    </>
  );
};

export default DataProductByProjectId;
