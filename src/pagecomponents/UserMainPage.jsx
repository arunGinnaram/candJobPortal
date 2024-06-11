import React, { useEffect, useState, useRef, useContext } from "react";
import Sidevavbar from "./Sidevavbar";
import "./Login.css";
import "./applicationWhole.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import {
  faCoffee,
  faCheckCircle,
  faTimesCircle,
  faDashboard,
  faChartSimple,
  faBuildingUser,
  faLandmark,
  faEnvelope,
  faHotel,
  faCircleArrowLeft,
  faPen,
  faAdd,
  faXmark,faImage,faComments
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import urlGlobal from "./application.json";

import Swal from "sweetalert2";
import { json, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import $ from "jquery";
import fileDetails from "./editProp.json";
import { languageContext } from "../App";

// import React from 'react';
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import translateLang from "../assets/images/wallpape.jpg";
import ProHd from "../assets/images/ProHd.jpg";
import Defaultprofile from  "../assets/images/Defaultprofile.jpg";
// import mainlogo from '../assets/images/mainlogo.png';

const UserMainPage = (props) => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;
  const token = sessionStorage.getItem("token");
  const fileData = fileDetails.response;
  

  const userId = sessionStorage.getItem("userId");
  const roleId = sessionStorage.getItem("roleId");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const profileImage = sessionStorage.getItem("profileImage");

  

  const [postsList,setPostsList] = useState([]);



  useEffect(()=>{  
    getEdDet();
  },[])

  const getEdDet = async () => {
    try {
      const getEdDetails = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "getPostsSaved",       
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
        if(getEdDetails.data){
          setPostsList(getEdDetails.data.response); 
        }else {

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
  } 

  const [postCommentsList,setPostCommentsList] = useState([]);

  useEffect(()=>{
    getPostsCommentsDet();
  },[])

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
      }  
        else {
          if(getEdDetails.data){
            setPostCommentsList(getEdDetails.data.response); 
          }else {
  
          }
          // setEducationList(getEdDetails.data);
          
        }
        // setEducationList(getEdDetails.data);
        
      }
    catch (error) {
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
  } 

   
const [post,setPost] = useState({
  userId:userId,
  roleId:roleId,
  postDescription:'',
  postImage:null,
});

const [file,setFile] = useState(null);
const handlePostChange = (e) => {
  if (e.target.type === "file") {  
    const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;     
    // const selectedFile = e.target.files ? e.target.files[0] : null;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    const fileType = selectedFile.type.split("/")[1];

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
       
      if (selectedFile.type == "application/pdf") {
        setPost((prevData) => ({...prevData, postImage:(`data:application/pdf;base64,`+base64String)}) ); 
        // setData((prev)=>({...prev,stamp:(`data:application/pdf;base64,` + base64String)}));           
      } else {
        setPost((prevData) => ({...prevData, postImage:(`data:Image/${fileType};base64,`+base64String)}) ); 
        // setData((prev)=>({...prev,stamp:(`data:image/${fileType};base64,` + base64String)}));           
      }
    }; 
     
        
  } else {
    // alert(e.target.value);
    setPost((prevData) => ({...prevData, [e.target.name]:e.target.value}) );
    
  } 
}


const [profilePhoto,setProfilePhoto] = useState({
  userId:userId,
  userProfileImage:'',
});

const handleUserProfileImageChange = (e) => {
  if (e.target.type === "file") {  
    const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;     
     

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    const fileType = selectedFile.type.split("/")[1];

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
       
      if (selectedFile.type == "application/pdf") {
        setProfilePhoto((prevData) => ({...prevData, userProfileImage:(`data:application/pdf;base64,`+base64String)}) ); 
                   
      } else {
        setProfilePhoto((prevData) => ({...prevData, userProfileImage:(`data:Image/${fileType};base64,`+base64String)}) ); 
             
      }
    }; 
     
        
  }

}

