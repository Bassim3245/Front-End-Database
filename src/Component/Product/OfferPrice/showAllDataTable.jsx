import { Button, MenuItem, useTheme } from "@mui/material";
import { getDataByProjectID } from "../../Config/fetchData";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { StyledMenu } from "../../Config/Content";
import { GetApp, PictureAsPdf, TextSnippet } from "@mui/icons-material";
import ArchiveIcon from "@mui/icons-material/Archive";
import {
  SumTotalPriceAfterAddPercentage,
  calculatePrice,
  calculateTotalPriceOFproject,
  calculateTotalPrice,
  SumTotalPriceAfterAddPercentageAndConvertToUSD,
  calculatePriceAfterPercentageWithQuantity,
  calculatePriceAfterPercentageWithoutQuantity,
  calculatePriceAfterPercentageWithQuantityAndConvertToUSD,
  calculatePriceAfterPercentageWithoutQuantityAndConvertToUSD,
} from "Component/Config/Function";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "Component/Config/Loader";
import PrintPdf from "./HandelFile/PrintPdf";
export default function OfferPrice(props) {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("CustomDataForPriceOffer")) || {}
  );
  const PriceConvertToIQD = info?.PriceConvertToIQD;
  const token = localStorage.getItem("token") || {};
  const [dataSet, setDataSet] = useState({});
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataProjectTest, setDataProject] = useState({});
  const Products = props?.products;
  const theme = useTheme();
  const textDark =
    theme.palette.mode === "dark" ? theme.palette.text.primary : "";
  const { data, refetch, isLoading } = useQuery(
    "DataProjectById",
    () => getDataByProjectID(props?.projectId),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );
  const getDatProject = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataProjectById/${props?.projectId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      setDataProject(response?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("ashdsh", dataProjectTest);
    getDatProject();
  }, []);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {}, []);
  const collectData = (Products) => {
    if (!Products) return;
    const priceProduct = Products?.map((product) => calculatePrice(product));
    const priceProductQuantity = Products?.map((product) =>
      calculateTotalPrice(product)
    );
    const calculateTotalPriceOF = calculateTotalPriceOFproject(Products);
    const SumTotalPriceAfterAdd = SumTotalPriceAfterAddPercentage(Products);
    const SumTotalPriceAfterAddPercentageAndConvert =
      SumTotalPriceAfterAddPercentageAndConvertToUSD(Products,Products?.PriceConvertToIQD);
    const calculatePriceAfterPercentageWith = Products?.map((product) =>
      calculatePriceAfterPercentageWithQuantity(product)
    );
    const calculateAfterPercentageWithoutQuantity = Products?.map((product) =>
      calculatePriceAfterPercentageWithoutQuantity(product)
    );
    const calculateAfterPercentageWithQuantityAndConvertToUsd = Products?.map(
      (product) =>
        calculatePriceAfterPercentageWithQuantityAndConvertToUSD(product)
    );
    const calculateAfterPercentageWithoutQuantityAndConvertToUsd =
      Products?.map((product) =>
        calculatePriceAfterPercentageWithoutQuantityAndConvertToUSD(product)
      );
    const newData = {
      Products,
      priceProduct,
      priceProductQuantity,
      calculateTotalPriceOF,
      SumTotalPriceAfterAdd,
      SumTotalPriceAfterAddPercentageAndConvert,
      calculatePriceAfterPercentageWith,
      calculateAfterPercentageWithoutQuantity,
      calculateAfterPercentageWithQuantityAndConvertToUsd,
      calculateAfterPercentageWithoutQuantityAndConvertToUsd,
    };
    setDataSet(newData);
  };
  useEffect(() => {
    collectData(Products);
  }, [Products]);
  const getPriceOrigin = (item, label) => {
    let PriceData;
    if (item.PriceType === "USD" && label === "USD") {
      PriceData = item.Price; // Assuming price is already in USD
    } else if (item.PriceType === "IQD" && label === "IQD") {
      PriceData = item.Price; // Convert IQR to USD
    } else {
      return null;
    }
    return PriceData;
  };
  const handleDataPdf = async (label) => {
    try {
      if (dataProjectTest) {
        setLoading(true);

        const response = await axios.post(
          `${BackendUrl}/api/setDataAsPdf`,
          { dataSet, label, dataProjectTest },
          {
            headers: {
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );

        if (response) {
          const blob = new Blob([response?.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data?.nameProject}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          toast.error("Failed to generate PDF");
        }
      } else {
        toast.error("No project data available.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("An error occurred while generating the PDF");
    } finally {
      setLoading(false);
    }
  };

  const renderRows = () => {
    return Products?.map((item, index) => (
      <tr key={item?._id}>
        {props?.label === "OfferPriceIQR" && (
          <>
            <td className="arabicText"> {calculateTotalPrice(item)}</td>
            <td className="arabicText">{calculatePrice(item)}</td>
          </>
        )}
        {props?.label === "OfferPriceIQRAfterPercent" && (
          <>
            <td className="arabicText">
              {" "}
              {calculatePriceAfterPercentageWithQuantity(item)}
            </td>
            <td className="arabicText">
              {calculatePriceAfterPercentageWithoutQuantity(item)}
            </td>
          </>
        )}
        {props?.label === "OfferPriceUSD" && (
          <>
            <td className="arabicText">
              {" "}
              {calculatePriceAfterPercentageWithQuantityAndConvertToUSD(
                item,
                PriceConvertToIQD
              )}
            </td>
            <td className="arabicText">
              {calculatePriceAfterPercentageWithoutQuantityAndConvertToUSD(
                item,
                PriceConvertToIQD
              )}
            </td>
          </>
        )}
        <td className="arabicText">{getPriceOrigin(item, "USD")}</td>
        <td className="arabicText">{getPriceOrigin(item, "IQD")}</td>
        <td className="arabicText"> {item?.UnitId?.Unit}</td>
        <td className="arabicText">{item?.Quantity}</td>
        <td className="arabicText">
          {item?.nameProduct}
          <br />
          <p className="text-secondary m-1">
            {item?.comments || null}
            <span style={{ color: "black" }} className="me-2">
              ({item?.license})
            </span>
          </p>
        </td>
        <td className="arabicText">{index + 1}</td>
      </tr>
    ));
  };

  return (
    <>
      {loading ||
        (isLoading && (
          <div dir="ltr">
            <Loader />
          </div>
        ))}
      <div>
        <div className="w-100 mb-3 mt-3">
          <div style={{ direction: "rtl", fontFamily: "Arial, sans-serif" }}>
            <p style={{ textAlign: "center", color: textDark }}>
              جدول كميات B.O.Q
            </p>
            <p style={{ textAlign: "center" }}>Priced technical offer </p>
            <p style={{ textAlign: "center" }}>
              the beneficiary: {dataProjectTest?.nameProject} /{" "}
              {dataProjectTest?.NumberBook}
            </p>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-center w-100">
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<GetApp />}
          >
            Export F
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={
                props?.label === "OfferPriceIQR"
                  ? () => handleDataPdf("OfferPriceIQR")
                  : props?.label === "OfferPriceIQRAfterPercent"
                  ? () => handleDataPdf("OfferPriceIQRAfterPercent")
                  : props?.label === "OfferPriceUSD"
                  ? () => handleDataPdf("OfferPriceUSD")
                  : null
              }
              disableRipple
            >
              <PictureAsPdf />
              Download as Pdf
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <TextSnippet />
              Download as Excel
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ArchiveIcon />
              Download as Word
            </MenuItem>

            <PrintPdf
              dataSet={dataSet}
              label={props?.label}
              dataProjectTest={dataProjectTest}
            />
          </StyledMenu>
        </div>
        {loading ? "Downloading..." : "Download PDF"}
        <Table
          striped
          bordered
          hover
          className="mb-0"
          variant={theme.palette.mode === "dark" ? "dark" : ""}
          responsive
        >
          <thead dir="rtl">
            <tr style={{ background: "#e0e0e0" }}>
              {props?.label === "OfferPriceIQR" && (
                <>
                  <th>Total Price IQD</th>
                  <th>Price IQD</th>
                </>
              )}
              {props?.label === "OfferPriceIQRAfterPercent" && (
                <>
                  <th>The total price after adding the percentage IQD</th>
                  <th>Price After Adding the percentage IQD</th>
                </>
              )}
              {props?.label === "OfferPriceUSD" && (
                <>
                  <th>Total Price USD</th>
                  <th>Price USD</th>
                </>
              )}
              <th>Price Origin USD</th>
              <th>Price Origin IQR</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Product name</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.6)"
                    : "#9e9e9e",
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
            >
              <th className="p-3" colSpan="6" style={{ textAlign: "center" }}>
                {dataProjectTest?.nameProject}
              </th>
            </tr>
            {renderRows()}
          </tbody>
        </Table>
        <div
          className="d-flex justify-content-center align-items-center mt-0"
          dir="ltr"
        >
          <div
            style={{
              background:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.38)"
                  : "#bdbdbd",
            }}
            className="p-4"
          >
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {props?.label === "OfferPriceIQR" && (
                <p dir="rtl">{calculateTotalPriceOFproject(Products)}</p>
              )}
              {props?.label === "OfferPriceIQRAfterPercent" && (
                <p dir="rtl">{SumTotalPriceAfterAddPercentage(Products)}</p>
              )}
              {props?.label === "OfferPriceUSD" && (
                <p dir="rtl">
                  {SumTotalPriceAfterAddPercentageAndConvertToUSD(
                    Products,
                    PriceConvertToIQD
                  )}
                </p>
              )}
            </p>
          </div>
          <div
            className="w-100 p-4"
            style={{
              background:
                theme.palette.mode === "dark"
                  ? "rgba(0, 0, 0, 0.6)"
                  : "#9e9e9e",
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              >
                المجموع
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4" dir="rtl">
          <p>مدة التجهيز {info?.ProcessingTime || "30"} يوم</p>
          <p>نفاذية العرض {info?.supplyPermeability || "7"} يوم</p>
          <p>مدة الضمان {info?.ExpirePeriod || "سنة واحدة"}</p>
          {info?.Notes && <p>{info?.Notes}</p>}
        </div>
      </div>
    </>
  );
}
