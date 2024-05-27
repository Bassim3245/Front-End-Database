import { Button, MenuItem, useTheme } from "@mui/material";
import { getDataByProjectID } from "../../Config/fetchData";
import * as React from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { StyledMenu } from "Component/Config/Content";
import { GetApp, PictureAsPdf, TextSnippet } from "@mui/icons-material";
import ArchiveIcon from "@mui/icons-material/Archive";
import {
  SumTotalPriceAfterAddPercentage,
  calculatePrice,
  calculateTotalPriceOFproject,
  calculateTotalPrice,
  SumTotalPriceAfterAddPercentageAnddConvertToUSD,
  calculatePriceAfterPercentageWithQuantity,
  calculatePriceAfterPercentageWithoutQuantity,
  calculatePriceAfterPercentageWithQuantityAndConvertToUsd,
  calculatePriceAfterPercentageWithoutQuantityAndConvertToUsd,
} from "Component/Config/Function";
import { ToastContainer, toast } from "react-toastify";

// start function total sum

// end Calculater
export default function OfferPrice(props) {
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("CustomDataForPriceOffer")) || {}
  );
  const PriceConvertToIQD = info?.PriceConvertToIQD;
  const [dataSet, setDataSet] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const Products = props?.products;
  const theme = useTheme();
  const [textDark, setDark] = React.useState(
    theme.palette.mode === "dark" ? theme.palette.text.primary : ""
  );
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "DataProjectById",
    () => getDataByProjectID(props?.projectId),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      // refetchInterval: 5000,
    }
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 
  React.useEffect(() => {
    refetch();
  }, [loading,open]);

  const collectData = (Products) => {
    if (!Products) return;
    const dataProject = data && data;
    const priceProduct = Products.map((product) => calculatePrice(product));
    const priceProductQuantity = Products.map((product) =>
      calculateTotalPrice(product)
    );
    const calculateTotalPriceOF = calculateTotalPriceOFproject(Products);
    const SumTotalPriceAfterAdd = SumTotalPriceAfterAddPercentage(Products);
    const SumTotalPriceAfterAddPercentageAnddConvert =
      SumTotalPriceAfterAddPercentageAnddConvertToUSD(Products);
    const calculatePriceAfterPercentageWith = Products.map((product) =>
      calculatePriceAfterPercentageWithQuantity(product)
    );
    const calculateAfterPercentageWithoutQuantity = Products.map((product) =>
      calculatePriceAfterPercentageWithoutQuantity(product)
    );
    const calculateAfterPercentageWithQuantityAndConvertToUsd = Products.map(
      (product) =>
        calculatePriceAfterPercentageWithQuantityAndConvertToUsd(product)
    );
    const calculateAfterPercentageWithoutQuantityAndConvertToUsd = Products.map(
      (product) =>
        calculatePriceAfterPercentageWithoutQuantityAndConvertToUsd(product)
    );
    const newData = {
      Products,
      dataProject,
      priceProduct,
      priceProductQuantity,
      calculateTotalPriceOF,
      SumTotalPriceAfterAdd,
      SumTotalPriceAfterAddPercentageAnddConvert,
      calculatePriceAfterPercentageWith,
      calculateAfterPercentageWithoutQuantity,
      calculateAfterPercentageWithQuantityAndConvertToUsd,
      calculateAfterPercentageWithoutQuantityAndConvertToUsd,
    };
    if (newData.dataProject) {
      setDataSet(newData);
    }
  };
  React.useEffect(() => {
    console.log("hhghhg", dataSet?.dataProject);
    collectData(Products);
    // refetch()
  }, [Products]);

  const handelDataPdf = async (label) => {
    try {
      if (dataSet?.dataProject !== null || dataSet?.dataProject) {
        console.log(dataSet?.dataProject);
        const formData = new FormData();
        // @ts-ignore
        formData.append("dataSet", dataSet);
        formData.append("label", label);
        const response = await axios.post(
          `${BackendUrl}/api/setDataAsPdf`,
          { dataSet, label },
          {
            headers: {
              "Content-Type": "application/json", // Corrected header name
            },
            responseType: "blob",
          }
        );
        if (response) {
        
          setLoading(true);
          console.log(response);
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data.nameProject}.pdf`; // Change filename accordingly
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          // setAnchorEl(null);
        }
      }
      else{
        toast.error("error ")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer/>
      <div className=" w-100 mb-3 mt-3">
        <div style={{ direction: "rtl", fontFamily: "Arial, sans-serif" }}>
          <p
            style={{
              textAlign: "center",
              color:
                theme.palette.mode === "dark" ? theme.palette.text.primary : "",
            }}
          >
            جدول كميات B.O.Q
          </p>
          <p style={{ textAlign: "center" }}>Priced technical offer </p>
          <p style={{ textAlign: "center" }}>
            the beneficiary: {data?.nameProject} /{data?.NumberBook}
          </p>
        </div>
      </div>
      <div className="mb-3 d-flex justify-contain-center w-100">
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
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={
              props?.label === "OfferPriceIQR"
                ? () => handelDataPdf("OfferPriceIQR")
                : props?.label === "OfferPriceIQRAfterPercent"
                ? () => handelDataPdf("OfferPriceIQRAfterPercent")
                : props?.label === "OfferPriceUSD"
                ? () => handelDataPdf("OfferPriceUSD")
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
            {props?.label === "OfferPriceIQR" ? (
              <>
                <th> Total Price IQD</th>
                <th>Price IQD</th>
              </>
            ) : props?.label === "OfferPriceIQRAfterPercent" ? (
              <>
                <th>The total price after adding the percentage IQD</th>
                <th>Price After Adding the percentage IQD</th>
              </>
            ) : props?.label === "OfferPriceUSD" ? (
              <>
                <th>Total Price USD</th>
                <th>Price USD</th>
              </>
            ) : null}
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
            <th className=" p-3" colSpan={"6"} style={{ textAlign: "center" }}>
              {" "}
              {data?.nameProject}{" "}
            </th>
          </tr>
          {props?.products &&
            Array.isArray(props?.products) &&
            props?.products.map((item, index) => (
              <tr key={item._id}>
                {props?.label === "OfferPriceIQR" ? (
                  <>
                    <td className="arabicText"> {calculateTotalPrice(item)}</td>
                    <td className="arabicText">{calculatePrice(item)}</td>
                  </>
                ) : props?.label === "OfferPriceIQRAfterPercent" ? (
                  <>
                    <td className="arabicText">
                      {" "}
                      {calculatePriceAfterPercentageWithQuantity(item)}
                    </td>
                    <td className="arabicText">
                      {calculatePriceAfterPercentageWithoutQuantity(item)}
                    </td>
                  </>
                ) : props?.label === "OfferPriceUSD" ? (
                  <>
                    <td className="arabicText">
                      {" "}
                      {calculatePriceAfterPercentageWithQuantityAndConvertToUsd(
                        item,
                        PriceConvertToIQD
                      )}
                    </td>
                    <td className="arabicText">
                      {calculatePriceAfterPercentageWithoutQuantityAndConvertToUsd(
                        item,
                        PriceConvertToIQD
                      )}
                    </td>
                  </>
                ) : null}
                <td className="arabicText"> {item?.UnitId?.Unit}</td>

                <td className="arabicText">{item?.Quantity}</td>
                <td className="arabicText">
                  {item?.nameProduct}

                  <br />
                  <p className="text-secondary m-1">
                    {item?.comments || null}
                    <span style={{ color: "black" }} className="me-2">
                      ({item.license})
                    </span>
                  </p>
                </td>
                <td className="arabicText">{index + 1}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-center align-items-center mt-0 "
        dir="ltr"
      >
        <div
          style={{
            background:
              theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.38)" : "#bdbdbd",
          }}
          className="p-4"
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {props?.label === "OfferPriceIQR" ? (
              <p dir="rtl"> {calculateTotalPriceOFproject(Products)}</p>
            ) : props?.label === "OfferPriceIQRAfterPercent" ? (
              <p dir="rtl"> {SumTotalPriceAfterAddPercentage(Products)}</p>
            ) : props?.label === "OfferPriceUSD" ? (
              <p dir="rtl">
                {" "}
                {SumTotalPriceAfterAddPercentageAnddConvertToUSD(
                  Products,
                  PriceConvertToIQD
                )}
              </p>
            ) : null}
          </p>
        </div>
        <div
          className=" w-100 p-4 "
          style={{
            background:
              theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.6)" : "#9e9e9e",
          }}
        >
          {" "}
          <div className="d-flex justify-content-center align-items-center">
            <p
              style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              className=""
            >
              المجموع
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4" dir="rtl">
        {info?.ProcessingTime ? (
          <p> مدة التجهيز {info.ProcessingTime} يوم</p>
        ) : (
          <p>مدة التجهيز 30 يوم</p>
        )}
        {info?.supplyPermeability ? (
          <p>نفاذية العرض {info?.supplyPermeability} يوم</p>
        ) : (
          <p> نفاذية العرض 7 يوم</p>
        )}
        {info?.ExpirePeriod ? (
          <p>مدة الظمان {info?.ExpirePeriod}</p>
        ) : (
          <p>مدة الضمان سنة واحدة</p>
        )}
        {info?.Notes ? <p>{info?.Notes}</p> : null}
      </div>
    </div>
  );
}
