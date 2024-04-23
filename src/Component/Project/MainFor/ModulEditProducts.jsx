import * as React from "react";
import { useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function ModuleEdit(props) {
  const [open, setOpen] = useState(false);
  const [DataUnit, SetDataUnit] = useState([]);
  const [selectPriceType, setSelectPriceType] = useState(false);
  const token = localStorage.getItem("token") || {};
  const [formData, setFormData] = useState({
    nameProduct: props?.item?.nameProduct,
    description: props?.item?.description,
    Quantity: props?.item?.Quantity,
    comments: props?.item?.comments,
    Price: props?.item?.Price,
    UnitId: props?.item?.UnitId?._id,
    typeProject: props?.item?.typeProject,
    license: props?.item?.license,
    PriceType: props?.item?.PriceType,
    percent:props?.item?.percent,
    PriceConvert:props?.item?.PriceConvert
    
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const response = await axios({
        method: "put",
        url: `${BackendUrl}/api/updateDataProductById/${props?.item._id}`,
        headers: {
          token: token,
        },
        data: formData,
      });
      if (response || response?.data) {
        toast.success(response?.data?.message);
        window.location.reload();
        setOpen(false);
      }
    } catch (error) {
      if (error || error?.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getDataUnit = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/UnitSystemShowData`);
      SetDataUnit(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // @ts-ignore
  React.useEffect(() => getDataUnit, [open]);
  React.useEffect(() => {
    if (formData.PriceType === "USD") {
      console.log(formData.PriceType);
      setSelectPriceType(true);
    }
    if (formData.PriceType === "IQD") {
      setSelectPriceType(false);
    }
  }, [formData.PriceType]);
  return (
    <div>
      <Button onClick={handleClickOpen}> edit</Button>
      <Dialog
        open={open}
        // @ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        TransitionProps={{ timeout: 600 }}
      >
        <DialogTitle>{"اضافة معلومات المنتج"}</DialogTitle>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            margin: "10px",
          }}
          component="form"
          onSubmit={(e) => HandleSubmit(e)}
        >
          <TextField
            fullWidth
            label="اسم المنتج او المنظومة"
            id="fullWidth"
            className="mb-3"
            name="nameProduct"
            dir="rtl"
            value={formData?.nameProduct}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="العدد"
            id="fullWidth"
            name="Quantity"
            dir="rtl"
            className="mb-3"
            value={formData?.Quantity}
            onChange={handleInputChange}
          />
          {props?.ProjectWorkNatural === "برمجة" ? (
            <TextField
              fullWidth
              label=" الرخصة "
              id="fullWidth"
              className="mb-3"
              name="license"
              value={formData?.license}
              onChange={handleInputChange}
            />
          ) : null}
          <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label=" تحديد نوع السعر "
            name="PriceType"
            value={formData?.PriceType}
            onChange={handleInputChange}
          >
            <MenuItem value="IQD">IQD </MenuItem>
            <MenuItem value="USD">USD </MenuItem>
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
            label="  السعر المنتج "
            id="fullWidth"
            className="mb-3"
            name="Price"
            value={formData?.Price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="انسبة"
            id="fullWidth"
            className="mb-3"
            name="percent"
            value={formData?.percent}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-select-currency"
            sx={{ width: "500px", maxWidth: "100%" }}
            className="mb-4 me-3"
            select
            label="الوحدة "
            name="UnitId"
            value={formData?.UnitId}
            onChange={handleInputChange}
          >
            {DataUnit?.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.Unit}
              </MenuItem>
            ))}
          </TextField>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="المواصفات المطلوبة"
            className="mb-3"
            dir="rtl"
            style={{ height: "100px", width: "500px", maxWidth: "100%" }}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="description"
              dir="rtl"
              value={formData?.description}
              onChange={handleInputChange}
              style={{ height: "100px", width: "500px", maxWidth: "100%" }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label=" الملاحضات">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="comments"
              dir="rtl"
              value={formData?.comments}
              onChange={handleInputChange}
              className="mb-3"
              style={{ height: "100px", width: "500px", maxWidth: "100%" }}
            />
          </FloatingLabel>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={(e) => HandleSubmit(e)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
