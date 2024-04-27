import { useTheme } from "@mui/material";
import { getDataByProjectID } from "../../Config/fetchData";
import * as React from "react";

import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
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
function SumTotalPriceAfterAddPercentage(Products) {
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

      return accumulator + PriceInIQR * currentItem.Quantity;
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
    const formattedTotalSum = new Intl.NumberFormat().format(Math.ceil(totalSum));
    return formattedTotalSum;
  }
}

// end function to sum total price
// start Function Each Item
function calculatePriceAfterPercentageWithQuantity(item) {
  const percentage = item.percent / 100;
  const priceAfterPercent = item?.Price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage =
      priceAfterPercent * item.PriceConvert * item?.Quantity;
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  } else {
    const priceTotalEachProductAfterPercentage =
      priceAfterPercent * item?.Quantity;
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  }
}

function calculatePriceAfterPercentageWithoutQuantity(item) {
  const percentage = item.percent / 100;
  const priceAfterPercent = item?.Price * (1 + percentage);

  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage =
      priceAfterPercent * item.PriceConvert;
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  } else {
    const priceTotalEachProductAfterPercentage = priceAfterPercent;
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  }
}
function calculatePriceAfterPercentageWithoutQuantityAndConvertToUsd(
  item,
  PriceConvertToIQD
) {
  const priceToConvert = 1600;
  const percentage = item.percent / 100;
  const priceAfterPercent = item?.Price * (1 + percentage);
  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage =
      (priceAfterPercent * item.PriceConvert) /
      (PriceConvertToIQD || priceToConvert);
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  } else {
    const priceTotalEachProductAfterPercentage =
      priceAfterPercent / (PriceConvertToIQD || priceToConvert);
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  }
}
function calculatePriceAfterPercentageWittQuantityAndConvertToUsd(
  item,
  PriceConvertToIQD
) {
  const priceToConvert = 1600;
  const percentage = item.percent / 100;
  const priceAfterPercent = item?.Price * (1 + percentage);
  if (item.PriceType === "USD") {
    const priceTotalEachProductAfterPercentage =
      (priceAfterPercent * item?.PriceConvert * item?.Quantity) /
      (PriceConvertToIQD || priceToConvert);
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  } else {
    const priceTotalEachProductAfterPercentage =
      (priceAfterPercent * item?.Quantity) /
      (PriceConvertToIQD || priceToConvert);
    return new Intl.NumberFormat().format(Math.ceil(priceTotalEachProductAfterPercentage));
  }
}
// end Calculater 
export default function OfferPrice(props) {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "DataProjectById",
    () => getDataByProjectID(props?.projectId),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    }
  );
  const Products = props?.products;
  const formatNumberPrice = (data) => {
    const formattedTotalSum = new Intl.NumberFormat().format(data);
    return formattedTotalSum;
  };
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("CustomDataForPriceOffer")) || {}
  );
  const theme = useTheme();
  const [textDark, setDark] = React.useState(
    theme.palette.mode === "dark" ? theme.palette.text.primary : ""
  );
  const PriceConvertToIQD = info?.PriceConvertToIQD;
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
        <tr
          style={{
            background:
              theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.6)" : "#9e9e9e",
            width: "100%",
            border: "1px solid #e0e0e0",
          }}
        >
          <th></th>
          <th></th>
          <th className=" p-3"> {data?.nameProject} </th>
          <th></th>
          <th></th>
        </tr>
        <tbody>
          {props?.products &&
            Array.isArray(props?.products) &&
            props?.products.map((item, index) => (
              <tr key={item._id}>
                {props?.label === "OfferPriceIQR" ? (
                  <>
                    <td className="arabicText">
                      {" "}
                      {item?.PriceType === "USD"
                        ? formatNumberPrice(
                            item?.Price * item?.PriceConvert * item?.Quantity
                          )
                        : formatNumberPrice(item?.Price * item?.Quantity)}
                    </td>
                    <td className="arabicText">
                      {item?.PriceType === "USD"
                        ? formatNumberPrice(item?.Price * item?.PriceConvert)
                        : formatNumberPrice(item?.Price)}
                    </td>
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
                      {calculatePriceAfterPercentageWittQuantityAndConvertToUsd(
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
                  <span>{item.license}</span>
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
