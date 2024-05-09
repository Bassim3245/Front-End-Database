import { CloudDownload } from "@mui/icons-material";
import DepartmentInHr from "./Departments";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import {
  formatDate,
  getFileIcon,
  handleDownload,
} from "Component/Config/Function";
import { IconButton } from "@mui/material";
function FileList(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);

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
  }, [props?.action]);
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
              <DepartmentInHr UploadId={file?._id} />
            </span>
          </div>
          <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
            <span>{formatDate(file?.createdAt)}</span>
            <span>{file?.size}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileList;
