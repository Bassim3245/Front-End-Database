import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction";
import { useTranslation } from "react-i18next";
const DataProductByProjectId = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { products, loading } = useSelector((state) => state.products);

  const projectId = props?.ProjectID;
  const getDataProductById = () => {
    dispatch(displayProductByProjectName(projectId));
  };
  useEffect(() => {
    getDataProductById();
  }, [dispatch, open]);
  const handleOpenDataProject = () => {
    setOpen(!open);
  };

  const { t } = useTranslation();
  return (
    <>
      <div className="w-100 ">
        {loading && <div>loading..</div>}

        <div className="mb-3">
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
      </div>
    </>
  );
};

export default DataProductByProjectId;
