import React, { useEffect, useState, useRef, useContext } from "react";
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
  faCircleArrowLeft,
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
import { CSSTransition } from "react-transition-group";
import { CSS } from "react-spring";

const Propertydatavalidation = () => {
  const navigate = useNavigate();
  const url = urlGlobal.urlGlobal;
  const port = urlGlobal.port;
  const contextPath = urlGlobal.ContextPath;
  const token = sessionStorage.getItem("token");
  const fileData = fileDetails.response;

  const nodeRef = useRef(null);
  const nodeRef1 = useRef(null);



  const handlePropCreateBack = () => {
    navigate("/mumbaipolicestation/Properties");
  };

  const [validatorBasic, setValidatorBasic] = useState(false);
  const handleValidatorBasic = () => {
    setValidatorBasic(!validatorBasic);
  };

  const [validatorPlot,setValidatorPlot] = useState(false);
  const handleValidatorPlot = () => {
    setValidatorPlot(!validatorPlot);
  }

  const [validatorBuilding,setValidatorBuilding] = useState(false);
  const handleValidatorBuilding = () => {
    setValidatorBuilding(!validatorBuilding);
  }

  

  const [validatorGround,setValidatorGround] = useState(false);
  const handleValidatorGround = () => {
    setValidatorGround(!validatorGround);
  }



  const { lang, setLang } = useContext(languageContext);

  const axiosInstance = axios.create();

  const cfg = {
    headers: {
      Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (
      sessionStorage.getItem("token") == "" ||
      sessionStorage.getItem("token") == null
    ) {
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
  }, []);

  let { state } = useLocation();

  const [image, setImage] = useState(false);

  // useEffect(()=>{

  // },[image])

  const [sizeOfFileInfos, setSizeOfFileInfos] = useState([]);

  const [filesOnly, setFilesOnly] = useState([]);

  const flag = useRef(false);

  // let getDataById.data = '';

  // useEffect(() => {

  // },[flag]);

  // useEffect(()=>{

  // },[filesOnly])

  useEffect(() => {
    if (state) {
      getDataVerify();
      state = null;
    }
  }, [state]);

  const getDataVerify = async () => {
    try {
      const getDataById = await axiosInstance.post(
        "http://" + url + ":" + port + "/" + "psverifyproperty",
        {
          propertyId: state,
        },
        cfg
      );

      console.log(
        "Data of psverify: " + JSON.stringify(getDataById.data.response)
      );
      if (
        getDataById.data.message == "SUCCESS" &&
        getDataById.data.code == "1"
      ) {
        //  navigate("/mumbaipolicestation/Propertycreation", { state: getDataById.data });

        flag.current = true;

        // if(flag.current){
        //   $("#docName").prop("",false);
        // }

        setData({
          propertyName: getDataById.data.response.propertyInfo.propertyName,
          location: getDataById.data.response.propertyInfo.location,
          cts: getDataById.data.response.propertyInfo.cts,
          landmark: getDataById.data.response.propertyInfo.landmark,
          addressLine1: getDataById.data.response.propertyInfo.addressLine1,
          addressLine2: getDataById.data.response.propertyInfo.addressLine2,
          district: getDataById.data.response.propertyInfo.district,
          city: getDataById.data.response.propertyInfo.city,
          pincode: getDataById.data.response.propertyInfo.pincode,
          openPlot: parseInt(
            getDataById.data.response.propertyInfo.openPlot,
            10
          ),
          building: parseInt(
            getDataById.data.response.propertyInfo.building,
            10
          ),
          ground: parseInt(getDataById.data.response.propertyInfo.ground, 10),
          noProperty: parseInt(
            getDataById.data.response.propertyInfo.noProperty,
            10
          ),
          policeStationId: 1,
          areaUnits: getDataById.data.response.propertyInfo.areaUnits,
          areaOfProperty: getDataById.data.response.propertyInfo.areaOfProperty,
          fileInfos: getDataById.data.response.propertyInfo.fileInfos,
          userId: userId,
          propertyId: getDataById.data.response.propertyInfo.propertyId,
        });

        //  getDataById.data.response.propertyInfo.fileInfos.forEach((fI) => {
        //   console.log("D: " + fI);
        // })
        const extractedFile = getDataById.data.response.propertyInfo.fileInfos;

        setSizeOfFileInfos(getDataById.data.response.propertyInfo.fileInfos);
        // alert( getDataById.data.response.propertyInfo.fileInfos.length);

        if (getDataById.data.response.propertyInfo.fileInfos.length > 0) {
          console.log("file: " + JSON.stringify(filesOnly));
          setFilesOnly(extractedFile);
          setImage(true);
        } else if (
          getDataById.data.response.propertyInfo.fileInfos.length == 0
        ) {
          setFilesOnly(extractedFile);
          setImage(false);
        }

        if (
          (data.location == "HITECHCITY" &&
            getDataById.data.response.propertyInfo.location == "HITECHCITY") ||
          (data.location == "MADHAPUR" &&
            getDataById.data.response.propertyInfo.location == "MADHAPUR") ||
          (data.location == "GACHIBOWLI" &&
            getDataById.data.response.propertyInfo.location == "GACHIBOWLI")
        ) {
          $('select[name="location"]').val(data.location);
        }

        if (
          (data.areaUnits == "SQR_FT." &&
            getDataById.data.response.propertyInfo.areaUnits == "SQR_FT.") ||
          (data.areaUnits == "SQR_YARD" &&
            getDataById.data.response.propertyInfo.areaUnits == "SQR_YARD") ||
          (data.areaUnits == "MT_SQR." &&
            getDataById.data.response.propertyInfo.areaUnits == "MT_SQR.")
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
          html: `<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">${
            getDataById.data.message + " : "
          }</p>`,
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
          popup: "custom-swal-popup", // Assign a custom class name
        },
      });
    }
  };

  // useEffect(()=>{

  // },[getDataEdit()])

  const [selectedFileImage, setSelectedFileImage] = useState(null);

  const handleModalClose = () => {
    setSelectedFileImage(null);
  };

  // const filesOnly = state.response.fileInfos.map((imp) => imp.file);
  let pdfUrl = null;
  const handleButtonClick = (file) => {
    setSelectedFileImage(file);

    // const pdfData = atob(file);
    // const blob = new Blob([pdfData], { type: 'application/pdf' });
    // pdfUrl = URL.createObjectURL(blob);
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

    if (confirmResult.isConfirmed) {
      try {
        console.log(
          "url: " + "http://" + url + ":" + port + "/" + "deletePropertyFile"
        );
        console.log("cfg: " + JSON.stringify(cfg));
        console.log("data: " + "propertyId" + data.propertyId, "fileId" + fId);
        const deleteFile = await axios.delete(
          "http://" + url + ":" + port + "/" + "deletePropertyFile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              propertyId: data.propertyId,
              fileId: fId,
            },
          }
        );

        getDataVerify();

        // console.log("token: " + JSON.stringify(deleteFile) );
        console.log("Response: " + JSON.stringify(deleteFile.data));
      } catch (error) {}
    }
  };

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
    userId: userId,
    fileInfos: null,
    propertyId: "",
  });

  const [validatorData, setValidatorData] = useState({
    propertyId: "",
    validatoPropId: "",
    propertyName: "",
    cts: "",
    plotArea: "",
    policeStationId: 0,
    userId: 0,
    ipaddress: "",
    createdDateTime: "",
    fileDtos: [
      {
        fileId: 0,
        filename: "",
        file: "",
        filedescprtion: "",
      },
    ],
  });

  const [vGroundModel, setVGroundModel] = useState({
    groundName: "",
    groundUsageArea: "",
    groundUsageType: "",
    hasGroundCompoundWalls: true,
    groundUnderRegularMaintainence: true,
    hasAnyDispute: true,
    dispute: "",
    propertyId: 0,
    validatoPropId: 0,
    propertyType: "",
    policeStationId: 0,
    files: [
      {
        fileId: 0,
        filename: "",
        file: "",
        filedescprtion: "",
      },
    ],
    cts: 0,
    propertyArea: "",
    address1: "",
    address2: "",
    pincode: "",
    landmark: "",
    city: "",
    state: "",
    geographicLocation: "",
    latitude: "",
    longitude: "",
    userId: 0,
    ipaddress: "",
    createdDateTime: "",
  });

  const [vPlotModel, setVPlotModel] = useState({
    plotId: 0,
    hasCompoundWalls: true,
    caseInfo: "",
    hasLegalOwner: true,
    plotOwner: "",
    dateOfPurchase: "",
    byWhomOccupied: "",
    hasAnyDispute: true,
    dispute: "",
    hasFuturePlan: true,
    futurePlan: "",
    propertyId: 0,
    validatoPropId: 0,
    propertyType: "",
    policeStationId: 0,
    files: [
      {
        fileId: 0,
        filename: "",
        file: "",
        filedescprtion: "",
      },
    ],
    cts: 0,
    propertyArea: "",
    address1: "",
    address2: "",
    pincode: "",
    landmark: "",
    city: "",
    state: "",
    geographicLocation: "",
    latitude: "",
    longitude: "",
    userId: 0,
    ipaddress: "",
    createdDateTime: "",
    forcefullyOccupied: true,
    underCourtcase: true,
  });

  const [vBuildingdModel, setVBuildingdModel] = useState({
    plotId: "",
    hasCompoundWalls: true,
    caseInfo: "",
    hasLegalOwner: true,
    plotOwner: "",
    dateOfPurchase: "",
    byWhomOccupied: "",
    hasAnyDispute: true,
    dispute: "",
    hasFuturePlan: true,
    futurePlan: "",
    propertyId: 0,
    validatoPropId: 0,
    propertyType: "",
    policeStationId: 0,
    files: [
      {
        fileId: 0,
        filename: "",
        file: "",
        filedescprtion: "",
      },
    ],
    cts: 0,
    propertyArea: "",
    address1: "",
    address2: "",
    pincode: "",
    landmark: "",
    city: "",
    state: "",
    geographicLocation: "",
    latitude: "",
    longitude: "",
    userId: 0,
    ipaddress: "",
    createdDateTime: "",
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

      const fileType = file.type.split("/")[1];

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        if (file.type == "pdf") {
          resolve(`data:application/${fileType};base64,` + base64String);
        } else {
          resolve(`data:image/${fileType};base64,` + base64String);
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

  // const handleFileChange = async (id, event) => {
  //   const selectedFile = event.target.files[0];
  //   const newFileInputs = fileInputs.map(async (input) =>
  //     input.id === id
  //       ? { ...input, file: selectedFile ? await fileToBase64(selectedFile):null , fileName: selectedFile ? selectedFile.name : '' }
  //       : input
  //   );
  //   setFileInputs(newFileInputs);

  //   data.fileInfos=fileInputs;
  // };

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
    } else if (
      !flag.current &&
      fileInputs.some(
        (input) =>
          !input.documentName ||
          input.documentName.trim() === "" ||
          !input.file ||
          !input.fileName ||
          input.fileName.trim() === ""
        // !input.file.type ||
        // !['pdf','jpg','jpeg'].includes(input.file.type.split('/')[1])
      )
    ) {
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
              navigate("/mumbaipolicestation/Properties");
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
              padding: "12px 15px 12px 15px",
              fontWeight: "600",
              color: "white",
              letterSpacing: "0.5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* color:'var(--color-text)'
      backgroud:'white' */}
            <div>
              <FontAwesomeIcon
                style={{ width: "25px", color: "white", marginRight: "8px" }}
                className="icon"
                icon={faHotel}
                size="lg"
                bounce
              />

              {lang == 0 ? (
                <span>
                  P<span className="innerText">ROPERTY DATA VALIDATION</span>
                </span>
              ) : (
                <span style={{ fontSize: "21px" }}>
                  मालमत्ता डेटा प्रमाणीकरण
                </span>
              )}
            </div>

            <div>
              <FontAwesomeIcon
                style={{
                  width: "25px",
                  color: "white",
                  marginRight: "8px",
                  color: "white",
                  padding: "0 5px",
                  borderRadius: "3px",
                }}
                className="icon faCircleArrowLeft"
                icon={faCircleArrowLeft}
                size="lg"
                title="back"
                onClick={handlePropCreateBack}
              />
            </div>
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
               
               
              
              
              
            </div>

            <div
              className="createPropInputStyle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                className="createPropInputsStyles"
                value={lang == 0 ? "Remarks" : "शेरा"}
                // onClick={CreateNewProp}
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize:'15px',
                  // background: "#E50000",
                  background: "#03A9F4",
                  background:'rgb(141, 125, 112)',
                  border: "none",
                  borderRadius: "3px",
                  padding: "6px 14px",
                  // padding: "5px 20px 5px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
                type="button"
              />
               
              &nbsp;

            <input
                className="createPropInputsStyles"
                value={lang == 0 ? "Matching" : "जुळणारे"}
                // onClick={CreateNewProp}
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize:'15px',
                  // background: "#E50000",
                  background: "#66c229",
                  background:'rgb(141, 125, 112)',
                  border: "none",
                  borderRadius: "3px",
                  padding: "6px 14px",
                  // padding: "5px 20px 5px 7px",
                  fontFamily: "inherit",
                  letterSpacing: "0.5px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
                type="button"
              />
               
              &nbsp;
              <input
                className="createPropInputsStyles"
                value={lang == 0 ? "Not Matching" : "जुळत नाही"}
                // onClick={CreateNewProp}
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize:'15px',
                  // background: "#E50000",
                  background: "#ab0707",
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
               
            </div>
          </div>
           
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
                style={{ width: "47%", boxSizing: "border-box" }}
              >
                <div
                  style={{
                    background: "#8d7d70",
                    padding: "6px 20px",
                    fontWeight: "600",
                    letterSpacing: "0.7px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  {lang == 0 ? (
                    <span>
                      O
                      <span className="innerText" style={{ fontSize: "15px" }}>
                        FFICE DATA
                      </span>
                    </span>
                  ) : (
                    <span style={{ fontSize: "18px" }}>कार्यालय डेटा</span>
                  )}
                </div>
                <div style={{ background: "white", padding: "2% 0 0 4%" }}>
                  <div className="inputDataIndividualDiv">
                    <label id="propertyNameLabel">
                      {lang == 0 ? "Property name" : "मालमत्तेचे नाव"}
                      <span style={{ color: "red" }}></span>
                    </label>
                    <input readOnly value={data.propertyName} />
                  </div>
                  <br></br>

                  <div className="inputDataIndividualDiv">
                    <label>
                      {lang == 0 ? "CTS - Survey Number" : "सर्वेक्षण क्रमांक"}
                      <span style={{ color: "red" }}></span>
                    </label>
                    <input readOnly value={data.cts} />
                  </div>
                  <br></br>

                  <div className="inputDataIndividualDiv">
                    <label>
                      {lang == 0 ? "Landmark" : "महत्त्वाची खूण"}
                      <span style={{ color: "red" }}></span>
                    </label>
                    <input
                      readOnly
                      name="landmark"
                      id="landmark"
                      value={data.landmark}
                      onChange={handleChange}
                    />
                  </div>
                  <br></br>

                  <div className="inputDataIndividualDiv">
                    <label>
                      {lang == 0 ? "Location" : "स्थान"}
                      <span style={{ color: "red" }}></span>
                    </label>
                    <input
                      readOnly
                      name="landmark"
                      id="landmark"
                      value={data.location}
                      onChange={handleChange}
                    />
                  </div>
                  <br></br>

                  <div className="inputDataIndividualDiv">
                    <label>
                      {lang == 0 ? "Area" : "क्षेत्रफळ"}
                      <span style={{ color: "red" }}></span>
                    </label>
                    <input readOnly value={data.areaUnits} />
                    <input
                      readOnly
                      value={data.areaOfProperty}
                      placeholder="Area"
                    />{" "}
                  </div>

                  <div className="inputDataIndividualDiv">
                    <div className="propertyImages"></div>

                    <br></br>

                    <div
                      className="inputDataIndividualDiv addres1"
                      style={{ marginBottom: "14px" }}
                    >
                      <label>
                        {lang == 0 ? "Address" : "पत्ता"}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                          marginTop: "2px",
                        }}
                      >
                        <input
                          style={{ width: "90%" }}
                          value={data.addressLine1}
                          placeholder={
                            lang == 0 ? "Address Line 1" : "पत्ता ओळ 1"
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="inputDataIndividualDiv addres1"
                      style={{ marginBottom: "14px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "90%" }}
                          value={data.addressLine2}
                          placeholder={
                            lang == 0 ? "Address Line 2" : "पत्ता ओळ 2"
                          }
                        />
                      </div>
                    </div>

                    <div
                      className="inputDataIndividualDiv addres1"
                      style={{ marginBottom: "14px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "90%" }}
                          value={data.district}
                          // placeholder="District"
                          placeholder={lang == 0 ? "District" : "जिल्हा"}
                        />
                      </div>
                    </div>

                    <div
                      className="inputDataIndividualDiv addres1"
                      style={{ marginBottom: "14px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "90%" }}
                          value={data.city}
                          // placeholder="City"
                          placeholder={lang == 0 ? "City" : "शहर"}
                        />
                      </div>
                    </div>

                    <div
                      className="inputDataIndividualDiv addres1"
                      style={{ marginBottom: "14px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ width: "90%" }}
                          value={data.pincode}
                          placeholder={lang == 0 ? "Pincode" : "पिन कोड"}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      paddingTop: "12px",
                      paddingRight: "10px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e1dfdf",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <div
                      className="SelectProps"
                      style={{ color: "#535151", fontWeight: "600" }}
                    >
                      Open/Empty Plot(count):
                    </div>
                    <span
                      style={{
                        color: "#06a706",
                        background: "#e5e5e5",
                        padding: "5px 10px",
                      }}
                    >
                      {data.openPlot}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      paddingTop: "12px",
                      paddingRight: "10px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e1dfdf",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <div
                      className="SelectProps"
                      style={{ color: "#535151", fontWeight: "600" }}
                    >
                      Building(count):
                    </div>
                    <span
                      style={{
                        color: "#06a706",
                        background: "#e5e5e5",
                        padding: "5px 10px",
                      }}
                    >
                      {data.building}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      paddingTop: "12px",
                      paddingRight: "10px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e1dfdf",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <div
                      className="SelectProps"
                      style={{ color: "#535151", fontWeight: "600" }}
                    >
                      Ground(count):
                    </div>
                    <span
                      style={{
                        color: "#06a706",
                        background: "#e5e5e5",
                        padding: "5px 10px",
                      }}
                    >
                      {" "}
                      {data.ground}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      paddingTop: "12px",
                      paddingRight: "10px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e1dfdf",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <div
                      className="SelectProps"
                      style={{ color: "#535151", fontWeight: "600" }}
                    >
                      NA: No Property Found(count):
                    </div>
                    <span
                      style={{
                        color: "#06a706",
                        background: "#e5e5e5",
                        padding: "5px 10px",
                      }}
                    >
                      {" "}
                      {data.noProperty}
                    </span>
                  </div>

                  <br></br>

                  <div className="inputDataIndividualDiv">
                    {image && (
                      <div style={{ marginBottom: "18px" }}>
                        <label style={{ fontSize: "17px" }}>
                          Property Documents
                          <span style={{ color: "red" }}></span>
                        </label>

                        <div
                          className="viewUploadedDocs"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "7px",
                          }}
                        >
                          {filesOnly.map((file, index) => (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "60%",
                              }}
                            >
                              <div>
                                <button
                                  type="button"
                                  key={index}
                                  onClick={() => handleButtonClick(file.file)}
                                  style={{
                                    width: "100px",
                                    marginBottom: "10px",
                                    height: "32px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    letterSpacing: "0.4px",
                                    textTransform: "Capitalize",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "3px",
                                    background: "rgb(15, 125, 53)",
                                    fontFamily: "inherit",
                                    fontWeight: "600",
                                  }}
                                >
                                  View File
                                  {/* {index + 1} */}
                                </button>{" "}
                                &nbsp;
                                {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                          style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                          >
                            X
                          </button> */}
                                &nbsp;
                                <label
                                  style={{
                                    fontSize: "14px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {file.filename}
                                </label>
                              </div>

                              <div></div>
                            </div>
                          ))}

                          {selectedFileImage && (
                            <div className="modal-overlay">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <button
                                    className="modal-close"
                                    onClick={handleModalClose}
                                    style={{
                                      background: "gray",
                                      color: "white",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    &times;
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <img
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "70vh",
                                    }}
                                    src={selectedFileImage}
                                    alt="Selected"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="Subdiv1"
                style={{ width: "47%", boxSizing: "border-box" }}
              >
                <div
                  style={{
                    background: "#8d7d70",
                    padding: "6px 20px",
                    fontWeight: "600",
                    letterSpacing: "0.7px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  {lang == 0 ? (
                    <span>
                      V
                      <span className="innerText" style={{ fontSize: "15px" }}>
                        ALIDATOR DATA
                      </span>
                    </span>
                  ) : (
                    <span style={{ fontSize: "18px" }}>सत्यापनकर्ता डेटा</span>
                  )}
                </div>

                <div style={{background:'white'}}>
                <br></br>
                </div>
                <div
                 onClick={handleValidatorBasic}
                className="basicDiv"
                  style={{
                    background: "white",
                    padding: "20px 20px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                  className="basicDiv1"
                    style={{
                      width: "250px",
                      background: "rgb(83 115 131)",
                      padding: "6px 20px",
                      fontWeight: "600",
                      letterSpacing: "0.7px",
                      color: "white",
                      fontSize: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                   
                  >
                    {lang == 0 ? <span><span style={{fontSize:'17px'}}>V</span><span style={{fontSize: "14px"}}>IEW BASIC</span></span>: "मूलभूत पहा"}
                  </div>
                </div>

                <CSSTransition
                  in={validatorBasic}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                >
                  <div  ref={nodeRef} className="validatorBasic">
                    
                    <div style={{ background: "white", padding: "2% 0 0 4%" }}>
                      <div className="inputDataIndividualDiv">
                        <label id="propertyNameLabel">
                          {lang == 0 ? "Property name" : "मालमत्तेचे नाव"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          readOnly
                          color="inherit"
                          name="propertyName"
                          id="propertyName"
                          value={data.propertyName}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0
                            ? "CTS - Survey Number"
                            : "सर्वेक्षण क्रमांक"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          color="inherit"
                          name="cts"
                          id="cts"
                          value={data.cts}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Landmark" : "महत्त्वाची खूण"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          name="landmark"
                          id="landmark"
                          value={data.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Location" : "स्थान"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          name="location"
                          id="location"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select location</option>
                          <option value="MADHAPUR">MADHAPUR</option>
                          <option value="HITECHCITY">HITECHCITY</option>
                          <option value="GACHIBOWLI">GACHIBOWLI</option>
                        </select>
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Area" : "क्षेत्रफळ"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          id="areaUnits"
                          name="areaUnits"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select Area Units(Sqr ft.)</option>
                          <option value="SQR_FT.">SQR FT.</option>
                          <option value="SQR_YARD">SQR YARD</option>
                          <option value="MT_SQR.">MT SQR</option>
                        </select>

                        <div className="propertyImages">
                          <input
                            name="areaOfProperty"
                            id="areaOfProperty"
                            value={data.areaOfProperty}
                            onChange={handleChange}
                            pattern="[0-9]*[.]?[0-9]*"
                            title="Please enter a valid numeric value"
                            placeholder="Area"
                          />{" "}
                        </div>

                        <br></br>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <label>
                            {lang == 0 ? "Address" : "पत्ता"}
                            <span style={{ color: "red" }}></span>
                          </label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine1"
                              id="addressLine1"
                              value={data.addressLine1}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 1" : "पत्ता ओळ 1"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine2"
                              id="addressLine2"
                              value={data.addressLine2}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 2" : "पत्ता ओळ 2"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="district"
                              id="district"
                              value={data.district}
                              onChange={handleChange}
                              // placeholder="District"
                              placeholder={lang == 0 ? "District" : "जिल्हा"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="city"
                              id="city"
                              value={data.city}
                              onChange={handleChange}
                              // placeholder="City"
                              placeholder={lang == 0 ? "City" : "शहर"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="pincode"
                              id="pincode"
                              value={data.pincode}
                              onChange={handleChange}
                              placeholder={lang == 0 ? "Pincode" : "पिन कोड"}
                              pattern="[0-9]*"
                              title="Please enter a valid numeric value"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="inputDataIndividualDiv">
                        {image && (
                          <div style={{ marginBottom: "18px" }}>
                            <label style={{ fontSize: "17px" }}>
                              Property Documents
                              <span style={{ color: "red" }}></span>
                            </label>

                            <div
                              className="viewUploadedDocs"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "7px",
                              }}
                            >
                              {filesOnly.map((file, index) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "60%",
                                  }}
                                >
                                  <div>
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={() =>
                                        handleButtonClick(file.file)
                                      }
                                      style={{
                                        width: "100px",
                                        marginBottom: "10px",
                                        height: "32px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        letterSpacing: "0.4px",
                                        textTransform: "Capitalize",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        background: "rgb(15, 125, 53)",
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                      }}
                                    >
                                      View File
                                      {/* {index + 1} */}
                                    </button>{" "}
                                    &nbsp;
                                    {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                              style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                              >
                                X
                              </button> */}
                                    &nbsp;
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {file.filename}
                                    </label>
                                  </div>

                                  <div></div>
                                </div>
                              ))}

                              {selectedFileImage && (
                                <div className="modal-overlay">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        className="modal-close"
                                        onClick={handleModalClose}
                                        style={{
                                          background: "gray",
                                          color: "white",
                                          borderRadius: "2px",
                                        }}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "70vh",
                                        }}
                                        src={selectedFileImage}
                                        alt="Selected"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  
                  </div>
                </CSSTransition>

                 
                <div
                 onClick={handleValidatorPlot}
                className="basicDiv"
                  style={{
                    background: "white",
                    padding: "20px 20px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                  className="basicDiv1"
                    style={{
                      width: "250px",
                      background: "rgb(83 115 131)",
                      padding: "6px 20px",
                      fontWeight: "600",
                      letterSpacing: "0.7px",
                      color: "white",
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                   
                  >
                    {lang == 0 ? <span><span style={{fontSize:'18px'}}>V</span><span style={{fontSize: "14px"}} >IEW PLOT</span></span>: "प्लॉट पहा"}
                    
                  </div>
                </div>

                <CSSTransition 
                in={validatorPlot} nodeRef={nodeRef1}  classNames="alert"
                  timeout={300} unmountOnExit>
                    <div ref={nodeRef1} className="validatorPlot">
                    <div style={{ background: "white", padding: "2% 0 0 4%" }}>
                      <div className="inputDataIndividualDiv">
                        <label id="propertyNameLabel">
                          {lang == 0 ? "Property name" : "मालमत्तेचे नाव"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          readOnly
                          color="inherit"
                          name="propertyName"
                          id="propertyName"
                          value={data.propertyName}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0
                            ? "CTS - Survey Number"
                            : "सर्वेक्षण क्रमांक"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          color="inherit"
                          name="cts"
                          id="cts"
                          value={data.cts}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Landmark" : "महत्त्वाची खूण"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          name="landmark"
                          id="landmark"
                          value={data.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Location" : "स्थान"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          name="location"
                          id="location"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select location</option>
                          <option value="MADHAPUR">MADHAPUR</option>
                          <option value="HITECHCITY">HITECHCITY</option>
                          <option value="GACHIBOWLI">GACHIBOWLI</option>
                        </select>
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Area" : "क्षेत्रफळ"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          id="areaUnits"
                          name="areaUnits"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select Area Units(Sqr ft.)</option>
                          <option value="SQR_FT.">SQR FT.</option>
                          <option value="SQR_YARD">SQR YARD</option>
                          <option value="MT_SQR.">MT SQR</option>
                        </select>

                        <div className="propertyImages">
                          <input
                            name="areaOfProperty"
                            id="areaOfProperty"
                            value={data.areaOfProperty}
                            onChange={handleChange}
                            pattern="[0-9]*[.]?[0-9]*"
                            title="Please enter a valid numeric value"
                            placeholder="Area"
                          />{" "}
                        </div>

                        <br></br>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <label>
                            {lang == 0 ? "Address" : "पत्ता"}
                            <span style={{ color: "red" }}></span>
                          </label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine1"
                              id="addressLine1"
                              value={data.addressLine1}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 1" : "पत्ता ओळ 1"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine2"
                              id="addressLine2"
                              value={data.addressLine2}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 2" : "पत्ता ओळ 2"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="district"
                              id="district"
                              value={data.district}
                              onChange={handleChange}
                              // placeholder="District"
                              placeholder={lang == 0 ? "District" : "जिल्हा"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="city"
                              id="city"
                              value={data.city}
                              onChange={handleChange}
                              // placeholder="City"
                              placeholder={lang == 0 ? "City" : "शहर"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="pincode"
                              id="pincode"
                              value={data.pincode}
                              onChange={handleChange}
                              placeholder={lang == 0 ? "Pincode" : "पिन कोड"}
                              pattern="[0-9]*"
                              title="Please enter a valid numeric value"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="inputDataIndividualDiv">
                        {image && (
                          <div style={{ marginBottom: "18px" }}>
                            <label style={{ fontSize: "17px" }}>
                              Property Documents
                              <span style={{ color: "red" }}></span>
                            </label>

                            <div
                              className="viewUploadedDocs"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "7px",
                              }}
                            >
                              {filesOnly.map((file, index) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "60%",
                                  }}
                                >
                                  <div>
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={() =>
                                        handleButtonClick(file.file)
                                      }
                                      style={{
                                        width: "100px",
                                        marginBottom: "10px",
                                        height: "32px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        letterSpacing: "0.4px",
                                        textTransform: "Capitalize",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        background: "rgb(15, 125, 53)",
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                      }}
                                    >
                                      View File
                                      {/* {index + 1} */}
                                    </button>{" "}
                                    &nbsp;
                                    {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                              style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                              >
                                X
                              </button> */}
                                    &nbsp;
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {file.filename}
                                    </label>
                                  </div>

                                  <div></div>
                                </div>
                              ))}

                              {selectedFileImage && (
                                <div className="modal-overlay">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        className="modal-close"
                                        onClick={handleModalClose}
                                        style={{
                                          background: "gray",
                                          color: "white",
                                          borderRadius: "2px",
                                        }}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "70vh",
                                        }}
                                        src={selectedFileImage}
                                        alt="Selected"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    </div>

                </CSSTransition>

                <div
                onClick={handleValidatorBuilding}
                className="basicDiv"
                  style={{
                    background: "white",
                    padding: "20px 20px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <div
                  className="basicDiv1"
                    style={{
                      width: "250px",
                      background: "rgb(83 115 131)",
                      padding: "6px 20px",
                      fontWeight: "600",
                      letterSpacing: "0.7px",
                      color: "white",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    
                  >
                    {lang == 0 ? <span><span style={{fontSize:'18px'}}>V</span><span style={{fontSize: "14px"}} >IEW BUILDING</span></span>: "इमारत पहा"}
                    
                  </div>
                </div>

                <CSSTransition
                in={validatorBuilding}
                unmountOnExit timeout={300}
                classNames="alert" 
                >
 
               
                    <div style={{ background: "white", padding: "2% 0 0 4%" }}>
                      <div className="inputDataIndividualDiv">
                        <label id="propertyNameLabel">
                          {lang == 0 ? "Property name" : "मालमत्तेचे नाव"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          readOnly
                          color="inherit"
                          name="propertyName"
                          id="propertyName"
                          value={data.propertyName}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0
                            ? "CTS - Survey Number"
                            : "सर्वेक्षण क्रमांक"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          color="inherit"
                          name="cts"
                          id="cts"
                          value={data.cts}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Landmark" : "महत्त्वाची खूण"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          name="landmark"
                          id="landmark"
                          value={data.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Location" : "स्थान"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          name="location"
                          id="location"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select location</option>
                          <option value="MADHAPUR">MADHAPUR</option>
                          <option value="HITECHCITY">HITECHCITY</option>
                          <option value="GACHIBOWLI">GACHIBOWLI</option>
                        </select>
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Area" : "क्षेत्रफळ"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          id="areaUnits"
                          name="areaUnits"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select Area Units(Sqr ft.)</option>
                          <option value="SQR_FT.">SQR FT.</option>
                          <option value="SQR_YARD">SQR YARD</option>
                          <option value="MT_SQR.">MT SQR</option>
                        </select>

                        <div className="propertyImages">
                          <input
                            name="areaOfProperty"
                            id="areaOfProperty"
                            value={data.areaOfProperty}
                            onChange={handleChange}
                            pattern="[0-9]*[.]?[0-9]*"
                            title="Please enter a valid numeric value"
                            placeholder="Area"
                          />{" "}
                        </div>

                        <br></br>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <label>
                            {lang == 0 ? "Address" : "पत्ता"}
                            <span style={{ color: "red" }}></span>
                          </label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine1"
                              id="addressLine1"
                              value={data.addressLine1}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 1" : "पत्ता ओळ 1"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine2"
                              id="addressLine2"
                              value={data.addressLine2}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 2" : "पत्ता ओळ 2"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="district"
                              id="district"
                              value={data.district}
                              onChange={handleChange}
                              // placeholder="District"
                              placeholder={lang == 0 ? "District" : "जिल्हा"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="city"
                              id="city"
                              value={data.city}
                              onChange={handleChange}
                              // placeholder="City"
                              placeholder={lang == 0 ? "City" : "शहर"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="pincode"
                              id="pincode"
                              value={data.pincode}
                              onChange={handleChange}
                              placeholder={lang == 0 ? "Pincode" : "पिन कोड"}
                              pattern="[0-9]*"
                              title="Please enter a valid numeric value"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="inputDataIndividualDiv">
                        {image && (
                          <div style={{ marginBottom: "18px" }}>
                            <label style={{ fontSize: "17px" }}>
                              Property Documents
                              <span style={{ color: "red" }}></span>
                            </label>

                            <div
                              className="viewUploadedDocs"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "7px",
                              }}
                            >
                              {filesOnly.map((file, index) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "60%",
                                  }}
                                >
                                  <div>
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={() =>
                                        handleButtonClick(file.file)
                                      }
                                      style={{
                                        width: "100px",
                                        marginBottom: "10px",
                                        height: "32px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        letterSpacing: "0.4px",
                                        textTransform: "Capitalize",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        background: "rgb(15, 125, 53)",
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                      }}
                                    >
                                      View File
                                      {/* {index + 1} */}
                                    </button>{" "}
                                    &nbsp;
                                    {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                              style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                              >
                                X
                              </button> */}
                                    &nbsp;
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {file.filename}
                                    </label>
                                  </div>

                                  <div></div>
                                </div>
                              ))}

                              {selectedFileImage && (
                                <div className="modal-overlay">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        className="modal-close"
                                        onClick={handleModalClose}
                                        style={{
                                          background: "gray",
                                          color: "white",
                                          borderRadius: "2px",
                                        }}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "70vh",
                                        }}
                                        src={selectedFileImage}
                                        alt="Selected"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                     


                </CSSTransition>

                <div
                onClick={handleValidatorGround}
                className="basicDiv"
                  style={{
                    background: "white",
                    padding: "20px 20px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <div
                  className="basicDiv1"
                    style={{
                      width: "250px",
                      background: "rgb(83 115 131)",
                      padding: "6px 20px",
                      fontWeight: "600",
                      letterSpacing: "0.7px",
                      color: "white",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    
                  >
                    {lang == 0 ? <span><span style={{fontSize:'18px'}}>V</span><span style={{fontSize: "14px"}} >IEW GROUND</span></span>: "ग्राउंड पहा"}
                    
                  </div>
                </div>

                <CSSTransition
                in={validatorGround}
                unmountOnExit timeout={300}
                classNames="alert" 
                > 
                    <div style={{ background: "white", padding: "2% 0 0 4%" }}>
                      <div className="inputDataIndividualDiv">
                        <label id="propertyNameLabel">
                          {lang == 0 ? "Property name" : "मालमत्तेचे नाव"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          readOnly
                          color="inherit"
                          name="propertyName"
                          id="propertyName"
                          value={data.propertyName}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0
                            ? "CTS - Survey Number"
                            : "सर्वेक्षण क्रमांक"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          color="inherit"
                          name="cts"
                          id="cts"
                          value={data.cts}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Landmark" : "महत्त्वाची खूण"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <input
                          name="landmark"
                          id="landmark"
                          value={data.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Location" : "स्थान"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          name="location"
                          id="location"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select location</option>
                          <option value="MADHAPUR">MADHAPUR</option>
                          <option value="HITECHCITY">HITECHCITY</option>
                          <option value="GACHIBOWLI">GACHIBOWLI</option>
                        </select>
                      </div>
                      <br></br>

                      <div className="inputDataIndividualDiv">
                        <label>
                          {lang == 0 ? "Area" : "क्षेत्रफळ"}
                          <span style={{ color: "red" }}></span>
                        </label>
                        <select
                          id="areaUnits"
                          name="areaUnits"
                          style={{
                            width: "91%",
                            fontWeight: "400",
                            color: "#737373",
                            boxSizing: "border-box",
                            outline: "none",

                            border: "none",
                            background: "#e5e5e5",
                            borderRadius: "3px",
                            fontFamily: "inherit",
                            letterSpacing: "0.5px",
                          }}
                          onChange={handleChange}
                        >
                          <option value="">Select Area Units(Sqr ft.)</option>
                          <option value="SQR_FT.">SQR FT.</option>
                          <option value="SQR_YARD">SQR YARD</option>
                          <option value="MT_SQR.">MT SQR</option>
                        </select>

                        <div className="propertyImages">
                          <input
                            name="areaOfProperty"
                            id="areaOfProperty"
                            value={data.areaOfProperty}
                            onChange={handleChange}
                            pattern="[0-9]*[.]?[0-9]*"
                            title="Please enter a valid numeric value"
                            placeholder="Area"
                          />{" "}
                        </div>

                        <br></br>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <label>
                            {lang == 0 ? "Address" : "पत्ता"}
                            <span style={{ color: "red" }}></span>
                          </label>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                              marginTop: "2px",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine1"
                              id="addressLine1"
                              value={data.addressLine1}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 1" : "पत्ता ओळ 1"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="addressLine2"
                              id="addressLine2"
                              value={data.addressLine2}
                              onChange={handleChange}
                              placeholder={
                                lang == 0 ? "Address Line 2" : "पत्ता ओळ 2"
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="district"
                              id="district"
                              value={data.district}
                              onChange={handleChange}
                              // placeholder="District"
                              placeholder={lang == 0 ? "District" : "जिल्हा"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="city"
                              id="city"
                              value={data.city}
                              onChange={handleChange}
                              // placeholder="City"
                              placeholder={lang == 0 ? "City" : "शहर"}
                            />
                          </div>
                        </div>

                        <div
                          className="inputDataIndividualDiv addre"
                          style={{ marginBottom: "14px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{ width: "90%" }}
                              name="pincode"
                              id="pincode"
                              value={data.pincode}
                              onChange={handleChange}
                              placeholder={lang == 0 ? "Pincode" : "पिन कोड"}
                              pattern="[0-9]*"
                              title="Please enter a valid numeric value"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="inputDataIndividualDiv">
                        {image && (
                          <div style={{ marginBottom: "18px" }}>
                            <label style={{ fontSize: "17px" }}>
                              Property Documents
                              <span style={{ color: "red" }}></span>
                            </label>

                            <div
                              className="viewUploadedDocs"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "7px",
                              }}
                            >
                              {filesOnly.map((file, index) => (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "60%",
                                  }}
                                >
                                  <div>
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={() =>
                                        handleButtonClick(file.file)
                                      }
                                      style={{
                                        width: "100px",
                                        marginBottom: "10px",
                                        height: "32px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        letterSpacing: "0.4px",
                                        textTransform: "Capitalize",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "3px",
                                        background: "rgb(15, 125, 53)",
                                        fontFamily: "inherit",
                                        fontWeight: "600",
                                      }}
                                    >
                                      View File
                                      {/* {index + 1} */}
                                    </button>{" "}
                                    &nbsp;
                                    {/* <button id="delBtn" type="button" key={index} onClick={() => handleDeleteFile(file.fileId)}
                              style={{width:'auto',padding:'0 10px', marginBottom:'10px',height:'32px',fontSize:'14px', fontWeight:'500',letterSpacing:'0.4px', textTransform:'Capitalize',color:"white",border:'none',borderRadius:'3px',background:'rgb(153, 12, 25)',fontFamily:'inherit',fontWeight:'600' }} 
                              >
                                X
                              </button> */}
                                    &nbsp;
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {file.filename}
                                    </label>
                                  </div>

                                  <div></div>
                                </div>
                              ))}

                              {selectedFileImage && (
                                <div className="modal-overlay">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        className="modal-close"
                                        onClick={handleModalClose}
                                        style={{
                                          background: "gray",
                                          color: "white",
                                          borderRadius: "2px",
                                        }}
                                      >
                                        &times;
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "70vh",
                                        }}
                                        src={selectedFileImage}
                                        alt="Selected"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div> 
                </CSSTransition> 

                <div style={{background:'white'}}>
                <br></br>
                </div>
              </div>
            </div>
           
        </div>
      </div>
    </div>
  );
};
export default Propertydatavalidation;
