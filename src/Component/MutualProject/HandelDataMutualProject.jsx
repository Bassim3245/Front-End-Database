import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FormControlLabel, Checkbox, useTheme, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ModuleInsertProduct from "../MainFor/ModuleInsertProduct";
import ModulToploadFilePricedTechnical from "../MainFor/ModulToploadFilePricedTechnical";
import { BackendUrl } from "../../redux/api/axios";
import { displayProductByProjectName } from "../../redux/ProductSlice/ProductAction";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import { setLanguage } from "../../redux/LanguageState";
import {
  CustomNoRowsOverlay,
  Delete,
  hasPermission,
  sumDataProjectIQD,
} from "../Config/Function";
import { ColorLink, ButtonClearState, BottomSend } from "../Config/Content";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataProduct } from "Component/Config/fetchData";
import AllowDelate from "Component/Project/ProjectInformation/AllowDelete";
import AllowEdit from "Component/Project/ProjectInformation/AlllowEdit";
import ModuleEdit from "Component/MainFor/ModulEditProducts";

export default function HandleDataMutualProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkData, setCheckData] = useState([]);
  const [isActive, setIsActive] = useState({});
  const [isSend, setIsSend] = useState(false);
  const [DeleteItem, setDelete] = useState(false);

  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const { products, loading } = useSelector((state) => state?.products);
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { rtl } = useSelector((state) => state?.language);

  useEffect(() => {
    const userId = info?._id;
    if (userId && token) {
      dispatch(getRoleAndUserId({ userId, token }));
    }
  }, [info, token, dispatch]);

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(displayProductByProjectName(id));
  }, [deleteItem, dispatch, id]);

  const fetchDataByProjectId = async () => {
    try {
      setLoadingProject(true);
      const response = await axios.get(
        `${BackendUrl}/api/getProjectById/${id}`
      );
      if (response.data) {
        setDataProject(response?.data);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    fetchDataByProjectId();
  }, [deleteItem, anchorEl, id]);

  const handleSend = async () => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/sendProject/${id}`,
        {},
        {
          headers: { token: token },
        }
      );
      if (response?.data) {
        toast.success(response?.data?.message);
        setMessage(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleBack = () => {
    window.history.back();
  };
  const getDataAllCheckByDepartmentId = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/api/getDataAllCheckByDepartmentId/${id}`
      );
      setCheckData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataAllCheckByDepartmentId();
  }, []);

  useEffect(() => {
    if (dataProject?.MutualProjectId?.DepartmentID) {
      const initialStates = dataProject?.MutualProjectId?.DepartmentID?.reduce(
        (acc, item) => {
          acc[item?._id] =
            (isActive && isActive[item._id]) ||
            (checkData?.DepartmentID &&
              checkData.DepartmentID.includes(item?._id));
          return acc;
        },
        {}
      );
      setIsActive(initialStates);
    }
  }, [dataProject, checkData]);

  const handleCheckboxChange = (id) => () => {
    setIsActive((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleSendProjectFromHodToProjectManager = async () => {
    try {
      const DepartmentID = info?.DepartmentID;
      const check = checkData ? checkData?._id : null;
      const ProjectManager = dataProject?.MutualProjectId?.ProjectManger?._id;
      const response = await axios.put(
        `${BackendUrl}/api/sendProjectFromHodToProjectManger/${dataProject?._id}`,
        {
          isActive,
          check,
          DepartmentID,
          ProjectManager,
        },
        {
          headers: { token: token },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const departmentIds = Array.isArray(
      dataProject?.MutualProjectId?.DepartmentID
    )
      ? dataProject?.MutualProjectId?.DepartmentID?.map(
          (mutualProject) => mutualProject._id
        )
      : [];
    if (
      Array.isArray(checkData?.DepartmentID) &&
      departmentIds.length === checkData?.DepartmentID?.length
    ) {
      setIsSend(true);
    }
  }, [checkData, dataProject, handleSendProjectFromHodToProjectManager]);
  return (
    <div className="w-100">
      <div className="pb-2 d-block">
        <ColorLink onClick={handleBack}>
          {t("ProductList.BackButton")}
        </ColorLink>
      </div>
      <div
        className={`p-3 rad-10 ${
          theme?.palette?.mode === "dark" ? "bg-dark" : "bg-eee"
        }`}
      >
        <div className="mb-3">
          <div className="d-flex justify-content-between" dir={rtl?.dir}>
            <h4 className="">{dataProject?.nameProject}</h4>
            <h4>
              Project Manager (
              {dataProject?.MutualProjectId?.ProjectManger?.name})
            </h4>
          </div>
          <div className="d-flex justify-content-between" dir={rtl?.dir}>
            <div>
              {dataProject?.MutualProjectId?.DepartmentID?.map((item) => (
                <FormControlLabel
                  key={item?._id}
                  control={
                    <Checkbox
                      checked={isActive[item?._id] || false}
                      onChange={handleCheckboxChange(item?._id)}
                      disabled={
                        dataProject?.MutualProjectId?.ProjectManger?._id !==
                          info?._id &&
                        (info?.DepartmentID !== item?._id ||
                          isActive[item?._id])
                      }
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                  }
                  label={
                    <div>
                      {item?.departmentName}
                      {isActive[item?._id] && (
                        <>
                          <br />
                          <span className="text-secondary">
                            تم تسليم البيانات الخاصة بالمنتجات القسم المعني
                          </span>
                        </>
                      )}
                    </div>
                  }
                />
              ))}
            </div>
            <div>
              <BottomSend onClick={handleSendProjectFromHodToProjectManager}>
                {t("ProductList.table.sendToManger")}
              </BottomSend>
            </div>
          </div>
          <hr />
          <div dir={rtl?.dir}>
            <p>{dataProject.MutualProjectId?.name}</p>
            <h2>{t("ProductList.title")}</h2>
          </div>
          <div className="d-flex justify-content-center gap-2 ms-2 me-2 mb-2">
            {isSend &&
              dataProject?.MutualProjectId?.ProjectManger?._id == info?._id &&
              (hasPermission(
                roles?.send_project_from_Employ_to_HOD?._id,
                Permission?.permissionIds
              ) ? (
                <BottomSend
                  onClick={handleSend}
                  className="me-2"
                  variant="contained"
                  color="secondary"
                >
                  {t("ProductList.SendButton")}
                </BottomSend>
              ) : (
                <Button className="me-2" variant="contained" color="secondary">
                  {t("Authorized to send")}
                </Button>
              ))}
            <ModulToploadFilePricedTechnical
              t={t}
              DepartmentID={dataProject?.DepartmentID}
              ProjectId={dataProject?._id}
            />
            <ModuleInsertProduct
              t={t}
              getDataProduct={fetchDataProduct}
              DepartmentID={dataProject?.DepartmentID}
              ProjectId={dataProject?._id}
              ProjectWorkNatural={dataProject?.WorkNatural}
            />
          </div>
          {Array.isArray(products) && products.length > 0 ? (
            <Table
              striped
              bordered
              hover
              variant={theme?.palette?.mode === "dark" ? "dark" : ""}
              dir={rtl?.dir}
              responsive
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("ProductList.table.ProductName")}</th>
                  <th>{t("ProductList.table.Price")}</th>
                  <th>{t("ProductList.table.PriceType")}</th>
                  <th>{t("ProductList.table.Quantity")}</th>
                  <th>{t("ProductList.table.AdditionPercentage")}</th>
                  <th>{t("ProductList.table.priceConvert")}</th>
                  <th>{t("ProductList.table.Notes")}</th>
                  <th>{t("ProductList.table.Specifications")}</th>
                  <th>{t("ProductList.table.Total")}</th>
                  <th>{t("ProductList.table.Unit")}</th>
                  <th>{t("ProductList.table.Action")}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) &&
                  products &&
                  products?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.nameProduct}</td>
                      <td>{item?.Price}</td>
                      <td>{item?.PriceType}</td>
                      <td>{item?.Quantity}</td>
                      <td>{item?.percent}</td>
                      <td>{item?.PriceConvert}</td>
                      <td>{item?.comments}</td>
                      <td>{item?.description}</td>
                      <td>{item?.Quantity * item?.Price}</td>
                      <td>{item?.UnitId?.Unit}</td>

                      <td className=" d-flex gap-2 f-wrap">
                        <div>
                          {item?.allowRequest || info?.user_type === "H.O.D" ? (
                            <div className="d-flex">
                              <ModuleEdit
                                item={item}
                                getDataProduct={fetchDataProduct}
                                // @ts-ignore
                                ProjectWorkNatural={dataProject?.WorkNatural}
                              />
                            </div>
                          ) : (
                            <>
                              {/* <Button>Delete</Button> */}
                              <div className="d-flex gap-2">
                                <AllowEdit
                                  Id={item?._id}
                                  label="AllowEdit"
                                  title="تعديل"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div>
                          {item?.allowRequestDelete ||
                          info?.user_type === "H.O.D" ? (
                            <div className="d-flex">
                              <BottomSend
                                onClick={() =>
                                  Delete(
                                    item?._id,
                                    setDelete,
                                    setAnchorEl,
                                    token,
                                    "DeleteProduct"
                                  )
                                }
                              >
                                {t("ProductList.table.Delete")}
                              </BottomSend>
                            </div>
                          ) : (
                            <>
                              {/* <Button>Delete</Button> */}
                              <div className="d-flex gap-2">
                                <AllowDelate
                                  Id={item?._id}
                                  label="AllowDelete"
                                  title="حذف"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={10}>المجموع </td>
                  <td>{sumDataProjectIQD(products).totalIQD} IQD</td>
                  <td>{sumDataProjectIQD(products).totalOther} USD</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <div>
              <CustomNoRowsOverlay />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
