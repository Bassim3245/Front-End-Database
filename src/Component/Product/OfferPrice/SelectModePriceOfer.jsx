import { useTheme } from "@mui/material";
import "../STyle.css";
import { useTranslation } from "react-i18next";
function SelectModePriceOffer(props) {
  const handleSelectModeNormal = () => {
    props?.setSelectModeNormal(true);

    props?.setCustomSelectMode(false);
  };
  const handleSelectModeCustom = () => {
    props?.setCustomSelectMode(true);
    props?.setSelectModeNormal(false);
  };
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div className="Project">
      <div
        className={` container seletMode d-flex justify-content-center align-items-center  p-5 f-wrap gap-3 ${
          theme.palette.mode === "dark" ? "bg-dark" : ""
        } `}
      >
        <div
          className="SelectModePrice p-3"
          style={{
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
            borderRadius: "10px",
          }}
        >
          <div className="container ">
            <div
              className={`boxSelect quality ${
                props?.selectModeNormal ? "selectBox" : ""
              }`}
            >
              <div className="img-holder">
                <img src="/image/discount2.png" alt="Custom mode" />
              </div>
              <h2> {t("ProductList.PriceOffer.Normal")} </h2>
              <p> {t("ProductList.PriceOffer.NormalText")}</p>
              <button onClick={handleSelectModeNormal}>
                {t("ProductList.PriceOffer.Normal")}
              </button>
            </div>
            <div
              className={`boxSelect time ${
                props?.customSelectMode ? "selectBox" : ""
              }`}
            >
              <div className="img-holder">
                <img src="/image/features-03.jpg" alt="Custom mode" />
              </div>
              <h2> {t("ProductList.PriceOffer.Custom")}</h2>
              <p> {t("ProductList.PriceOffer.CustomText")}</p>
              <button onClick={handleSelectModeCustom}>
                {" "}
                {t("ProductList.PriceOffer.Custom")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectModePriceOffer;
