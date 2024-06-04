import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Module(props) {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token") || "";
  const [dataUnit, setDataUnit] = useState([]);
  const [selectPriceType, setSelectPriceType] = useState(false);
  const [formData, setFormData] = useState({
    nameProduct: "",
    description: "",
    Quantity: "",
    comments: "",
    PriceType: "",
    Price: "",
    UnitId: "",
    typeProject: "",
    license: "",
    PriceConvert: "",
    percent: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.PriceType === "USD") {
      setSelectPriceType(true);
    } else {
      setSelectPriceType(false);
    }
  }, [formData.PriceType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BackendUrl}/api/setProduct/${props.ProjectId}/${props.DepartmentID}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            token: token,
          },
        }
      );
      if (response?.data) {
        toast.success(response?.data?.message);
        window.location.reload();
        props?.getDataProduct();
        setOpen(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDataUnit = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/UnitSystemShowData`);
      setDataUnit(response?.data?.response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (open) {
      getDataUnit();
    }
  }, [open]);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props?.t("ProductList.InsertButton")}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        TransitionProps={{ timeout: 600 }}
      >
        <DialogTitle sx={{ fontSize: "25px", fontWeight: "bold" }}>
          {"اضافة معلومات المنتج"}
        </DialogTitle>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            margin: "30px",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="اسم المنتج او المنظومة"
            id="fullWidth"
            className="mb-3"
            name="nameProduct"
            value={formData.nameProduct}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="العدد"
            id="fullWidth"
            name="Quantity"
            className="mb-3"
            value={formData.Quantity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="  الرخصة او الضمان "
            id="fullWidth"
            className="mb-3"
            name="license"
            value={formData.license}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label="تحديد نوع السعر"
            name="PriceType"
            value={formData.PriceType}
            onChange={handleInputChange}
          >
            <MenuItem value="IQD">IQD</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </TextField>
          {selectPriceType && (
            <TextField
              fullWidth
              label="سعر الصرف"
              id="priceField"
              className="mb-3"
              name="PriceConvert"
              defaultValue={"1600"}
              value={formData?.PriceConvert}
              onChange={handleInputChange}
            />
          )}
          <TextField
            fullWidth
            label="  لسعر المنتج "
            id="fullWidth"
            className="mb-3"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label=" النسبة بالمية"
            id="fullWidth"
            className="mb-3"
            name="percent"
            value={formData.percent}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label="الوحدة "
            name="UnitId"
            value={formData.UnitId}
            onChange={handleInputChange}
          >
            {dataUnit.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.Unit}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label="نوع المنتج اذاكان محلي او خارجي "
            name="typeProject"
            value={formData.typeProject}
            onChange={handleInputChange}
          >
            <MenuItem value={"محلي"}> محلي </MenuItem>
            <MenuItem value={"خارجي"}> خارجي </MenuItem>
          </TextField>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="المواصفات المطلوبة"
            className="mb-3"
            // data-bs-theme="dark"
            style={{ height: "100px", width: "500px", maxWidth: "100%" }}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ height: "75px", width: "500px", maxWidth: "100%" }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label=" الملاحضات">
            <Form.Control
              // data-bs-theme="dark"
              as="textarea"
              placeholder="Leave a comment here"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className="mb-3"
              style={{ height: "75px", width: "500px", maxWidth: "100%" }}
            />
          </FloatingLabel>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
