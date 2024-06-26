import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  IconButton,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close, LocalPrintshop } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { BackendUrl } from "../../../../redux/api/axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrintPdf(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${props?.dataProjectTest?.nameProject}_${props?.label}`,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renderRows = () => {
    if (!Array.isArray(props?.dataSet.Products)) return null;

    return props?.dataSet.Products.map((item, index) => {
      let priceColumns = null;

      if (props?.label === "OfferPriceIQR") {
        priceColumns = (
          <>
            <td>{props?.dataSet.priceProduct[index]}</td>
            <td>{props?.dataSet.priceProductQuantity[index]}</td>
          </>
        );
      } else if (props?.label === "OfferPriceIQRAfterPercent") {
        priceColumns = (
          <>
            <td>
              {props?.dataSet.calculateAfterPercentageWithoutQuantity[index]}
            </td>
            <td>{props?.dataSet.calculatePriceAfterPercentageWith[index]}</td>
          </>
        );
      } else if (props?.label === "OfferPriceUSD") {
        priceColumns = (
          <>
            <td>
              {
                props?.dataSet
                  .calculateAfterPercentageWithoutQuantityAndConvertToUsd[index]
              }
            </td>
            <td>
              {
                props?.dataSet
                  .calculateAfterPercentageWithQuantityAndConvertToUsd[index]
              }
            </td>
          </>
        );
      }

      return (
        <tr key={index}>
          <th scope="row" style={{ fontWeight: "bold" }}>
            {index + 1}
          </th>
          <td style={{ backgroundColor: "#bdbdbd", fontWeight: "bold" }}>
            {item?.nameProduct}
          </td>
          <td>{item?.Quantity}</td>
          <td>{item?.UnitId?.Unit}</td>
          {priceColumns}
        </tr>
      );
    });
  };

  const renderTotal = () => {
    let total = "";
    if (props?.label === "OfferPriceIQR") {
      total = props?.dataSet?.calculateTotalPriceOF;
    } else if (props?.label === "OfferPriceIQRAfterPercent") {
      total = props?.dataSet?.SumTotalPriceAfterAdd;
    } else if (props?.label === "OfferPriceUSD") {
      total = props?.dataSet?.SumTFrNmFBpzPfDvDX8m4i7KdjsoNxzK2E62avert;
    }
    return total;
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen} disableRipple>
        <LocalPrintshop />
        Print
      </MenuItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <AppBar
            sx={{ position: "relative" }}
            className=""
            color="transparent"
          >
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose}>
                <Close />
              </IconButton>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant="h6"
                component="div"
              ></Typography>
              <Button autoFocus color="inherit" onClick={handlePrint}>
                <img src="/image/print.png" alt="print" width={"50px"} />
              </Button>
            </Toolbar>
          </AppBar>
          <div className="a4-page mt-4">
            <div className="contentPage" ref={componentRef}>
              <style>
                {`
                  @media print {
                    @page {
                      margin: 1cm;
                    }
                    body::after {
                      content: "Page " counter(page);
                      position: fixed;
                      bottom: 0;
                      right: 0;
                      padding: 1cm;
                      color: black;
                      font-size: 12px;
                    }
                  }
                `}
              </style>
              <div className="">
                <div className="">
                  <div className="">
                    <div
                      style={{
                        direction: "rtl",
                        fontFamily: "Arial, sans-serif",
                      }}
                      className="mt-2"
                    >
                      <p style={{ textAlign: "center" }}>جدول كميات B.O.Q</p>
                      <p style={{ textAlign: "center" }}>العرض الفني المسعر</p>
                      <p style={{ textAlign: "center" }}>
                        الجهة المستفيدة :{props?.dataProjectTest.beneficiary}/
                        {props?.dataProjectTest.NumberBook}
                      </p>
                    </div>
                  </div>
                  <table className="table table-striped " dir="rtl">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">اسم المنتج</th>
                        <th scope="col">الكمية</th>
                        <th scope="col">الوحدة</th>
                        {props?.label === "OfferPriceIQR" ? (
                          <>
                            <th scope="col">السعر IQD</th>
                            <th scope="col">السعر الإجمالي IQD</th>
                          </>
                        ) : props?.label === "OfferPriceIQRAfterPercent" ? (
                          <>
                            <th scope="col">السعر بعد اضافة النسبة</th>
                            <th scope="col">
                              السعر الإجمالي بعد اضافة النسبة IQD
                            </th>
                          </>
                        ) : props?.label === "OfferPriceUSD" ? (
                          <>
                            <th scope="col">السعر USD</th>
                            <th scope="col">السعر الإجمالي USD</th>
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan="6"
                          className="p-3"
                          style={{
                            backgroundColor: "#9E9E9E",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {props?.dataProjectTest?.nameProject}
                        </td>
                      </tr>
                      {renderRows()}
                      <tr>
                        <td
                          colSpan="5"
                          className="p-3"
                          style={{
                            backgroundColor: "#9E9E9E",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          المجموع
                        </td>
                        <td>{renderTotal()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            غلق
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
