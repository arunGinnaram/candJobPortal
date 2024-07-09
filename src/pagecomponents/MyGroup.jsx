import React, { useEffect, useState } from "react";
import "./Login.css";
import "./applicationWhole.css";
import axios from "axios";
import urlGlobal from "./application.json";

import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

// import React from 'react';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import ProHd from "../assets/images/ProHd.jpg";
// import mainlogo from '../assets/images/mainlogo.png';
import Defaultprofile from "../assets/images/Defaultprofile.jpg";

const MyGroup = () => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;

  const userId = sessionStorage.getItem("userId");
  const roleId = sessionStorage.getItem("roleId");

  const [educationList, setEducationList] = useState([]);

  let location = useLocation();

  useEffect(() => {
    if (location.state && location.state.skillName) {
      handleSearch(location.state.skillName);
    }
  }, [location.state]); 

 

  const axiosInstance = axios.create();

  const cfg = {
    headers: {
      //  Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  axiosInstance.interceptors.response.use(
    (cfg) => {
      return cfg;
    },
    (err) => {
      console.error(err);
      return Promise.reject(err);
    }
  );

  const [userBasicDetails, setUserBasicDetails] = useState([]);

  const handleSearch = async (skillName) => {
    // if(e.key=="Enter"){
    //   let skill = e.target.value;
    //   let skillName = skill?skill.toLowerCase().trim():''; 
    try {
      const getEdDetails = await axiosInstance.post(
        "http://" +
          url +
          ":" +
          port +
          "/" +
          "getcandidateEducationDetailsBySkills",{
            skill:skillName},
        cfg
      );
      console.log("skill: " + JSON.stringify(getEdDetails));
      if (getEdDetails == null) {
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "#D0342C",
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Retrieved data is empty or  null</p>`,
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
      } else {
        if (!getEdDetails.data || getEdDetails.data == "") {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "#D0342C",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Retrieved data is empty or  null</p>`,
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
        } else {
          if (!getEdDetails.data.responseCode) {
            Swal.fire({
              position: "top-end",
              width: "auto",
              // padding: '0',
              showConfirmButton: false,
              background: "#D0342C",
              html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Unable to retrieve data,Server error</p>`,
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
          } else {
            if (getEdDetails.data.responseCode == "0") {
              Swal.fire({
                position: "top-end",
                width: "auto",
                // padding: '0',
                showConfirmButton: false,
                background: "rgb(153, 12, 25)",
                html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${getEdDetails.data.responseStatus}</p>`,
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
              // navigate("/UserProfiles",{state:{}});
              // setEducationList(getEdDetails.data); 
              // console.log("da: " +  JSON.stringify(getEdDetails.data.response.size())); 
              if(!getEdDetails.data.response==" "){ 
                setUserBasicDetails(getEdDetails.data.response);
              }else {
                navigate("/UserMainPage")
                Swal.fire({
                  position: "top-end",
                  width: "auto",
                  showConfirmButton: false,
                  background: "orange",
                  html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">No matching profiles</p>`,
                  showClass: {
                    popup: "animate__animated animate__fadeInLeft",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                  timer: 4000,
                  customClass: {
                    popup: "custom-swal-popup", // Assign a custom class name
                  },
                });
              }
             
            }
          }
        }
      }
    } catch (error) {
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
    // }
  };

  const handleImageError = (e) => {
    e.target.src = Defaultprofile;
  };

  return (
    <div
      style={{
        background: "var(--color-component-background)",
        height: "auto",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Header /> 
        <div
          className="mainContainerFullWidth"
          style={{
            // background: "var(--color-component-background)",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "10px",
            // alignItems: "center",
            color: "rgb(3, 44, 83)",
            // backgroundColor: "white",
            fontFamily:
              '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >

<div className="LeftSideDiv" style={{ width: "215px" }}>
            <div
              className="FirstLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px 20px 10px 20px",
                color: "var(--color-text)",
                display: "flex",
                flexDirection: "column",
                // justifyContent:'center',
                alignItems: "center",
                // border: "0.5px solid #dfdcdc",
              }}
            >
              <Popup
                trigger={
                  <img
                    src={profileImage ? profileImage : Defaultprofile}
                    style={{
                      height: "80px",
                      maxHeight: "80px",
                      minHeight: "80px",
                      width: "80px",
                      maxWidth: "80px",
                      minWidth: "80px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    alt={Defaultprofile}
                    onError={handleImageError}
                  />
                }
                position="center center"
                modal
              >
                {(close) => (
                  <form>
                    <div
                      style={{
                        width: "400px",
                        height: "350px",
                        background: "white",

                        border: "0.5px solid lightgray",
                        borderRadius: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "30px",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          padding: "10px 20px",
                          fontSize: "20px",
                          fontWeight: "600",
                          borderBottom: "0.5px solid #dfdcdc",
                          color: "var(--color-text)",
                        }}
                      >
                        <div>Profile Image</div>

                        <span
                          className="editIconPen"
                          style={{
                            borderRadius: "50%",
                            padding: "3px 7px 4px 7px ",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={close}
                        >
                          <FontAwesomeIcon
                            className="editIcon"
                            style={{}}
                            icon={faXmark}
                          />
                        </span>
                      </div>
                      <br></br>

                      <div
                        style={{
                          padding: "10px 20px",
                          overflow: "auto",
                        }}
                      >
                        <div
                          className=""
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={profileImage}
                            style={{
                              height: "180px",
                              maxHeight: "180px",
                              minHeight: "180px",
                              width: "180px",
                              maxWidth: "180px",
                              minWidth: "180px",
                              borderRadius: "50%",
                            }}
                            alt={Defaultprofile}
                          ></img>
                        </div>
                        <br></br>
                      </div>

                      <div
                        style={{
                          height: "35px",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          padding: "10px 20px",
                          border: "0.5px solid #dfdcdc",
                          // color: "var(--color-text)",
                        }}
                      >
                        <span
                          className="editIconPen"
                          style={{
                            borderRadius: "50%",
                            padding: "3px 7px 4px 7px ",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <input
                            type="file"
                            accept=".jpeg,.jpg"
                            style={{ display: "none" }}
                            name="userProfileImage"
                            id="userProfileImage"
                            onChange={handleUserProfileImageChange}
                          />
                          <label htmlFor="userProfileImage">
                            <FontAwesomeIcon
                              className="editIcon"
                              style={{}}
                              icon={faImage}
                              size="lg"
                            />
                          </label>
                        </span>
                        <button
                          type="button"
                          onClick={saveProfileImage}
                          className="saveBtn"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Popup>

              <label
                style={{
                  fontWeight: "600",
                  color: "--color-text",
                  fontSize: "16px",
                  color: "gray",
                  // lineHeight: "15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/UserHome");
                }}
              >
                {firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase()}
              </label>
            </div>
            <br></br>

            <div
              className="SecondLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0.5px solid #dfdcdc",
              }}
            >
              

              <div
                style={{
                  padding: "10px 20px 10px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "35px",
                    marginBottom: "10px",
                  }}
                >
                  Experience
                </label>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "0.5px solid #dfdcdc",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "600",
                      color: "--color-text",
                      lineHeight: "25px",
                    }}
                  >
                    React Fullstack Developer
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Temp En Private Limited
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Dec 2022 -Present
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Hyderabad, Telangana, India
                  </label>
                  <br />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "--color-text",
                      lineHeight: "25px",
                    }}
                  >
                    Java Developer
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Temp En Private Limited
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Dec 2022 -Present
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Hyderabad, Telangana, India
                  </label>
                  <br />
                </div>

                <br />
              </div>
            </div>

            <br></br>

            <div
              className="ThirdLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0.5px solid #dfdcdc",
              }}
            >
              

              <div
                style={{
                  padding: "10px 20px 10px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                

                <br />
              </div>
            </div>

            <br></br>
          </div>

          <div className="spaceDiv" style={{ width: "15px" }}></div>


          <div className="LeftSideDiv" style={{ width: "810px" }}>
            <div
              className="SecondLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0.5px solid #dfdcdc",
              }}
            >
              {/* <div> 
                <img src = {translateLang} style={{height:'250px' ,maxHeight:'250px',minHeight:'250px', width:'810px',maxWidth:'810px',minWidth:'810px', borderRadius:'5px'}}></img>
                </div>  */}

              <div
                style={{
                  padding: "0px 20px 0px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {userBasicDetails &&
                  Object.entries(userBasicDetails).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "0.5px solid #dfdcdc",
                        padding: "15px 0",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ paddingTop: "10px" }}>
                          <img
                            style={{
                              height: "47px",
                              maxHeight: "47px",
                              minHeight: "47px",
                              width: "48px",
                              maxWidth: "48px",
                              minWidth: "48px",
                              borderRadius: "50%",
                            }}
                            src={
                              value.userProfileImage
                                ? value.userProfileImage
                                : Defaultprofile
                            }
                            alt={Defaultprofile}
                            onError={handleImageError}
                          />{" "}
                        </div>{" "}
                        &nbsp; &nbsp;
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label
                            style={{
                              fontWeight: "600",
                              color: "--color-text",
                              lineHeight: "25px",
                            }}
                          >
                            {value.lastname &&
                              value.lastname.charAt(0).toUpperCase() +
                                value.lastname.slice(1).toLowerCase()}{" "}
                            &nbsp;
                            {value.firstname &&
                              value.firstname.charAt(0).toUpperCase() +
                                value.firstname.slice(1).toLowerCase()}
                          </label>
                          <label
                            style={{
                              color: "--color-text",
                              fontSize: "14px",
                              color: "gray",
                              lineHeight: "20px",
                            }}
                          >
                            Skill :{" "}
                            {value.skill &&
                              value.skill.charAt(0).toUpperCase() +
                                value.skill.slice(1).toLowerCase()}
                          </label>
                          <label
                            style={{
                              color: "--color-text",
                              fontSize: "14px",
                              color: "gray",
                              lineHeight: "20px",
                            }}
                          >
                            Dec 2022 -Present
                          </label>
                          <label
                            style={{
                              color: "--color-text",
                              fontSize: "14px",
                              color: "gray",
                              lineHeight: "20px",
                            }}
                          >
                            Hyderabad, Telangana, India
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <br></br>

            <br></br>
          </div>

          <div className="spaceDiv" style={{ width: "20px" }}></div>

          <div className="RightSideDiv"
            style={{
              width: "300px",
              // border: "1px solid gray",
              // backgroundColor: "white",
            }}
          >
            <div
              className="SecondLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0.5px solid #dfdcdc",
              }}
            >
              {/* <div> 
                <img src = {translateLang} style={{height:'250px' ,maxHeight:'250px',minHeight:'250px', width:'810px',maxWidth:'810px',minWidth:'810px', borderRadius:'5px'}}></img>
                </div>  */}

              <div
                style={{
                  padding: "10px 20px 10px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "35px",
                    marginBottom: "10px",
                  }}
                >
                  {/* Profile Image */}
                </label>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={ProHd}
                    style={{
                      height: "150px",
                      maxHeight: "150px",
                      minHeight: "150px",
                      width: "150px",
                      maxWidth: "150px",
                      minWidth: "150px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <br></br>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "0.5px solid #dfdcdc",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "600",
                      color: "--color-text",
                      lineHeight: "25px",
                    }}
                  >
                    React Fullstack Developer
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Temp En Private Limited
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Dec 2022 -Present
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Hyderabad, Telangana, India
                  </label>
                  <br />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      color: "--color-text",
                      lineHeight: "25px",
                    }}
                  >
                    Java Developer
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Temp En Private Limited
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Dec 2022 -Present
                  </label>
                  <label
                    style={{
                      color: "--color-text",
                      fontSize: "14px",
                      color: "gray",
                      lineHeight: "20px",
                    }}
                  >
                    Hyderabad, Telangana, India
                  </label>
                  <br />
                </div>

                <br />
              </div>
            </div>

            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyGroup;
