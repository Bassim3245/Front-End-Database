import React, { useState, useCallback, useMemo, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";

function AutocompleteExample({
  products,
  setFilteredProducts,
  filteredProducts,
  projectId,
}) {
  const [inputValue, setInputValue] = useState("");

  // Reset filteredProducts when projectId changes
  useEffect(() => {
    setFilteredProducts(products);
    setInputValue(""); // Clear the input value when the project changes
  }, [projectId, products, setFilteredProducts]);

  // Debounce the filter function to improve performance
  const debouncedFilterProducts = useMemo(
    () => debounce((newInputValue) => filterProducts(newInputValue), 300),
    [products, setFilteredProducts]
  );

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      setInputValue(newInputValue);
      debouncedFilterProducts(newInputValue);
    },
    [debouncedFilterProducts]
  );

  const filterProducts = useCallback(
    (inputValue) => {
      const lowerCaseInput = inputValue.toLowerCase().trim();
      if (lowerCaseInput === "") {
        setFilteredProducts(products); // Reset to show all products if input is empty
      } else {
        const filtered = products.filter((product) =>
          product.nameProduct.toLowerCase().includes(lowerCaseInput)
        );
        setFilteredProducts(filtered); // Update filtered products based on input
      }
    },
    [products, setFilteredProducts]
  );

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={filteredProducts}
      getOptionLabel={(option) => option.nameProduct}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Data" />}
    />
  );
}

export default AutocompleteExample;
