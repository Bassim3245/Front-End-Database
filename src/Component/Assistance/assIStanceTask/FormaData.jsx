import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackendUrl } from "../../../redux/api/axios";
import {
  LevelOfAchevment,
  PerformenceLevel,
} from "Component/Config/SelectDrobdown";
function FormData({
  formData,
  HandleSubmit,
  handleInputChange,
  setStartTime,
  setDateClose,
  setDateBook,
  setEndTime,
}) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  // const [DateBook, setDateBook] = useState("");
  // const [DateClose, setDateClose] = useState("");
  const [dataUserID, setDataUserID] = useState([]);
  // const [startTime, setStartTime] = React.useState("");
  // const [endTime, setEndTime] = React.useState(""),
  //   [WorkNatural, setWorknural] = useState(""),
  //   [MethodOption, setMethodOption] = useState(""),
  //   [Stage, setStage] = useState(""),
  //   [comments, setComments] = useState(""),
  //   [LevelPerformance, setLevelPerformance] = useState(""),
  //   [CompletionRate, setCompletionRate] = useState(""),
  //   [nameProject, setNameProject] = useState(""),
  //   [NumberBook, setNumberBook] = useState(""),
  //   [beneficiary, setBeneficiary] = useState(""),
  //   [PersonCharge, setPersonCharge] = useState("");
  // useEffect(() => {
  //   const DataCollection = {
  //     DateBook,
  //     DateClose,
  //     startTime,
  //     endTime,
  //     WorkNatural,
  //     MethodOption,
  //     Stage,
  //     comments,
  //     LevelPerformance,
  //     CompletionRate,
  //     nameProject,
  //     NumberBook,
  //     beneficiary,
  //     PersonCharge,
  //   };
  //   setMainData(DataCollection);
  // }, [
  //   DateBook,
  //   DateClose,
  //   dataUserID,
  //   startTime,
  //   endTime,
  //   WorkNatural,
  //   MethodOption,
  //   comments,
  // ]);

  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/getallDataUser/${users.DepartmentID}`
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
  }, []);
  return (
    <div className="Project">
      {/* <div
        className={`container  seletMode   p-5 gap-3  `}
        style={{
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
        }}
      > */}
      <div
        className={`${
          theme.palette.mode === "dark" ? "bg-dark" : ""
        } SelectModePrice m-4 `}
      >
        <Box className=" m-4 ">
          <div className="form-outline mb-3 me-2 w-100  ">
            <form action="" onSubmit={(e) => HandleSubmit(e)}>
              <h4> Data form</h4>
              <div className="d-flex  gap-4 mobilDisplay ">
                <TextField
                  fullWidth
                  label="اسم المشروع "
                  id="filled-hidden-label-small"
                  variant="filled"
                  name="nameProject"
                  size="medium"
                  value={formData.nameProject}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="رقم الكتاب"
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  name="NumberBook"
                  value={formData.NumberBook}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label=" الجهة المستفيدة  "
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="المرحلة"
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  name="Stage"
                  value={formData.Stage}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="طبيعة العمل "
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  name="WorkNatural"
                  value={formData.WorkNatural}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label=" طريقة التحصيل"
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  name="MethodOption"
                  value={formData.MethodOption}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <h4>date form </h4>
                <div className="d-flex mobilDisplay  gap-4 ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Received Date "
                        onChange={(value) => setDateBook(value)}
                      />
                      <DatePicker
                        label="Close Date"
                        onChange={(value) => setDateClose(value)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
              </div>
              <div className="mt-4 ">
                <h4>select form </h4>
                <div className="d-flex mobilDisplay gap-4 ">
                  <TextField
                    id="filled-select-currency"
                    fullWidth
                    select
                    label="القائم بالعمل"
                    helperText=""
                    name="PersonCharge"
                    variant="filled"
                    value={formData.PersonCharge}
                    onChange={handleInputChange}
                  >
                    {dataUserID?.map((option) => (
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
                  <TextField
                    id="filled-select-currency"
                    fullWidth
                    select
                    label="نيبة الانجاز"
                    helperText=""
                    variant="filled"
                    name="CompletionRate"
                    value={formData.CompletionRate}
                    onChange={handleInputChange}
                  >
                    {LevelOfAchevment.map((option, index) => (
                      <MenuItem key={option?.index} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    fullWidth
                    select
                    label="مستوى الاداء"
                    helperText="Please select your currency"
                    variant="filled"
                    name="LevelPerformance"
                    value={formData.LevelPerformance}
                    onChange={handleInputChange}
                  >
                    {PerformenceLevel.map((option, index) => (
                      <MenuItem key={option?._id} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="mt-4">
                <h4>text form </h4>
                <div className="d-flex mobilDisplay  gap-4 ">
                  <TextField
                    fullWidth
                    id="filled-multiline-static"
                    label="ملاحظات"
                    multiline
                    rows={4}
                    name="comments"
                    variant="filled"
                    value={formData.comments}
                    onChange={handleInputChange}
                  />

                </div>
              </div>
            </form>
          </div>
        </Box>
      </div>
      {/* </div> */}
    </div>
  );
}
export default FormData;
