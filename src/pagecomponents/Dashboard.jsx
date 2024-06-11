import React, { useContext, useEffect, useState } from "react";
import Sidevavbar from "./Sidevavbar"; 
import "./Login.css";
import "./Dashboard.css";
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
// import { Bar, Radar, Doughnut, PolarArea, Scatter } from "react-chartjs-2";
// import { Bar } from 'react-chartjs-2';
import Header from "./Header"; 

import { Doughnut } from 'react-chartjs-2';

import Chart from "chart.js/auto";
import { Line,Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import lang from '../assets/images/translate.png'

import { languageContext } from "../App";





const Dashboard = () => {

  const {lang , setLang} = useContext(languageContext);

  const navigate = useNavigate();
//   useEffect(()=>{
// if(sessionStorage.getItem("token")=="" || sessionStorage.getItem("token")==null ){
//   Swal.fire({
//     position: "top-end",
//     width: "auto",
//     // padding: '0',
//     showConfirmButton: false,
//     background: "rgb(153, 12, 25)",
//     html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Session expired,Please login</p>',
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
//    navigate("/mumbaipolicestation"); 
// }
//   },[]);

  const labels = ["Total", " Validated", "Validators ","Pending"];

  const data = {
    labels: labels,
    
    datasets: [
      {
        label: ["Total"],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [56,21,34,56],
        barThickness: 25, 
        backgroundColor: [
          'rgb(2, 141, 128,1)',
          'rgb(121, 85, 72,1)',
          'rgb(235, 176, 0,1)',
          'rgb(183, 41, 13,1)',
           
        ],
        borderColor: [
          'rgb(2, 141, 128,1)',
          'rgb(121, 85, 72,1)',
          'rgb(235, 176, 0,1)',
          'rgb(183, 41, 13,1)',
           
        ],
         
      },
    ],
  };
 
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio to adjust both width and height

    scales: {
      x: {
        grid: {
          display: false, // Set to false to hide x-axis grid lines
        },
      },
      y: {
        grid: {
          // display: false, // Set to false to hide x-axis grid lines
        },
      },
    },
     
  };


  const ddata = {
    // labels: labels,
    
    datasets: [
      {
        // label: ["Total"],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [56,21,34,35],
        // barThickness: 25, 
        backgroundColor: [
          'rgb(2, 141, 128,1)',
          'rgb(121, 85, 72,1)',
          'rgb(235, 176, 0,1)',
          'rgb(183, 41, 13,1)',
           
        ],
        borderColor: [
          'rgb(2, 141, 128,1)',
          'rgb(121, 85, 72,1)',
          'rgb(235, 176, 0,1)',
          'rgb(183, 41, 13,1)',
           
        ],
        // cutoutPercentage: 50, 
         
      },
    ],
  };


  const doptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio to adjust both width and height
    // cutoutPercentage: 50, 
    cutout: '60%',
    scales: {
      x: {
        display: false,
        grid: {
          display: false, // Set to false to hide x-axis grid lines
        },
         
      },
      y: {
        display: false,
        grid: {
          display: false, // Set to false to hide x-axis grid lines
        },
       
       
      },
    },

    plugins: {
      datalabels: {
        color: 'white',
        font: {
          size: 14,
        },
        formatter: (value, context) => {
          return value; // You can customize the label content here
        },
      },
    },
  
    
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
              // background: "#104A80",
              background: "rgb(3 44 83)",
              // background:'',
              padding: "12px 0 12px 15px",
              fontWeight: "600",
              color: "white",
              letterSpacing: "0.5px",
            }}
          >
            {/* color:'var(--color-text)'
      backgroud:'white' */}
            <FontAwesomeIcon
              bounce
              style={{ width: "25px", color: "white", marginRight: "8px" }}
              className="icon"
              icon={faChartSimple}
              size="lg"              
            />
             {lang === 0 ? 
             (
              <span>
                D<span className="innerText">ASHBOARD</span>
              </span>
              ) : (
                <span style={{fontSize:'21px'}}>
                  डॅशबोर्ड
                  </span>
              )}

          </div>

          <div
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1%",
              flexDirection: "column",
            }}
          >
            <div
              className="Subdiv1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0% 0 0 0%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#7878b3",
                  background:'white',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                   // Add transition for smooth animation

                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    // color: "rgb(253 253 253)",
                    
                  }}
                >
                  
                {lang==0?'Number of Properties':'गुणधर्मांची संख्या'}
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                    background: 'rgb(2, 141, 128)', 
                    borderRadius: '50%', // Set border radius to create a circular background
                    width: '70px', // Set width and height to create a square container
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  56
                </div>
              </div>

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#7878b3",
                  background:'white',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    // color: "rgb(253 253 253)",
                    
                  }}
                >
                  
                {lang==0?'Properties Validated':'गुणधर्म प्रमाणित'}
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                    background: '#795548', 
                    borderRadius: '50%', // Set border radius to create a circular background
                    width: '70px', // Set width and height to create a square container
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  21
                </div>
              </div>

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#7878b3",
                  background:'white',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    // color: "rgb(253 253 253)",
                    
                  }}
                >
                {lang==0?'Total Validators':'एकूण प्रमाणक'}                 
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                    background: 'rgb(235 176 0)', 
                    borderRadius: '50%', // Set border radius to create a circular background
                    width: '70px', // Set width and height to create a square container
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  34
                </div>
              </div>

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#7878b3",
                  background:'white',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    // color: "rgb(253 253 253)",
                    
                  }}
                >
                   {lang==0?'Properties Pending':'मालमत्ता प्रलंबित'}
                  
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                    background: 'rgb(183 41 13)', 
                    borderRadius: '50%', // Set border radius to create a circular background
                    width: '70px', // Set width and height to create a square container
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  35
                </div>
              </div>

              {/* <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#78b3ae",
                  background:'#795548',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "rgb(253 253 253)",
                  }}
                >
                  Properties Validated
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                  }}
                >
                  2
                </div>
              </div>

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  background:'rgb(235 176 0)',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "rgb(253 253 253)",
                  }}
                >
                  Total Validators
                </div>
                <div
                 className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                  }}
                >
                  34
                </div>
              </div>

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "17%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#F08A76",
                  background:'rgb(183 41 13)',
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                }}
              >
                <div
                className="smalldivContainersH1"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "rgb(253 253 253)",
                  }}
                >
                  Properties Validated
                </div>
                <div
                className="smalldivContainersH2"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "600",
                  }}
                >
                  56
                </div>
              </div> */}

              <div
              className="smalldivContainers"
                style={{
                  height: "160px",
                  width: "22%",
                  border: "none",
                  // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  // background: "#F08A76",
                  // background:'rgb(183 41 13)',
                  background:'white',
                  // padding:'10px',
                   
                  
                   
                  // paddingTop: "10px",
                  boxSizing: "border-box",
                  // fontFamily: "inherit",
                  // color: "#404040",
                  display:'flex',
                  justifyContent:'flex-start',
                  alignItems:'center',
                  paddingBottom:'10px',

                }}
              > 
