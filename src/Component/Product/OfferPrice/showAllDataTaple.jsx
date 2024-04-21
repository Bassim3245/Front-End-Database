import { useTheme } from "@mui/material";
import { getDataByProjectID } from "../../Config/fetchData";
import * as React from "react";

import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
function calculateTotalSum(
  Products,
  percent=2,
  selectPriceType="EUR",
  PriceConvert=1600,
  label="OfferPriceIQR"
) {
  if (selectPriceType === "IQR") {
    console.log("pr", Products);
    const totalSum = Products.reduce((accumulator, currentItem) => {
      const PriceInIQR = currentItem?.PriceIQD;
      if (label === "OfferPriceIQR") {
        return accumulator + (PriceInIQR * currentItem?.Quantity || 1); // Sum total price for quantity
      } else if (label === "OfferPriceIQRAfterPercent") {
        return accumulator + (PriceInIQR * currentItem?.Quantity * percent || 1);
      } else if (label === "OfferPriceUSD") {
        return accumulator + (PriceInIQR * currentItem?.Quantity * percent * PriceConvert || 1);
      } else {
        return null;
      }
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    console.log("gg", formattedTotalSum);
    return formattedTotalSum;
  }
  if (selectPriceType === "USD") {
    const  totalSum = Products.reduce((accumulator, currentItem) => {
      const PriceInIQR = currentItem?.PriceIQD / PriceConvert || 1; // Convert from USD to IQR
      if (label === "OfferPriceIQR") {
        return accumulator + (PriceInIQR * currentItem?.Quantity || 1); // Sum total price for quantity
      } else if (label === "OfferPriceIQRAfterPercent") {
        return (
          accumulator + (PriceInIQR * currentItem?.Quantity * percent || 1)
        );
      } else if (label === "OfferPriceUSD") {
        return (
          accumulator +
          (PriceInIQR * currentItem?.Quantity * percent * PriceConvert || 0)
        );
      } else {
        return null;
      }
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  }
  if (selectPriceType === "EUR") {
    const  totalSum = Products.reduce((accumulator, currentItem) => {
      const PriceInUSD = currentItem?.PriceIQD * PriceConvert || 1; // Convert from EUR to USD
      const PriceInIQR = PriceInUSD / PriceConvert || 1;// Convert from USD to IQR
      if (label === "OfferPriceIQR") {
        return accumulator + (PriceInIQR * currentItem?.Quantity || 1); // Sum total price for quantity
      } else if (label === "OfferPriceIQRAfterPercent") {
        return (
          accumulator + (PriceInIQR * currentItem?.Quantity * percent || 1)
        );
      } else if (label === "OfferPriceUSD") {
        return (
          accumulator +
          (PriceInIQR * currentItem?.Quantity * percent * PriceConvert || 1)
        );
      } else {
        return null;
      }
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  }
 
}

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
  const HandleSumTotal = () => {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem?.PriceIQD * currentItem?.Quantity || 0);
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  };
  const HandleSumTotalAfterPresent = () => {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      return (
        accumulator + (currentItem?.PriceIQD * currentItem?.Quantity * 2 || 0)
      );
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  };
  const HandleSumTotalUSD = () => {
    const totalSum = Products.reduce((accumulator, currentItem) => {
      return (
        accumulator +
        (currentItem?.PriceIQD * currentItem?.Quantity * 2 * 1600 || 0)
      );
    }, 0);
    const formattedTotalSum = new Intl.NumberFormat().format(totalSum);
    return formattedTotalSum;
  };
  const formatNumberPrice = (data) => {
    const formattedTotalSum = new Intl.NumberFormat().format(data);
    return formattedTotalSum;
  };
  const theme = useTheme();
  const [textDark, setDark] = React.useState(
    theme.palette.mode === "dark" ? theme.palette.text.primary : ""
  );

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center w-100 mb-3 mt-3">
        <div dir="rtl">
          <p
            style={{
              textAlign: "center",
              color:
                theme.palette.mode === "dark" ? theme.palette.text.primary : "",
            }}
          >
            جدول كميات B.O.Q
          </p>
          <p style={{ textAlign: "center" }}>العرض الفني المسعر</p>
          <p style={{ textAlign: "center" }}>
            الجهة المستفيدة: {data?.nameProject} /{data?.NumberBook}
          </p>
        </div>
      </div>
      <Table
        striped
        bordered
        hover
        className="mb-0"
        variant={theme.palette.mode === "dark" ? "dark" : ""}
      >
        <thead dir="rtl">
          <tr style={{ background: "#e0e0e0" }}>
            {props?.label === "OfferPriceIQR" ? (
              <>
                <th>IQR السعر الاجمالي</th>
                <th> IQR السعر</th>
              </>
            ) : props?.label === "OfferPriceIQRAfterPercent" ? (
              <>
                <th> بعد IQR السعر الاجمالي</th>
                <th> بعد IQR السعر</th>
              </>
            ) : props?.label === "OfferPriceUSD" ? (
              <>
                <th> USD السعر الاجمالي</th>
                <th> USD بعد السعر</th>
              </>
            ) : null}
            <th>العدد</th>
            <th>اسم المنتج</th>
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
          <th className=" p-3">طلبية رخصة برمجية</th>
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
                      {formatNumberPrice(item?.PriceIQD * item?.Quantity)}
                    </td>
                    <td className="arabicText">
                      {formatNumberPrice(item?.PriceIQD)}
                    </td>
                  </>
                ) : props?.label === "OfferPriceIQRAfterPercent" ? (
                  <>
                    <td className="arabicText">
                      {" "}
                      {formatNumberPrice(item?.PriceIQD * item?.Quantity * 2)}
                    </td>
                    <td className="arabicText">{item?.PriceIQD * 2}</td>
                  </>
                ) : props?.label === "OfferPriceUSD" ? (
                  <>
                    <td className="arabicText">
                      {" "}
                      {formatNumberPrice(
                        item?.PriceIQD * item?.Quantity * 1600 * 2
                      )}
                    </td>
                    <td className="arabicText">
                      {formatNumberPrice(item?.PriceIQD * 1600 * 2)}
                    </td>
                  </>
                ) : null}

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
              <p dir="rtl"> {calculateTotalSum(Products, props?.label)}</p>
            ) : props?.label === "OfferPriceIQRAfterPercent" ? (
              <p dir="rtl"> {HandleSumTotalAfterPresent()}</p>
            ) : props?.label === "OfferPriceUSD" ? (
              <p dir="rtl"> {HandleSumTotalUSD()}</p>
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
        <p>مدة التجهيز 30 يوم</p>
        <p> نفاذية العرض 7 يوم</p>
        <p>مدة الضمان سنة واحدة</p>
        <p> هذا العرض لا يشمل الفقرة </p>
      </div>
    </div>
  );
}
