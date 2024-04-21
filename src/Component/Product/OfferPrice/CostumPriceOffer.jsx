import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import "../../mainMnue/Menue.css";
const selectPriceType = [
  { label: "USD-IQR-USD", value: "USD-IQR-USD" },
  {
    label: "USD-IQR-USD",
    value: "USD-IQR-USD",
  },
  {
    label: "EUR-USD-IQR-USD",
    value: "EUR-USD-IQR-USD",
  },
];
function CustomPriceOffer() {
  const [PriceOffer, setPriceOffer] = useState("");
  const theme = useTheme();

  return (
    <div className="Project">
      <div className="container seletMode d-flex justify-content-center align-items-center  p-5 f-wrap gap-3">
        <div className="SelectModePrice">
          <Box className="d-flex">
            <div className="form-outline flex-fill mb-3 me-2">
              <TextField
                label="Percent"
                id="filled-hidden-label-small"
                variant="filled"
                size="medium"
              />
            </div>
            <div className="form-outline flex-fill mb-3 me-3">
              <TextField
                // hiddenLabel

                label="Price"
                id="filled-hidden-label-small"
                variant="filled"
                size="medium"
              />
            </div>
            <div className="form-outline flex-fill mb-3">
              <TextField
                id="filled-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your currency"
                variant="filled"
              >
                {selectPriceType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default CustomPriceOffer;
