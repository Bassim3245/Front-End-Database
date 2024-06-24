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
import { BackendUrl } from "../../redux/api/axios";
import { toast } from "react-toastify";
import { getDataSystemPrice } from "Component/Config/fetchData";
import { useQuery } from "react-query";
import { BottomSend, EmptyTextarea, Textarea2 } from "Component/Config/Content";
import { Textarea } from "@nextui-org/react";

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
    PriceConvert: "1500",
    percent: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { data, refetch } = useQuery("DataSystemPrice", getDataSystemPrice, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  useEffect(() => {
    setSelectPriceType(formData.PriceType !== "IQD");
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
            token,
          },
        }
      );
      if (response?.data) {
        toast.success(response.data.message);
        window.location.reload();
        props.getDataProduct();
        setOpen(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getDataUnit = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/UnitSystemShowData`);
      setDataUnit(response?.data?.response);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (open) {
      getDataUnit();
    }
  }, [open]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <BottomSend variant="outlined" onClick={handleClickOpen}>
        {props.t("ProductList.InsertButton")}
      </BottomSend>
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
          <Textarea2
            minRows={2}
            placeholder="اسم المنتج او المنظومة"
            name="nameProduct"
            value={formData.nameProduct}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="العدد"
            className="mb-3"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="الرخصة او الضمان"
            className="mb-3"
            name="license"
            value={formData.license}
            onChange={handleInputChange}
          />
          <TextField
            select
            fullWidth
            label="تحديد نوع السعر"
            className="mb-4"
            name="PriceType"
            value={formData.PriceType}
            onChange={handleInputChange}
          >
            {data?.map((option) => (
              <MenuItem key={option?._id} value={option?.typePrice}>
                {option?.typePrice}
              </MenuItem>
            ))}
          </TextField>
          {selectPriceType && (
            <TextField
              fullWidth
              label="سعر الصرف"
              className="mb-3"
              name="PriceConvert"
              value={formData.PriceConvert}
              onChange={handleInputChange}
            />
          )}
          <TextField
            fullWidth
            label="سعر المنتج"
            className="mb-3"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="النسبة بالمية"
            className="mb-3"
            name="percent"
            value={formData.percent}
            onChange={handleInputChange}
          />
          <TextField
            select
            fullWidth
            label="الوحدة"
            className="mb-4"
            name="UnitId"
            value={formData.UnitId}
            onChange={handleInputChange}
          >
            {dataUnit?.map((option) => (
              <MenuItem key={option?._id} value={option?._id}>
                {option?.Unit}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="نوع المنتج اذاكان محلي او خارجي"
            className="mb-4"
            name="typeProject"
            value={formData.typeProject}
            onChange={handleInputChange}
          >
            <MenuItem value="محلي">محلي</MenuItem>
            <MenuItem value="خارجي">خارجي</MenuItem>
          </TextField>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="المواصفات المطلوبة"
            className="mb-3"
            style={{ height: "100px", width: "100%" }}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ height: "75px", width: "100%" }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="الملاحظات">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className="mb-3"
              style={{ height: "75px", width: "100%" }}
            />
          </FloatingLabel>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" onClick={(e) => handleSubmit(e)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
