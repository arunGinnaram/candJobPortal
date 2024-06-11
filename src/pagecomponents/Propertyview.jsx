import React, { useEffect, useState,useRef, useContext } from "react";
import Sidevavbar from "./Sidevavbar";
import "./Login.css";
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
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import urlGlobal from "./application.json";

import Swal from "sweetalert2";
import { json, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import $ from "jquery";
import fileDetails from './editProp.json';

import { languageContext } from "../App";

const Propertyview = () => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;
  const token = sessionStorage.getItem("token");
  const fileData = fileDetails.response;

  const { lang, setLang } = useContext(languageContext); 

  const axiosInstance = axios.create();

        const cfg = {
          headers: {
             Authorization:`Bearer ${token}`, 
            "Content-Type": "application/json",
            Accept: "application/json",
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

  const userId = sessionStorage.getItem("userId");
  // alert(userId);

  // const navigate = useNavigate(); 

 

  useEffect(()=>{
    if(sessionStorage.getItem("token")=="" || sessionStorage.getItem("token")==null ){
      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "rgb(153, 12, 25)",
        html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Session expired,Please login</p>',
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
       navigate("/mumbaipolicestation"); 
    }
      },[]);

  let { state } = useLocation();

  const [image,setImage] = useState(false);

  // useEffect(()=>{

  // },[image])

  const [sizeOfFileInfos,setSizeOfFileInfos] = useState([]);

  const [filesOnly, setFilesOnly] = useState([]);

  
  const flag = useRef(false); 

  
  useEffect(() => {
    
    if (state) { 
getDataEdit(); 

state=null;
    }
  }, [state]);


  const getDataEdit = async () => {

    try {              
      const getDataById = await axiosInstance.post('http://'+url+':'+port+'/'+'editProperty',{
        propertyId: state
      },cfg);
       
      console.log("D: " + JSON.stringify(getDataById.data) );
      if(getDataById.data.message=="SUCCESS" && getDataById.data.code=="1" ){
        //  navigate("/mumbaipolicestation/Propertycreation", { state: getDataById.data });
  
  
        flag.current=true;
        
        if(flag.current){
          $("#docName").prop("required",false);
        }
        
  
        setData({
          propertyName: getDataById.data.response.propertyName,
          location: getDataById.data.response.location,
          cts: getDataById.data.response.cts,
          landmark: getDataById.data.response.landmark,
          addressLine1: getDataById.data.response.addressLine1,
          addressLine2: getDataById.data.response.addressLine2,
          district: getDataById.data.response.district,
          city: getDataById.data.response.city,
          pincode: getDataById.data.response.pincode,
          openPlot: parseInt(getDataById.data.response.openPlot,10),
          building:  parseInt(getDataById.data.response.building,10),
          ground:  parseInt(getDataById.data.response.ground,10),
          noProperty:  parseInt(getDataById.data.response.noProperty,10),
          policeStationId: 1,
          areaUnits: getDataById.data.response.areaUnits,
          areaOfProperty: getDataById.data.response.areaOfProperty,
           fileInfos: getDataById.data.response.fileInfos,
           userId:userId,
           propertyId: getDataById.data.response.propertyId, 
           
           
        });
        
        // getDataById.data.response.fileInfos.forEach((fI) => {
        //   console.log("D: " + fI);
        // })
        const extractedFile = getDataById.data.response.fileInfos ; 
   
        setSizeOfFileInfos(getDataById.data.response.fileInfos);
        // alert(getDataById.data.response.fileInfos.length);
    
        if(getDataById.data.response.fileInfos.length>0) { 
          console.log("file: " + JSON.stringify(filesOnly) ); 
          setFilesOnly(extractedFile); 
            setImage(true); 
        }else if(getDataById.data.response.fileInfos.length==0) {
          setFilesOnly(extractedFile); 
          setImage(false); 
        } 
  
        if (
          (data.location == "HITECHCITY" &&
            getDataById.data.response.location == "HITECHCITY") ||
          (data.location == "MADHAPUR" &&
            getDataById.data.response.location == "MADHAPUR") ||
          (data.location == "GACHIBOWLI" &&
            getDataById.data.response.location == "GACHIBOWLI")
        ) {
          $('select[name="location"]').val(data.location);
        }
  
       
  
        if (
          (data.areaUnits == "SQR_FT." &&
            getDataById.data.response.areaUnits == "SQR_FT.") ||
          (data.areaUnits == "SQR_YARD" &&
            getDataById.data.response.areaUnits == "SQR_YARD") ||
          (data.areaUnits == "MT_SQR." && getDataById.data.response.areaUnits == "MT_SQR.")
        ) {
          $('select[name="areaUnits"]').val(data.areaUnits);
        }
  
  
  
      } else { 
        Swal.fire({
          position: "top-end",
          width: "auto",
          // padding: '0',
          showConfirmButton: false,
          background: "#D0342C",
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${getDataById.data.message + " : "+ getDataById.data.response}</p>`,
          showClass: {
            popup: "animate__animated animate__fadeInLeft",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
    
          timer: 5000,
    
          customClass: {
              popup: 'custom-swal-popup', // Assign a custom class name
            },
        }); 
    
      }
                         
      }catch(error) {
        // console.log("D: " + JSON.stringify(error.response.data) );
        // const errorMap = error.response.data;
        //   const errorMessage = Object.keys(errorMap)
        // .map(field => `${errorMap[field]}`)
        // .join('');
    
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
              popup: 'custom-swal-popup', // Assign a custom class name
            },
        });                    
      }  
  
  }

   

        const [selectedFileImage, setSelectedFileImage] = useState(null);

        const handleModalClose = () => {
          setSelectedFileImage(null);
        };

  // const filesOnly = state.response.fileInfos.map((imp) => imp.file);

  const handleButtonClick = (file) => {
    setSelectedFileImage(file);
  }; 

  const handleDeleteFile = async (fId) => {
    // alert(data.propertyId  + "::: " +  fId);  

   

console.log("token: " + token);
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


    if(confirmResult.isConfirmed){
      try{

        console.log("url: " + "http://"+ url+":"+port+"/"+"deletePropertyFile"  );
        console.log("cfg: " + JSON.stringify(cfg)  );
        console.log("data: " +  "propertyId"+ data.propertyId,
        "fileId"+ fId,  );
        const deleteFile = await axios.delete("http://"+ url+":"+port+"/"+"deletePropertyFile",
        {headers: {
          Authorization:`Bearer ${token}`,  
       },
        data : {
          "propertyId": data.propertyId,
          "fileId": fId,
        }});

        getDataEdit(); 

        // console.log("token: " + JSON.stringify(deleteFile) );
        console.log("Response: " + JSON.stringify(deleteFile.data));

        
      }catch(error) {
        
      }

    }
    
  }

  const [data, setData] = useState({
    propertyName: "",
    location: "",
    cts: "",
    landmark: "",
    addressLine1: "",
    addressLine2: "",
    district: "",
    city: "",
    pincode: "",
    openPlot: 0,
    building: 0,
    ground: 0,
    noProperty: 0,
    policeStationId: 1,
    areaUnits: "",
    areaOfProperty: "",
    userId:userId,
    fileInfos: null,
    propertyId:""
  });

  const handleReset = () => {
    setData({
      propertyName: "",
      location: "",
      cts: "",
      landmark: "",
      addressLine1: "",
      addressLine2: "",
      district: "",
      city: "",
      pincode: "",
      openPlot: 0,
      building: 0,
      ground: 0,
      noProperty: 0,
      policeStationId: 1,
      areaUnits: "",
      areaOfProperty: "",
      fileInfos: null,
      propertyId: "", 
    });

    setFileInputs([{ id: 1, file: null, fileName: "", documentName: "" }]);
  };

  useEffect(() => {
    if (
      data.areaUnits == "SQR_FT." ||
      data.areaUnits == "SQR_YARD" ||
      data.areaUnits == "MT_SQR."
    ) {
      $("[name='areaUnits']").css({
        color: "#06a706",
        "font-weight": "600",
      });
    } else {
      $("[name='areaUnits']").css({
        color: "var(--color-text)",
        "font-weight": "400",
      });
    }
    $('select[name="areaUnits"]').val(data.areaUnits);
  }, [data.areaUnits]);

  useEffect(() => {
    if (
      data.location == "MADHAPUR" ||
      data.location == "GACHIBOWLI" ||
      data.location == "HITECHCITY"
    ) {
      $("[name='location']").css({
        color: "#06a706",
        "font-weight": "600",
      });
    } else {
      $("[name='location']").css({
        color: "var(--color-text)",
        "font-weight": "400",
      });
    }
    $('select[name="location"]').val(data.location);
  }, [data.location]);

  const handleChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {}, [data.openPlot]);
  const handleOpenPlotInputPlus = () => {
    if (data.openPlot >= 0) {
      setData((prevData) => ({
        ...prevData,
        openPlot: prevData.openPlot + 1,
      }));
    }
  };
  const handleOpenPlotInputMinus = () => {
    if (data.openPlot > 0) {
      setData((prevData) => ({
        ...prevData,
        openPlot: prevData.openPlot - 1,
      }));
    }
  };

  useEffect(() => {}, [data.building]);
  const handleBuildingInputPlus = () => {
    if (data.building >= 0) {
      setData((prevData) => ({ ...prevData, building: prevData.building + 1 }));
    }
  };
  const handleBuildingInputMinus = () => {
    if (data.building > 0) {
      setData((prevData) => ({ ...prevData, building: prevData.building - 1 }));
    }
  };

  useEffect(() => {}, [data.ground]);
  const handleGroundInputPlus = () => {
    if (data.ground >= 0) {
      setData((prevData) => ({ ...prevData, ground: prevData.ground + 1 }));
    }
  };
  const handleGroundInputMinus = () => {
    if (data.ground > 0) {
      setData((prevData) => ({ ...prevData, ground: prevData.ground - 1 }));
    }
  };

  useEffect(() => {}, [data.noProperty]);
  const handleNoPropertyFoundInputPlus = () => {
    if (data.noProperty >= 0) {
      setData((prevData) => ({
        ...prevData,
        noProperty: prevData.noProperty + 1,
      }));
    }
  };
  const handleNoPropertyFoundInputMinus = () => {
    if (data.noProperty > 0) {
      setData((prevData) => ({
        ...prevData,
        noProperty: prevData.noProperty - 1,
      }));
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const fileType = file.type.split('/')[1];

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        if(file.type=="pdf"){
          resolve(`data:application/${fileType};base64,`+base64String);
        }else {
          resolve(`data:image/${fileType};base64,`+base64String);
        }
        
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInputs, setFileInputs] = useState([
    { id: 1, file: null, fileName: "", documentName: "" },
  ]);

  

  const handleFileChange = async (id, event) => {
    const selectedFile = event.target.files[0];
    const newFileInputs = await Promise.all(
      fileInputs.map(async (input) =>
        input.id === id
          ? {
              ...input, 
              file: selectedFile ? await fileToBase64(selectedFile) : null,
              fileName: selectedFile ? selectedFile.name : "",
            }
          : input
      )
    );
    setFileInputs(newFileInputs);

    // Update data.fileInfos after setting newFileInputs
    const fileInfos = await Promise.all(
      newFileInputs.map(async (input) => ({
        id: input.id.toString(),
        filedescprtion: input.fileName,
        file: input.file,
        filename: input.documentName,
        // filedescprtion: 'string', // Add a description if needed
      }))
    );

    console.log(fileInfos);
    setData((prevData) => ({ ...prevData, fileInfos }));
  };

  const handleDocumentNameChange = (id, event) => {
    const newFileInputs = fileInputs.map((input) =>
      input.id === id
        ? {
            ...input,
            documentName: event.target.value,
          }
        : input
    );
    setFileInputs(newFileInputs);
  };

  const handleAddNew = () => {
    // alert("length: " + fileInputs.length + 1);
    const newInput = { id: fileInputs.length + 1, file: null, fileName: "" };
    setFileInputs([...fileInputs, newInput]);
  };

  // const handleFormSubmit = () => {
  //   console.log(fileInputs);
  // };

  const validateForm = async (event) => {
    // alert("just in validate : " +flag.current); 
    // console.log(data);
    event.preventDefault();
    // console.log(fileInputs[0]);
    if (
      data.openPlot == 0 &&
      data.building == 0 &&
      data.ground == 0 &&
      data.noProperty == 0
    ) {
      Swal.fire({
        position: "top-end",
        width: "auto",
        // padding: '0',
        showConfirmButton: false,
        background: "rgb(153, 12, 25)",
        html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Please select property type & count out of the below: </p>',
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
      return false;
    } else if(!flag.current && fileInputs.some(
      (input) =>
        !input.documentName ||
        input.documentName.trim() === "" ||
        !input.file ||
        !input.fileName ||
        input.fileName.trim() === ""  
        // !input.file.type || 
        // !['pdf','jpg','jpeg'].includes(input.file.type.split('/')[1]) 
    )) {
      // alert("Fsdfl: " +flag); 
        {
        
        // if( fileInputs.some(
        //   (input) => !['pdf','jpg','jpeg'].includes(input.file.type.split('/')[1]) ) ) {
          Swal.fire({
            position: "top-end",
            width: "auto",
            // padding: '0',
            showConfirmButton: false,
            background: "rgb(153, 12, 25)",
            html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Please select files of type pdf, jpeg, jpg only.</p>',
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
          return false;
        // }else{
        //   Swal.fire({
        //     position: "top-end",
        //     width: "auto",
        //     // padding: '0',
        //     showConfirmButton: false,
        //     background: "rgb(153, 12, 25)",
        //     html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Please choose a file</p>',
        //     showClass: {
        //       popup: "animate__animated animate__fadeInLeft",
        //     },
        //     hideClass: {
        //       popup: "animate__animated animate__fadeOutUp",
        //     },
    
        //     timer: 5000,
    
        //     customClass: {
        //       popup: "custom-swal-popup", // Assign a custom class name
        //     },
        //   });
        //   return false;
        // }
       
      }
    } 
    
    // else {

    // } 
     else {  
      const saveData = async () => {
        

        const confirmResult = await Swal.fire({
          // : 'Confirmation',
          title: "Are you sure you want to save?",
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

        // console.log(data);
        // const token = sessionStorage.getItem("token");
        if (confirmResult.isConfirmed) {
          // setTimeout(async () => { http://10.10.10.139:8080/
          try {
            // "http://"+url+":"+port+"/"+contextPath+"/authenticate",data,{
            // alert('http://'+url+':'+port+'/'+'createProperty');
            const dataSaved = await axiosInstance.post(
              "http://" + url + ":" + port + "/" + "createProperty",
              data,
              cfg
              // {
              //   headers : {
              //     // Authorization: `Bearer ${token}`,
              //     "Content-Type": "application/json",
              //     Accept: "application/json",
              // } }
            );
            console.log("D: " + JSON.stringify(dataSaved.data));
            if (
              dataSaved.data.message == "SUCCESS" &&
              dataSaved.data.code == "1"
            ) {
              Swal.fire({
                position: "top-end",
                width: "auto",
                // padding: '0',
                showConfirmButton: false,
                background: "rgb(22, 145, 101)",
                html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Property created successfully</p>`,
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
              console.log("Resp1 : " + JSON.stringify(dataSaved));
              console.log("Resp : " + JSON.stringify(dataSaved.data.response));
              if (
                dataSaved.data.response &&
                dataSaved.data.response.hasOwnProperty("propertyName")
              ) {
                $("#propertyNameLabel").css({
                  color: "red",
                });
              }

              const errorMap = dataSaved.data.response;
              const errorMessage = Object.values(errorMap);
              // .join("\n");
              // .map(([key, value]) => `${key}`);
             

              console.log("${errorMessage}" + errorMessage);
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

              // Swal.fire({
              //   position: "top-end",
              //   width: "auto",
              //   // padding: '0',
              //   showConfirmButton: false,
              //   background: "#D0342C",
              //   html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${dataSaved.data.message + " : "+ dataSaved.data.response}</p>`,
              //   showClass: {
              //     popup: "animate__animated animate__fadeInLeft",
              //   },
              //   hideClass: {
              //     popup: "animate__animated animate__fadeOutUp",
              //   },

              //   timer: 5000,

              //   customClass: {
              //       popup: 'custom-swal-popup', // Assign a custom class name
              //     },
              // });
            }
          } catch (error) {
            if (error.response && error.response.data) {
              console.log("D: " + JSON.stringify(error.response.data));
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
      saveData();
    }
  };


  const handleEditClick = async (pId) => {
    const confirmResult = await Swal.fire({
      // : 'Confirmation',
      title: 'Are you sure you want to edit?',
      showCancelButton: true,
      confirmButtonColor: 'rgb(22, 145, 101)',
      cancelButtonColor: '#D0342C',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      // background: 'gray',
      showClass: {
        popup: 'animate__animated animate__backInLeft',
      },
      hideClass: {
        popup: 'animate__animated animate__backOutRight',
      },
      customClass: {
        popup: 'custom-swal-popup',  
      },
    }); 

     
    if(confirmResult.isConfirmed){
      navigate("/mumbaipolicestation/Propertycreation", { state: pId });
          
    } 
  }




  return (
    <div className="propView"
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
            width: "95%",
            marginTop: "1%",
            marginLeft: "1%",
            borderRadius: "3px",
          }}
        >
          <div
            className="mainHeading"
            style={{
              background: "rgb(3 44 83)",
              padding: "12px 0 12px 15px",
              fontWeight: "600",
              color: "white",
              letterSpacing: "0.5px",
            }}
          >
            {/* color:'var(--color-text)'
      backgroud:'white' */}
            <FontAwesomeIcon
              style={{ width: "25px", color: "white", marginRight: "8px" }}
              className="icon"
              icon={faHotel}
              size="lg"
              bounce
            />
            P
            
               
            
              <span className="innerText">ROPERTY VIEW</span>
            
          </div>
          <form>
            <div
              style={{
                height: "auto",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1%",
                flexDirection: "row",
              }}
            >
              <div
                className="Subdiv1"
                style={{ width: "60%", boxSizing: "border-box" }}
              >
                <div style={{ background: "white"}}>

                <div className="propViewTable">
                  <table>
                  <tbody>
                      <tr>
                        <td className="viewTab">{lang==0?'Property name':'मालमत्तेचे नाव'}</td>
                        <td >{data.propertyName}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'CTS - Survey Number':'सर्वेक्षण क्रमांक'}</td>
                        <td >{data.cts}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Landmark':'महत्त्वाची खूण'}</td>
                        <td >{data.landmark}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Location':'स्थान'}</td>
                        <td >{data.location}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Area units':'क्षेत्र युनिट्स'}</td>
                        <td >{data.areaUnits}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Area':'क्षेत्रफळ'}</td>
                        <td >{data.areaOfProperty}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">Open plot(count):</td>
                        <td >{data.openPlot}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">Building(count):</td>
                        <td >{data.building}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">Ground(count):</td>
                        <td >{data.ground}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">No Property Found(count):</td>
                        <td >{data.noProperty}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Address Line 1':'पत्ता ओळ 1'}</td>
                        <td >{data.addressLine1}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Address Line 2':'पत्ता ओळ 2'}</td>
                        <td >{data.addressLine2}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'District':'जिल्हा'}</td>
                        <td >{data.district}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'City':'शहर'}</td>
                        <td >{data.city}</td> 
                      </tr>
                      <tr>
                        <td className="viewTab">{lang==0?'Pincode':'पिन कोड'}</td>
                        <td >{data.pincode}</td> 
                      </tr>

                      {/* <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr>
                      <tr>
                        <td>Property name: </td>
                        <td >Survey Number CTS</td> 
                      </tr> */}

                      
                   
                    </tbody>
                  </table>
                </div>
                  

                

                   

                  <div className="inputDataIndividualDiv" style={{padding:'10px 0 0 10px'}}>
                  {image &&  

                   <div style={{marginBottom:'18px'}}>
                     <label style={{ fontSize: "17px"   }}>
                        Uploaded Documents<span style={{ color: "red" }}></span>
                    </label>
                   
                     
                     <div className="viewUploadedDocs" style={{display:'flex',flexDirection:'column',marginTop:'7px' }}>
                        {filesOnly.map((file, index) => (
                          <div style={{display:'flex',justifyContent:'space-between',width:'60%'}}>
                            <div>
                          <button type="button" key={index} onClick={() => handleButtonClick(file.file)}
                          style={{width:'100px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'1px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(15, 125, 53)' ,fontFamily:'inherit',fontWeight:'600'  }} 
                          >
                            View File 
                            {/* {index + 1} */}
                          </button> &nbsp;
                          {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                          style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                          >
                            X
                          </button> */}
                          &nbsp;
                          <label style={{fontSize:'14px',textTransform:'uppercase'}}>{file.filename}</label>
                          </div>

                          <div>
                           </div>
                          
                          {/* <button>Remove</button> */}
                          </div>
                           
                           
                        ))}

                        {selectedFileImage && (
                            <div className="modal-overlay">
                            <div className="modal-content">
                              <div className="modal-header">
                                {/* <h5 className="modal-title">File</h5> */}
                                 <button className="modal-close" onClick={handleModalClose} style={{background:'gray',color:'white',borderRadius:'2px'}}> 
                                  &times;
                                </button>  
                              </div>
                              <div className="modal-body">
                              <img style={{maxWidth: '100%',maxHeight:'70vh'}} src={selectedFileImage} alt="Selected" />
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                     
                     
                    </div>  
                   } 
                  </div>


                  <div className="inputDataIndividualDiv"  style={{padding:'0',justifyContent:'center',display:'flex' ,alignItems:'center'  }}  >
                  <button type="button"  onClick={() => handleEditClick(data.propertyId)}
                          style={{width:'100px', 
                          marginBottom:'10px',
                          height:'32px',fontSize:'14px', 
                          fontWeight:'500',letterSpacing:'1px', 
                          textTransform:'Capitalize',color:"white",
                          border:'none',borderRadius:'3px',background:'#673ab7' ,
                          fontFamily:'inherit',fontWeight:'600',alignItems:'center'  }} 
                          >
                            EDIT
                            {/* {index + 1} */}
                          </button> &nbsp;
                  </div>
                  

                   

                   
                </div>
                

                
              </div>

             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Propertyview;
