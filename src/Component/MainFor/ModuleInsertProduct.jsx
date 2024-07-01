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
import CustomTextField from "Component/Config/CustomTextField";
import CustomeSelectField from "../Config/CustomeSelectField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Module(props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token") || "";
  const [dataUnit, setDataUnit] = useState([]);
  const [selectPriceType, setSelectPriceType] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");
  const [license, setLicense] = useState("");
  const [percent, setPercent] = useState("");
  const [typeProject, setTypeProject] = useState([]);
  const [PriceConvert, setPriceConvert] = useState("1500");
  const [UnitId, setUnitId] = useState("");
  const [PriceType, setPriceType] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

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
    setSelectPriceType(PriceType?.typePrice !== "IQD");
  }, [PriceType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(Price);
      console.log(license);

      const formData = new FormData();
      formData.append("nameProduct", nameProduct);
      formData.append("license", license);
      formData.append("Price", Price);
      formData.append("Quantity", Quantity);
      formData.append("PriceConvert", PriceConvert);
      formData.append("typeProject", typeProject.value);
      formData.append("percent", percent);
      formData.append("PriceType", PriceType?.typePrice);
      formData.append("description", description);
      formData.append("comments", comments);
      formData.append("UnitId", UnitId?._id);
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/setProduct/${props.ProjectId}/${props.DepartmentID}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        data: formData,
      });
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
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (open) {
      getDataUnit();
    }
  }, [open]);
  console.log("adfsf", PriceType.typePrice);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selectTypPProject = [
    {
      _id: 1,
      value: "محلي",
    },
    {
      _id: 2,
      value: "خارجي",
    },
  ];
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
          dir="rtl"
        >
          <Box sx={{ mb: "10px" }}>
            <CustomTextField
              label={"أسم المنتج أو المنظومة"}
              haswidth={true}
              value={nameProduct}
              // error={error}
              customWidth="100%"
              hasMultipleLine={true}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              readOnly={false}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
              onClearClick={() => {
                setNameProduct("");
              }}
            />
          </Box>
          <Box sx={{ mb: "10px" }}>
            <CustomTextField
              label={"العدد"}
              haswidth={true}
              value={Quantity}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              hasMultipleLine={false}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              // customePadding="8px"
              // paddingHorizontal="0px"
              readOnly={false}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              onClearClick={() => {
                setQuantity("");
              }}
            />
          </Box>
          <Box sx={{ mb: "10px" }}>
            <CustomTextField
              label={"ألرخصة أو الظمان "}
              haswidth={true}
              value={license}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              // hasMultipleLine={true}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              // customePadding="8px"
              // paddingHorizontal="0px"
              readOnly={false}
              onChange={(e) => {
                setLicense(e.target.value);
              }}
              onClearClick={() => {
                setLicense("");
              }}
            />
          </Box>

          {/* <TextField
            select
            fullWidth
            label="تحديد نوع السعر"
            className="mb-4"
            name="PriceType"
            value={PriceType}
            onChange={(e) => setPriceType(e.target.value)}
          >
            {data?.map((option) => (
              <MenuItem key={option?._id} value={option?.typePrice}>
                {option?.typePrice}
              </MenuItem>
            ))}
          </TextField> */}
          <Box sx={{ mb: "10px" }}>
            <CustomeSelectField
              label={"أختيار سعر الصرف "}
              haswidth={true}
              value={PriceType}
              list={data ? data : []}
              customGetOptionLabel={(option) => option?.typePrice || ""}
              multiple={false}
              readOnly={false}
              onChange={(e, newValue) => {
                setPriceType(newValue);
              }}
              onClearClick={() => {
                setPriceType(null);
              }}
              // isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </Box>
          {selectPriceType && (
            <Box sx={{ mb: "10px" }}>
              <CustomTextField
                label={"ألرخصة أو الظمان "}
                haswidth={true}
                value={PriceConvert}
                error={error}
                customWidth="100%"
                // hasMultipleLine={true}
                // paddingHorizontal={"0px"}
                // message={props?.objectData?.name?.message}
                // customePadding="8px"
                // paddingHorizontal="0px"
                readOnly={false}
                onChange={(e) => {
                  setPriceConvert(e.target.value);
                }}
                onClearClick={() => {
                  setPriceConvert("");
                }}
              />
            </Box>
          )}
          <Box sx={{ mb: "10px" }}>
            <CustomTextField
              label={"سعر المنتج"}
              haswidth={true}
              value={Price}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              hasMultipleLine={false}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              // paddingHorizontal="0px"
              readOnly={false}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              onClearClick={() => {
                setPrice("");
              }}
            />
          </Box>
          <Box sx={{ mb: "10px" }}>
            <CustomTextField
              label={"النسبة المؤية"}
              haswidth={true}
              value={percent}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              hasMultipleLine={false}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              // customePadding="8px"
              // paddingHorizontal="0px"
              readOnly={false}
              onChange={(e) => {
                setPercent(e.target.value);
              }}
              onClearClick={() => {
                setPercent("");
              }}
            />
          </Box>
          {/* <TextField
            select
            fullWidth
            label="الوحدة"
            className="mb-4"
            name="UnitId"
            value={UnitId}
            onChange={(e) => setUnitId(e.target.value)}
          >
            {dataUnit?.map((option) => (
              <MenuItem key={option?._id} value={option?._id}>
                {option?.Unit}
              </MenuItem>
            ))}
          </TextField> */}
          <Box sx={{ mb: "10px" }}>
            <CustomeSelectField
              label={"اختر الوحدة"}
              haswidth={true}
              value={UnitId}
              list={dataUnit ? dataUnit : []}
              customGetOptionLabel={(option) => option?.Unit || ""}
              multiple={false}
              readOnly={false}
              onChange={(e, newValue) => {
                setUnitId(newValue);
              }}
              onClearClick={() => {
                setUnitId(null);
              }}
              // isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </Box>
          <Box sx={{ mb: "10px", p: "0" }}>
            <CustomeSelectField
              label={"نوع المنتج اذاكان محلي او خارجي"}
              haswidth={true}
              value={typeProject}
              list={selectTypPProject ? selectTypPProject : []}
              customGetOptionLabel={(option) => option.value || ""}
              multiple={false}
              readOnly={false}
              onChange={(e, newValue) => {
                setTypeProject(newValue);
              }}
              onClearClick={() => {
                setTypeProject(null);
              }}
              // isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </Box>
          {/* <TextField
            select
            fullWidth
            label="نوع المنتج اذاكان محلي او خارجي"
            className="mb-4"
            name="typeProject"
            value={typeProject}
            onChange={(e) => setTypeProject(e.target.value)}
          >
            <MenuItem value="محلي">محلي</MenuItem>
            <MenuItem value="خارجي">خارجي</MenuItem>
          </TextField> */}

          <Box sx={{ mb: "10px", p: "0" }}>
            <CustomTextField
              label={"المواصفات المطلوبة"}
              haswidth={true}
              value={description}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              hasMultipleLine={true}
              // paddingHorizontal={"0px"}
              message={error}
              readOnly={false}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onClearClick={() => {
                setDescription("");
              }}
            />
          </Box>
          <Box sx={{ mb: "10px", p: "0" }}>
            <CustomTextField
              label={"المواصفات المطلوبة"}
              haswidth={true}
              value={comments}
              // error={props?.objectData?.name?.error}
              customWidth="100%"
              hasMultipleLine={true}
              // paddingHorizontal={"0px"}
              // message={props?.objectData?.name?.message}
              readOnly={false}
              onChange={(e) => {
                setComments(e.target.value);
              }}
              onClearClick={() => {
                setComments("");
              }}
            />
          </Box>
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
