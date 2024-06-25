import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function AutocompleteExample({
  products,
  setFilteredProducts,
  filteredProducts,
}) {
  const [inputValue, setInputValue] = useState("");
  //   const [filteredProducts, setFilteredProducts] = useState(products);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    filterProducts(newInputValue);
  };

  const filterProducts = (inputValue) => {
    const lowerCaseInput = inputValue.toLowerCase().trim();
    if (lowerCaseInput === "") {
      setFilteredProducts(products); // Reset to show all products if input is empty
    } else {
      const filtered = products.filter((product) =>
        product.nameProduct.toLowerCase().includes(lowerCaseInput)
      );
      setFilteredProducts(filtered); // Update filtered products based on input
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filteredProducts}
      getOptionLabel={(option) => option.nameProduct}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product Name" />}
    />
  );
}

export default AutocompleteExample;
