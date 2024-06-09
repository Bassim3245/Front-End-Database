import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShowData from "./ShowData/ShowDataNturalInfo";
import { ButtonSave } from "../../../Config/Content";
import {
  AddWorkNutral,
  getDataNatural,
} from "../../../../redux/Whorkntural/WorkNutralAction";
import { useTheme } from "@mui/material";
import { toast } from "react-toastify";
function NturalInformation() {
  // @ts-ignore
  const { getDtaInfo,message } = useSelector((state) => state?.natural);
  const dispatch = useDispatch();
  const [workNaturalData, setworkNaturalData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(AddWorkNutral({ workNaturalData }));
    toast(message)
    setworkNaturalData("");
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataNatural());
    console.log(getDtaInfo);
  }, [workNaturalData]);
  const theme = useTheme();
  return (
    <div className="">
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
        طبيعة الاعمال
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
        ادراج المعلومات الازمة
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-15">
          <label
            className="fs-14 c-grey d-block mb-10"
            htmlFor="first"
            style={{ direction: "rtl" }}
          >
            كتابة طبيعة العمل
          </label>
          <input
            data-bs-theme={theme.palette.mode === "dark" ? "dark" : ""}
            style={{ direction: "rtl" }}
            className="form-control p-10"
            type="text"
            id="first"
            value={workNaturalData}
            onChange={(e) => setworkNaturalData(e.target.value)}
            placeholder="طبيعة العمل"
          />
        </div>
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          <ShowData DataNatural={getDtaInfo} themeMode={theme} />
        </div>
      </form>
    </div>
  );
}
export default NturalInformation;
