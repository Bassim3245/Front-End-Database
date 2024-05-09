import moment from "moment";
import { BackendUrl } from "../../redux/api/axios";

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
        alt="DOCX Icon"
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
  ];
  if (!allowedTypes.includes(file.type)) {
    return "Please upload only images (jpeg, png) or documents (pdf, docx).";
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