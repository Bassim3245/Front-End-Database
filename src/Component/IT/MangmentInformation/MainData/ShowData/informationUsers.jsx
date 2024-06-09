import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllDataUser } from "../../../../../redux/userSlice/authActions";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { BackendUrl } from "../../../../../redux/api/axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import {
  BottomRoot,
  ButtonClearState,
  ButtonSave,
  ColorLink,
} from "../../../../Config/Content";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../../../Config/Loader";
import { getRoleAndUserId } from "../../../../../redux/RoleSlice/rolAction";
import { hasPermission } from "Component/Config/Function";
function InformationUsers({ dataEmploy, theme }) {
  // @ts-ignore
  const { dataUsers, loading } = useSelector((state) => state.user);
  const [info, setInfo] = React.useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const token = localStorage.getItem("token") || {};
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const [message, setMessage] = useState("");
  // @ts-ignore
  const [UpdateDataUser, setDataUser] = useState(false);
  // @ts-ignore
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleDelete = async (Id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    try {
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // @ts-ignore
        const response = await axios({
          method: "DELETE",
          url: `${BackendUrl}/api/deleteUserById/${Id}`,
        });
        setMessage(response?.data?.message);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // @ts-ignore
  const FetchDataUser = () => {
    // @ts-ignore
    dispatch(getAllDataUser());
  };
  useEffect(() => {
    console.log("sss", dataUsers);

    FetchDataUser();
  }, []);
  const handelAccess = (id) => {
    Navigate(`/Home/PermissionUsers/${id}`);
  };
  const handleClickEdit = (id) => {
    Navigate(`/Home/ModuleEditUsers/${id}`);
  };
  const getPermmission = () => {
    const userId = info?._id;
    dispatch(getRoleAndUserId({ userId, token }));
  };
  useEffect(() => {
    getPermmission();
  }, [Navigate]);
  return (
    <>
      {loading && <Loader />}
      {/* <ToastContainer /> */}
      <Table
        striped
        style={{}}
        variant={`${theme.palette.mode === "dark" ? "dark" : ""}`}
      >
        <thead>
          <tr>
            <th>#</th>
            <th> Employee Name</th>
            <th>Username</th>
            <th> Phone</th>
            <th>Password</th>
            <th>Name Of Department </th>
            {hasPermission(
              roles.set_Permission_to_user._id,
              Permission?.permissionIds
            ) && <th>Access</th>}
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {dataUsers &&
            Array.isArray(dataUsers) &&
            dataUsers?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.username}</td>
                <td>{item?.Phone}</td>
                <td>{item?.password}</td>
                <td>{item?.DepartmentID?.departmentName}</td>
                {hasPermission(
                  roles.set_Permission_to_user._id,
                  Permission?.permissionIds
                ) && (
                  <td>
                    {item.user_type === "IT" ? (
                      <BottomRoot onClick={() => handelAccess(item?._id)}>
                        {item?.user_type}
                      </BottomRoot>
                    ) : item.user_type === "H.O.D" ? (
                      <ButtonSave onClick={() => handelAccess(item?._id)}>
                        {item?.user_type}
                      </ButtonSave>
                    ) : item.user_type === "management" ? (
                      <ButtonClearState onClick={() => handelAccess(item?._id)}>
                        {item?.user_type}
                      </ButtonClearState>
                    ) : item.user_type === "Employ" ? (
                      <ColorLink onClick={() => handelAccess(item?._id)}>
                        {item?.user_type}
                      </ColorLink>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handelAccess(item?._id)}
                      >
                        {item?.user_type}
                      </Button>
                    )}
                  </td>
                )}
                <td>
                  <div className="d-flex">
                    <Button className="btn" onClick={()=>handleClickEdit(item?._id)}>
                      {" "}
                      <Edit />{" "}
                    </Button>
                    {/* <ModuleEdit id={item?._id} setDataUser={setDataUser} /> */}
                    <Button
                      className="btn "
                      onClick={() => handleDelete(item?._id)}
                    >
                      {" "}
                      <Delete />{" "}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default InformationUsers;
