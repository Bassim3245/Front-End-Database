import moment from "moment";
import { BackendUrl } from "../../redux/api/axios";
import axios from "axios";
import Swal from "sweetalert2";
import { MenuItem } from "@mui/material";
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
  } else if (extension === "png") {
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
