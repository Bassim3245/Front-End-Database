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
      <div className={`PostionTable container ${open ? "table-container" : ""}`}>
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
                    <th>اسم المنتج</th>
                    <th>الملاحضات</th>
                    <th>المواصفات</th>
                    <th>العدد</th>
                      <th>الوحدة</th>
                      <th>السعر</th>
                      <th>سعر الصرف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      Array.isArray(products) &&
                      products.map((item, index) => (
                        <tr key={index}>
                          <td >{index + 1}</td>
                          <td >{item?.nameProduct}</td>
                          <td >{item?.comments}</td>
                          <td >{item?.description}</td>
                          <td >{item?.Quantity}</td>
                          <td >{item?.UnitId?.Unit}</td>
                          <td >{item?.Price}</td>
                          <td >{item?.PriceType}</td>

                         
                          
                          
                        
                          
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
