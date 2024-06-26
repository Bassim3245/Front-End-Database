import { useEffect, useState } from "react";
// export const BackendUrl = "http://127.0.0.1:4000";
// export const BackendUrl = "http://192.168.1.118:4000";
// export const BackendUrl="https://backend-database-pklh.onrender.com"
// export const BackendUrl="http://hljhf.online"
export const BackendUrl="https://backend-database-1.onrender.com"
// export const BackendUrl = "https://backend-database-beta.vercel.app";
export const token = localStorage.getItem("token");
export const info = JSON.parse(localStorage.getItem("user"));
export const useGetDataInfo = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setInfo(JSON.parse(userData));
    }
  }, []);
  return info;
};
