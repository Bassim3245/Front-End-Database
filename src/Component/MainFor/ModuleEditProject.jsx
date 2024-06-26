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
} from "../Config/SelectDrobdown";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios.js";
import { getData } from "../../redux/MinistriesState/MinistresAction.js";
import {
  ButtonClearState,
  ButtonSave,
  ColorButtonEdit,
  Textarea,
} from "../Config/Content.jsx";
import { ToastContainer, toast } from "react-toastify";
import {
  AddWorkNutral,
  getDataNatural,
} from "../../redux/Whorkntural/WorkNutralAction.js";
import { Close } from "@mui/icons-material";
import { setLanguage } from "../../redux/LanguageState";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";

import { formatDate, hasPermission } from "Component/Config/Function";

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

  const [OtherOption, setOtherOpthion] = useState(true);
  const [dataUserID, setDataUserID] = useState([]);
  const dispatch = useDispatch();
  const [dataProject, setDataProject] = React.useState({});
  const [DateBook, setDateBook] = useState(dataProject?.DateBook || "");
  const [DateClose, setDateClose] = useState(dataProject?.DateClose || "");
  const [formData, setFormData] = React.useState({});
  const [dataMethodOption, setDataMethodOption] = React.useState([]);
  const [startTime, setStartTime] = React.useState(
    dataProject?.startTime || ""
  );
  const { Permission, roles } = useSelector((state) => state?.RolesData);

  const [endTime, setEndTime] = React.useState(dataProject?.endTime || "");
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
      nameProject: dataProject?.nameProject || "",
      NumberBook: dataProject?.NumberBook || "",
      PersonCharge: dataProject?.userId?._id || "",
      WorkNatural: dataProject?.WorkNatural || "",
      beneficiary: dataProject?.beneficiary || "",
      MethodOption: dataProject?.MethodOption || "",
      Stage: dataProject?.stageId || "",
      CompletionRate: dataProject?.CompletionRate || "",
      LevelPerformance: dataProject?.LevelPerformance || "",
      Description: dataProject?.Description || "",
      nameProduct: dataProject?.nameProduct || "",
      comments: dataProject?.dataProject || "",
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
    comments,
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
        endTime,
        startTime,
        comments,
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
          url: `${BackendUrl}/api/getallDataUser/${users?.DepartmentID}`,
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
  const getDataMethodOtion = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/getDataMethodOption`);
      setDataMethodOption(response?.data?.response);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getDataMethodOtion();
  }, []);
  useEffect(() => {
    const userId = users?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  }, []);
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
                  select
                  label="طريقة التحصيل "
                  className="mb-4"
                  name="MethodOption"
                  dir="rtl"
                  value={MethodOption}
                  onChange={handleInputChange}
                >
                  {dataMethodOption?.map((data, index) => (
                    <MenuItem value={data?._id}>{data?.MethodOption}</MenuItem>
                  ))}
                </TextField>
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
                <div
                  className="displayDate mb-4"
                  style={{ width: "500px", maxWidth: "100%" }}
                >
                  <div style={{ width: "100%", maxWidth: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          // value={DateBook}
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
                          // value={DateClose}
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
                        // defaultValue={dayjs(formatDate(startTime))}
                        // value={startTime}
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

                {/* end other  option and slect drob down */}
                {hasPermission(
                  roles?.person_charge?._id,
                  Permission?.permissionIds
                ) && (
                  <TextField
                    id="outlined-select-currency"
                    sx={{ width: "500px", maxWidth: "100%" }}
                    select
                    label="القائم بالعمل"
                    className="mb-4"
                    name="PersonCharge"
                    dir="rtl"
                    value={PersonCharge}
                    onChange={handleInputChange}
                  >
                    {dataUserID
                      .filter(
                        (option) =>
                          option.user_type !== users?.user_type &&
                          option.user_type !== "IT"
                      )
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
                )}
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