<Doughnut data={ddata} options={doptions} plugins={[ChartDataLabels]}/>
              </div>
            
            
            
            
            
            </div>

            <div  className="Subdiv1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0% 0 0 0%",
                display: "flex",
                marginTop:'2%',

                justifyContent: "flex-start",
              }} > 
              <div
              className="barChart"
                style={{
                  height: "300px", 
                  width: "58%",                  
                  border: "none",                   
                  background:'white',                  
                   alignItems: "center",
                  display: "flex",
                  justifyContent: "center",                  
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                  padding:'5px 10px',
                  borderRadius:'3px'
                }}
              > 
              <Bar data={data} options={options} />
              </div>  

              <div
              className="tableValidators"
                style={{
                  height: "300px", 
                  width: "40%",
                  marginLeft:'2%',                  
                  border: "none",                   
                  // background:'white',                  
                   
                  display: "flex",
                  flexDirection:'column',
                                   
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  color: "#404040",
                    background:'white' ,
                    overflow: 'auto',   
                }}
              >
                  {/* <Doughnut data={ddata} options={doptions} /> */}

                  <div
                 
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                    color: "white", 
                    // padding:'10px 15px',
                    padding: "10px 0 10px 15px",
                    background: "#8d7d70",
                    
                    // paddingLeft:'10px',
                    letterSpacing: "0.7px",
                    position: "sticky",
                    top: '0',
                    zIndex: '1',
                    
                  }}
                >
                  {lang==0?'Validators Data':'प्रमाणीकरणकर्ते डेटा'}
                  </div>
                   
                  <table style={{ width: '100%', }}>
                    <thead style={{  }} >
                      <tr>
                        <th>{lang==0?'Sno':'अनुक्रमांक'}</th>
                        <th>{lang==0?'Validator':'प्रमाणीकरण करणारा'}</th>
                        <th>{lang==0?'Badge ID':'बॅज ओळख'}</th>
                         
                      </tr>
                    </thead>
                    <tbody style={{   }}>
                      {/* {data.map((item) => ( */}
                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Akhil</td>
                          <td>MP 98127</td>
                           
                        </tr>
                      {/* ))} */}

                      <tr >
                        {/* key={item.id} */}
                          <td>002</td>
                          <td>Rahul</td>
                          <td>Open/Empty plot</td>
                           
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>003</td>
                          <td>Kiran</td>
                          <td>MP 98127</td>
                           
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>004</td>
                          <td>Rishi</td>
                          <td>MP 98127</td>
                           
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>005</td>
                          <td>koti</td>
                          <td>MP 98127</td>
                           
                        </tr>

                      

                          
                        
                    </tbody>
                  </table>
                 



              </div>  
            </div> 

            <div
              className="Subdiv1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "2% 0 0 0%", 
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
                    
                    // paddingLeft:'10px',
                    letterSpacing: "0.7px",
                  }}
                >
                  Recent Validation
                </div>

                <div className="dataTable dash">
                  <table >
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th className="cts">Survey Number CTS</th>
                        <th>Type</th>
                        <th>Ownership</th>
                        <th className="location">Location</th>
                        <th>Plot Area</th>
                        <th>Validated Date & Time</th>
                        {/* <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* {data.map((item) => ( */}
                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>MH - 11123</td>
                          <td>Open/Empty plot</td>
                          <td>Mumbai Police</td>
                          <td>23rd block, Antheri, Mumbai, Landmark: Near Sunshine  apartment</td>
                          <td>2000 Sq.ft</td>
                          <td>2:00</td>
                          {/* <td>{item.status}</td> */}
                        </tr>
                      {/* ))} */}

                      <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>MH - 11123</td>
                          <td>Open/Empty plot</td>
                          <td>Mumbai Police</td>
                          <td>23rd block, Antheri, Mumbai, Landmark: Near Sunshine  apartment</td>
                          <td>2000 Sq.ft</td>
                          <td>2:00</td>
                          {/* <td>{item.status}</td> */}
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>MH - 11123</td>
                          <td>Open/Empty plot</td>
                          <td>Mumbai Police</td>
                          <td>23rd block, Antheri, Mumbai, Landmark: Near Sunshine  apartment</td>
                          <td>2000 Sq.ft</td>
                          <td>2:00</td>
                          {/* <td>{item.status}</td> */}
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>MH - 11123</td>
                          <td>Open/Empty plot</td>
                          <td>Mumbai Police</td>
                          <td>23rd block, Antheri, Mumbai, Landmark: Near Sunshine  apartment</td>
                          <td>2000 Sq.ft</td>
                          <td>2:00</td>
                          {/* <td>{item.status}</td> */}
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>MH - 11123</td>
                          <td>Open/Empty plot</td>
                          <td>Mumbai Police</td>
                          <td>23rd block, Antheri, Mumbai, Landmark: Near Sunshine  apartment</td>
                          <td>2000 Sq.ft</td>
                          <td>2:00</td>
                          {/* <td>{item.status}</td> */}
                        </tr>
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
export default Dashboard;
