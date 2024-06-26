import { getDataFileINMangerSection } from "Component/Config/fetchData";
import { useState } from "react";
import { useQuery } from "react-query";
import { getFileIcon, handleDownload } from "Component/Config/Function";
import "../../Style/FileStyle.css";
import { formatDate, getTimeAgo } from "../../../Config/Function";
function DataFileINHrSection({ id }) {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "getDataFileINMangerSection",
    () => getDataFileINMangerSection(id, token), // Corrected: Call the function
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // refetchInterval: 5000,
    }
  );
  return (
    <div className="page bg-white">
      <div className="content w-full">
        <h1 className="p-relative">Files</h1>
        <div className="files-content d-grid gap-20">
          {data?.map((item, index) => (
            <div
              key={item._id}
              className="file bg-white rad-10 hoverFile"
              onDoubleClick={() => handleDownload(item?.filesName)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ width: "30px", marginLeft: "20px" }}>
                  {getFileIcon(item?.filesName)}
                </div>
                <div>{formatDate(item?.updatedAt)}</div>
                <div>
                  {item?.BookName}
                  {item?.filesName}
                </div>
                <div>
                  <span>{item?.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataFileINHrSection;
