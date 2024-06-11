import React, { useEffect, useState, useRef, useContext } from "react";
import Sidevavbar from "./Sidevavbar";
import "./Login.css";
import "./Properties.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faPenToSquare,
  faTrash,
  faEye,
  faMagnifyingGlass,
  faDownload,
  faUpDown,
  faBuildingCircleCheck,
  faCircleArrowLeft 
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import urlGlobal from "./application.json";

import Header from "./Header";
import axios from "axios";
import { tab } from "@testing-library/user-event/dist/tab";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { languageContext } from "../App";

const Properties = () => {
  const navigate = useNavigate();

  const { lang, setLang } = useContext(languageContext);

  const tablRef = useRef();

  const handleExport = () => {
    const input = tablRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("table.pdf");
    });
  };

  // useEffect(() => {
  //   if (
  //     sessionStorage.getItem("token") == "" ||
  //     sessionStorage.getItem("token") == null
  //   ) {
  //     Swal.fire({
  //       position: "top-end",
  //       width: "auto",
  //       // padding: '0',
  //       showConfirmButton: false,
  //       background: "rgb(153, 12, 25)",
  //       html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Session expired,Please login</p>',
  //       showClass: {
  //         popup: "animate__animated animate__fadeInLeft",
  //       },
  //       hideClass: {
  //         popup: "animate__animated animate__fadeOutUp",
  //       },

  //       timer: 5000,

  //       customClass: {
  //         popup: "custom-swal-popup", // Assign a custom class name
  //       },
  //     });
  //     navigate("/mumbaipolicestation");
  //   }
  // }, []);

  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;

  const token = sessionStorage.getItem("token");
  const cfg = {
    headers: {
      // Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    (cfg) => {
      return cfg;
    },
    (err) => {
      console.error("Axios Err" + err);
      return Promise.reject(err);
    }
  );

  const [su, setSu] = useState(0);

  // const [data,setData] = useState({
  //   policeStationId:1,

  // });

  const viewProperty = async (pId) => {
    // const confirmResult = await Swal.fire({
    //   // : 'Confirmation',
    //   title: 'Are you sure you want to edit?',
    //   showCancelButton: true,
    //   confirmButtonColor: 'rgb(22, 145, 101)',
    //   cancelButtonColor: '#D0342C',
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'Cancel',
    //   // background: 'gray',
    //   showClass: {
    //     popup: 'animate__animated animate__backInLeft',
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__backOutRight',
    //   },
    //   customClass: {
    //     popup: 'custom-swal-popup',
    //   },
    // });

    // if(confirmResult.isConfirmed){
      navigate("/mumbaipolicestation/Propertyview", { state: pId });

    // }
  };


  const validateProperty =  (pId) => {
    
    navigate("/mumbaipolicestation/Propertydatavalidation", { state: pId });
  }

  const editProperty = async (pId) => {
    const confirmResult = await Swal.fire({
      // : 'Confirmation',
      title: "Are you sure you want to edit?",
      showCancelButton: true,
      confirmButtonColor: "rgb(22, 145, 101)",
      cancelButtonColor: "#D0342C",
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
      navigate("/mumbaipolicestation/Propertycreation", { state: pId });
    }
  };

  const deleteProperty = async (pId) => {
    const confirmResult = await Swal.fire({
      // : 'Confirmation',
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonColor: "rgb(22, 145, 101)",
      cancelButtonColor: "#D0342C",
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
      try {
        // console.log("url: " + "http://"+ url+":"+port+"/"+"deleteProperty"  );
        // console.log("cfg: " + JSON.stringify(cfg)  );
        console.log("data: " + "propertyId" + pId);
        const deleteFile = await axios.delete(
          "http://" + url + ":" + port + "/" + "deleteProperty",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              propertyId: pId,
            },
          }
        );

        console.log(deleteFile.data);
        //check from here
        if (deleteFile.data.code == "1") {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "rgb(22, 145, 101)",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Property deleted successfully</p>`,
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

          // navigate("/mumbaipolicestation/Properties");
        } else {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "#D0342C",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Error deleting</p>`,
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
      } catch (error) {
        if (error.response && error.response.data) {
          // console.log("D: " + JSON.stringify(error.response.data));
          const errorMap = error.response.data;
          const errorMessage = Object.keys(errorMap)
            .map((field) => `${errorMap[field]}`)
            .join("");

          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "#D0342C",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${errorMessage}</p>`,
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
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "#D0342C",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${error}</p>`,
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
    }
  };

  const CreateNewProp = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to create property?",
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
      navigate("/mumbaipolicestation/Propertycreation");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const [propertiesList, setPropertiesList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {}, [displayList]);

  const getdata = async () => {
    // console.log("D:: " + 'http://'+url+':'+port+'/'+'listProperty');
    try {
      const getData = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "listProperty?type=LISTED",
        {
          policeStationId: 1,
        },
        cfg
      );
      // alert("T:: " + token);
      // console.log("Data: " + JSON.stringify(getData.data.body.message));
      // console.log("Object: " + JSON.stringify(getData));

      if (getData == null) {
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
      } else {
        if (getData.data == null || getData.data == "") {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "#D0342C",
            html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Session expired,Please login</p>`,
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
          // if(getData.data.body.token==null || getData.data.body.token==""  ){
          //   Swal.fire({
          //     position: "top-end",
          //     width: "auto",
          //     // padding: '0',
          //     showConfirmButton: false,
          //     background: "#D0342C",
          //     html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Session Expired, Invalid token</p>`,
          //     showClass: {
          //       popup: "animate__animated animate__fadeInLeft",
          //     },
          //     hideClass: {
          //       popup: "animate__animated animate__fadeOutUp",
          //     },

          //     timer: 5000,

          //     customClass: {
          //         popup: 'custom-swal-popup', // Assign a custom class name
          //       },
          //   });
          //   sessionStorage.clear();
          //   navigate("/mumbaipolicestation");
          // }else {
          console.log(getData.data);
          setPropertiesList(getData.data.response);
          setDisplayList(getData.data.response);
          // }
        }
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "#D0342C",
        html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Server 25 error</p>`,
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

  let newList = [];

  const handleSearchByType = (value) => {
    if (value === "openPlot") {
      newList = propertiesList.filter((data) => data.openPlot === "1");
    } else if (value === "building") {
      newList = propertiesList.filter((data) => data.building === "1");
    } else if (value === "ground") {
      newList = propertiesList.filter((data) => data.ground === "1");
    } else if (value === "noProperty") {
      newList = propertiesList.filter((data) => data.noProperty === "1");
    } else {
      newList = propertiesList.filter((data) => data);
    }

    setDisplayList(newList);
  };

  const [cts, setCts] = useState("");
  const handleCtsSearch = (e) => {
    setCts((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    newList = propertiesList.filter((data) =>
      data.cts.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setDisplayList(newList);
  };

  const [location, setLocation] = useState("");
  const handleLocationSearch = (e) => {
    setLocation((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    newList = propertiesList.filter((data) =>
      data.location.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setDisplayList(newList);
  };

  // let intialSort = 'asc';

  const [sortOrder, setSortOrder] = useState({
    cts: "asc",
    openPlot: "asc",
    building: "asc",
    ground: "asc",
    noProperty: "asc",
    location: "asc",
  });

  const handleSort = (value) => {
    // alert(value);
    let newDataList = null;
    // console.log(JSON.stringify(sortOrder));

    if (value == "cts") {
      if (sortOrder.cts == null) {
        // alert("cts: null")
      } else {
        if (sortOrder.cts === "des") {
          newDataList = [...propertiesList].sort((a, b) => {
            if (a.cts > b.cts) return -1;
            if (a.cts < b.cts) return 1;
            return 0;
          });
          setSortOrder({ ...sortOrder, cts: "asc" });
        }

        if (sortOrder.cts === "asc") {
          newDataList = [...propertiesList].sort((a, b) => {
            if (a.cts < b.cts) return -1;
            if (a.cts > b.cts) return 1;
            return 0;
          });
          setSortOrder({ ...sortOrder, cts: "des" });
        }
      }
    } else if (value == "openPlot") {
      if (sortOrder.openPlot === "des") {
        // alert(value);
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.openPlot > b.openPlot) return -1;
          if (a.openPlot < b.openPlot) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, openPlot: "asc" });
      }

      if (sortOrder.openPlot === "asc") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.openPlot < b.openPlot) return -1;
          if (a.openPlot > b.openPlot) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, openPlot: "des" });
      }
    } else if (value == "building") {
      if (sortOrder.building === "des") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.building > b.building) return -1;
          if (a.building < b.building) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, building: "asc" });
      }

      if (sortOrder.building === "asc") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.building < b.building) return -1;
          if (a.building > b.building) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, building: "des" });
      }
    } else if (value == "ground") {
      if (sortOrder.ground === "des") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.ground > b.ground) return -1;
          if (a.ground < b.ground) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, ground: "asc" });
      }

      if (sortOrder.ground === "asc") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.ground < b.ground) return -1;
          if (a.ground > b.ground) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, ground: "des" });
      }
    } else if (value == "noProperty") {
      if (sortOrder.noProperty === "des") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.noProperty > b.noProperty) return -1;
          if (a.noProperty < b.noProperty) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, noProperty: "asc" });
      }

      if (sortOrder.noProperty === "asc") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.noProperty < b.noProperty) return -1;
          if (a.noProperty > b.noProperty) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, noProperty: "des" });
      }
    } else if (value == "location") {
      if (sortOrder.location === "des") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.location > b.location) return -1;
          if (a.location < b.location) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, location: "asc" });
      }

      if (sortOrder.location === "asc") {
        newDataList = [...propertiesList].sort((a, b) => {
          if (a.location < b.location) return -1;
          if (a.location > b.location) return 1;
          return 0;
        });
        setSortOrder({ ...sortOrder, location: "des" });
      }
    }

    // console.log(JSON.stringify(sortOrder));

    // setSortOrder('des');

    // const arr = [...propertiesList] ;

    // const len = arr.length;
    // for (let i = 0; i < len - 1; i++) {
    //   for (let j = 0; j < len - 1 - i; j++) {
    //     if (arr[j].cts > arr[j + 1].cts) {

    //       [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    //     }
    //   }
    // }

    setDisplayList(newDataList);
  };

  return (
    <div
      style={{
        background: "var(--color-component-background)",
        height: "auto",
        display: "flex",
        paddingBottom: "50px",
      }}
    >
      <Sidevavbar height="100vh" />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Header />

        <div
          className="mainContainer"
          style={{
            height: "88%",
            display: "flex",
            justifyContent: "flext-start",
            flexDirection: "column",
            width: "98.5%",
            marginTop: "1%",
            marginLeft: "1%",
            borderRadius: "3px",
          }}
        >
          <div
            className="mainHeading"
            style={{
              background: "rgb(3 44 83)",

              padding: "12px 15px 12px 15px",
              fontWeight: "600",
              color: "white",
              letterSpacing: "0.5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <FontAwesomeIcon
                bounce
                style={{ width: "25px", color: "white", marginRight: "8px" }}
                className="icon"
                icon={faHotel}
                size="lg"
              />
              {lang === 0 ? (
                <span>
                  P<span className="innerText">ROPERTIES</span>
                </span>
              ) : (
                <span style={{ fontSize: "21px" }}>गुणधर्म</span>
              )}
            </div>

            
            {/* <div>
            <input  value="CREATE PROPERTY" style={{ fontWeight:'600',color:'white',background:'#E50000',border:'none',borderRadius:'3px',padding:'6px 10px',fontFamily:'inherit',letterSpacing:'0.5px' }} type="button"    />
              <input type="text" style={{height:'25px'}}  />
            </div> */}
          </div>

          <div
            className="mainHeading"
            style={{
              // background: "white",

              padding: "1% 0px 0px 0px",
              fontWeight: "600",
              // color: "white",
              // letterSpacing: "0.5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  background: "rgb(3, 44, 83)",
                  padding: "9px 8.5px 8.5px 8.5px",
                  boxSizing: "border-box",
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FontAwesomeIcon
                  size="2xs"
                  style={{ color: "white" }}
                  icon={faMagnifyingGlass}
                />
              </span>
              <input
                className="search"
                type="text"
                name="search(cts)"
                id="search(cts)"
                placeholder={lang == 0 ? "Survey number" : "सर्वेक्षण क्रमांक"}
                style={{
                  fontWeight: "400",
                  color: "#737373",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  border: "none",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  padding: "5px 20px 5px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  width: "180px",
                }}
                onChange={handleCtsSearch}
              />
              &nbsp;
              <input
                className="search"
                type="text"
                name="search(cts)"
                id="search(cts)"
                placeholder={lang == 0 ? "Location" : "स्थान"}
                style={{
                  fontWeight: "400",
                  color: "#737373",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  border: "none",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  padding: "5px 20px 5px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  width: "180px",
                }}
                onChange={handleLocationSearch}
              />{" "}
              &nbsp;
              <select
                className="type"
                type="text"
                name="searchByType"
                id="searchByType"
                placeholder="Search Properties"
                style={{
                  fontWeight: "400",
                  color: "#737373",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  border: "none",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",

                  padding: "4px 20px 4px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onChange={(event) => handleSearchByType(event.target.value)}
              >
                <option value="">{lang == 0 ? "Type" : "प्रकार"}</option>
                <option value="openPlot">
                  {lang == 0 ? "Open/Empty plot" : "खुला/रिकामा प्लॉट"}
                </option>
                <option value="building">
                  {lang == 0 ? "building" : "इमारत"}
                </option>
                <option value="ground">{lang == 0 ? "ground" : "जमीन"}</option>
                <option value="noProperty">{lang == 0 ? "noProperty" : "मालमत्ता नाही"}</option>
              </select>
              &nbsp;
              {/* <select
                className="validator"
                type="text"
                placeholder="Search Properties"
                style={{
                  fontWeight: "400",
                  color: "#737373",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  border: "none",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                   
                  padding: "4px 20px 4px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="">Validator</option>
                <option value=""></option>
              </select> */}
            </div>

            <div
              className="createPropInputStyle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                className="createPropInputsStyles"
                value={lang == 0 ? "Create Property" : "मालमत्ता तयार करा"}
                onClick={CreateNewProp}
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize:'15px',
                  // background: "#E50000",
                  background: "rgb(3, 44, 83)",
                  background:'rgb(141, 125, 112)',
                  border: "none",
                  borderRadius: "3px",
                  padding: "6px 9px",
                  // padding: "5px 20px 5px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
                type="button"
              />
              &nbsp;
              <span
                style={{
                  background: "rgb(3, 44, 83)",
                  padding: "9px 8.5px 8.5px 8.5px",
                  boxSizing: "border-box",
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FontAwesomeIcon
                  size="2xs"
                  style={{ color: "white" }}
                  icon={faDownload}
                />
              </span>
              <select
                className="type"
                type="text"
                placeholder="Search Properties"
                style={{
                  fontWeight: "400",
                  color: "#737373",
                  boxSizing: "border-box",
                  outline: "none",
                  fontSize: "16px",
                  border: "none",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  padding: "4px 0px 4px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onChange={handleExport}
              >
                <option value="">Export</option>
                <option value="">Pdf</option>
                <option value="">Excel</option>
              </select>
            </div>
          </div>

          <div
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0%",
              flexDirection: "column",
            }}
          >
            <div
              className="Subdiv1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0.5% 0 0 0%",
              }}
            >
              <div
                style={{
                  height: "auto",
                  width: "100%",
                  border: "none",
                  background: "white",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                  className="tableHeader"
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "white",
                    // padding:'10px 15px',
                    padding: "10px 0 10px 15px",
                    background: "gray",
                    fontFamily: "inherit",
                    // paddingLeft:'10px',
                    letterSpacing: "0.6px",

                  }}
                >
                  {lang == 0 ? "Properties list" : "गुणधर्मांची यादी"}
                </div>

                <div className="dataTable propTable arrowBtn">
                  <table ref={tablRef}>
                    <thead>
                      <tr>
                        <th>{lang == 0 ? "Sno" : "अनुक्रमांक"}</th>
                        <th
                          className="thDivMain"
                          onClick={() => handleSort("cts")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "Survey Number CTS"
                                : "सर्वेक्षण क्रमांक"}{" "}
                            </div>
                            <div style={{}}>
                              {/* <button
                            
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                          {/* <input
                            className="search"
                            type="text"
                            name="search(cts)"
                            id="search(cts)"
                            placeholder="Search"
                            style={{
                              fontWeight: "400",
                              color: "#737373",
                              boxSizing: "border-box",
                              outline: "none",
                              fontSize: "16px",
                              border: "none",
                              borderTopRightRadius: "3px",
                              borderBottomRightRadius: "3px",

                              fontFamily: "inherit",
                              letterSpacing: "0.5px",
                              background: "white",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              width: "100%",
                              display: "none",
                            }}
                            onChange={handleCtsSearch}
                          /> */}
                        </th>

                        <th
                          className="thDivMain"
                          onClick={() => handleSort("openPlot")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>{lang == 0 ? "Openplot" : "खुला प्लॉट"}</div>
                            <div style={{}}>
                              {/* <button
                            
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th
                          className="thDivMain"
                          onClick={() => handleSort("building")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>{lang == 0 ? "Building" : "इमारत"}</div>
                            <div style={{}}>
                              {/* <button
                            
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th
                          className="thDivMain"
                          onClick={() => handleSort("ground")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>{lang == 0 ? "Ground" : "ग्राउंड"}</div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("ground")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th
                          className="thDivMain"
                          onClick={() => handleSort("noProperty")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "No Property found"
                                : "कोणतीही मालमत्ता आढळली नाही"}
                            </div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("noProperty")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th
                          className="thDivMain"
                          onClick={() => handleSort("location")}
                          style={{}}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>{lang == 0 ? "Location" : "स्थान"}</div>
                            <div style={{}}>
                              {/* <button
                            onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button> */}
                            </div>
                          </div>
                        </th>

                        <th className="thDivMain" style={{}}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "Cross validation (Police-station)"
                                : "क्रॉस व्हॅलिडेशन (पोलीस-स्टेशन)"}
                            </div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th className="thDivMain" style={{}}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "Validation (Desk-8)"
                                : "प्रमाणीकरण (डेस्क-8)"}
                            </div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th className="thDivMain" style={{}}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "Validation Officer"
                                : "प्रमाणीकरण अधिकारी"}
                            </div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button>  */}
                            </div>
                          </div>
                        </th>

                        <th className="thDivMain" style={{}}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              {lang == 0
                                ? "Date created (yyyy-mm-dd)"
                                : "तारीख तयार केली"}
                            </div>
                            <div style={{}}>
                              {/* <button
                            // onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "none",
                              
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon className="sortIcon" color="green" icon={faUpDown} />
                          </button> */}
                            </div>
                          </div>
                        </th>

                        {/* <th style={{}}>
                        <div style={{display:'flex' }}>
                          <div> Openplot </div>
                          <div  style={{ alignSelf: 'flex-end'  }}> 
                          <button
                            onClick={() => handleSort("openPlot")}
                            style={{
                              border: "none",
                              background: "rgb(153 153 153)",
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon color="white" icon={faUpDown} />
                          </button></div></div>
                          
                          </th> */}
                        {/* <th>Building 
                        <button
                            onClick={() => handleSort("building")}
                            style={{
                              border: "none",
                              background: "rgb(153 153 153)",
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon color="white" icon={faUpDown} />
                          </button>

                        </th> */}
                        {/* <th>Ground <button
                            onClick={() => handleSort("ground")}
                            style={{
                              border: "none",
                              background: "rgb(153 153 153)",
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon color="white" icon={faUpDown} />
                          </button></th> */}
                        {/* <th>No Property found <button
                            onClick={() => handleSort("noProperty")}
                            style={{
                              border: "none",
                              background: "rgb(153 153 153)",
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon color="white" icon={faUpDown} />
                          </button></th> */}
                        {/* <th>Ownership</th> */}
                        {/* <th>Location <button
                            onClick={() => handleSort("location")}
                            style={{
                              border: "none",
                              background: "rgb(153 153 153)",
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon color="white" icon={faUpDown} />
                          </button></th> */}
                        {/* <th>Cross validation (Police-station)</th> */}
                        {/* <th>Validation (Desk-8)</th>
                        <th>Validation Officer</th> */}
                        {/* <th>Date created (yyyy-mm-dd)</th> */}
                        <th style={{ width: "12%", textAlign: "center" }}>
                          {lang == 0 ? "Actions" : "क्रिया"}
                        </th>

                        {/* <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {displayList.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {data.cts &&
                              data.cts.charAt(0).toUpperCase() +
                                data.cts.slice(1).toLowerCase()}
                          </td>
                          <td>
                            {data.openPlot &&
                              data.openPlot.charAt(0).toUpperCase() +
                                data.openPlot.slice(1).toLowerCase()}
                          </td>
                          <td>{data.building && data.building}</td>
                          <td>{data.ground && data.ground}</td>
                          <td>{data.noProperty && data.noProperty}</td>
                          {/* <td>{data.openPlot && data.openPlot}</td> */}
                          <td>
                            {data.location &&
                              data.location.charAt(0).toUpperCase() +
                                data.location.slice(1).toLowerCase()}
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            {data.createdDateTime &&
                              data.createdDateTime.substring(0, 10)}
                          </td>

                          <td
                            className="actionDatatd"
                            style={{ width: "11%", textAlign: "center",paddingLeft:'0px',paddingRight:'0px' }}
                          >
                            <FontAwesomeIcon
                              title="View"
                              onClick={() => viewProperty(data.propertyId)}
                              className="view eyeIcon"
                              style={{ padding: "5px 5px" }}
                              icon={faEye}
                              color="rgb(3, 44, 83)"
                              size="lg"
                            />
                            
                            <FontAwesomeIcon
                              title="Edit"
                              onClick={() => editProperty(data.propertyId)}
                              className="view editIcon"
                              icon={faPenToSquare}
                              style={{ padding: "5px 5px" }}
                              color="#66c229"
                              size="lg"
                            />
                             
                            <FontAwesomeIcon
                              title="Delete"
                              onClick={() => deleteProperty(data.propertyId)}
                              className="view deleteIcon"
                              icon={faTrash}
                              style={{ padding: "5px 5px" }}
                              color="#ab0707"
                              size="lg"
                            />
                              
                            <FontAwesomeIcon
                              title="validation"
                              onClick={() => validateProperty(data.propertyId)}
                              className="view eyeIcon"
                              style={{ padding: "5px 5px" }}
                              icon={faBuildingCircleCheck}
                              color="rgb(219 164 0)"
                              size="lg"
                            />
                             
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Properties;
