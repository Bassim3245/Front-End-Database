import { Button, Divider, MenuItem, useTheme } from "@mui/material";
import { getDataByProjectID } from "../../Config/fetchData";
import * as React from "react";

import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { StyledMenu } from "Component/Config/Content";
import {
  Archive,
  EditNotifications,
  GetApp,
  GetAppOutlined,
  PictureAsPdf,
  TextSnippet,
} from "@mui/icons-material";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// start function total sum
function calculateTotalPriceOFproject(Products) {
  const selectPriceType = "Normal";
  if (selectPriceType === "Normal") {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      let PriceInUSD = 0; // Initialize to 0
      let PriceInIQD = 0; // Initialize to 0
      if (currentItem.PriceType === "IQD") {
        PriceInIQD = currentItem?.Price;
      }
      if (currentItem.PriceType === "USD") {
        PriceInUSD = currentItem?.Price * currentItem?.PriceConvert || 1600; // Convert USD price to IQR
      }
      // Calculate total price after conversion
      const PriceAfterConvert = PriceInUSD + PriceInIQD;
      const PriceInIQR = PriceAfterConvert;
      return accumulator + PriceInIQR * (currentItem.Quantity || 1);
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  }
}
// culcolat loop data
function SumTotalPriceAfterAddPercentage(Products) {
  const selectPriceType = "Normal";
  if (selectPriceType === "Normal") {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      // Convert to number and provide fallback to 0 if NaN
      let PriceInUSD =
        Number(currentItem?.Price) * Number(currentItem?.PriceConvert) || 0;
      let PriceInIQD = Number(currentItem?.Price) || 0;
      let Quantity = Number(currentItem?.Quantity) || 0;
      let percentage = Number(currentItem?.percent) / 100 || 0;

      if (currentItem.PriceType === "IQD") {
        PriceInUSD = 0; // Reset to 0 if the price type is not USD
      }
      if (currentItem.PriceType === "USD") {
        PriceInIQD = 0; // Reset to 0 if the price type is not IQD
      }

      const PriceAfterConvert = PriceInUSD + PriceInIQD;
      const priceAfterPercent = PriceAfterConvert * (1 + percentage);
      const PriceInIQR = priceAfterPercent;

      return accumulator + PriceInIQR * Quantity;
    }, 0);

    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  }
}
function SumTotalPriceAfterAddPercentageAnddConvertToUSD(
  Products,
  PriceConvertToIQD
) {
  const selectPriceType = "Normal";
  if (selectPriceType === "Normal") {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      let PriceInUSD = 0; // Initialize to 0
      let PriceInIQD = 0; // Initialize to 0
      if (currentItem.PriceType === "IQD") {
        PriceInIQD = currentItem?.Price;
      }
      if (currentItem.PriceType === "USD") {
        PriceInUSD = currentItem?.Price * currentItem?.PriceConvert || 0; // Convert USD price to IQR
      }
      const percentage = currentItem?.percent / 100;

      const PriceAfterConvert = PriceInUSD + PriceInIQD;
      const priceAfterPercent = PriceAfterConvert * (1 + percentage);
      const PriceInIQR = priceAfterPercent;

      return (
        accumulator +
        (PriceInIQR * currentItem.Quantity) / (PriceConvertToIQD || 1600)
      );
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(
      Math.ceil(totalSum)
    );
    return formattedTotalSum;
  }
}

// end function to sum total price
// start Function Each Item
function calculatePriceAfterPercentageWithQuantity(item) {
  const percentage = Number(item.percent) / 100;
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);
  const quantity = Number(item.Quantity);

  const priceAfterPercent = price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      priceAfterPercent * priceConvert * quantity
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  } else {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      priceAfterPercent * quantity
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  }
}

function calculatePriceAfterPercentageWithoutQuantity(item) {
  const percentage = Number(item.percent) / 100;
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);

  const priceAfterPercent = price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      priceAfterPercent * priceConvert
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  } else {
    const priceTotalEachProductAfterPercentage = Math.ceil(priceAfterPercent);
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  }
}

function calculatePriceAfterPercentageWithoutQuantityAndConvertToUsd(
  item,
  PriceConvertToIQD
) {
  const priceToConvert = 1600;
  const percentage = Number(item.percent) / 100;
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);
  const priceAfterPercent = price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      (priceAfterPercent * priceConvert) / (PriceConvertToIQD || priceToConvert)
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  } else {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      priceAfterPercent / (PriceConvertToIQD || priceToConvert)
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  }
}

function calculatePriceAfterPercentageWithQuantityAndConvertToUsd(
  item,
  PriceConvertToIQD
) {
  const priceToConvert = 1600;
  const percentage = Number(item.percent) / 100;
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);
  const quantity = Number(item.Quantity);
  const priceAfterPercent = price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      (priceAfterPercent * priceConvert * quantity) /
        (PriceConvertToIQD || priceToConvert)
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  } else {
    const priceTotalEachProductAfterPercentage = Math.ceil(
      (priceAfterPercent * quantity) / (PriceConvertToIQD || priceToConvert)
    );
    return new Intl.NumberFormat().format(priceTotalEachProductAfterPercentage);
  }
}

function calculatePrice(item) {
  if (!item) return 0;
  // Convert to number in case they are strings
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);

  if (isNaN(price) || isNaN(priceConvert)) return 0; // Check if conversion is successful

  return item.PriceType === "USD"
    ? new Intl.NumberFormat().format(price * priceConvert)
    : new Intl.NumberFormat().format(price);
}

const calculateTotalPrice = (item) => {
  if (!item) return 0;
  // Convert to number in case they are strings
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);
  const quantity = Number(item.Quantity);

  if (isNaN(price) || isNaN(priceConvert) || isNaN(quantity)) return 0; // Check if conversion is successful

  return item.PriceType === "USD"
    ? new Intl.NumberFormat().format(price * priceConvert * quantity)
    : new Intl.NumberFormat().format(price * quantity);
};
// end Calculater
export default function OfferPrice(props) {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "DataProjectById",
    () => getDataByProjectID(props?.projectId),
    {
      // refetchIntervalInBackground: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: 5000,
    }
  );
  const Products = props?.products;

  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("CustomDataForPriceOffer")) || {}
  );
  const theme = useTheme();
  const [textDark, setDark] = React.useState(
    theme.palette.mode === "dark" ? theme.palette.text.primary : ""
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [sumUSD, setSumUSD] = React.useState(0);

  const PriceConvertToIQD = info?.PriceConvertToIQD;
  const [dataSet, setDataSet] = React.useState({});
  const collectData = (Products) => {
    if (!Products) return;
    const dataProject = data || {};
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
    setDataSet(newData);
  };
  React.useEffect(() => {
    collectData(Products);
  }, [Products]);
  const [loading, setLoading] = React.useState(false);
  const handelDataPdf = async (label) => {
    try {
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
        console.log(response);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.nameProject}.pdf`; // Change filename accordingly
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setLoading(false);
        // setAnchorEl(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
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
            <th className=" p-3" colSpan={"6"} style={{textAlign:"center"}}> {data?.nameProject} </th>
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
              mt-0
              mb-0
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
