import * as React from "react";
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import SelectModePriceOffer from "./SelectModePriceOfer";
import CustomPriceOffer from "./CostumPriceOffer";
import OfferPriceTable from "./OfferPriceTaples";
import { useDispatch, useSelector } from "react-redux";
import { setCustomDataPrice } from "../../../redux/OfferPriceCustomStat/OfferPriceCustomSlice";
import { setLanguage } from "../../../redux/LanguageState";
import { useTranslation } from "react-i18next";
export default function CustomizedSteppers(props) {
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectModeNormal, setSelectModeNormal] = React.useState(false);
  const [customSelectMode, setCustomSelectMode] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = React.useState({
    PriceConvertToIQD: "",
    ExpirePeriod: "",
    ProcessingTime: "",
    supplyPermeability: "",
    Notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const handleNextAndSaveData = () => {
    console.log(formData.ExpirePeriod);
    dispatch(setCustomDataPrice(formData));

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = selectModeNormal
    ? ["Select Mode Price Offer", "Create an ad"]
    : [
        "Select Mode Price Offer",
        "Insert the required information",
        "Create an ad",
      ];
  const dataSteps = selectModeNormal
    ? [
        // @ts-ignore
        <SelectModePriceOffer
          setSelectModeNormal={setSelectModeNormal}
          selectModeNormal={selectModeNormal}
          setCustomSelectMode={setCustomSelectMode}
          customSelectMode={customSelectMode}
        />,
        <OfferPriceTable
          projectId={props?.projectId}
          targetRef={props?.targetRef}
        />,
      ]
    : [
        // @ts-ignore
        <SelectModePriceOffer
          setSelectModeNormal={setSelectModeNormal}
          selectModeNormal={selectModeNormal}
          setCustomSelectMode={setCustomSelectMode}
          customSelectMode={customSelectMode}
        />,
        <CustomPriceOffer
          formData={formData}
          handleInputChange={handleInputChange}
          handleNextAndSaveData={handleNextAndSaveData}
        />,
        <OfferPriceTable
          projectId={props?.projectId}
          targetRef={props?.targetRef}
        />,
      ];
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }} >
      <Stepper activeStep={activeStep} sx={{  }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {t("Assistance.AssistanceStepper.title")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>
              {" "}
              {t("Assistance.AssistanceStepper.Reset")}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: "20px", mb: 4 }}>{dataSteps[activeStep]}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t("Assistance.AssistanceStepper.Back")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {formData.PriceConvertToIQD &&
            formData.ExpirePeriod &&
            formData.ProcessingTime &&
            formData.supplyPermeability ? (
              <Button onClick={handleNextAndSaveData}>
                {activeStep === steps.length - 1
                  ? rtl?.dir === "rtl"
                    ? "انهاء"
                    : "Finish"
                  : rtl?.dir === "rtl"
                  ? "التالي"
                  : "Next"}
              </Button>
            ) : null}

            {(customSelectMode || selectModeNormal) &&
            formData.PriceConvertToIQD === "" ? (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1
                  ? rtl?.dir === "rtl"
                    ? "انهاء"
                    : "Finish"
                  : rtl?.dir === "rtl"
                  ? "التالي"
                  : "Next"}
              </Button>
            ) : null}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
