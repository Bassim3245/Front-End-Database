import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import "../../mainMnue/Menue.css";

function CustomPriceOffer({ formData, handleInputChange,handleNextAndSaveData }) {
  const theme = useTheme();
  
  return (
    <div className="Project">
      <div
        className={`container  seletMode d-flex justify-content-center align-items-center  p-5 gap-3  `}
        style={{backgroundColor:
          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : ""}}
      >
        <div
          className={`${
            theme.palette.mode === "dark" ? "bg-dark" : ""
          } SelectModePrice m-4 `}
        >
          <Box className=" m-4">
            <div className="form-outline mb-3 me-2 w-100">
              <form action="" onSubmit={handleNextAndSaveData}>
              <TextField
                fullWidth
                label="سعر الصرف "
                id="filled-hidden-label-small"
                className="mb-4"
                variant="filled"
                name="PriceConvertToIQD"
                size="medium"
                value={formData?.PriceConvertToIQD}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                className="mb-4"
                label="مدة الظمان"
                id="filled-hidden-label-small"
                variant="filled"
                size="medium"
                name="ExpirePeriod"
                value={formData?.ExpirePeriod}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                className="mb-4"
                label=" مدة التجهيز  "
                id="filled-hidden-label-small"
                variant="filled"
                size="medium"
                name="ProcessingTime"
                value={formData?.ProcessingTime}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label=" نفاذية العرض "
                id="filled-hidden-label-small"
                variant="filled"
                className="mb-4"
                size="medium"
                name="supplyPermeability"
                value={formData?.supplyPermeability}
                onChange={handleInputChange}
              />
           
                <TextField
                  fullWidth
                  id="filled-multiline-static"
                  label="ملاحظات"
                  multiline
                  rows={4}
                  name="Notes"
                  defaultValue="Default Value"
                  variant="filled"
                  value={formData?.Notes}
                  onChange={handleInputChange}
                />
              </form>
            </div>
         
          </Box>
        </div>
      </div>
    </div>
  );
}
export default CustomPriceOffer;
