import * as React from "react";
import "./styleForm.css";
import {
  Slide,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  MenuItem,
  TextField,
  createTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState, useEffect } from "react";
import {
  LevelOfAchevment,
  PerformenceLevel,
} from "../../Config/SelectDrobdown";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios";
import { getData } from "../../../redux/MinistriesState/MinistresAction.js";
import {
  ButtonClearState,
  ColorButtonEdit,
  Textarea,
} from "../../Config/Content.jsx";
import {  toast } from "react-toastify";
import {
  AddWorkNutral,
  getDataNatural,
} from "../../../redux/Whorkntural/WorkNutralAction.js";
import { Add, Close } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function MainForm(props) {
  const { getDtaInfo } = useSelector((state) => state?.natural);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || {};
  });
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const [open, setOpen] = useState(false);
  const [DateBook, setDateBook] = useState("");
  const [DateClose, setDateClose] = useState("");
  const [dataUserID, setDataUserID] = useState([]);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const dispatch = useDispatch();
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  let {
    nameProject,
    NumberBook,
    PersonCharge,
    WorkNatural,
    beneficiary,
    MethodOption,
    Stage,
    CompletionRate,
    LevelPerformance,
    comments,
  } = formData;
  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("nameProject", nameProject);
      formData.append("NumberBook", NumberBook);
      formData.append("beneficiary", beneficiary);
      formData.append("PersonCharge", PersonCharge);
      formData.append("WorkNatural", WorkNatural);
      formData.append("MethodOption", MethodOption);
      formData.append("Stage", Stage);
      formData.append("CompletionRate", CompletionRate);
      formData.append("LevelPerformance", LevelPerformance);
      formData.append("DateBook", DateBook);
      formData.append("DateClose", DateClose);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("comments", comments);
      // @ts-ignore
      const response = await axios({
        method: "post",
        url: `${BackendUrl}/api/setProject`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        data: formData,
      });
      if (response || response?.data) {
        toast.success(response.data.message);
        setFormData({
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
        setDateBook("");
        setDateClose("");
        setOpen(false);
        props?.fetchDataProject();
      }
    } catch (error) {
      if (error || error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getData());
  }, []);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getallDataUser/${users?.DepartmentID}`
        );
        setDataUserID(response.data);
      } catch (error) {
        console.error(
          error.response
            ? `Error response: ${error.response.data.message}`
            : `Network error: ${error.message}`
        );
      }
    };
    fetchData();
  }, [open]);
  useEffect(() => {
    // @ts-ignore
    dispatch(getDataNatural());
  }, [AddWorkNutral]);
  const theme = createTheme({
    direction: "rtl",
  });
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        <Add fontSize="large" />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} className="">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container">
          <div>
            <h2 className="mt-2 " style={{ textAlign: "center" }}>
              Main form to add project
            </h2>
            <div className="DisplayFormModel mt-5 ">
              <Box
                sx={{
                  width: "500px",
                  maxWidth: "100%",
                }}
                className=" d-flex  flex-column "
                component="form"
                onSubmit={(e) => HandleSubmit(e)}
              >
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "100%", maxWidth: "100%" }}
                  className="mb-4 me-3"
                  select
                  label="طبيعة العمل"
                  name="WorkNatural"
                  dir="rtl"
                  value={WorkNatural}
                  onChange={handleInputChange}
                  defaultValue={"0%"}
                >
                  {getDtaInfo.map((option) => (
                    <MenuItem key={option?._id} value={option?._id}>
                      {option?.workNaturalData}
                    </MenuItem>
                  ))}
                </TextField>
                {/* end WorkNatural */}

                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  className="mb-4"
                  label="طريقة التحصيل"
                  name="MethodOption"
                  dir="rtl"
                  value={MethodOption}
                  onChange={handleInputChange}
                ></TextField>
                {/* end MethodOption */}

                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  className="mb-4 me-3"
                  label="المرحلة "
                  name="Stage"
                  dir="rtl"
                  value={Stage}
                  onChange={handleInputChange}
                ></TextField>

                {/* end Stage */}
                {/*textarea  */}
                <Textarea
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="الملاحضات"
                  name="comments"
                  value={comments}
                  className="mb-4"
                  onChange={handleInputChange}
                  style={{
                    height: "75px",
                    width: "500px",
                    maxWidth: "100%",
                  }}
                />
                {/* end comments */}
                <Box
                  className="mb-4 d-flex gap-3 "
                  sx={{ width: "500px", maxWidth: "100%" }}
                >
                  <TextField
                    id="outlined-select-currency"
                    sx={{ width: "100%", maxWidth: "100%" }}
                    className="mb-4 me-3"
                    select
                    label="مستوى الاداء"
                    name="LevelPerformance"
                    dir="rtl"
                    value={LevelPerformance}
                    onChange={handleInputChange}
                    defaultValue={"0%"}
                  >
                    {PerformenceLevel.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* LevelPerformance */}
                  <TextField
                    id="outlined-select-currency"
                    sx={{ width: "100%", maxWidth: "100%" }}
                    className="mb-4 me-3"
                    select
                    label="نسبة الانجاز"
                    dir="rtl"
                    name="CompletionRate"
                    value={CompletionRate}
                    onChange={handleInputChange}
                    defaultValue={"0%"}
                  >
                    {LevelOfAchevment?.map((option) => (
                      <MenuItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "500px",
                  maxWidth: "100%",
                }}
                className="d-flex  flex-column "
                component="form"
                onSubmit={(e) => HandleSubmit(e)}
              >
                <TextField
                  fullWidth
                  sx={{ width: "500px", maxWidth: "100%" }}
                  label="اسم المشروع "
                  id="fullWidth"
                  className="mb-4"
                  name="nameProject"
                  dir="rtl"
                  value={nameProject}
                  onChange={handleInputChange}
                />
                {/* end nameProject  */}
                <TextField
                  fullWidth
                  sx={{ width: "500px", maxWidth: "100%" }}
                  label="رقم الكتاب"
                  id="fullWidth"
                  className="mb-3"
                  name="NumberBook"
                  dir="rtl"
                  value={NumberBook}
                  onChange={handleInputChange}
                />
                {/* end NumberBook */}
                {/* start Date Project */}
                <div
                  className="displayDate mb-4"
                  style={{ width: "500px", maxWidth: "100%" }}
                >
                  <div style={{ width: "100%", maxWidth: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="تاريخ الاستلام"
                          onChange={(value) => setDateBook(value)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div style={{ width: "100%", maxWidth: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="تاريخ الغلق"
                          onChange={(value) => setDateClose(value)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="mb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="start"
                      onChange={(value) => setStartTime(value)}
                    />
                    <DatePicker
                      label="end"
                      onChange={(value) => setEndTime(value)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </div>
             
                {/* end Date for the project  */}
                {/* start select */}
                {/* start beneficiary*/}
                <div className="d-bloke">
                  <TextField
                    fullWidth
                    sx={{ width: "500px", maxWidth: "100%" }}
                    label=" الجهات المستفيدة"
                    id="fullWidth"
                    className="mb-3"
                    dir="rtl"
                    name="beneficiary"
                    value={beneficiary}
                    onChange={handleInputChange}
                  />
                </div>
                {/* end */}

                {/* end other  option and slect drob down */}
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  select
                  label=" القائم بالعمل"
                  className="mb-4"
                  name="PersonCharge"
                  dir="rtl"
                  value={PersonCharge}
                  onChange={handleInputChange}
                >
                  {dataUserID
                    .filter((option) => option.user_type !== users?.user_type && option.user_type !== "IT")
                    .map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}{" "}
                        <span
                          className="text-secondary ms-3"
                          style={{ fontSize: "15px" }}
                        >
                          {option.user_type}
                        </span>
                      </MenuItem>
                    ))}
                </TextField>
              </Box>
            </div>
            <div
              className="container "
              style={{ width: "82%", maxWidth: "100%" }}
            >
              <ButtonClearState
                onClick={handleClose}
                style={{ width: "100%", fontSize: "20px" }}
                className="mb-3"
              >
                Close
              </ButtonClearState>
              <ColorButtonEdit
                onClick={(e) => HandleSubmit(e)}
                style={{ width: "100%", fontSize: "20px" }}
              >
                Save
              </ColorButtonEdit>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
