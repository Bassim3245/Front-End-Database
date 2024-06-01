import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import MutualProject from "./MutualProject";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { setLanguage } from "../../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import FormData from "./FormaData";
import { useTranslation } from "react-i18next";

export default function CustomizedSteppers(props) {
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [secondaryData, setSecondaryData] = React.useState({});
  const [DateBook, setDateBook] = React.useState("");
  const [DateClose, setDateClose] = useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [formData, setFormData] = React.useState({
    nameProject: "",
    NumberBook: "",
    PersonCharge: "",
    WorkNatural: "",
    beneficiary: "",
    MethodOption: "",
    Stage: "",
    CompletionRate: "",
    LevelPerformance: "",
    Description: "",
    nameProduct: "",
    comments: "",
  });
  const [token, setToken] = React.useState(() => {
    return localStorage.getItem("token") || {};
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BackendUrl}/api/setProjectCommon`,
        { formData, secondaryData, endTime, startTime, DateClose, DateBook },
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response && response.data) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleNextAndSaveData = () => {
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

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const steps = [
    t("Assistance.AssistanceStepper.steps.MainForm"),
    t("Assistance.AssistanceStepper.steps.formMutual"),
  ];
  const dataSteps = [
    <FormData
      rtl={rtl}
      formData={formData}
      setDateBook={setDateBook}
      setStartTime={setStartTime}
      setDateClose={setDateClose}
      setEndTime={setEndTime}
      handleInputChange={handleInputChange}
    />,
    <MutualProject
      setSecondaryData={setSecondaryData}
      HandleSubmit={HandleSubmit}
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
    // localStorage.setItem("formData", formData);
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
  return (
    <Box sx={{ width: "100%" }} dir={rtl?.dir}>
      <ToastContainer />
      <Stepper activeStep={activeStep} sx={{}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">
                {t("Assistance.AssistanceStepper.Optional")}
              </Typography>
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1
                ? rtl?.dir === "rtl"
                  ? "انهاء"
                  : "Finish"
                : rtl?.dir === "rtl"
                ? "التالي"
                : "Next"}
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={HandleSubmit}>
                  {t("Assistance.AssistanceStepper.SaveData")}
              </Button>
            ) : null}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
