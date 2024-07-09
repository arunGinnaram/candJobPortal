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
 
const People = () => {
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
    
      handleSearch();
      
    
  }, []); 

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

  const handleSearch = async () => {
    // if(e.key=="Enter"){
    //   let skill = e.target.value;
    //   let skillName = skill?skill.toLowerCase().trim():''; 
    try {
      const getEdDetails = await axiosInstance.get(
        "http://" +
          url +
          ":" +
          port +
          "/" +
          "getAllUsersByPagination?pageSize=20&&pageNumber=0", 
        cfg
      );
      console.log("paginatio data: " + JSON.stringify(getEdDetails));
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
                setUserBasicDetails(getEdDetails.data.response.content);  
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

  const validateJoin = async (toId) => { 
    try {
      const savedData = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "notificationsSave",
        {
        description:'You received a join request',
        createdBy:userId,
        createdTo:toId, 
        notificationTypeId:1,
        },
        cfg
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

          // timer: 5000,

          customClass: {
            popup: "custom-swal-popup", // Assign a custom class name
          },
        });
      } else {
        // alert(loginUrl.data.userId + "::" + loginUrl.data.roleId);
        // const userId =  "";
        // const roleId = "";
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "rgb(27 123 84)",
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Join request sent successfully</p>`,
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
        handleSearch();
        // getEdDet();
        // navigate("/UserHome",{userId,roleId});
      }
    } catch (error) {
      console.log("error : " + error);
      // if (error.response && error.response.data) {
      // const errorMap = error.response.data;
      // const errorMessage = Object.keys(errorMap)
      //   .map(field => `${errorMap[field]}<br>`)
      //   .join('');
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
      // } else {
      //   // Handle other types of errors (network error, etc.)
      //   // You can display a generic error message or handle it differently
      //   console.error("An unexpected error occurred:", error);
      // }
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
           

          <div className="LeftSideDiv" style={{ width: "840px" }}>
              
          <div className="FirstLeftSideDiv"
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
                {/* <label
                  style={{
                    fontWeight: "600",
                    fontSize: "19px",
                    // background:'gray'
                    // lineHeight: "35px",
                    // marginBottom: "10px",
                  }}
                >
                  People
                </label> */}
                <div style={{display:'flex',flexWrap: "wrap",width:'100%',justifyContent:'flex-start'  }}>

              
                {userBasicDetails &&
                   userBasicDetails.map((value) => (
                    <div 
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // borderBottom: "0.5px solid #dfdcdc",
                      padding: "5px 0",
                      width:'25%', 
                      minWidth:'25%', 
                      maxWidth:'25%', 
                      // background:'red',
                      justifyContent:'center'  ,
                     
                    }}
                    >
                    <div  
                      style={{
                        display: "flex",
                        flexDirection: "column", 
                        // background:'lightgray',
                        width:'90%',
                        minWidth:'90%', 
                        maxWidth:'90%', 
                        // margin:'0 5%',
                        //  boxShadow:'1px 2px 4px rgb(0,0,0,0.1)',
                         backgroundColor: "white",
                        borderRadius: "5px",
                        border: '0.1px solid rgb(224 221 221)',
                      }}
                    >
                      <div style={{ display: "flex",flexDirection:'column'  }}>
                        <div style={{ paddingTop: "10px",textAlign:'center' }}>
                          <img
                            style={{
                              height: "97px",
                              maxHeight: "97px",
                              minHeight: "97px",
                              width: "98px",
                              maxWidth: "98px",
                              minWidth: "98px",
                              borderRadius: "50%",
                              border:'0.1px solid lightgray'
                            }}
                            src={
                              value.userImage
                                ? value.userImage
                                : Defaultprofile
                            }
                            alt={Defaultprofile}
                            onError={handleImageError}
                          />{" "}
                        </div>  
                        <div
                          style={{ display: "flex", flexDirection: "column",textAlign:'center'   }}
                        >
                          <label
                            style={{
                              fontWeight: "600",
                              color: "--color-text",
                              lineHeight: "25px",
                            }}
                          >
                             
                             
                            {value.firstName &&
                              value.firstName.charAt(0).toUpperCase() +
                              value.firstName.slice(1).toLowerCase()}  &nbsp;
                              {value.lastName &&
                              value.lastName.charAt(0).toUpperCase() +
                              value.lastName.slice(1).toLowerCase()}
                          </label>
                         
                          <label
                            style={{
                              color: "--color-text",
                              fontSize: "14px",
                              color: "gray",
                              // lineHeight: "30px",
                              maxHeight:'40px',
                              minHeight:'40px',
                              display:'flex',justifyContent:'flex-start',flexDirection:'column'
                            }}
                          >
                           <span>
                            { value.experienceDesignation &&
                               value.experienceDesignation.charAt(0).toUpperCase() +
                               value.experienceDesignation.slice(1).toLowerCase()}
                               </span>

                          <span>
                            {value.educationDegree &&
                               value.educationDegree.charAt(0).toUpperCase() +
                               value.educationDegree.slice(1).toLowerCase()}  </span>
                         
                          </label>

                           



                          <br /> 
                       
                          {value.notificationId &&  value.createdTo && value.notificationTypeId?
                          <div
                          style={{
                            color: "gray",
                            // color: "rgb(33, 150, 243)",
                            // fontSize: "14px",
                            // color: "gray",
                            // lineHeight: "20px",
                            fontWeight:'400', 
                            background:'whitesmoke',
                            padding:'5px 0',
                            borderRadius: "0px 0 5px 5px", 
                            // outline:'1px solid rgb(33, 150, 243)'
                            //  boxShadow:'1px 2px 4px rgb(0,0,0,0.1)',
                            // border: '0.1px solid rgb(224 221 221)',
                          }}
                          // onClick={()=>{validateJoin(value.userId)}}
                        >
                          Request sent
                           
                        </div> :
                        <div
                        className="joinRequest"
                        style={{
                          cursor:'pointer',
                          color: "white",
                          // fontSize: "14px",
                          // color: "gray",
                          // lineHeight: "20px",
                          fontWeight:'600',
                          background:'#2196F3',
                          padding:'5px 0', 
                          borderRadius: "0px 0 5px 5px",
                          // boxShadow:'1px 2px 4px rgb(0,0,0,0.1)',
                          // border: '0.1px solid rgb(224 221 221)',
                        }}
                        onClick={()=>{validateJoin(value.userId)}}
                      >
                        Join
                         
                      </div>
                          }
                          

                          


                        </div>
                      </div> 
                    </div>

                    

                    </div>
                  ))} 
                    </div>
                  
              </div>
              
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
export default People;
