import {  useState } from "react";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowData from "./ShowData/ShowDataMethodoPTION";
import { BackendUrl } from "../../../../redux/api/axios";
import { ButtonSave } from "../../../Config/Content";
import { useTheme } from "@mui/material";
function MethodOption() {
  const [MethodOption, setMethodOption] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/api/setMethodOption`, {
        data: MethodOption,
      });
      toast(response?.data?.message);
      setMethodOption("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleEdit = () => {
    setOpen(!open);
  };
  const theme=useTheme()
  return (
    <div className="">
      {/* <ToastContainer /> */}
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        طريقة الحصول
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
        ادراج الجهة المستفيدة
      </p>
      <form onSubmit={handleSubmit}>
        <label
          className="fs-14 c-grey d-block mb-10"
          htmlFor="first"
          style={{ direction: "rtl" }}
        >
          كتابة الوزارة
        </label>
        <input
          type="text"
          data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
          style={{ direction: "rtl" }}
          className="form-control p-10 rad-6"
          placeholder="كتابة النص"
          value={MethodOption}
          onChange={(e) => setMethodOption(e.target.value)}
          required
        />
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <ShowData  themMode={theme}/>
        </div>
      </form>
    </div>
  );
}

export default MethodOption;
