import "../style/ResatPassword.css";
import { useState, useEffect } from "react";
import "../style/userInformation.css";
import { Button, useTheme } from "@mui/material";
import { ButtonClearState, ColorButton } from "../../Config/Content";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataDepartmentID } from "../../../redux/DepartmentState/DepartmentAction.js";
import Edit from "./Edit";
import InformationUserList from "./InformationUserList";
import ProfileImage from "./ProfileImage";
import { ToastContainer, toast } from "react-toastify";
import { BackendUrl } from "../../../redux/api/axios";
import axios from "axios";
import { getAllDataUserById } from "../../../redux/userSlice/authActions";
export default function PersonalProfile(props) {
  const { department } = useSelector((state) => {
    return state.Department;
  });
  const { dataUserById, loading } = useSelector((state) => {
    return state.user;
  });
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const theme = useTheme();
  const [file, setFile] = useState([]);
  const [name, setUname] = useState("");
  const [username, setUsername] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState();
  const [edit, setEdit] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [DepartmentID, setDepartment] = useState(info?.DepartmentID || "");
  useEffect(() => {
    if (dataUserById) {
      setUname(info?.name);
      setUsername(info?.username);
      setPassword(info?.password);
      setPhone(info?.Phone);
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDepartmentID({ DepartmentID }));
  }, [dispatch]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handelEdit = async () => {
    try {
      if (!info) {
        toast.error("Info._id not provided.");
        return;
      }
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("password", password || "");
      formData.append("Phone", Phone || "");
      const response = await axios({
        method: "put",
        url: `${BackendUrl}/api/updateUserById/${info?._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        data: formData,
      });

      if (response.status === 200) {
        console.log(response.data);
        toast.success(response?.data?.message);
        localStorage.setItem("user", JSON.stringify(response?.data?.response));
        setLoading(false);
        // setEdit(false);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating user.");
      }
    }
  };
  const getDataBuId = () => {
    const id = info?._id;
    dispatch(getAllDataUserById({ id, token }));
  };
  useEffect(() => {
    getDataBuId();
  }, [password, name, username, Phone]);
  const handelEditOpen = () => {
    setEdit(true);
  };
  const ClickToEditInfo = () => {
    setEdit(false);
  };
  return (
    <div
      className={`container  w-100  ${
        theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"
      }`}
    >
      <ToastContainer />
      <div>
        <div className="main-body p-4 ">
          <div className="row">
            <ProfileImage
              info={info}
              file={file}
              setFile={setFile}
              token={token}
              theme={theme}
              data={dataUserById}
            />
            {!edit ? (
              <InformationUserList
                info={info}
                department={department}
                theme={theme}
                data={dataUserById}
              />
            ) : (
              <Edit
                name={name}
                setUname={setUname}
                Phone={Phone}
                setPhone={setPhone}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                info={info}
                theme={theme}
                data={dataUserById}
              />
            )}
            <div>
              {edit ? (
                <div className="d-flex justify-content-between w-100">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={ClickToEditInfo}
                  >
                    Bake
                  </Button>
                  <ButtonClearState onClick={handelEdit}>
                    Save Change
                  </ButtonClearState>
                </div>
              ) : (
                <ColorButton onClick={handelEditOpen}>Edit Profile</ColorButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
