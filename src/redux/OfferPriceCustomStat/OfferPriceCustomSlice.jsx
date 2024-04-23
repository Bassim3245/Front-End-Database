import { createSlice } from "@reduxjs/toolkit";

export const CustomDataFormPriceOfferPrice = createSlice({
  name: "CustomDataPrice",
  initialState: {
    CustomDataForPriceOffer:{
      PriceConvertToIQD: "",
      ExpirePeriod: "",
      ProcessingTime: "",
      supplyPermeability: "",
      Notes: "",
    } ,
  },
  reducers: {
    setCustomDataPrice: (state, action) => {
      state.CustomDataForPriceOffer=action.payload
      localStorage.setItem("CustomDataForPriceOffer", JSON.stringify(state.CustomDataForPriceOffer)); // Storing the updated RTL object in localStorage
    },
  },
});
export const { setCustomDataPrice } = CustomDataFormPriceOfferPrice.actions;

export default CustomDataFormPriceOfferPrice.reducer;
