import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../redux/userSlice/authActions";
import { clearState } from "../../../../redux/userSlice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { ColorButton, VisuallyHiddenInput } from "../../../Config/Content";
import { Button, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
function Register(props) {
  // @ts-ignore
  const { isSuccess, isError, message } = useSelector((state) => state?.user);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [user_type, setUserType] = useState("");
  const [DepartmentID, setDepartmentID] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("Phone", Phone);
    formData.append("user_type", user_type);
    formData.append("DepartmentID", DepartmentID);
    formData.append("image", image);
    // @ts-ignore
    dispatch(registerUser(formData));
    setName("");
    setPassword("");
    setPhone("");
    setImage("");
    setUserType("");
    setUsername("");
    setDepartmentID("");
    if (props?.setDataEmploy) props.setDataEmploy(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(clearState());
    }
    if (isError) {
      toast.error(isError);
      dispatch(clearState());
    }
  }, [isSuccess, isError, message, dispatch]);
  const theme = useTheme();
  return (
    <div
      className={`social-boxes p-20 ${
        theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
      } rad-10`}
    >
      <ToastContainer />
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card-body p-md-3">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p
                  className="h1 fw-bold mb-3 mx-1 mx-md-4 mt-3"
                  style={{ direction: "rtl" }}
                >
                  تسجيل الموظفين
                </p>
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="name">
                        Your Name:
                      </label>
                      <input
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="username">
                        Username:
                      </label>
                      <input
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="password">
                        Password:
                      </label>
                      <input
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="Phone">
                        Phone:
                      </label>
                      <input
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        type="text"
                        name="Phone"
                        id="Phone"
                        className="form-control"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="user_type">
                        Type User:
                      </label>
                      <select
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        className="form-select"
                        name="user_type"
                        value={user_type}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="">Open this select User</option>
                        <option value="IT">IT</option>
                        <option value="management">Management</option>
                        <option value="Employ">Employ</option>
                        <option value="H.O.D">Head of Department</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="DepartmentID">
                        Department:
                      </label>
                      <select
                        data-bs-theme={
                          theme.palette.mode === "dark" ? "dark" : ""
                        }
                        className="form-select"
                        name="DepartmentID"
                        value={DepartmentID}
                        onChange={(e) => setDepartmentID(e.target.value)}
                      >
                        <option value="">Open this select Department</option>
                        {props.DataDepartment &&
                          props.DataDepartment.map((data) => (
                            <option key={data._id} value={data._id}>
                              {data.departmentName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      sx={{ width: "100%", mt: "6px" }}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setImage(e.target.files[0]);
                          }
                        }}
                      />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <ColorButton
                      type="submit"
                      style={{
                        maxWidth: "100%",
                        margin: "auto",
                        width: "100%",
                        height: "auto",
                      }}
                      onClick={handleSubmit}
                    >
                      Add Employee
                    </ColorButton>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="/image/image.png"
                  style={{ margin: "auto", maxWidth: "80%" }}
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
