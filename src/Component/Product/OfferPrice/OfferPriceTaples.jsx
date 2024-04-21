import React, { useRef, useEffect } from "react";
import OfferPrice from "./showAllDataTaple.jsx";
import {
  Slide,
  Button,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction.js";
import { getDataSystemPrice } from "../../Config/fetchData.jsx";
import { useQuery } from "react-query";
const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfferPriceTable(props) {
  const [open, setOpen] = useState(false);
  const [PriceOffer, setPriceOffer] = useState("");
  const id = props?.projectId;
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const componentPDF = useRef(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const { isLoading, data, isError, error, refetch } = useQuery(
    "DataSystemPrice",
    getDataSystemPrice,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const theme = useTheme();
  return (
    
        <div className=" w-100 bg-eee">
          {loading && <div>loading..</div>}

          <div
            className={` m-5 ${
              theme.palette.mode === "dark" ? "bg-dark" : " bg-eee"
            } p-3 rad-10`}
          >
     
            <div className="container w-100" ref={targetRef}>
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
