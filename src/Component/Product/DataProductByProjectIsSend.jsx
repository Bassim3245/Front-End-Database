import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../redux/ProductSlice/ProductAction";
import OfferPriceMain from "./OfferPrice/OfferPrice";
const DataProductByProjectIsSend = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  const projectId = props?.projectId;
  const getDataProductById = () => {
    // @ts-ignore
    dispatch(displayProductByProjectName(projectId));
  };
  useEffect(() => {
    getDataProductById();
  }, [dispatch,open]);
  const handleOpenDataProject = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  return (
    <>
      {open ? (
        <IconButton aria-label="delete" onClick={handleOpenDataProject}>
          <KeyboardArrowDown />
        </IconButton>
      ) : (
        <IconButton aria-label="delete" onClick={handleOpenDataProject}>
          <KeyboardArrowUp />
        </IconButton>
      )}
      <div className={`PostionTable ${open ? "table-container" : ""}`}>
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
                >
                  <thead dir="rtl">
                    <tr>
                      <th>الوحدة</th>
                      <th>السعر</th>
                      <th>العدد</th>
                      <th>المواصفات</th>
                      <th>الملاحضات</th>
                      <th>اسم المنتج</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      Array.isArray(products) &&
                      products.map((item, index) => (
                        <tr key={index}>
                          <td className="arabicText">{item?.UnitId?.Unit}</td>
                          <td className="arabicText">{item?.PriceIQD}</td>
                          <td className="arabicText">{item?.Quantity}</td>
                          <td className="arabicText">{item?.description}</td>
                          <td className="arabicText">{item?.comments}</td>
                          <td className="arabicText">{item?.nameProduct}</td>
                          <td className="arabicText">{index + 1}</td>
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
