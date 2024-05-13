import { CloudDownload, Delete, Share } from "@mui/icons-material";
import DepartmentInHr from "./Departments";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import {
  formatDate,
  getFileIcon,
  handleDownload,
} from "Component/Config/Function";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatSize } from "../../Config/Function";
function FileList(props) {
  const ITEM_HEIGHT = 48;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteFile, setDelete] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getAllDataFileUpload = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getAllFiles`, {
        headers: {
          token: `${token}`,
        },
      });
      console.log(response.data); // Log the response data for debugging
      setData(response?.data);
    } catch (error) {
      console.error(error); // Log any errors for debugging
    }
  };

  useEffect(() => {
    getAllDataFileUpload();
  }, [props?.action, deleteFile]);

  const HandleDelete = async (id) => {
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
          url: `${BackendUrl}/api/deleteTheFileById/${id}`,
          headers: {
            token: token,
          },
        });

        setDelete(toast.success(response?.data?.message));
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
  return (
    <div className="files-content d-grid gap-20">
      {data?.map((file, index) => (
        <div key={index} className="file bg-white p-10 rad-10">
          <IconButton onClick={() => handleDownload(file?.file)}>
            <CloudDownload />
          </IconButton>
          <div className="icon txt-c">{getFileIcon(file?.file)}</div>
          <div className="txt-c mb-10 fs-14">{file?.BookName}</div>
          <div className="d-flex justify-content-between">
            <p className="c-grey fs-13 mt-2">{file?.department}</p>
            <span>
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <GridMoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <DepartmentInHr UploadId={file?._id} />
                  <MenuItem onClick={() => HandleDelete(file?._id)}>
                    <Delete />
                    <span className="ms-3">Delete</span>
                  </MenuItem>
                </Menu>
              </div>
            </span>
          </div>
          <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
            <span>{formatDate(file?.createdAt)}</span>
            <span>{formatSize(file?.size)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList;
