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
  faMagnifyingGlass,
  faAdd,
  faXmark,
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
// import mainlogo from '../assets/images/mainlogo.png';

const UserHome = (props) => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;
  const token = sessionStorage.getItem("token");
  const fileData = fileDetails.response;

  const userId = sessionStorage.getItem("userId");
  const roleId = sessionStorage.getItem("roleId");

  const [educationList, setEducationList] = useState([]);
  const [eduAllSkillsList, setEduAllSkillsList] = useState([]);
  const [eduFilteredSkillsList, setEduFilteredSkillsList] = useState([]);

  //experience related skills
  const [expFilteredSkillsList, setExpFilteredSkillsList] = useState([]);

  const [otherSkills, setOtherSkills] = useState([]);

  useEffect(() => {
    getEdDet();
  }, []);

  const getEdDet = async () => {
    try {
      let getEdDetails = await axiosInstance.post(
        "http://" +
          url +
          ":" +
          port +
          "/" +
          "getcandidateEducationDetails?userId=" +
          userId,
        cfg
      );

      console.log("da: " + JSON.stringify(getEdDetails));
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
              setEducationList(getEdDetails.data.response);
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
  };

  useEffect(() => {
    getAllEduSkills();
  }, []);

  const getAllEduSkills = async () => {
    try {
      const getEdDetails = await axiosInstance.get(
        "http://" + url + ":" + port + "/" + "getAllEduSkills",
        cfg
      );

      console.log("ddefrgta: " + JSON.stringify(getEdDetails));
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
        setEduAllSkillsList(getEdDetails.data);
        // alert(loginUrl.data.userId + "::" + loginUrl.data.roleId);
        // const userId =  "";
        // const roleId = "";
        // Swal.fire({
        //   position: "top-end",
        //   width: "auto",
        //   // padding: '0',
        //   showConfirmButton: false,
        //   background: "rgb(27 123 84)",
        //   html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Saved Successfully</p>`,
        //   showClass: {
        //     popup: "animate__animated animate__fadeInLeft",
        //   },
        //   hideClass: {
        //     popup: "animate__animated animate__fadeOutUp",
        //   },

        //   // timer: 5000,

        //   customClass: {
        //     popup: "custom-swal-popup", // Assign a custom class name
        //   },
        // });

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

  let { state } = useLocation();

  console.log(parseInt(userId));

  const [data, setData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDateMonth: "",
    startDateYear: "",
    endDateMonth: "",
    endDateYear: "",
    gradePercentage: "",
    skills: [],
    otherSkills: [],
    description: "",
    userId: userId,
    roleId: roleId,
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const saveEducation = () => {};

  const handleEducationAdd = () => {
    // navigate("/Educationdetails");
  };

  const handleEducationEdit = () => {
    navigate("/CandidateEducationEdit");
  };

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

  // const userId = sessionStorage.getItem("userId");

  const getDataEdit = async () => {
    try {
      const getDataById = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "editProperty",
        {
          propertyId: "",
        },
        cfg
      );
    } catch (error) {
      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "#D0342C",
        html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Server error</p>`,
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
  };

  const handleChange = (event) => {
    if (event.target.name == "skills") {
      // setCurrentSkill(event.target.value);
      if (event.target.value.trim() == "") {
        setEduFilteredSkillsList([]);
      } else {
        setEduFilteredSkillsList(
          eduAllSkillsList.filter((skill) =>
            skill.skill.startsWith(event.target.value.toLowerCase())
          )
        );
      }
    } else {
      setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }
  };

  const handleKeyDown = (event) => {
    // if(event.target.name=="skills" && event.key=="Enter" && currentSkill.trim()!=""){
    //   setData((prev)=>({...prev ,skills:[...prev.skills,currentSkill.trim()]}));
    //   setCurrentSkill("");
    // }else

    if (
      event.target.name == "otherSkills" &&
      event.key == "Enter" &&
      event.target.value.trim() !== ""
    ) {
      const newSkill = event.target.value.trim();
      setData((prev) => ({
        ...prev,
        otherSkills: [...prev.otherSkills, newSkill],
      }));
      event.target.value = "";
    }

    if (
      event.target.name == "workOtherSkills" &&
      event.key == "Enter" &&
      event.target.value.trim() !== ""
    ) {
      const newWorkSkill = event.target.value.trim();
      setDataExperience((prev) => ({
        ...prev,
        workOtherSkills: [...prev.workOtherSkills, newWorkSkill],
      }));
      event.target.value = "";
    }
  };

  const handleSkillValue = (event) => {
    const skillValue = event.currentTarget.getAttribute("data-skill");
    // alert(skillValue);
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillValue.trim()],
    }));
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to save?",
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
      console.log("Databef: " + JSON.stringify(data));
      try {
        const savedData = await axiosInstance.post(
          "http://" + url + ":" + port + "/" + "candidateEducationSave",
          data,
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

  const [dataExperience, setDataExperience] = useState({
    designation: "",
    workType: "",
    company: "",
    workLocation: "",
    workCity: "",
    currentlyWorkHere: "",
    workStartDateMonth: "",
    workStartDateYear: "",
    workEndDateMonth: "",
    workEndDateYear: "",
    workSkills: [],
    workOtherSkills: [],
    description: "",
    userId: userId,
    roleId: roleId,
  });

  const handleChangeExperience = (event) => {
    if (event.target.name == "workSkills") {
      if (event.target.value.trim() == "") {
        setExpFilteredSkillsList([]);
      } else {
        setExpFilteredSkillsList(
          eduAllSkillsList.filter((skill) =>
            skill.skill.startsWith(event.target.value.toLowerCase())
          )
        );
      }
    } else {
      setDataExperience((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSkillValueExp = (event) => {
    const workSkillValue = event.currentTarget.getAttribute("data-workSkill");
    setDataExperience((prev) => ({
      ...prev,
      workSkills: [...prev.workSkills, workSkillValue.trim()],
    }));
  };

  const validateFormExperience = async (event) => {
    event.preventDefault();

    console.log("Databef: " + JSON.stringify(data));
    try {
      const savedData = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "candidateExperienceSave",
        dataExperience,
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
            <div
              className="FirstLeftSideDiv"
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                // border: "0.5px solid #dfdcdc",
              }}
            >
              <img
                src={translateLang}
                style={{
                  height: "250px",
                  maxHeight: "250px",
                  minHeight: "250px",
                  width: "840px",
                  maxWidth: "840px",
                  minWidth: "840px",
                  borderRadius: "5px 5px 0 0 ",
                }}
              />

              <div
                style={{
                  padding: "10px 0 10px 20px",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    lineHeight: "35px",
                  }}
                >
                  G Arun Kumar{" "}
                </label>
                <label style={{ color: "--color-text", lineHeight: "25px" }}>
                  Fullstack Developer @ Temp En Private Limited
                </label>
                <label
                  style={{
                    color: "--color-text",
                    fontSize: "14px",
                    color: "gray",
                    lineHeight: "25px",
                  }}
                >
                  Hyderabad, Telangana, India &nbsp;
                  <span style={{ color: "#0a66c2", fontWeight: "bold" }}>
                    Contact info
                  </span>
                </label>
              </div>
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
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Experience</span>
                  <span>
                    <span
                      className="editIconPen"
                      style={{ borderRadius: "50%", padding: "3px 7px " }}
                      // onClick={togglePopup}
                    >
                      <Popup
                        trigger={
                          <FontAwesomeIcon
                            className="editIcon"
                            style={{}}
                            icon={faAdd}
                          />
                        }
                        position="center center"
                        modal
                        open={false}
                      >
                        {(close) => (
                          <form>
                            {/* onSubmit={validateForm} */}
                            <div
                              style={{
                                width: "750px",
                                height: "500px",
                                background: "white",
                                display: "flex",
                                border: "0.5px solid lightgray",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
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
                                <div>Add Experience</div>

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
                                <div className="inputDataDivCJP">
                                  <label>Designation <span style={{fontSize:'90%'}}>(Appears at top of your profile)</span></label>
                                  <input
                                    required
                                    type="text"
                                    name="designation"
                                    id="designation"
                                    value={dataExperience.designation}
                                    onChange={handleChangeExperience}
                                  />
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP inputDataDivCJPExp">
                                  <label>Work type</label>
                                  <select
                                    name="workType"
                                    id="workType"
                                    value={dataExperience.workType}
                                    onChange={handleChangeExperience}
                                  >
                                    <option value="">Select</option>
                                    <option value="full time">Full time</option>
                                    <option value="part time">Part time</option>
                                    <option value="freelancer">
                                      Freelancer
                                    </option>
                                    <option value="intern">Intern</option>
                                    <option value="trainee">Trainee</option>
                                    <option value="self worker">
                                      Self worker
                                    </option>
                                  </select>
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Company</label>
                                  <input
                                    required
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={dataExperience.company}
                                    onChange={handleChangeExperience}
                                  />
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJP"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "96%",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <label>Work location</label>
                                    <select
                                      name="workLocation"
                                      id="workLocation"
                                      value={dataExperience.workLocation}
                                      onChange={handleChangeExperience}
                                    >
                                      <option value="">Select</option>
                                      <option value="office">Office</option>
                                      <option value="remote">Remote</option>
                                      <option value="hybrid">Hybrid</option>
                                    </select>
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <label>Work city</label>
                                    <select
                                      required
                                      type="text"
                                      name="workCity"
                                      id="workCity"
                                      value={dataExperience.workCity}
                                      onChange={handleChangeExperience}
                                    >
                                      <option value="">Select</option>
                                      <option value="Andhra Pradesh">
                                        Andhra Pradesh
                                      </option>
                                      <option value="Arunachal Pradesh">
                                        Arunachal Pradesh
                                      </option>
                                      <option value="Assam">Assam</option>
                                      <option value="Bihar">Bihar</option>
                                      <option value="Chhattisgarh">
                                        Chhattisgarh
                                      </option>
                                      <option value="Goa">Goa</option>
                                      <option value="Gujarat">Gujarat</option>
                                      <option value="Haryana">Haryana</option>
                                      <option value="Himachal Pradesh">
                                        Himachal Pradesh
                                      </option>
                                      <option value="Jharkhand">
                                        Jharkhand
                                      </option>
                                      <option value="Karnataka">
                                        Karnataka
                                      </option>
                                      <option value="Kerala">Kerala</option>
                                      <option value="Madhya Pradesh">
                                        Madhya Pradesh
                                      </option>
                                      <option value="Maharashtra">
                                        Maharashtra
                                      </option>
                                      <option value="Manipur">Manipur</option>
                                      <option value="Meghalaya">
                                        Meghalaya
                                      </option>
                                      <option value="Mizoram">Mizoram</option>
                                      <option value="Nagaland">Nagaland</option>
                                      <option value="Odisha">Odisha</option>
                                      <option value="Punjab">Punjab</option>
                                      <option value="Rajasthan">
                                        Rajasthan
                                      </option>
                                      <option value="Sikkim">Sikkim</option>
                                      <option value="Tamil Nadu">
                                        Tamil Nadu
                                      </option>
                                      <option value="Telangana">
                                        Telangana
                                      </option>
                                      <option value="Tripura">Tripura</option>
                                      <option value="Uttar Pradesh">
                                        Uttar Pradesh
                                      </option>
                                      <option value="Uttarakhand">
                                        Uttarakhand
                                      </option>
                                      <option value="West Bengal">
                                        West Bengal
                                      </option>
                                      <option value="Andaman and Nicobar Islands">
                                        Andaman and Nicobar Islands
                                      </option>
                                      <option value="Chandigarh">
                                        Chandigarh
                                      </option>
                                      <option value="Dadra and Nagar Haveli and Daman and Diu">
                                        Dadra and Nagar Haveli and Daman and Diu
                                      </option>
                                      <option value="Lakshadweep">
                                        Lakshadweep
                                      </option>
                                      <option value="Delhi">Delhi</option>
                                      <option value="Puducherry">
                                        Puducherry
                                      </option>
                                      <option value="Ladakh">Ladakh</option>
                                      <option value="Jammu and Kashmir">
                                        Jammu and Kashmir
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP inputDataDivCJPExp">
                                  <label>Currently work here</label>
                                  <select
                                    name="currentlyWorkHere"
                                    id="currentlyWorkHere"
                                    value={dataExperience.currentlyWorkHere}
                                    onChange={handleChangeExperience}
                                  >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                  </select>
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJP"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "96%",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <label>Start date (Month)</label>
                                    <select
                                      required
                                      type="text"
                                      name="workStartDateMonth"
                                      id="workStartDateMonth"
                                      value={dataExperience.workStartDateMonth}
                                      onChange={handleChangeExperience}
                                    >
                                      {" "}
                                      <option value="">Month</option>
                                      <option value="1">January</option>
                                      <option value="2">February</option>
                                      <option value="3">March</option>
                                      <option value="4">April</option>
                                      <option value="5">May</option>
                                      <option value="6">June</option>
                                      <option value="7">July</option>
                                      <option value="8">August</option>
                                      <option value="9">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </select>
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <label>Start date (Year)</label>
                                    <select
                                      required
                                      type="text"
                                      name="workStartDateYear"
                                      id="workStartDateYear"
                                      value={dataExperience.workStartDateYear}
                                      onChange={handleChangeExperience}
                                    >
                                      <option value="">Year</option>
                                      <option value="2024">2024</option>
                                      <option value="2023">2023</option>
                                      <option value="2022">2022</option>
                                      <option value="2021">2021</option>
                                      <option value="2020">2020</option>
                                      <option value="2019">2019</option>
                                      <option value="2018">2018</option>
                                      <option value="2017">2017</option>
                                      <option value="2016">2016</option>
                                      <option value="2015">2015</option>
                                      <option value="2014">2014</option>
                                      <option value="2013">2013</option>
                                      <option value="2012">2012</option>
                                      <option value="2011">2011</option>
                                      <option value="2010">2010</option>
                                      <option value="2009">2009</option>
                                      <option value="2008">2008</option>
                                      <option value="2007">2007</option>
                                      <option value="2006">2006</option>
                                      <option value="2005">2005</option>
                                      <option value="2004">2004</option>
                                      <option value="2003">2003</option>
                                      <option value="2002">2002</option>
                                      <option value="2001">2001</option>
                                      <option value="2000">2000</option>
                                      <option value="1999">1999</option>
                                      <option value="1998">1998</option>
                                      <option value="1997">1997</option>
                                      <option value="1996">1996</option>
                                      <option value="1995">1995</option>
                                      <option value="1994">1994</option>
                                      <option value="1993">1993</option>
                                      <option value="1992">1992</option>
                                      <option value="1991">1991</option>
                                      <option value="1990">1990</option>
                                      <option value="1989">1989</option>
                                      <option value="1988">1988</option>
                                      <option value="1987">1987</option>
                                      <option value="1986">1986</option>
                                      <option value="1985">1985</option>
                                      <option value="1984">1984</option>
                                      <option value="1983">1983</option>
                                      <option value="1982">1982</option>
                                      <option value="1981">1981</option>
                                      <option value="1980">1980</option>
                                      <option value="1979">1979</option>
                                      <option value="1978">1978</option>
                                      <option value="1977">1977</option>
                                      <option value="1976">1976</option>
                                      <option value="1975">1975</option>
                                      <option value="1974">1974</option>
                                      <option value="1973">1973</option>
                                      <option value="1972">1972</option>
                                      <option value="1971">1971</option>
                                      <option value="1970">1970</option>
                                    </select>
                                  </div>
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJP"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "96%",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <label>End date (Month)</label>
                                    <select
                                      required
                                      type="text"
                                      name="workEndDateMonth"
                                      id="workEndDateMonth"
                                      value={dataExperience.workEndDateMonth}
                                      onChange={handleChangeExperience}
                                    >
                                      <option value="">Month</option>
                                      <option value="1">January</option>
                                      <option value="2">February</option>
                                      <option value="3">March</option>
                                      <option value="4">April</option>
                                      <option value="5">May</option>
                                      <option value="6">June</option>
                                      <option value="7">July</option>
                                      <option value="8">August</option>
                                      <option value="9">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </select>
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <label>End date (Year)</label>
                                    <select
                                      required
                                      type="text"
                                      name="workEndDateYear"
                                      id="workEndDateYear"
                                      value={dataExperience.workEndDateYear}
                                      onChange={handleChangeExperience}
                                    >
                                      <option value="">Year</option>
                                      <option value="2024">2024</option>
                                      <option value="2023">2023</option>
                                      <option value="2022">2022</option>
                                      <option value="2021">2021</option>
                                      <option value="2020">2020</option>
                                      <option value="2019">2019</option>
                                      <option value="2018">2018</option>
                                      <option value="2017">2017</option>
                                      <option value="2016">2016</option>
                                      <option value="2015">2015</option>
                                      <option value="2014">2014</option>
                                      <option value="2013">2013</option>
                                      <option value="2012">2012</option>
                                      <option value="2011">2011</option>
                                      <option value="2010">2010</option>
                                      <option value="2009">2009</option>
                                      <option value="2008">2008</option>
                                      <option value="2007">2007</option>
                                      <option value="2006">2006</option>
                                      <option value="2005">2005</option>
                                      <option value="2004">2004</option>
                                      <option value="2003">2003</option>
                                      <option value="2002">2002</option>
                                      <option value="2001">2001</option>
                                      <option value="2000">2000</option>
                                      <option value="1999">1999</option>
                                      <option value="1998">1998</option>
                                      <option value="1997">1997</option>
                                      <option value="1996">1996</option>
                                      <option value="1995">1995</option>
                                      <option value="1994">1994</option>
                                      <option value="1993">1993</option>
                                      <option value="1992">1992</option>
                                      <option value="1991">1991</option>
                                      <option value="1990">1990</option>
                                      <option value="1989">1989</option>
                                      <option value="1988">1988</option>
                                      <option value="1987">1987</option>
                                      <option value="1986">1986</option>
                                      <option value="1985">1985</option>
                                      <option value="1984">1984</option>
                                      <option value="1983">1983</option>
                                      <option value="1982">1982</option>
                                      <option value="1981">1981</option>
                                      <option value="1980">1980</option>
                                      <option value="1979">1979</option>
                                      <option value="1978">1978</option>
                                      <option value="1977">1977</option>
                                      <option value="1976">1976</option>
                                      <option value="1975">1975</option>
                                      <option value="1974">1974</option>
                                      <option value="1973">1973</option>
                                      <option value="1972">1972</option>
                                      <option value="1971">1971</option>
                                      <option value="1970">1970</option>
                                    </select>
                                  </div>
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Skills</label>
                                  <input
                                    required
                                    type="text"
                                    // value={data.skills}
                                    name="workSkills"
                                    id="workSkills"
                                    onChange={handleChangeExperience}
                                    // onKeyDown={handleKeyDown}
                                  />

                                  {expFilteredSkillsList &&
                                    expFilteredSkillsList.map((data) => (
                                      <div
                                        data-workSkill={data.skillId}
                                        onClick={handleSkillValueExp}
                                        className="skillsDisplayList"
                                        style={{
                                          lineHeight: "35px",
                                          border: "none",
                                          width: "90.5%",
                                          color: "#7b7a7a",
                                          boxShadow:
                                            "0 1px 1px rgba(0, 0, 0, 0.1)",
                                          cursor: "pointer",
                                          paddingLeft: "5px",
                                        }}
                                      >
                                        {data.skill}
                                      </div>
                                    ))}
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJPss"
                                  style={{
                                    display: "flex",
                                    width: "650px",
                                    maxWidth: "650px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {eduAllSkillsList &&
                                    eduAllSkillsList
                                      .filter((item) =>
                                        dataExperience.workSkills.some(
                                          (value) => value == item.skillId
                                        )
                                      )
                                      .map((v) => (
                                        <div
                                          style={{
                                            width: "auto",
                                            border: "none",
                                            borderRadius: "3px",
                                            color: "#7b7a7a",
                                            boxShadow:
                                              "0 1px 1px rgba(0, 0, 0, 0.1)",
                                            padding: "3px 4px",
                                            color: "#ffffff",
                                            cursor: "pointer",
                                            paddingLeft: "5px",
                                            marginRight: "8px",
                                            background: "#5352b3",
                                            fontSize: "15px",
                                            marginBottom: "8px",
                                            letterSpacing: "0.8px",
                                          }}
                                        >
                                          {v.skill &&
                                            v.skill.charAt(0).toUpperCase() +
                                              v.skill.slice(1).toLowerCase()}
                                        </div>
                                      ))}
                                  {/* <br></br> */}
                                </div>
                                {/* */}

                                <div className="inputDataDivCJP">
                                  <label>Other skills</label>
                                  <input
                                    required
                                    type="text"
                                    // value={data.skills}
                                    name="workOtherSkills"
                                    id="workOtherSkills"
                                    // onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                  />
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJPss"
                                  style={{
                                    display: "flex",
                                    width: "650px",
                                    maxWidth: "650px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {dataExperience.workOtherSkills &&
                                    dataExperience.workOtherSkills.map((v) => (
                                      <div
                                        style={{
                                          width: "auto",
                                          border: "none",
                                          borderRadius: "3px",
                                          color: "#7b7a7a",
                                          boxShadow:
                                            "0 1px 1px rgba(0, 0, 0, 0.1)",
                                          padding: "3px 4px",
                                          color: "#ffffff",
                                          cursor: "pointer",
                                          paddingLeft: "5px",
                                          marginRight: "8px",
                                          background: "#5352b3",
                                          fontSize: "15px",
                                          marginBottom: "8px",
                                          letterSpacing: "0.8px",
                                        }}
                                      >
                                        {v &&
                                          v.charAt(0).toUpperCase() +
                                            v.slice(1).toLowerCase()}
                                      </div>
                                    ))}
                                </div>

                                <div className="inputDataDivCJP">
                                  <label>Description</label>
                                  <textarea
                                    required
                                    rows="5"
                                    type="text"
                                    value={dataExperience.description}
                                    name="description"
                                    id="description"
                                    onChange={handleChangeExperience}
                                  />
                                </div>
                                <br></br>
                              </div>

                              <div
                                style={{
                                  height: "28px",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "row",
                                  padding: "10px 20px",
                                  border: "0.5px solid #dfdcdc",
                                  // color: "var(--color-text)",
                                }}
                              >
                                <button
                                  type="button"
                                  className="saveBtn"
                                  onClick={validateFormExperience}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Popup>
                    </span>{" "}
                    &nbsp;
                    <span
                      className="editIconPen"
                      style={{ borderRadius: "50%", padding: "3px 7px " }}
                      onClick={handleEducationEdit}
                    >
                      <FontAwesomeIcon
                        className="editIcon"
                        style={{}}
                        icon={faPen}
                      />
                    </span>
                  </span>
                </label>
                {educationList.map((item, index) => (
                  <div
                    key={index}
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
                      {item.school}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.fieldOfStudy}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.startDateMonth}/{item.startDateYear} -{" "}
                      {item.endDateMonth}/{item.endDateYear}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.gradePercentage}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.skills}
                    </label>
                    <br />
                  </div>
                ))}

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
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "35px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Education</span>
                  <span>
                    <span
                      className="editIconPen"
                      style={{ borderRadius: "50%", padding: "3px 7px " }}
                      // onClick={togglePopup}
                    >
                      <Popup
                        trigger={
                          <FontAwesomeIcon
                            className="editIcon"
                            style={{}}
                            icon={faAdd}
                          />
                        }
                        position="center center"
                        modal
                        open={false}
                      >
                        {(close) => (
                          <form>
                            {/* onSubmit={validateForm} */}
                            <div
                              style={{
                                width: "750px",
                                height: "500px",
                                background: "white",
                                display: "flex",
                                border: "0.5px solid lightgray",
                                borderRadius: "5px",
                                display: "flex",
                                flexDirection: "column",
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
                                <div>Add Education</div>

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
                                <div className="inputDataDivCJP">
                                  <label>School</label>
                                  <input
                                    required
                                    type="text"
                                    name="school"
                                    id="school"
                                    value={data.school}
                                    onChange={handleChange}
                                  />
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Degree</label>
                                  <input
                                    required
                                    type="text"
                                    name="degree"
                                    id="degree"
                                    value={data.degree}
                                    onChange={handleChange}
                                  />
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Field of study</label>
                                  <input
                                    required
                                    type="text"
                                    name="fieldOfStudy"
                                    id="fieldOfStudy"
                                    value={data.fieldOfStudy}
                                    onChange={handleChange}
                                  />
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJP"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "96%",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <label>Start date (Month)</label>
                                    <select
                                      required
                                      type="text"
                                      name="startDateMonth"
                                      id="startDateMonth"
                                      onChange={handleChange}
                                    >
                                      {" "}
                                      <option value="">Month</option>
                                      <option value="1">January</option>
                                      <option value="2">February</option>
                                      <option value="3">March</option>
                                      <option value="4">April</option>
                                      <option value="5">May</option>
                                      <option value="6">June</option>
                                      <option value="7">July</option>
                                      <option value="8">August</option>
                                      <option value="9">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </select>
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <label>Start date (Year)</label>
                                    <select
                                      required
                                      type="text"
                                      name="startDateYear"
                                      id="startDateYear"
                                      style={{}}
                                      onChange={handleChange}
                                    >
                                      <option value="">Year</option>
                                      <option value="2024">2024</option>
                                      <option value="2023">2023</option>
                                      <option value="2022">2022</option>
                                      <option value="2021">2021</option>
                                      <option value="2020">2020</option>
                                      <option value="2019">2019</option>
                                      <option value="2018">2018</option>
                                      <option value="2017">2017</option>
                                      <option value="2016">2016</option>
                                      <option value="2015">2015</option>
                                      <option value="2014">2014</option>
                                      <option value="2013">2013</option>
                                      <option value="2012">2012</option>
                                      <option value="2011">2011</option>
                                      <option value="2010">2010</option>
                                      <option value="2009">2009</option>
                                      <option value="2008">2008</option>
                                      <option value="2007">2007</option>
                                      <option value="2006">2006</option>
                                      <option value="2005">2005</option>
                                      <option value="2004">2004</option>
                                      <option value="2003">2003</option>
                                      <option value="2002">2002</option>
                                      <option value="2001">2001</option>
                                      <option value="2000">2000</option>
                                      <option value="1999">1999</option>
                                      <option value="1998">1998</option>
                                      <option value="1997">1997</option>
                                      <option value="1996">1996</option>
                                      <option value="1995">1995</option>
                                      <option value="1994">1994</option>
                                      <option value="1993">1993</option>
                                      <option value="1992">1992</option>
                                      <option value="1991">1991</option>
                                      <option value="1990">1990</option>
                                      <option value="1989">1989</option>
                                      <option value="1988">1988</option>
                                      <option value="1987">1987</option>
                                      <option value="1986">1986</option>
                                      <option value="1985">1985</option>
                                      <option value="1984">1984</option>
                                      <option value="1983">1983</option>
                                      <option value="1982">1982</option>
                                      <option value="1981">1981</option>
                                      <option value="1980">1980</option>
                                      <option value="1979">1979</option>
                                      <option value="1978">1978</option>
                                      <option value="1977">1977</option>
                                      <option value="1976">1976</option>
                                      <option value="1975">1975</option>
                                      <option value="1974">1974</option>
                                      <option value="1973">1973</option>
                                      <option value="1972">1972</option>
                                      <option value="1971">1971</option>
                                      <option value="1970">1970</option>
                                    </select>
                                  </div>
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJP"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "96%",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <label>End date (Month)</label>
                                    <select
                                      required
                                      type="text"
                                      name="endDateMonth"
                                      id="endDateMonth"
                                      onChange={handleChange}
                                    >
                                      <option value="">Month</option>
                                      <option value="1">January</option>
                                      <option value="2">February</option>
                                      <option value="3">March</option>
                                      <option value="4">April</option>
                                      <option value="5">May</option>
                                      <option value="6">June</option>
                                      <option value="7">July</option>
                                      <option value="8">August</option>
                                      <option value="9">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </select>
                                  </div>

                                  <div style={{ width: "50%" }}>
                                    <label>End date (Year)</label>
                                    <select
                                      required
                                      type="text"
                                      name="endDateYear"
                                      id="endDateYear"
                                      style={{}}
                                      onChange={handleChange}
                                    >
                                      <option value="">Year</option>
                                      <option value="2024">2024</option>
                                      <option value="2023">2023</option>
                                      <option value="2022">2022</option>
                                      <option value="2021">2021</option>
                                      <option value="2020">2020</option>
                                      <option value="2019">2019</option>
                                      <option value="2018">2018</option>
                                      <option value="2017">2017</option>
                                      <option value="2016">2016</option>
                                      <option value="2015">2015</option>
                                      <option value="2014">2014</option>
                                      <option value="2013">2013</option>
                                      <option value="2012">2012</option>
                                      <option value="2011">2011</option>
                                      <option value="2010">2010</option>
                                      <option value="2009">2009</option>
                                      <option value="2008">2008</option>
                                      <option value="2007">2007</option>
                                      <option value="2006">2006</option>
                                      <option value="2005">2005</option>
                                      <option value="2004">2004</option>
                                      <option value="2003">2003</option>
                                      <option value="2002">2002</option>
                                      <option value="2001">2001</option>
                                      <option value="2000">2000</option>
                                      <option value="1999">1999</option>
                                      <option value="1998">1998</option>
                                      <option value="1997">1997</option>
                                      <option value="1996">1996</option>
                                      <option value="1995">1995</option>
                                      <option value="1994">1994</option>
                                      <option value="1993">1993</option>
                                      <option value="1992">1992</option>
                                      <option value="1991">1991</option>
                                      <option value="1990">1990</option>
                                      <option value="1989">1989</option>
                                      <option value="1988">1988</option>
                                      <option value="1987">1987</option>
                                      <option value="1986">1986</option>
                                      <option value="1985">1985</option>
                                      <option value="1984">1984</option>
                                      <option value="1983">1983</option>
                                      <option value="1982">1982</option>
                                      <option value="1981">1981</option>
                                      <option value="1980">1980</option>
                                      <option value="1979">1979</option>
                                      <option value="1978">1978</option>
                                      <option value="1977">1977</option>
                                      <option value="1976">1976</option>
                                      <option value="1975">1975</option>
                                      <option value="1974">1974</option>
                                      <option value="1973">1973</option>
                                      <option value="1972">1972</option>
                                      <option value="1971">1971</option>
                                      <option value="1970">1970</option>
                                    </select>
                                  </div>
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Grade/Percentage</label>
                                  <input
                                    required
                                    type="text"
                                    value={data.gradePercentage}
                                    name="gradePercentage"
                                    id="gradePercentage"
                                    onChange={handleChange}
                                  />
                                </div>
                                <br></br>

                                <div className="inputDataDivCJP">
                                  <label>Skills</label>
                                  <input
                                    required
                                    type="text"
                                    // value={data.skills}
                                    name="skills"
                                    id="skills"
                                    onChange={handleChange}
                                    // onKeyDown={handleKeyDown}
                                  />

                                  {eduFilteredSkillsList &&
                                    eduFilteredSkillsList.map((data) => (
                                      <div
                                        data-skill={data.skillId}
                                        onClick={handleSkillValue}
                                        className="skillsDisplayList"
                                        style={{
                                          lineHeight: "35px",
                                          border: "none",
                                          width: "90.5%",
                                          color: "#7b7a7a",
                                          boxShadow:
                                            "0 1px 1px rgba(0, 0, 0, 0.1)",
                                          cursor: "pointer",
                                          paddingLeft: "5px",
                                        }}
                                      >
                                        {data.skill}
                                      </div>
                                    ))}
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJPss"
                                  style={{
                                    display: "flex",
                                    width: "650px",
                                    maxWidth: "650px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {eduAllSkillsList &&
                                    eduAllSkillsList
                                      .filter((item) =>
                                        data.skills.some(
                                          (value) => value == item.skillId
                                        )
                                      )
                                      .map((v) => (
                                        <div
                                          style={{
                                            width: "auto",
                                            border: "none",
                                            borderRadius: "3px",
                                            color: "#7b7a7a",
                                            boxShadow:
                                              "0 1px 1px rgba(0, 0, 0, 0.1)",
                                            padding: "3px 4px",
                                            color: "#ffffff",
                                            cursor: "pointer",
                                            paddingLeft: "5px",
                                            marginRight: "8px",
                                            background: "#5352b3",
                                            fontSize: "15px",
                                            marginBottom: "8px",
                                            letterSpacing: "0.8px",
                                          }}
                                        >
                                          {v.skill &&
                                            v.skill.charAt(0).toUpperCase() +
                                              v.skill.slice(1).toLowerCase()}
                                        </div>
                                      ))}
                                  {/* <br></br> */}
                                </div>
                                {/* */}

                                <div className="inputDataDivCJP">
                                  <label>Other skills</label>
                                  <input
                                    required
                                    type="text"
                                    // value={data.skills}
                                    name="otherSkills"
                                    id="otherSkills"
                                    // onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                  />
                                </div>
                                <br></br>

                                <div
                                  className="inputDataDivCJPss"
                                  style={{
                                    display: "flex",
                                    width: "650px",
                                    maxWidth: "650px",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {data.otherSkills &&
                                    data.otherSkills.map((v) => (
                                      <div
                                        style={{
                                          width: "auto",
                                          border: "none",
                                          borderRadius: "3px",
                                          color: "#7b7a7a",
                                          boxShadow:
                                            "0 1px 1px rgba(0, 0, 0, 0.1)",
                                          padding: "3px 4px",
                                          color: "#ffffff",
                                          cursor: "pointer",
                                          paddingLeft: "5px",
                                          marginRight: "8px",
                                          background: "#5352b3",
                                          fontSize: "15px",
                                          marginBottom: "8px",
                                          letterSpacing: "0.8px",
                                        }}
                                      >
                                        {v &&
                                          v.charAt(0).toUpperCase() +
                                            v.slice(1).toLowerCase()}
                                      </div>
                                    ))}
                                </div>

                                <div className="inputDataDivCJP">
                                  <label>Description</label>
                                  <textarea
                                    required
                                    rows="5"
                                    type="text"
                                    value={data.description}
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                  />
                                </div>
                                <br></br>
                              </div>

                              <div
                                style={{
                                  height: "28px",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "row",
                                  padding: "10px 20px",
                                  border: "0.5px solid #dfdcdc",
                                  // color: "var(--color-text)",
                                }}
                              >
                                <button
                                  type="button"
                                  className="saveBtn"
                                  onClick={validateForm}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Popup>
                    </span>{" "}
                    &nbsp;
                    <span
                      className="editIconPen"
                      style={{ borderRadius: "50%", padding: "3px 7px " }}
                      onClick={handleEducationEdit}
                    >
                      <FontAwesomeIcon
                        className="editIcon"
                        style={{}}
                        icon={faPen}
                      />
                    </span>
                  </span>
                </label>
                {educationList.map((item, index) => (
                  <div
                    key={index}
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
                      {item.school}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.fieldOfStudy}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.startDateMonth}/{item.startDateYear} -{" "}
                      {item.endDateMonth}/{item.endDateYear}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.gradePercentage}
                    </label>
                    <label
                      style={{
                        color: "--color-text",
                        fontSize: "14px",
                        color: "gray",
                        lineHeight: "20px",
                      }}
                    >
                      {item.skills}
                    </label>
                    <br />
                  </div>
                ))}

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
export default UserHome;
