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
import { useDispatch, useSelector } from "react-redux";
import { getDataNatural } from "../../../redux/Whorkntural/WorkNutralAction";
import CustomTextField from "../../Config/CustomTextField";
function FormData({
  formData,
  HandleSubmit,
  handleInputChange,
  setStartTime,
  setDateClose,
  setDateBook,
  setEndTime,
  rtl
}) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });
  const { getDtaInfo } = useSelector((state) => state?.natural);
  const [dataUserID, setDataUserID] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataNatural());
  }, []);
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
  }, [users.DepartmentID]);
  return (
    <div className="Project">
      <div
        className={`${
          theme.palette.mode === "dark" ? "bg-dark" : ""
        } SelectModePrice m-4 `}
      >
        <Box className=" m-4 ">
          <div className="form-outline mb-3 me-2 w-100  " dir={rtl?.dir}>
            <form action="" onSubmit={(e) => HandleSubmit(e)}>
              <h4>{rtl?.dir === 'rtl' ? 'نموذج البيانات' : 'Data Form'}</h4>
              <div className="d-flex  gap-4 mobilDisplay ">
                <TextField
                  fullWidth
                  label={rtl?.dir === 'rtl' ? 'اسم المشروع' : 'Project Name'}
                  id="filled-hidden-label-small"
                  variant="filled"
                  name="nameProject"
                  size="medium"
                  dir={rtl?.dir}
                  value={formData.nameProject}
                  onChange={handleInputChange}
                />
                 {/* <CustomTextField
                  label={"الاسم"}
                  haswidth={true}
                  // value={props?.objectData?.name?.value}
                  // error={props?.objectData?.name?.error}
                  customWidth="100%"
                  hasMultipleLine={false}
                  paddingHorizontal={'0px'}
                  // message={props?.objectData?.name?.message}
                  readOnly={false}
                  // onChange={(e) => {
                  //   props?.setObjectData("name", e.target.value);
                  // }}
                  onClearClick={() => {
                    props?.setObjectData("name", "");
                  }}
                /> */}
                <TextField
                  fullWidth
                  label={rtl?.dir === 'rtl' ? 'رقم الكتاب' : 'Book Number'}
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  dir={rtl?.dir}
                  name="NumberBook"
                  value={formData.NumberBook}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label={rtl?.dir === 'rtl' ? 'الجهة المستفيدة' : 'Beneficiary'}
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  dir={rtl?.dir}
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label={rtl?.dir === 'rtl' ? 'المرحلة' : 'Stage'}
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  dir={rtl?.dir}
                  name="Stage"
                  value={formData.Stage}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label={rtl?.dir === 'rtl' ? 'طريقة التحصيل' : 'Method of Collection'}
                  id="filled-hidden-label-small"
                  variant="filled"
                  size="medium"
                  dir={rtl?.dir}
                  name="MethodOption"
                  value={formData.MethodOption}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <h4>{rtl?.dir === 'rtl' ? 'نموذج التاريخ' : 'Date Form'}</h4>
                <div className="d-flex mobilDisplay  gap-4 ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label={rtl?.dir === 'rtl' ? 'تاريخ الاستلام' : 'Received Date'}
                        onChange={(value) => setDateBook(value)}
                      />
                      <DatePicker
                        label={rtl?.dir === 'rtl' ? 'تاريخ الإغلاق' : 'Close Date'}
                        onChange={(value) => setDateClose(value)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label={rtl?.dir === 'rtl' ? 'تاريخ البدء' : 'Start Date'}
                        onChange={(value) => setStartTime(value)}
                      />
                      <DatePicker
                        label={rtl?.dir === 'rtl' ? 'تاريخ الانتهاء' : 'End Date'}
                        onChange={(value) => setEndTime(value)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="mt-4 ">
                <h4>{rtl?.dir === 'rtl' ? 'نموذج التحديد' : 'Select Form'}</h4>
                <div className="d-flex mobilDisplay gap-4 ">
                  <TextField
                    fullWidth
                    select
                    label={rtl?.dir === 'rtl' ? 'طبيعة العمل' : 'Nature of Work'}
                    id="filled-hidden-label-small"
                    variant="filled"
                    size="medium"
                    dir={rtl?.dir}
                    name="WorkNatural"
                    value={formData.WorkNatural}
                    onChange={handleInputChange}
                  >
                    {getDtaInfo?.map((option) => (
                      <MenuItem key={option?._id} value={option?._id}>
                        {option?.workNaturalData}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    fullWidth
                    select
                    label={rtl?.dir === 'rtl' ? 'نسبة الانجاز' : 'Completion Rate'}
                    helperText=""
                    variant="filled"
                    name="CompletionRate"
                    value={formData.CompletionRate}
                    onChange={handleInputChange}
                  >
                    {LevelOfAchevment?.map((option, index) => (
                      <MenuItem key={option?.index} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    fullWidth
                    select
                    label={rtl?.dir === 'rtl' ? 'مستوى الاداء' : 'Performance Level'}
                    helperText=""
                    variant="filled"
                    name="LevelPerformance"
                    value={formData.LevelPerformance}
                    onChange={handleInputChange}
                  >
                    {PerformenceLevel?.map((option, index) => (
                      <MenuItem key={option?._id} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="mt-4">
                <h4>{rtl?.dir === 'rtl' ? 'نموذج النص' : 'Text Form'}</h4>
                <div className="d-flex mobilDisplay  gap-4 ">
                  <TextField
                    fullWidth
                    id="filled-multiline-static"
                    label={rtl?.dir === 'rtl' ? 'ملاحظات' : 'Comments'}
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
    </div>
  );
}

export default FormData;
