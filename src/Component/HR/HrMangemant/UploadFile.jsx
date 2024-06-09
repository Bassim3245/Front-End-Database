import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { validateFileType } from "Component/Config/Function";
function UploadFile(props) {
  const [file, setFile] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [BookName, setBookName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("BookName", BookName); // Assuming setBookName is a state variable containing the book name
      const response = await axios.post(
        `${BackendUrl}/api/setFileUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token, // No need for string interpolation here
          },
        }
      );
      if (response && response?.data && response?.data?.message) {
        toast.success(response?.data?.message); // Assuming you're using toast for notifications
        props?.setAction(true);
      } else {
        toast.error("An error occurred while uploading the file.");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("An error occurred while uploading the file."); // Notify the user about the error
    }
  };
  // const fileTypeValidation = validateFileType(file);
  // useEffect(() => {
  //   toast?.error(fileTypeValidation);
  // }, [file]);
  return (
    <div className="files-stats p-20 bg-white rad-10">
      {/* <ToastContainer /> */}
      {/* <h2 className="mt-0 mb-15 txt-c-mobile">Files </h2> */}
      <div className="d-flex align-center border-eee p-10 rad-6 mb-15 fs-13">
        <img
          src="/image/pdf_136522.png"
          style={{ width: "75px", maxWidth: "100%" }}
        />
        <div className="info">
          <span>PDF Files</span>
          <span className="c-grey d-block mt-5">130</span>
        </div>
        <div className="size c-grey">6.5GB</div>
      </div>
      <div className="d-flex align-center border-eee p-10 rad-6 fs-13">
        <img
          src="/image/word.png"
          style={{ width: "75px", maxWidth: "100%" }}
        />
        <div className="info">
          <span>word Files</span>
          <span className="c-grey d-block mt-5">99 Files</span>
        </div>
        <div className="size c-grey">2.9GB</div>
      </div>
      <div className="d-flex align-center border-eee p-10 rad-6 fs-13 mt-3 mb-3">
        <img
          src="/image/icons8-excel-48.png"
          style={{ width: "75px", maxWidth: "100%" }}
        />
        <div className="info">
          <span>excel Files</span>
          <span className="c-grey d-block mt-5">99 Files</span>
        </div>
        <div className="size c-grey">2.9GB</div>
      </div>
      <div className="d-flex align-center border-eee p-10 rad-6 fs-13">
        <img
          src="/image/photo.png"
          style={{ width: "75px", maxWidth: "100%" }}
        />
        <div className="info">
          <span>image Files</span>
          <span className="c-grey d-block mt-5">99 Files</span>
        </div>
        <div className="size c-grey">2.9GB</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className=" border-eee p-10 rad-6 fs-13">
          <TextField
            label="Name File"
            id="fullWidth"
            name="BookName"
            className="mb-3"
            value={BookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{ width: "100%", mt: "6px" }}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            style={{ display: "none" }}
          />
        </Button>
      </form>
      <Button
        variant="contained"
        color="secondary"
        className="w-100 mt-2"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

export default UploadFile;
