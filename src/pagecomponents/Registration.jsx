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

const Registration = (props) => {
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",    
    password: "",
   roleName : "" 
  });

  const handleSigIn = () => {
     navigate("/");
  }


  const axiosInstance = axios.create();

          axiosInstance.interceptors.response.use((cfg) => {
            return cfg;
          },(err) => {
            console.error('Axios Err' + err)
            return Promise.reject(err);
          });

  

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
      data.firstName == null ||
      data.firstName.trim() === "" ||
      data.lastName == null ||
      data.lastName.trim() === "" ||
      data.email == null ||
      data.email.trim() === "" ||
      data.mobile == null ||
      data.mobile.trim() === "" ||
      data.password == null ||
      data.password.trim() === "" ||
      data.roleName == null ||
      data.roleName.trim() == ""
    ) {
      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "rgb(153, 12, 25)",
        html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Please fill all the details</p>',
        showClass: {
          popup: "animate__animated animate__fadeInLeft",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },

        timer: 5000,

        customClass: {
          popup: "custom-swal-popup", // Assign a custom class name
        },
      });
      // return false;
    } else {
      if (
        data.roleName == "CANDIDATE" ||
        data.roleName == "HR" 
      ) {
        try {
          // alert('http://'+url+':'+port+'/'+'authenticateLogin' + "::" + data.roles);
          const loginUrl = await axiosInstance.post(
            "http://" + url + ":" + port + "/" + "authenticateLogin",
            data,
            cfg
          );
          
          console.log(JSON.stringify(loginUrl));
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "rgb(27 123 84)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${loginUrl.data}</p>`,
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
          

            
        } catch (error) {
          console.log("error : " + error);
          if (error.response && error.response.data) {
            const errorMap = error.response.data;
            const errorMessage = Object.keys(errorMap)
              .map(field => `${errorMap[field]}<br>`)
              .join('');
            Swal.fire({
              position: "top-end",
              width: "auto",
              showConfirmButton: false,
              background: "rgb(153, 12, 25)",
              html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${errorMessage}</p>`,
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
            // Handle other types of errors (network error, etc.)
            // You can display a generic error message or handle it differently
            console.error("An unexpected error occurred:", error);
          }
          

          
        }
      } else {
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "rgb(153, 12, 25)",
          html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Invalid roles</p>',
          showClass: {
            popup: "animate__animated animate__fadeInLeft",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },

          timer: 5000,

          customClass: {
            popup: "custom-swal-popup", // Assign a custom class name
          },
        });
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
          alignItems:'center', background:'rgb(207 206 207)',
         
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
           
            // alignItems: "center",
            background:'rgb(229 228 229)',
             padding:'40px 40px',
             borderRadius:'5px',
            
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "var(--color-text)",
              fontWeight: "600",
              display: "flex",
              marginBottom:'5px'
            }}
          >
            {1 == 1 ? (
               <span className=""><span style={{fontSize:'22px'}}>R</span><span style={{fontSize:'18px'}}>EGISTRATION FORM</span></span> 
              // <span className="englishMarati">R</span>
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
              type="text"
              placeholder="FIRST NAME"
              name="firstName"
              id="firstName"
              value={data.firstName}
              onChange={handleInputsChange}
            />
          </div>

          <div
            className="idInput"
            style={{ display: "flex", marginBottom: "12px", marginTop: "5px" }}
          >
            <input
              className="credentials"
              type="text"
              placeholder="LAST NAME"
              name="lastName"
              id="lastName"
              value={data.lastName}
              onChange={handleInputsChange}
            />
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
            style={{ display: "flex", marginBottom: "12px", marginTop: "5px" }}
          >
            <input
              className="credentials"
              
              placeholder="MOBILE"
              name="mobile"
              id="mobile"
              value={data.mobile}
              onChange={handleInputsChange}
            />
          </div>

          <div
            className="idInput"
            style={{ display: "flex", marginBottom: "12px", marginTop: "5px" }}
          >
            <input
              className="credentials"
              
              placeholder="CREATE PASSWORD"
              name="password"
              id="password"
              value={data.password}
              onChange={handleInputsChange}
            />
          </div>
           

          <div
            className="idInput"
            style={{ display: "flex", marginBottom: "12px", marginTop: "5px" }}
          >
            <select
              className="credentials"
              
               
              name="roleName"
              id="roleName"
               
              onChange={handleInputsChange}
              style={{
                fontSize: '14px',
                fontWeight:' 400 ',
                color:'gray',
              }}
            > 
            <option value="">SELECT ROLE</option>
            <option value="CANDIDATE">CANDIDATE</option>
            <option value="HR">HR</option>
            </select>
          </div>
          <br></br>

          <div style={{ display: "flex" }}>
            <input
              className="loginBtn"
              type="button"
              value="REGISTER"
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
          style={{color:'rgb(38, 54, 118)',fontWeight:'500' ,display:'flex',
          fontSize:'15px',color:'rgb(38, 54, 118)' }}>
            {/* <div style={{ padding:'1px 5px',borderRadius:'2px',color:'#575656',fontWeight:'light'}}>New Member?</div> */}
            
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
              Have account?
            </div>
            <div
            onClick={handleSigIn}
              // onClick={handleJoinNow} 
              className="joinNow"
              style={{ padding: "1px 5px", borderRadius: "2px", fontSize: "" }}
            >
              Sign In
            </div>
          </div>
            
            
            {/* <div  className="joinNow" style={{ padding:'1px 5px',borderRadius:'2px',fontSize:''}}></div>  */}
            </div> 
        </div>
      
      </div>
    </div>
  );
};

export default Registration;
