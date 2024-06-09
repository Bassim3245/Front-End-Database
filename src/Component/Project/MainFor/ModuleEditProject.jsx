import * as React from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState, useEffect } from "react";
import {
  LevelOfAchevment,
  PerformenceLevel,
  currencies,
  optionMethod,
} from "../../Config/SelectDrobdown";
import axios from "axios";
import { BackendUrl } from "../../../redux/api/axios.js";
import { getData } from "../../../redux/MinistriesState/MinistresAction.js";
import {
  ButtonClearState,
  ButtonSave,
  ColorButtonEdit,
} from "../../Config/Content.jsx";
import { ToastContainer, toast } from "react-toastify";
import {
  AddWorkNutral,
  getDataNatural,
} from "../../../redux/Whorkntural/WorkNutralAction.js";
import { Close } from "@mui/icons-material";
import { setLanguage } from "../../../redux/LanguageState";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModuleFormEditProject(props) {
  // @ts-ignore
  const { getDtaInfo } = useSelector((state) => state.natural);
  const { Ministries } = useSelector((state) => {
    // @ts-ignore
    return state?.Ministries;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || {};
  });
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const [open, setOpen] = useState(false);
  const [DateBook, setDateBook] = useState("");
  const [DateClose, setDateClose] = useState("");
  const [OtherOption, setOtherOpthion] = useState(true);
  const [dataUserID, setDataUserID] = useState([]);
  const dispatch = useDispatch();
  const [dataProject, setDataProject] = React.useState({});
  const [formData, setFormData] = React.useState({});

  const getDataByProjectID = async () => {
    const token = localStorage.getItem("token") || {};
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataProjectById/${props?.ProjectData?._id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      setDataProject(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log(dataProject?.beneficiary);
    getDataByProjectID();
  }, [props?.ProjectID]);

  React.useEffect(() => {
    setFormData({
      // @ts-ignore
      nameProject: dataProject?.nameProject || "",
      NumberBook: dataProject?.NumberBook || "",
      PersonCharge: dataProject?.userId?._id || "",
      WorkNatural: dataProject?.WorkNatural || "",
      // @ts-ignore
      beneficiary: dataProject?.beneficiary || "",
      MethodOption: dataProject?.MethodOption || "",
      Stage: dataProject?.stageId || "",
      CompletionRate: dataProject?.CompletionRate || "",
      LevelPerformance: dataProject?.LevelPerformance || "",
      Description: dataProject?.Description || "",
      nameProduct: dataProject?.nameProduct || "",
    });
    // console.log(PersonCharge);
  }, [dataProject]); // Update formData when dataProject changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  let {
    // @ts-ignore
    nameProject,
    // @ts-ignore
    NumberBook,
    PersonCharge,
    WorkNatural,
    beneficiary,
    MethodOption,
    Stage,
    CompletionRate,
    LevelPerformance,
  } = formData;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        nameProject,
        NumberBook,
        beneficiary,
        PersonCharge,
        WorkNatural,
        MethodOption,
        Stage,
        CompletionRate,
        LevelPerformance,
        DateBook,
        DateClose,
      };
      // @ts-ignore
      if (!dataProject?._id) {
        throw new Error("Project ID is missing");
      }
      const response = await axios.put(
        // @ts-ignore
        `${BackendUrl}/api/updateDataProjectById/${dataProject._id}`,
        updatedData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: ` ${token}`,
            // token: `Bearer ${token}`,
          },
        }
      );
      if (response?.data) {
        toast.success(response?.data?.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };
  useEffect(() => {
    // @ts-ignore
    dispatch(getData());
  }, []);
  const handleSelectDropdown = () => {
    setOtherOpthion(false);
  };
  const handleBack = () => {
    setOtherOpthion(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://127.0.0.1:4000/api/getallDataUser/${users?.DepartmentID}`,
        });
        if (response && response?.data) {
          setDataUserID(response?.data);
          setOpen(false);
        }
      } catch (error) {
        if (error.response) {
          console.log(error?.response?.data?.message);
          return error?.response?.data?.message;
        } else {
          return error.message;
        }
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDataNatural());
  }, [AddWorkNutral]);

  
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>
        <EditIcon />
        <span className="ms-2">Edit</span>
        
      </MenuItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#212121" }}>
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
              Update Data Project
            </h2>
            <div className=" DisplayFormModel ">
              <Box
                sx={{
                  width: "500px",
                  maxWidth: "100%",
                }}
                className=" d-flex  flex-column "
                component="form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  select
                  label="طبيعة العمل"
                  className="mb-4"
                  name="WorkNatural"
                  dir={rtl?.dir}
                  value={WorkNatural}
                  onChange={handleInputChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  className="mb-4"
                  select
                  label="طريقة التحصيل"
                  name="MethodOption"
                  dir={rtl?.dir}
                  value={MethodOption}
                  onChange={handleInputChange}
                >
                  {optionMethod.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  className="mb-4 me-3"
                  select
                  label="المرحلة "
                  name="Stage"
                  dir={rtl?.dir}
                  value={Stage}
                  onChange={handleInputChange}
                >
                  {getDtaInfo.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.workNaturalData}
                    </MenuItem>
                  ))}
                </TextField>
                <Box className="mb-4 d-flex gap-3 ">
                  <TextField
                    id="outlined-select-currency"
                    sx={{ width: "100%", maxWidth: "100%" }}
                    className="mb-4 me-3"
                    select
                    label="مستوى الاداء"
                    name="LevelPerformance"
                    dir={rtl?.dir}
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
                  <TextField
                    id="outlined-select-currency"
                    sx={{ width: "500px", maxWidth: "100%" }}
                    className="mb-4 me-3"
                    select
                    label="نسبة الانجاز"
                    dir={rtl?.dir}
                    name="CompletionRate"
                    value={CompletionRate}
                    onChange={handleInputChange}
                    defaultValue={"0%"}
                  >
                    {LevelOfAchevment.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
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
                onSubmit={(e) => handleSubmit(e)}
              >
                <TextField
                  fullWidth
                  sx={{ width: "500px", maxWidth: "100%" }}
                  label="اسم المشروع "
                  id="fullWidth"
                  className="mb-4"
                  name="nameProject"
                  dir={rtl?.dir}
                  value={nameProject}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  sx={{ width: "500px", maxWidth: "100%" }}
                  label="رقم الكتاب"
                  id="fullWidth"
                  className="mb-4"
                  name="NumberBook"
                  dir={rtl?.dir}
                  value={NumberBook}
                  onChange={handleInputChange}
                />
                {/* start Date Project */}
                <div className="mb-4 d-flex gap-4 dispalyDataColomMMobile">
                  <div style={{}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="تاريخ الاستلام"
                          value={DateBook}
                          onChange={(value) => setDateBook(value)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div style={{}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="تاريغ الغلق"
                          value={DateClose}
                          onChange={(value) => setDateClose(value)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                {/* end Date for the project  */}

                {/* start select */}
                <div className="d-flex gap-4">
                  {OtherOption ? (
                    <TextField
                      id="outlined-select-currency"
                      sx={{ width: "500px", maxWidth: "100%" }}
                      select
                      label=" الجهة المستفيدة"
                      className="mb-4"
                      name="beneficiary"
                      dir={rtl?.dir}
                      value={beneficiary}
                      onChange={handleInputChange}
                    >
                      {Ministries?.map((option) => (
                        <MenuItem key={option?._id} value={option?.ministries}>
                          {option?.ministries}
                        </MenuItem>
                      ))}
                      <MenuItem key="otherOption">
                        <ButtonSave
                          onClick={() => handleSelectDropdown()}
                          style={{
                            display: "block",
                            width: "100%",
                            maxWidth: "100%",
                          }}
                        >
                          كتابة أختيار أخر
                        </ButtonSave>
                      </MenuItem>
                    </TextField>
                  ) : (
                    <div className="d-bloke">
                      <TextField
                        fullWidth
                        sx={{ width: "500px", maxWidth: "100%" }}
                        label=" اكتب الاختيار"
                        id="fullWidth"
                        className=""
                        dir={rtl?.dir}
                        name="beneficiary"
                        value={beneficiary}
                        onChange={handleInputChange}
                      />
                      <div style={{ textAlign: "right" }}>
                        <IconButton
                          aria-label="back"
                          onClick={() => handleBack()}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </div>

                {/* end other  option and slect drob down */}
                <TextField
                  id="outlined-select-currency"
                  sx={{ width: "500px", maxWidth: "100%" }}
                  select
                  label=" القائم بالعمل"
                  className="mb-4"
                  name="PersonCharge"
                  dir={rtl?.dir}
                  value={PersonCharge || ""} // Provide a default value if PersonCharge is undefined
                  onChange={handleInputChange}
                >
                  {dataUserID.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </div>

            <div
              className="container d-block"
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
                onClick={(e) => handleSubmit(e)}
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
