import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";
import {
  Box,
  MenuItem,
  TextField,
  useTheme,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { fetchDataAllDepartment } from "Component/Config/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getAllDataUser } from "../../../redux/userSlice/authActions";
function MutualProject({ setSecondaryData, HandleSubmit }) {
  const { dataUsers } = useSelector((state) => state?.user);
  const [info] = useState(() => JSON.parse(localStorage.getItem("user")) || {});

  const [departmentsData, setDepartmentsData] = useState([]);
  const [common, setCommon] = useState(false);
  const [checkDataSelect, setCheckDataSelect] = useState(false);
  const [userSelect, setUserSelect] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    const dataForm = {
      common,
      checkDataSelect,
      userSelect,
      checkedItems,
    };
    setSecondaryData && setSecondaryData(dataForm);
  }, [common, checkDataSelect, userSelect, checkedItems, setSecondaryData]);
  const fetchDataUser = useCallback(() => {
    dispatch(getAllDataUser());
  }, [dispatch]);
  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser]);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "fetchDataAllDepartment",
    fetchDataAllDepartment,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (data) setDepartmentsData(data);
  }, [data]);
  useEffect(() => {
    setCheckDataSelect(common);
  }, [common]);

  const handleCheckboxChange = useCallback(
    (id) => (event) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [id]: event.target.checked,
      }));
    },
    []
  );
  useEffect(() => {
    setDataFilter(departmentsData?.filter((item) => item?._id !== info?.DepartmentID &&item.departmentName!=="الموارد البشرية"));
    console.log(info?._id);
    console.log(departmentsData);
  }, [common]);

  return (
    <div className="Project">
      <div
        className="container seletMode p-5 gap-3"
        style={{
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
        }}
      >
        <div
          className={`${
            theme.palette.mode === "dark" ? "bg-dark" : ""
          } SelectModePrice m-4`}
        >
          <Box className="m-4">
            <div className="form-outline mb-3 me-2 w-100">
              <form>
                <div className="mt-4">
                  <h4>Select Form</h4>
                  <div className="d-flex gap-4">
                    <TextField
                      fullWidth
                      select
                      label="Determine if the Project is Shared or not"
                      variant="filled"
                      value={common.toString()}
                      onChange={(e) => setCommon(e.target.value === "true")}
                    >
                      <MenuItem value="false">غير مشترك</MenuItem>
                      <MenuItem value="true">مشروع مشترك</MenuItem>
                    </TextField>
                    {common && (
                      <TextField
                        fullWidth
                        select
                        label="Project Manager"
                        variant="filled"
                        value={userSelect}
                        onChange={(e) => setUserSelect(e.target.value)}
                      >
                        {dataUsers
                          .filter((option) => option.user_type === "H.O.D")
                          .map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                              {option.name}
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
                  </div>
                </div>
              </form>
              {common && (
                <FormGroup>
                  {dataFilter.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          checked={checkedItems[item._id] || false}
                          onChange={handleCheckboxChange(item._id)}
                        />
                      }
                      label={item.departmentName}
                    />
                  ))}
                </FormGroup>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default MutualProject;
