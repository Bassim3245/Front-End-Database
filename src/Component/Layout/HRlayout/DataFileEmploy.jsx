import { Box, IconButton, Typography } from "@mui/material";
import { BackendUrl } from "../../../redux/api/axios";
import { CloudDownload } from "@mui/icons-material";
import { formatDate, getFileIcon } from "Component/Config/Function";
import SendToUsers from "./SendToUsers";
import { getDatFileUploadByIdDepartmentToSendEmploy } from "Component/Config/fetchData";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
function DataFileEmploy() {
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = `${BackendUrl}/${file}`;
    link.setAttribute("download", "");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "getDatFileUploadByIdDepartmentToSendEmploy",
    () => getDatFileUploadByIdDepartmentToSendEmploy(info?.DepartmentID), // Wrap getDatFileUploadByIdDepartment inside an arrow function
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(()=>{
console.log("hello",data);
  },[])
  return (
    <div>
      <Box className="content w-full">
        <Typography
          variant="h3"
          component="h3"
          className="p-relative "
          sx={{ textAlign: "center" }}
        >
          Files
        </Typography>
        <div className="files-page d-flex m-20 gap-20">
          <div className="files-content d-grid gap-20">
            {data !== undefined ? (
              Array.isArray(data) &&
              data?.map((item, index) => (
                <Box className="file bg-white p-10 rad-10" key={item?._id}>
                  <IconButton
                    onClick={() => handleDownload(item?.UploadId?.file)}
                  >
                    <CloudDownload />
                  </IconButton>
                  <div className="icon txt-c">
                    {getFileIcon(item?.UploadId?.file)}
                  </div>
                  <div className="txt-c mb-10 fs-14">
                    {item?.UploadId?.BookName}
                  </div>
                  <div className="info between-flex">
                    <Typography className="c-grey fs-13">
                      {item?.userId?.name}
                    </Typography>
                   
                  </div>
                  <div className="info between-flex mt-10 pt-10 fs-13 c-grey">
                    <span>{formatDate(item?.UploadId?.createdAt)}</span>
                  </div>
                </Box>
              ))
            ) : (
              <Typography>No Data Found</Typography>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default DataFileEmploy;
