import React, { useRef, useEffect } from "react";
import OfferPrice from "./showAllDataTable.jsx";
import { Slide, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction.js";
import { Archive } from "@mui/icons-material";

function OfferPriceTable(props) {
  const [open, setOpen] = useState(false);
  const id = props?.projectId;
  // @ts-ignore

  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const detDataProductById = () => {
    // @ts-ignore
    dispatch(displayProductByProjectName(id));
  };
  useEffect(() => {
    detDataProductById();
  }, [open]);
  const theme = useTheme();
  return (
    <div className={`${theme.palette.mode === "dark" ? "bg-dark" : " bg-eee"}`}>
      {loading && <div>loading..</div>}

      <div className={` m-5  p-3 rad-10`}>
      <Button variant="outlined" startIcon={<Archive/>}> Archive</Button>
        <div className="container w-100" ref={props?.targetRef}>
          <div className="mb-4">
            <OfferPrice
              projectId={props?.projectId}
              products={products}
              label={"OfferPriceIQR"}
            />
          </div>
          <div className="mb-4">
            <OfferPrice
              projectId={props?.projectId}
              products={products}
              label={"OfferPriceIQRAfterPercent"}
            />
          </div>
          <div className="mb-4">
            <OfferPrice
              projectId={props?.projectId}
              products={products}
              label={"OfferPriceUSD"}
            />
          </div>
        </div>
        <div
          className="container d-block"
          style={{ width: "82%", maxWidth: "100%" }}
        >
          <Button
            onClick={handleClose}
            style={{ width: "100%", fontSize: "20px" }}
            className="mb-3"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OfferPriceTable;