const saveProfileImage = async () => {
  try {
    const formData = new FormData();
     formData.append("userId",userId); 
    formData.append("userProfileImage",profilePhoto.userProfileImage);

    const savedData = await axiosInstance.post(
      "http://" + url + ":" + port + "/" + "userProfilePhotoSave",
      formData,
      cfg
    );

    // console.log("form data: " + JSON.stringify(formData));
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
        html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Saved Successfully</p>`,
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
}

   

  const [data, setData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDateMonth: "",
    startDateYear: "",
    endDateMonth: "",
    endDateYear: "",
    gradePercentage: "",
    skills: "",
    description: "",
    userId: userId,
    roleId: roleId,
  }); 

  const handleEducationEdit = () => { navigate("/CandidateEducationEdit")};

  const axiosInstance = axios.create();

  const cfg = {
    headers: {
      //  Authorization:`Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      // Accept: "application/json",
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
      console.error("Axios Err" + err);
      return Promise.reject(err);
    }
  ); 

  const handleChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validateForm = async (event) => {    
    event.preventDefault();
     
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to post?",
      showCancelButton: true,
      confirmButtonColor: "rgb(0, 72, 25)",
      cancelButtonColor: "rgb(153, 12, 25)",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      // background: 'gray',
      showClass: {
        popup: "animate__animated animate__backInLeft",
      },
      hideClass: {
        popup: "animate__animated animate__backOutRight",
      },
      customClass: {
        popup: "custom-swal-popup",
      },
    });

    if (confirmResult.isConfirmed) {
      // console.log("Databef: " + JSON.stringify(post));
  
      const formData = new FormData();
      formData.append("postDescription",post.postDescription.replace(/\n/g, '\\n'));
      formData.append("userId",userId);
      formData.append("roleId",roleId);
      formData.append("postImage",post.postImage);
      try {
        console.log("FormData contents:" + formData.toString());
        console.dir(formData); // Use console.dir to log the contents

        const savedData = await axiosInstance.post(
          "http://" + url + ":" + port + "/" + "postsData",
          formData,
          cfg
        );

        // console.log("form data: " + JSON.stringify(formData));
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
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Saved Successfully</p>`,
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
          getEdDet();
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
    }
  };

  const [showLess,setShowLess] = useState(true);
  const [showComplete,setShowComplete] = useState(false);

  const handleSeeMore = () => {
    setShowLess(false);
    setShowComplete(true);
  }


  const handleSeeLess = () => {
    setShowLess(true);
    setShowComplete(false);
  }

  const [displayCommentSection,setDisplayCommentSection] = useState(null);
  
  const [profileIdComments, setProfileIdComments] = useState(false);
  
  
  const handleDisplayCommentSection = (postId) => {    
    setDisplayCommentSection(postId === displayCommentSection ? null : postId);


  } 


  const [commentsData,setCommentsData] = useState({
    postsId:'',
    userId:userId,
    postsComment:''
  })

  const [displayPostButton,setDisplayPostButton] = useState(false);

  const handleCommentsChange = (event) => {
    if(event.target.name="postsComment"){
      if(event.target.value.trim()!=""){
        setDisplayPostButton(true);
      }else {
        setDisplayPostButton(false);
      }
    }
    setCommentsData((prev) =>({...prev , [event.target.name]:event.target.value}));
   
  }

  const addPostsComments = async (pID) => {
    commentsData.postsId=pID;
    console.log("commentsData: " + JSON.stringify(commentsData) );
    try{
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

    // timer: 5000,

    customClass: {
      popup: "custom-swal-popup", // Assign a custom class name
    },
  });
} else {
  
  Swal.fire({
    position: "top-end",
    width: "auto",
    // padding: '0',
    showConfirmButton: false,
    background: "rgb(27 123 84)",
    html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Saved Successfully</p>`,
    showClass: {
      popup: "animate__animated animate__fadeInLeft",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },

   

    customClass: {
      popup: "custom-swal-popup", // Assign a custom class name
    },
  });
  getEdDet(); 
}
    }catch (error) {
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
  }

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
                  alignItems:'center',
                // border: "0.5px solid #dfdcdc",
              }}
            >
              <Popup
                        trigger={
                          <img
                          src={profileImage?profileImage:Defaultprofile}
                          style={{
                            height: "80px",
                            maxHeight: "80px",
                            minHeight: "80px",
                            width: "80px",
                            maxWidth: "80px",
                            minWidth: "80px",
                            borderRadius: "50%",
                            cursor:'pointer'
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
                                justifyContent:'center'
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
                                <div className="" style={{display:'flex',justifyContent:'center'}}>
                                  <img
                                  src={profileImage}
                                  style={{
                                    height: "180px",
                                    maxHeight: "180px",
                                    minHeight: "180px",
                                    width: "180px",
                                    maxWidth: "180px",
                                    minWidth: "180px",
                                    borderRadius: "50%", }}

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
                                  <input type="file" accept=".jpeg,.jpg" style={{ display: "none" }} name="userProfileImage" id="userProfileImage"   onChange={handleUserProfileImageChange} />
                                  <label htmlFor="userProfileImage">
                                    <FontAwesomeIcon
                                    className="editIcon"
                                    style={{}}
                                    icon={faImage}
                                    size="lg"
                                  /></label>
                                  
                                </span>
                                <button type="button" onClick={saveProfileImage} className="saveBtn">
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Popup>
              
                   
                 


                  
                  <label  style={{
                    fontWeight:'600',
                    color: "--color-text",
                    fontSize: "16px",
                    color: "gray",
                    // lineHeight: "15px",
                    cursor:'pointer'
                  }} onClick={()=>{
                    navigate("/UserHome")
                  }} >{firstName.charAt(0).toUpperCase() +  firstName.slice(1).toLowerCase()}</label>

                   
                
                 
               
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
                // border: "0.5px solid #dfdcdc",
              }}
            >
              {/* <img
                src={translateLang}
                style={{
                  height: "250px",
                  maxHeight: "250px",
                  minHeight: "250px",
                  width: "210px",
                  maxWidth: "210px",
                  minWidth: "210px",
                  borderRadius: "5px 5px 0 0 ",
                }}
              /> */}

              <div
                style={{
                  padding: "15px 0px 15px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  // flexDirection: "column",
                  alignItems:'center'
                }}
              >
                <div style={{width:'45px', height:'45px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%'
               }}>
                <img
                     
                    src={profileImage}
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
                 <div className="inputDataDivCJPMainPage"  >
                  {/* <label>School</label> */}
                 

                  <Popup
                        trigger={
                          <input
                          style={{background:'none',borderRadius:'20px',padding:'5px 10px',cursor:'pointer'}}  
                            placeholder="Start writing or post something"
                              
                            // value={data.school}
                             
                          />
                        }
                        position="center center"
                        modal
                      >
                        {(close) => (
                          <form onSubmit={validateForm}>
                            <div
                              style={{
                                width: "750px",
                                height: "490px",
                                background: "white",
                                display: "flex",
                                border: "0.5px solid lightgray",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent:'flex-start'
                              }}
                            >
                              <div
                                style={{
                                  height: "28px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  padding: "20px 30px",
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  // borderBottom: "0.5px solid #dfdcdc",
                                  color: "var(--color-text)",
                                }}
                              >
                                 
                                   
                                  <div>
                                  {firstName && (firstName.charAt(0).toUpperCase()+firstName.slice(1).toLowerCase())}
                                  &nbsp;
                                  {lastName && (lastName.charAt(0).toUpperCase()+lastName.slice(1).toLowerCase())} 
                                  </div>
                                 

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
                              {/* <br></br> */}

                              <div
                                style={{
                                  // padding: "10px 20px",
                                  overflow: "hidden",
                                  height:'400px',
                                }}
                              >
                                <div className="" style={{margin:'0',padding:'0 0 0 20px' }}>
                                  
                                  <textarea
                                    placeholder="Start writing something."
                                    required
                                    type="text"
                                    name="postDescription"
                                    id="postDescription"
                                    value={post.postDescription}
                                    style={{height:'350px',fontSize:'20px',width:'95%',fontFamily:'inherit',padding:'5px',border:'none',outline:'none',textTransform:'capitalize' }}
                                    onChange={handlePostChange}
                                  />
                                </div>
                                <br></br>

                                 
                              </div>

                              <div
                                style={{
                                  height: "28px",
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
                                  <input type="file" style={{ display: "none" }} name="postImage" id="postImage"   onChange={handlePostChange} />
                                  <label htmlFor="postImage">
                                    <FontAwesomeIcon
                                    className="editIcon"
                                    style={{}}
                                    icon={faImage}
                                    size="lg"
                                  /></label>
                                  
                                </span>
                                <button type="submit" className="saveBtn">
                                  Post
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Popup>





                  
                </div>
                <br></br>
                 
              </div>
            </div>
            <br></br>
            { postsList && postsList.map((data) =>( 
            <div
              className="SecondLeftSideDiv"
              style={{
                backgroundColor: "white",
                BorderRadius: "5px", 
                border: "0.5px solid #dfdcdc",
                marginBottom:'10px',height:'auto'
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
                    display:'flex',
                    alignItems:'center'
                  }}
                >
                   <div style={{width:'45px', height:'45px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%'
               }}>
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
                {data.firstName && (data.firstName.charAt(0).toUpperCase()+data.firstName.slice(1).toLowerCase())}
                &nbsp;
                {data.lastName && (data.lastName.charAt(0).toUpperCase()+data.lastName.slice(1).toLowerCase())} 
                 
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
                    data.postDescription &&  (
                    "   " + data.postDescription
                    .split(/\s+/)  
                    .slice(0, 20)  
                    .join(" "))} 
                    <span onClick={handleSeeMore} style={{cursor:'pointer',color:'rgb(47 73 161)',fontWeight:'600'}}>{showLess && data.postDescription &&  data.postDescription.length>100 && "...see more"}</span>
                    <span>{(showComplete && data.postDescription) && data.postDescription}<span  onClick={handleSeeLess} style={{cursor:'pointer',color:'rgb(47 73 161)',fontWeight:'600'}}>{(showComplete && data.postDescription && data.postDescription.length>100  && "..show less")}</span></span>
                    
                      
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
                  
                <img  src={data.postName}   /> 
            
              </div>
              <div className="inputDataDivCJPMainPageComments" 
              style={{padding: "10px 20px 10px 20px",
              color: "var(--color-text)",
              display: "flex",
              flexDirection: "column",}} >
                <div style={{height:'40px',display:'flex',alignItems:'center'}}>
                  {/* comment div  */}
                  <div className="commentsArea" onClick={()=>{handleDisplayCommentSection(data.userPostId)}} style={{ fontWeight: "600",
                      color: "--color-text",
                      lineHeight: "25px",cursor:'pointer',padding:'6px 8px',borderRadius:'3px'}}>
                      <FontAwesomeIcon
                                  className=""
                                  style={{}}
                                  icon={faComments}
                      /> &nbsp;
                      <label  style={{cursor:'pointer'}} >Comment</label>
                    </div>
                 
                 </div>
                  
                {(displayCommentSection==data.userPostId) &&
                <div style={{margin:'6px 0'}}>
                  <div style={{display:'flex' ,alignItems:'center' }}> 
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

                    src={profileImage?profileImage:Defaultprofile}
                          alt={Defaultprofile}
                          onError={handleImageError}

                    
                  /> &nbsp; &nbsp;
                    <input
                          style={{background:'none',borderRadius:'20px',padding:'5px 10px',cursor:'pointer'}}  
                            placeholder="Comment"
                              name="postsComment"
                              id="postsComment"
                              onChange={handleCommentsChange}
                            // value={data.school}
                              
                          />

                  
                  </div>   
                  {displayPostButton && 
                  <div style={{margin:'8px 0 0 55px'}}>
                    <button onClick={()=>{addPostsComments(data.userPostId)}}  type="button" className="postCommentBtn">
                    Post</button> 
                  </div>  }
                  <br />

                  {postCommentsList && 
                  postCommentsList
                  .filter((CommentsData)=> data.userPostId==CommentsData.postsId)
                  .map((filteredComment) => (
                    <div style={{display:'flex',marginBottom:'15px' }}> 
                               
                    <div style={{ width: "38px",
                            maxWidth: "38px",
                                minWidth: "38px",display:'flex',justifyContent:'center',paddingTop:'5px'  }}> 
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
                    <div style={{display:'flex' , justifyContent:'flex-start',flexDirection:'column',background:'#F2F2F2',width:'480px',borderRadius:'6px',padding:'0px 2px 8px 8px'  }}>
                      <div style={{fontWeight:'600',height: "32px",
                          maxHeight: "32px",
                          minHeight: "32px",
                          alignItems:'center' ,display:'flex'    }}>
                            {filteredComment.firstName && filteredComment.firstName.charAt(0).toUpperCase() + filteredComment.firstName.slice(1).toLowerCase()}
                      </div>

                      
                  
                    
                      <div
                        style={{
                          fontWeight: 'lighter',
                          maxWidth: '470px',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: filteredComment.postsComment.match(/.{1,60}|\s{1}/g).join("<br>")
                        }}
                      >
                        {/* {filteredComment.postsComment &&  filteredComment.postsComment } */}
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
                     
                  ))
                  }             
                </div>
                 }
              </div>
              
             
              

            </div>
           
          
          )) }

            <br></br>
            

          
          </div>

          <div className="spaceDiv" style={{ width: "15px" }}></div>
           

          <div
            className="RightSideDiv"
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
export default UserMainPage;
