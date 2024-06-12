import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Module from "../MainFor/ModuleInsertProduct";
import axios from "axios";
import { BackendUrl } from "../../redux/api/axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import { fetchDataProduct } from "../Config/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { displayProductByProjectName } from "../../redux/ProductSlice/ProductAction";
import { Button, FormControlLabel, useTheme } from "@mui/material";
import ModulToploadFilePricedTechnical from "../MainFor/ModulToploadFilePricedTechnical";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/LanguageState";
import Loader from "Component/Config/Loader";
import { Delete, hasPermission } from "../Config/Function";
import { getRoleAndUserId } from "../../redux/RoleSlice/rolAction";
import "react-toastify/dist/ReactToastify.css";
import { ColorLink } from "Component/Config/Content";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function HandelDataMutualProject() {
  const { id } = useParams();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoading] = useState(false);
  const { products, loading } = useSelector((state) => state?.products);
  const [DeleteItem, setDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const { Permission, roles } = useSelector((state) => state?.RolesData);
  const { rtl } = useSelector((state) => state?.language);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = info?._id;
    if (userId && token) {
      dispatch(getRoleAndUserId({ userId, token }));
    }
  }, [info, token, dispatch]);

  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);

  const detDataProductById = () => {
    dispatch(displayProductByProjectName(id));
  };

  useEffect(() => {
    detDataProductById();
  }, [DeleteItem, dispatch, id]);

  const fetchDataByProjectId = async () => {
    try {
      setLoading(true); // Set loading to true when starting to fetch data
      const response = await axios.get(
        `${BackendUrl}/api/getProjectById/${id}`
      );
      if (response.data) {
        setDataProject(response?.data);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  const handleSend = async () => {
    try {
      const response = await axios.put(
        `${BackendUrl}/api/sendProject/${id}`,
        {},
        {
          headers: {
            token: token,
          },
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
    window.history.back(-1);
  };

  useEffect(() => {
    fetchDataByProjectId();
  }, [DeleteItem, anchorEl]);

  return (
    <div className="w-100">
      <div className="p-5 d-block">
        <ColorLink onClick={handleBack}>
          {t("ProductList.BackButton")}
        </ColorLink>
      </div>
      <div
        className={`container p-3 rad-10 ${
          theme?.palette?.mode === "dark" ? "bg-dark" : "bg-eee"
        }`}
      >
        <div className="mb-3">
          <div>
            <p>{dataProject.nameProject}</p>
            {dataProject?.MutualProjectId?.DepartmentID?.map((item) => (
              <FormControlLabel
                key={item?._id}
                control={
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
                label={item?.departmentName}
              />
            ))}
          </div>

          <div dir={rtl?.dir}>
            <p>{dataProject.MutualProjectId?.name}</p>
            <h2>{t("ProductList.title")}</h2>
          </div>
          <div className="d-flex justify-content-center gap-2 ms-2 me-2 mb-2">
            {hasPermission(
              roles?.send_project_from_Employ_to_HOD?._id,
              Permission?.permissionIds
            ) ? (
              <Button onClick={handleSend} className="me-2" variant="outlined">
                {t("ProductList.SendButton")}
              </Button>
            ) : (
              <Button className="me-2" variant="contained" color="secondary">
                {t("Authorized to send")}
              </Button>
            )}

            <ModulToploadFilePricedTechnical
              t={t}
              DepartmentID={dataProject?.DepartmentID}
              ProjectId={dataProject?._id}
            />
            <Module
              t={t}
              getDataProduct={fetchDataProduct}
              DepartmentID={dataProject?.DepartmentID}
              ProjectId={dataProject?._id}
              ProjectWorkNatural={dataProject?.WorkNatural}
            />
          </div>
          <div className="w-100">
            <p style={{ textAlign: "center" }}>Project has been sent</p>
          </div>
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
                <th>{t("ProductList.table.Unit")}</th>
                <th>{t("ProductList.table.Action")}</th>
              </tr>
            </thead>
            <tbody>{/* Add logic to render product rows here */}</tbody>
          </Table>
          <div className="d-flex justify-content-center align-item-center">
            {loading ? <Loader /> : "Data not found"}
          </div>
        </div>
      </div>
    </div>
  );
}
