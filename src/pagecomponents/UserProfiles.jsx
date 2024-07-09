import React, { useEffect, useState } from "react";
import "./Login.css";
import "./applicationWhole.css";
import axios from "axios";
import urlGlobal from "./application.json";

import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
// import React from 'react';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import ProHd from "../assets/images/ProHd.jpg";
// import mainlogo from '../assets/images/mainlogo.png';
import Defaultprofile from "../assets/images/Defaultprofile.jpg";
 
const UserProfiles = () => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;

  const userId = sessionStorage.getItem("userId");
  const roleId = sessionStorage.getItem("roleId"); 
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const profileImage = sessionStorage.getItem("profileImage");

  const [educationList, setEducationList] = useState([]);

  let location = useLocation();

  useEffect(() => {
    if (location.state && location.state.skillName) {
      handleSearch(location.state.skillName);
      getEdDet(location.state.skillName);
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

  const cfgComments = {
    headers: {
      //  Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
      // Accept: "application/json",
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
              if(!getEdDetails.data.response==" "){ 
                // console.log(getEdDetails.data.response)  
                // const respArray = Object.values(getEdDetails.data.response);
                // setUserBasicDetails(respArray.slice(0,4));  
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

  const [postCommentsList, setPostCommentsList] = useState([]);


  const getPostsCommentsDet = async () => {
    try {
      const getEdDetails = await axiosInstance.get(
        "http://" + url + ":" + port + "/" + "getPostsComments",
        cfg
      );

      // console.log("asdcvb: " + JSON.stringify(getEdDetails));
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
        if (getEdDetails.data) {
          setPostCommentsList(getEdDetails.data.response);
        } else {
        }
        // setEducationList(getEdDetails.data);
      }
      // setEducationList(getEdDetails.data);
    } catch (error) {
      console.log("error : " + error);
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
  };

  

  const getEdDet = async (skillName) => {
    try {
      const getEdDetails = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "getPostsSaved",
        {
          skill:skillName,
        },
        cfg
      );

      console.log("da: " + JSON.stringify(getEdDetails));
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
        if (getEdDetails.data) {
          setPostsList(getEdDetails.data.response.slice(0,3));
        } else {
        }
        // setEducationList(getEdDetails.data);
      }
    } catch (error) {
      console.log("error : " + error);
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
  };

  const handleImageError = (e) => {
    e.target.src = Defaultprofile;
  };

  const [postsList, setPostsList] = useState([]);
  const [showLess, setShowLess] = useState(true);
  const [showComplete, setShowComplete] = useState(false);

  const handleSeeMore = () => {
    setShowLess(false);
    setShowComplete(true);
  };

  const handleSeeLess = () => {
    setShowLess(true);
    setShowComplete(false);
  };

  const [displayCommentSection, setDisplayCommentSection] = useState(null);

  const [profileIdComments, setProfileIdComments] = useState(false);

  const handleDisplayCommentSection = (postId) => {
    setDisplayCommentSection(postId === displayCommentSection ? null : postId);
  };

  const [commentsData, setCommentsData] = useState({
    postsId: "",
    userId: userId,
    postsComment: "",
  });

  const [displayPostButton, setDisplayPostButton] = useState(false);

  const handleCommentsChange = (event) => {
    if ((event.target.name = "postsComment")) {
      if (event.target.value.trim() != "") {
        setDisplayPostButton(true);
      } else {
        setDisplayPostButton(false);
      }
    }
    setCommentsData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const addPostsComments = async (pID) => {
    commentsData.postsId = pID;
    // console.log("commentsData: " + JSON.stringify(commentsData));
    try {
      const savedData = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "userPostsCommentsAdd",
        commentsData,
        cfgComments
      );
      // console.log(JSON.stringify(loginUrl));
      if (savedData.data.responseCode == "0") {
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "rgb(153, 12, 25)",
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${savedData.data.responseStatus}</p>`,
          showClass: {
            popup: "animate__animated animate__fadeInLeft",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },

          timer: 5000,

          customClass: {
            popup: "custom-swal-popup", 
          },
        });
      } else {
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "rgb(27 123 84)",
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Comment posted Successfully</p>`,
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
        // getEdDet();
        getPostsCommentsDet();
        setCommentsData((prev)=>({...prev,postsComment:''}));
        setDisplayPostButton(false);
        // commentsData.postsComment=""
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
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
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
                </div> */}

                <br />
              </div>
            </div>

            <br></br>
          </div>

          <div className="spaceDiv" style={{ width: "15px" }}></div>

          <div className="middleDiv" style={{ width: "610px" }}>
              
          <div
              className="FirstLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                border: "0.5px solid #dfdcdc",
              }}
            >
              

              <div
                style={{
                  padding: "10px 20px 5px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "19px",
                    // background:'gray'
                    // lineHeight: "35px",
                    // marginBottom: "10px",
                  }}
                >
                  People
                </label>
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
              <div
                style={{
                  padding: "0px 20px 5px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              ><label
              onClick={()=>{navigate("/People")}}
              className="showAll"
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  textAlign:'center',
                  padding:'8px 5px',
                  cursor:'pointer', 
                }}
              >
                Show all people
              </label>

                </div>
          </div>

          <br></br>

          <div className="middleDiv" style={{ width: "610px" }}>
          <div
              className="FirstLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                // border: "0.5px solid #dfdcdc",
              }}
            >
              

              <div
                style={{
                  padding: "10px 20px 5px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "19px", 
                  }}
                >
                  Posts
                </label>
                </div>
                </div>
            
           
            {postsList &&
              postsList.map((data) => (
                <div
                  className="SecondLeftSideDiv"
                  style={{
                    backgroundColor: "white",
                    BorderRadius: "5px",
                    // border: "0.5px solid #dfdcdc",
                    marginBottom: "10px",
                    height: "auto",
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
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                        }}
                      >
                        <img
                          src={data.userProfileImage}
                          style={{
                            height: "45px",
                            maxHeight: "45px",
                            minHeight: "45px",
                            width: "45px",
                            maxWidth: "45px",
                            minWidth: "45px",
                            borderRadius: "50%",
                          }}
                          alt=""
                        />
                      </div>
                      &nbsp; &nbsp;
                      <div>
                        {data.firstName &&
                          data.firstName.charAt(0).toUpperCase() +
                            data.firstName.slice(1).toLowerCase()}
                        &nbsp;
                        {data.lastName &&
                          data.lastName.charAt(0).toUpperCase() +
                            data.lastName.slice(1).toLowerCase()}
                      </div>
                    </label>

                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "15px",
                        color: "gray",
                        // whiteSpace: "preLine",
                      }}
                    >
                      {showLess &&
                        data.postDescription &&
                        "   " +
                          data.postDescription
                            .split(/\s+/)
                            .slice(0, 20)
                            .join(" ")}
                      <span
                        onClick={handleSeeMore}
                        style={{
                          cursor: "pointer",
                          color: "rgb(47 73 161)",
                          fontWeight: "600",
                        }}
                      >
                        {showLess &&
                          data.postDescription &&
                          data.postDescription.length > 100 &&
                          "...see more"}
                      </span>
                      <span>
                        {showComplete &&
                          data.postDescription &&
                          data.postDescription}
                        <span
                          onClick={handleSeeLess}
                          style={{
                            cursor: "pointer",
                            color: "rgb(47 73 161)",
                            fontWeight: "600",
                          }}
                        >
                          {showComplete &&
                            data.postDescription &&
                            data.postDescription.length > 100 &&
                            "..show less"}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      // padding: "10px 20px 10px 20px",
                      color: "var(--color-text)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img src={data.postName} />
                  </div>
                  <div
                    className="inputDataDivCJPMainPageComments"
                    style={{
                      padding: "10px 20px 10px 20px",
                      color: "var(--color-text)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* comment div  */}
                      <div
                        className="commentsArea"
                        onClick={() => {
                          handleDisplayCommentSection(data.userPostId);
                        }}
                        style={{
                          fontWeight: "600",
                          color: "--color-text",
                          lineHeight: "25px",
                          cursor: "pointer",
                          padding: "6px 8px",
                          borderRadius: "3px",
                        }}
                      >
                        <FontAwesomeIcon
                          className=""
                          style={{}}
                          icon={faComments}
                        />{" "}
                        &nbsp;
                        <label style={{ cursor: "pointer" }}>Comment</label>
                      </div>
                    </div>

                    {displayCommentSection == data.userPostId && (
                      <div style={{ margin: "6px 0" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            style={{
                              height: "35px",
                              maxHeight: "35px",
                              minHeight: "35px",
                              width: "38px",
                              maxWidth: "38px",
                              minWidth: "38px",
                              borderRadius: "50%",
                            }}
                            src={profileImage ? profileImage : Defaultprofile}
                            alt={Defaultprofile}
                            onError={handleImageError}
                          />{" "}
                          &nbsp; &nbsp;
                          <input
                            style={{
                              background: "none",
                              borderRadius: "20px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                            placeholder="Comment"
                            name="postsComment"
                            id="postsComment"
                            onChange={handleCommentsChange}
                            value={commentsData.postsComment}
                            // value={data.school}
                          />
                        </div>
                        {displayPostButton && (
                          <div style={{ margin: "8px 0 0 55px" }}>
                            <button
                              onClick={() => {
                                addPostsComments(data.userPostId);
                              }}
                              type="button"
                              className="postCommentBtn"
                            >
                              Post
                            </button>
                          </div>
                        )}
                        <br />

                        {postCommentsList &&
                          postCommentsList
                            .filter(
                              (CommentsData) =>
                                data.userPostId == CommentsData.postsId
                            )
                            .map((filteredComment) => (
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "15px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "38px",
                                    maxWidth: "38px",
                                    minWidth: "38px",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "5px",
                                  }}
                                >
                                  <img
                                    src={filteredComment.userProfileImage}
                                    style={{
                                      height: "32px",
                                      maxHeight: "32px",
                                      minHeight: "32px",
                                      width: "32px",
                                      maxWidth: "32px",
                                      minWidth: "32px",
                                      borderRadius: "50%",
                                    }}
                                    alt=""
                                  />
                                </div>
                                &nbsp; &nbsp;
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexDirection: "column",
                                    background: "#F2F2F2",
                                    width: "480px",
                                    borderRadius: "6px",
                                    padding: "0px 2px 8px 8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: "600",
                                      height: "32px",
                                      maxHeight: "32px",
                                      minHeight: "32px",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    {filteredComment.firstName &&
                                      filteredComment.firstName
                                        .charAt(0)
                                        .toUpperCase() +
                                        filteredComment.firstName
                                          .slice(1)
                                          .toLowerCase()}
                                  </div>

                                  <div
                                    style={{
                                      fontWeight: "lighter",
                                      maxWidth: "470px",
                                      wordWrap:'break-word'
                                    }}
                                    // dangerouslySetInnerHTML={{
                                    //   __html: filteredComment.postsComment
                                    //     .match(/.{1,60}|\s{1}/g)
                                    //     .join("<br>"),
                                    // }}
                                  >
                                    {filteredComment.postsComment &&  filteredComment.postsComment }
                                  </div>

                                  {/* <label style={{ 
                      fontWeight: 'lighter',  
                      alignItems: 'center',
                      display: 'flex',  
                        }} 
                        dangerouslySetInnerHTML={{ __html: filteredComment.postsComment.match(/.{1,60}/g).join("<br>") }} 
                      />     */}

                                  {/* <label style={{   }}>{filteredComment.postsComment}</label> */}
                                </div>
                              </div>
                            ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            <br></br>
          </div>

          <br></br>
          </div>

          <div className="spaceDiv" style={{ width: "15px" }}></div>

          <div className="RightSideDiv"
            style={{
              width: "280px",
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
export default UserProfiles;
