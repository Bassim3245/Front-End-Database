import { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ShowData from "./ShowData/ShowDataMinstries";
import { AddMinstries, getData } from "../../../../redux/MinistriesState/MinistresAction";
import { ButtonSave } from "../../../Config/Content";
import { useTheme } from "@mui/material";
function Minstries(props) {
  const { Ministries, message, isSuccess, isError } = useSelector((state) => {
    // @ts-ignore
    return state.Ministries;
  });
  const [ministries, setMinstres] = useState("");
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const HandlSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ministries", ministries);
    // @ts-ignore
    dispatch(AddMinstries(formData));
    setMinstres("");
  };
  const HandlEdit = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getData());
  }, [ministries]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      console.log(message);
      toast.error(message);
    }
  }, []);
  const theme=useTheme()
  return (
    <div className="">
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        الجهات المستفيدة
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
        ادراج الجهة المستفيدة
      </p>
      <div className="mb-15 ">
        <div></div>
      </div>
      <form onSubmit={(e) => HandlSubmit(e)}>
        <label
          className="fs-14 c-grey d-block mb-10"
          htmlFor="first"
          style={{ direction: "rtl" }}
        >
          كتابة الوزارة
        </label>
        <input
          type="text"
          data-bs-theme={props?.theme.palette.mode === "dark" ? "dark" : ""}
          style={{ direction: "rtl" }}
          className="form-control  p-10 rad-6 "
          placeholder=" كتابة النص"
          value={ministries}
          name="About"
          onChange={(e) => setMinstres(e.target.value)}
          required
        />
      </form>
      <div className="mt-3">
        <ButtonSave className="me-3" onClick={(e) => HandlSubmit(e)}>
          ادراج
        </ButtonSave>
        <ShowData DataShowInformationMinist={Ministries} themeMode={props?.theme}/>
      </div>
    </div>
  );
}
export default Minstries;
