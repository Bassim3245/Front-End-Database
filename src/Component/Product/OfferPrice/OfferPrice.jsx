import React, { useRef, useEffect } from "react";
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
import CustomizedSteppers from "./Stepper.jsx";
import "jspdf-autotable";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios.js";
const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
const options = {
  orientation: "landscape", // Adjust orientation if needed
};

function OfferPriceMain(props) {
  const [open, setOpen] = useState(false);
  const id = props?.projectId;
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [dataFile,setDataFiles]=useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.removeItem("CustomDataForPriceOffer");
    setOpen(false);
  };
  const detDataProductById = () => {
    // @ts-ignore
    dispatch(displayProductByProjectName(id));
  };
  useEffect(() => {
    detDataProductById();
  }, [open]);
  // @ts-ignore
  const { toPDF, targetRef } = usePDF(options);

  const generatePDF = async () => {
    try {
        const response = await axios.get(`${BackendUrl}/api/getPdfFileOfferPrice/${id}`, {
            // responseType: 'blob' // Set the response type to 'blob' for binary data
        });
        setDataFiles(response.data.response)
console.log( "hhhhhhhh",response.data);
//         if (response && response.data) {
//             const blob = new Blob([response.data], { type: 'application/pdf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = `${response.data.response.filesName}`; // Set the file name for download
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             document.body.removeChild(a);
//         }
    } catch (error) {
        console.log(error);
    }
};
// useEffect(()=>{
//   console.log(dataFile);
// },[])
 // toPDF(targetRef);
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

            <Button autoFocus color="inherit" onClick={()=>generatePDF()}>
              Get Pdf
            </Button>
            {dataFile && (
        <a href={`${BackendUrl}/${dataFile?.filesName}`} download="offer.pdf">
          Click here to download
        </a>
      )}

          <a href={`${BackendUrl}/${dataFile?.filesName}`} download >hello  </a>
          </Toolbar>
        </AppBar>
        <div
          className={`${theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"} `}
          style={{}}
        >
          {loading && <div>loading..</div>}

          <div
            className={`m-5 ${
              theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
            } p-3 rad-10 `}
          >
            <CustomizedSteppers
              projectId={props?.projectId}
              targetRef={targetRef}
            />
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default OfferPriceMain;
