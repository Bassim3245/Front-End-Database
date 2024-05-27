import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../redux/ProductSlice/ProductAction";
import OfferPriceMain from "./OfferPrice/OfferPrice";
import { useTranslation } from "react-i18next";
const DataProductByProjectIsSend = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  const projectId = props?.projectId;
  const getDataProductById = () => {
    // @ts-ignore
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
      {open ? (
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenDataProject}
        >
          <KeyboardArrowDown />
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenDataProject}
        >
          <KeyboardArrowUp />
        </Button>
      )}
      <div
        className={`PostionTable  ${open ? "table-container" : ""}`}
        style={{ maxWidth: "100%" }}
      >
        {open && (
          <div className="w-100 ">
            {loading && <div>loading..</div>}

            <div
              className={`container m-5 ${
                theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
              }  p-3 rad-10`}
            >
              <div className="mb-2">
                <OfferPriceMain projectId={projectId} />
              </div>
              <div className="mb-3">
                <Table
                  striped
                  bordered
                  hover
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
                    {products &&
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
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataProductByProjectIsSend;
