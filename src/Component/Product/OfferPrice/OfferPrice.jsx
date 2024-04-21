import React, { useRef, useEffect } from "react";
import OfferPrice from "./showAllDataTaple.jsx";
import {
  Slide,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { usePDF } from "react-to-pdf";
import { displayProductByProjectName } from "../../../redux/ProductSlice/ProductAction.js";
import { ButtonSave } from "../../Config/Content.jsx";
// import { getDataSystemPrice } from "../../Config/fetchData.jsx";
import { useQuery } from "react-query";
import CustomizedSteppers from "./Stepper.jsx";
const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfferPriceMain(props) {
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
  // const { isLoading, data, isError, error, refetch } = useQuery(
  //   "DataSystemPrice",
  //   getDataSystemPrice,
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchInterval: false,
  //   }
  // );
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const theme = useTheme();
  return (
    <React.Fragment>
      <ButtonSave variant="outlined" onClick={handleClickOpen}>
        Price Offer
      </ButtonSave>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#0d47a1" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Offer Price
            </Typography>

            <Button autoFocus color="inherit" onClick={() => toPDF()}>
              Get Pdf
            </Button>
          </Toolbar>
        </AppBar>
        <div className="w-100 bg-eee ">
          {loading && <div>loading..</div>}

          <div
            className={`m-5 ${
              theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
            } p-3 rad-10`}
          >
            <CustomizedSteppers projectId={props?.projectId} />
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default OfferPriceMain;
