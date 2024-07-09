import React, { useEffect, useState } from "react";

// import UP_bannerTop from "../assets/images/UP_bannerTop.jpg";
// import UPLogo from "../assets/images/UPLogo.jpg";
import "./Login.css";
// import HeaderML from "../components/HeaderML";
// import UPLogoh from "../assets/images/UPLogoHeader.jpg";
// import { useState } from "react";
// import axios from "axios";
// import urlGlobal from "./application.json";
import Swal from "sweetalert2";
import { json, useNavigate } from "react-router-dom";
import mainlogo from "../assets/images/mainlogo.png";
import axios from "axios";
import urlGlobal from "./application.json";

const Login = (props) => {
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleJoinNow = () => {
    navigate("/Registration");
  };

  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (cfg) => {
      return cfg;
    },
    (err) => {
      console.error(err);
      return Promise.reject(err);
    }
  );

  const navigate = useNavigate();

  const handleInputsChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = async () => {
    const cfg = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    // alert(data.roles);
    if (
      data.email == null ||
      data.email.trim() === "" ||
      data.password == null ||
      data.password.trim() === ""
    ) {
      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "rgb(153, 12, 25)",
        html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Please enter credentials</p>',
        showClass: {
          popup: "animate__animated animate__fadeInLeft",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },

        // timer: 5000,

        customClass: {
          popup: "custom-swal-popup", // Assign a custom class name
        },
      });
      // return false;
    } else {
      try {
        const loginUrl = await axiosInstance.post(
          "http://" + url + ":" + port + "/" + "UserLogin",
          data,
          cfg
        );

        console.log(JSON.stringify(loginUrl));
        if (loginUrl.data.responseCode == "0") {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "rgb(153, 12, 25)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${loginUrl.data.responseStatus}</p>`,
            showClass: {
              popup: "animate__animated animate__fadeInLeft",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },

            // timer: 5000,

            customClass: {
              popup: "custom-swal-popup", // Assign a custom class name
            },
          });
        } else {
          // alert(loginUrl.data.userId + "::" + loginUrl.data.roleId);
          const userId = loginUrl.data.userId;
          const roleId = loginUrl.data.roleId;
          const userName = loginUrl.data.roleId;
          const lastName = loginUrl.data.lastName;
          const firstName = loginUrl.data.firstName;
          const profileImage = loginUrl.data.userProfileImage;
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "rgb(27 123 84)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">login Successfull</p>`,
            showClass: {
              popup: "animate__animated animate__fadeInLeft",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },

            // timer: 5000,

            customClass: {
              popup: "custom-swal-popup", // Assign a custom class name
            },
          });
          console.log(JSON.stringify(loginUrl));
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("firstName", firstName);
          sessionStorage.setItem("lastName", lastName);
          sessionStorage.setItem("roleId", roleId);
          sessionStorage.setItem("profileImage", profileImage);
          //  sessionStorage.setItem("userId",userId);
          navigate("/UserMainPage", { state: userId });
        }
      } catch (error) {
        if(error=="AxiosError: Network Error"){
          Swal.fire({
            position: "top-end",
            width: "auto",
            showConfirmButton: false,
            background: "rgb(153, 12, 25)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Network error</p>`,
            showClass: {
              popup: "animate__animated animate__fadeInLeft",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            // timer: 5000,
            customClass: {
              popup: "custom-swal-popup", // Assign a custom class name
            },
          });
        }else {
          Swal.fire({
            position: "top-end",
            width: "auto",
            showConfirmButton: false,
            background: "rgb(153, 12, 25)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${error}</p>`,
            showClass: {
              popup: "animate__animated animate__fadeInLeft",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            // timer: 5000,
            customClass: {
              popup: "custom-swal-popup", // Assign a custom class name
            },
          });
        }
         
       
       
        
      }
    }
  };

  return (
    <div
      className="mainDiv"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        height: "100vh",
      }}
    >
      <div
        className="loginMainDivL"
        style={{ flex: "1.3", background: "rgb(154 156 165)", height: "100%" }}
      >
        {/* <img className="logoDivImage" src ={mainlogo}></img>  */}
      </div>

      <div
        className="loginMainDivR"
        style={{
          flex: "1",
          height: "100%",
          borderRadius: "11px",
          fontFamily:
            "apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(207 206 207)",
          // background:'var(--color-component-background)',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            // alignItems: "center",
            background: "rgb(229 228 229)",
            padding: "40px 40px",
            borderRadius: "5px",
            // background:'rgb(207 206 207)',
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "var(--color-text)",
              fontWeight: "600",
              display: "flex",
              marginBottom: "5px",
            }}
          >
            {1 == 1 ? (
              <span className="">
                <span style={{ fontSize: "22px" }}>L</span>
                <span style={{ fontSize: "18px" }}>OGIN</span>
              </span>
            ) : (
              <span> </span>
            )}
          </div>

          <div
            className="idInput"
            style={{ display: "flex", marginBottom: "12px", marginTop: "5px" }}
          >
            <input
              className="credentials"
              type="email"
              placeholder="EMAIL"
              name="email"
              id="email"
              value={data.email}
              onChange={handleInputsChange}
            />
          </div>

          <div
            className="idInput"
            style={{ display: "flex", marginTop: "5px" }}
          >
            <input
              className="credentials"
              placeholder="PASSWORD"
              name="password"
              id="password"
              value={data.password}
              onChange={handleInputsChange}
            />
          </div>
          <div
            style={{
              color: "rgb(38, 54, 118)",
              fontWeight: "500",
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "15px",
              color: "rgb(38, 54, 118)",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          >
            <div
              className="forgotPwd"
              style={{ padding: "1px 5px", borderRadius: "2px", fontSize: "" }}
            >
              Forgot Password?
            </div>
          </div>

          <br></br>

          <div style={{ display: "flex", marginBottom: "5px" }}>
            <input
              className="loginBtn"
              type="button"
              value="LOGIN"
              style={{
                width: "350px",
                height: "35px",
                border: "none",
                borderRadius: "8px",
                textAlign: "center",
                background: "#263676",
                letterSpacing: "0.8px",
                color: "#FFFFFF",
                fontWeight: "600",
              }}
              onClick={handleLogin}
            />
          </div>
          <div
            style={{
              color: "rgb(38, 54, 118)",
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              fontSize: "15px",
              color: "rgb(38, 54, 118)",
            }}
          >
            <div
              style={{
                padding: "1px 5px",
                borderRadius: "2px",
                color: "#575656",
                fontWeight: "light",
              }}
            >
              New Member?
            </div>
            <div
              onClick={handleJoinNow}
              className="joinNow"
              style={{ padding: "1px 5px", borderRadius: "2px", fontSize: "" }}
            >
              Join now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
