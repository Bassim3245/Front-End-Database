import { getDataHasBeenSendByDepartmentToManger } from "Component/Config/fetchData";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../../Config/Function";
function FilesReceived() {
  const [token] = useState(localStorage.getItem("token"));
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "getDataHasBeenSendByDepartmentToManger",
    () => getDataHasBeenSendByDepartmentToManger(token), // Corrected: Call the function
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    console.log("hhh", data);
  }, []);

  return (
    <div className="sectionFileRecived">
      <section className="">
        <div className="container">
          <h3 className="m-b-50 heading-line">Files Received</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            data?.map((item) => (
              <div className="notification-ui_dd-content" key={item.id}>
                <div className="notification-list notification-list--unread">
                  <div className="notification-list_content">
                    <div className="notification-list_img">
                      <img src="https://i.imgur.com/zYxDCQT.jpg" alt="user" />
                    </div>
                    <div className="notification-list_detail">
                      <p dir="rtl">
                        <b className="ms-2">{item?.userId?.name}</b> ارسل
                        المشروع
                      </p>
                      <p className="text-muted" dir="rtl">
                        {item?.nameProject}
                        من ({item?.DepartmentID?.departmentName})
                      </p>
                      <p className="text-muted">
                        <small>{getTimeAgo(item?.dateSendToManger)}</small>
                      </p>
                    </div>
                  </div>
                  <div className="notification-list_feature-img">
                    <Link to={`/Home/Received/${item?._id}`}>
                      <img
                        src="/image/folder-icon-512x410-jvths5l6.png"
                        alt="Feature image"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default FilesReceived;
