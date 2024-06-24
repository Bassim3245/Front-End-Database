import moment from "moment";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import Swal from "sweetalert2";
import { Box, MenuItem, useTheme } from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
export function getFileIcon(fileName) {
  if (typeof fileName !== "string") {
    return null;
  }
  const extension = fileName.split(".").pop().toLowerCase();
  if (extension === "pdf") {
    return (
      <img
        src="/image/pdf_136522.png"
        style={{ width: "80px", maxWidth: "100%" }}
        className="mt-4 mb-4"
        alt="PDF Icon"
      />
    );
  } else if (extension === "docx") {
    return (
      <img
        src="/image/word.png"
        style={{ width: "80px", maxWidth: "100%" }}
        className="mt-4 mb-4"
        alt="DOCX Icon"
      />
    );
  } else if (extension === "png" || extension === "jpg") {
    return (
      <img
        src="/image/photo.png"
        style={{ width: "80px", maxWidth: "100%" }}
        className="mt-4 mb-4"
        alt="PNG Icon"
      />
    );
  } else if (extension === "xlsx") {
    return (
      <img
        src="/image/icons8-excel-48.png"
        style={{ width: "80px", maxWidth: "100%" }}
        className="mt-4 mb-4"
        alt="Excel Icon"
      />
    );
  } else {
    return null; // If no matching file type found
  }
}
export const validateFileType = (file) => {
  if (!file) return "No file selected";
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (!allowedTypes.includes(file.type)) {
    return "Please upload only images (jpeg, png) or documents (pdf, docx, xlsx).";
  }
  return "valid";
};
export const formatDate = (date) => {
  return moment(date).format("YYYY/MM/DD HH:mm"); // Return the formatted date
};
export const handleDownload = (file) => {
  const link = document.createElement("a");
  link.href = `${BackendUrl}/${file}`;
  link.setAttribute("download", "");
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export function calculateTotalPriceOFproject(Products) {
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
export function SumTotalPriceAfterAddPercentage(Products) {
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
export function SumTotalPriceAfterAddPercentageAndConvertToUSD(
  Products,
  PriceConvertToIQD
) {
  const selectPriceType = "Normal";
  if (selectPriceType === "Normal") {
    const totalSum = Products?.reduce((accumulator, currentItem) => {
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

      return Math.ceil(
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
export function calculatePriceAfterPercentageWithQuantity(item) {
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

export function calculatePriceAfterPercentageWithoutQuantity(item) {
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

export function calculatePriceAfterPercentageWithoutQuantityAndConvertToUSD(
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

export function calculatePriceAfterPercentageWithQuantityAndConvertToUSD(
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

export function calculatePrice(item) {
  if (!item) return 0;
  // Convert to number in case they are strings
  const price = Number(item.Price);
  const priceConvert = Number(item.PriceConvert);

  if (isNaN(price) || isNaN(priceConvert)) return 0; // Check if conversion is successful
  return item.PriceType === "USD"
    ? new Intl.NumberFormat().format(price * priceConvert)
    : new Intl.NumberFormat().format(price);
}
export const calculateTotalPrice = (item) => {
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

export const formatSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
// export const formatDate = (Data) => {
//   const date = new Date(Data);
//   return moment(date).format(" HH:mm YYYY/MM/DD ");
// };
export const Delete = async (_id, setDelete, setAnchorEl, token, url) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ms-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // @ts-ignore
      const response = await axios({
        method: "DELETE",
        url: `${BackendUrl}/api/${url}/${_id}`,
        headers: {
          token: token,
        },
      });
      if (response) {
        setDelete(true);
        setAnchorEl(null);
        // window.location.reload();
      }

      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const sendProjectEndTime = async (
  _id,
  token,
  setDelete,
  setAnchorEl
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ms-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // @ts-ignore
      const response = await axios({
        method: "put",
        url: `${BackendUrl}/api/delayProjectFinaltime/${_id}`,
        headers: {
          token: token,
        },
      });

      setDelete(response?.data?.message);
      setAnchorEl(null);
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const hasPermission = (role, permissions) => {
  return Array.isArray(permissions) && permissions.includes(role);
};
export const renderMenuItem = (key, onClick, IconComponent, text) => (
  <MenuItem key={key} onClick={onClick} disableRipple>
    <IconComponent />
    <span className="ms-2">{text}</span>
  </MenuItem>
);

export const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

export function CustomNoRowsOverlay() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <StyledGridOverlay theme={theme}>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>
        <h5>{t("NotFoundData")}</h5>
      </Box>
    </StyledGridOverlay>
  );
}
export function CustomNoRowsOverlaySentData() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <StyledGridOverlay theme={theme}>
      <Box>
        <img
          width={"400px"}
          height={"350px"}
          src="/image/message-has-been-sent-successfully-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          alt="Project has been sent"
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <h5>{t("sentData")}</h5>
      </Box>
    </StyledGridOverlay>
  );
}
export const FormatDataNumber = (Number) => {
  return new Intl.NumberFormat().format(Number);
};
export const sumDataProjectIQD = (products) => {
  const totalIQD = products.reduce((acc, item) => {
    if (item.PriceType === "IQD") {
      const itemTotal = item?.Quantity * item?.Price || 0;
      return acc + itemTotal;
    }
    return acc;
  }, 0);

  const formattedTotalIQD = FormatDataNumber(totalIQD);

  const totalOther = products.reduce((acc, item) => {
    if (item.PriceType !== "IQD") {
      const itemTotal = item?.Quantity * item?.Price || 0;
      return acc + itemTotal;
    }
    return acc;
  }, 0);

  const formattedTotalOther = FormatDataNumber(totalOther);

  return { totalIQD: formattedTotalIQD, totalOther: formattedTotalOther };
};
export function getTimeAgo(date) {
  // Use formatDistanceToNow to calculate the time ago with a suffix
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
