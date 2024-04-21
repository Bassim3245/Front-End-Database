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
export default function CustomizedSteppers(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectModeNormal, setSelectModeNormal] = React.useState(false);
  const [customSelectMode, setCustomSelectMode] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
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
        <OfferPriceTable projectId={props?.projectId}/>,
      ]
    : [
        // @ts-ignore
        <SelectModePriceOffer
          setSelectModeNormal={setSelectModeNormal}
          selectModeNormal={selectModeNormal}
          setCustomSelectMode={setCustomSelectMode}
          customSelectMode={customSelectMode}
        />,
        <CustomPriceOffer />,
        <OfferPriceTable projectId={props?.projectId}/>,
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
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
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{dataSteps[activeStep]}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {customSelectMode || selectModeNormal ? (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            ) : null}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
