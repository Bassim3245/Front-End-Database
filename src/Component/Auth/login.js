import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice/authActions";
import { clearState } from "../../redux/userSlice/userSlice";
import { ColorButton } from "../Config/Content";
import "./style/PageLogo.css";
import Loader from "../Config/Loader.jsx";
function Login() {
  const Navigateto = useNavigate();
  const { isSuccess, isError, message, Rol, code, loading } = useSelector(
    // @ts-ignore
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    console.log(Rol);
    if (isSuccess) {
      setTimeout(() => {
        Navigateto("/Main/menu");
      }, 500);
    }
    if (isError) {
      console.log("error");
      toast.error(isError);
      dispatch(clearState());
    }
  }, [isSuccess, isError, message, code, Rol, Navigateto, dispatch]);
  const [loadingtest, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    setLoadingImage(true);
    setTimeout(() => {
      setLoadingImage(false);
    }, 4000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="position-absolute" style={{ top: "50%", left: "50%" }}>
          <Loader />
        </div>
      ) : (
        <section className="vh-100  gradient-custom">
          <ToastContainer />
          {loadingImage ? (
            <>
              <img
                src="/image/image.png"
                alt="logo"
                className="ImageLogostart"
              />
              <div className="typewriter">
                <h2 className="text-uppercase " style={{ direction: "rtl" }}>
                  {" "}
                  مرحبا بك في نظام الاتمتة الالكتروني
                </h2>
              </div>
            </>
          ) : (
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <>
                  <div className="col-lg-12 col-xl-11">
                    <div
                      className="card text-black"
                      style={{ borderRadius: 25 }}
                    >
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p
                              className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-3"
                              style={{ direction: "rtl" }}
                            >
                              تسجيل الدخول
                            </p>
                            <form
                              className="mx-1 mx-md-4"
                              onSubmit={(e) => handleSubmit(e)}
                            >
                              <div className="d-flex flex-row align-items-center mb-2">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example3c"
                                    style={{ width: "100%", direction: "rtl" }}
                                  >
                                    اسم المستخدم
                                  </label>
                                  <input
                                    style={{ direction: "rtl" }}
                                    type="username"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="ادخل الاسم"
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-2">
                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example4c"
                                    style={{ width: "100%", direction: "rtl" }}
                                  >
                                    كلمة المرور
                                  </label>
                                  <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    style={{ direction: "rtl" }}
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="ادخل كلمة المرور"
                                  />
                                </div>
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
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  login
                                </ColorButton>
                              </div>
                            </form>
                          </div>
                          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img
                              className="imagelogoMobile"
                              src="/image/image.png"
                              style={{ margin: "auto", maxWidth: "70%" }}
                              alt="Description of the image"
                            />
                          </div>
                          <p
                            className="mt-2 mb-20 c-grey fs-20 p-absolute bottom-0 me-2 hiddenveston "
                            style={{ direction: "rtl" }}
                          >
                            V:(1.1.1)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
export default Login;
