import "../style/ResatPassword.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import "../style/userInformation.css";
import { useTheme } from "@mui/material";
import { BackendUrl } from "../../../redux/api/axios";
export default function PersonalProfile(props) {
  const [info, setInfo] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const Navigateto = useNavigate();
  const ClickToEditInfo = () => {
    Navigateto(`/Edit/${info?._id}`);
  };
  const theme = useTheme();
  return (
    <div className="container" style={{}}>
      <section
        className={`${theme.palette.mode === "dark" ? "bg-dark" : "bg-eee"}`}
      >
        <MDBContainer className=" h-100">
          <MDBRow
            className={`justify-content-center align-items-center mb-4 container  `}
            style={{
              maxWidth: "100%",
              borderRadius: "25px",
            }}
          >
            <div className="mb-3 " style={{ borderRadius: ".5rem" }}>
              <div className="headerProfile pb-4">
                <div className="d-flex justify-content-between mt-3  ">
                  <img
                    src="/image/photoLogoUR.jpg"
                    alt="User Avatar"
                    className="profileImage"
                  />
                  <div className="m-4">
                    <p>
                      <span style={{ color: "#b82ce9", fontWeight: "700" }}>
                        {" "}
                        THE GENERAL COMPANY
                      </span>{" "}
                      <br />
                      <span style={{ color: "#000066" }}>
                        FOR ELECTRONIC SYSTEMS
                      </span>
                    </p>
                  </div>
                  <img
                    src="/image/photologoCompany.jpg"
                    alt="User Avatar"
                    className="profileImage"
                  />
                </div>
              </div>
              <div
                className={`d-flex justify-content-center align-items-center responsevVontainer `}
                style={{
                  borderRadius: "10px",
                  background: `${
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.6)"
                      : "White"
                  }`,
                }}
              >
                <div className="containerImageProfile">
                  <div className="d-flex justify-content-center align-items-center flex-column h-100">
                    {info?.image ? (
                      <img
                        src={`${BackendUrl}/${info?.image}`}
                        width={"200px"}
                      />
                    ) : null}
                  </div>
                </div>
                <div className={`containerImageProfile   `}>
                  <div className="d-flex justify-content-center align-items-center flex-wrb  h-100">
                    <div className="textColumCenter">
                      <h4 className="card-title mb-1">Name:{info.name}</h4>
                      <p className="">Email:{info?.username}</p>
                      <p className="card-text mb-2">
                        Type of user: {info.user_type}
                      </p>
                      <p className="card-text mb-2">
                        phone:{" "}
                        {info.Phone ? (
                          <span>+964 {info?.Phone}</span>
                        ) : (
                          <span>+964 </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="textleftend ">
                <button
                  className="buttonEditUNfo btnn"
                  onClick={() => ClickToEditInfo()}
                >
                  Edit Information
                </button>
              </div>
            </div>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
