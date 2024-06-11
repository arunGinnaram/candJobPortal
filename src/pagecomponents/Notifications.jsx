import React, { useEffect, useState } from "react";
import Sidevavbar from "./Sidevavbar";
import "./Login.css";
import "./Notifications.css";
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
  faTrash,faEye, faMagnifyingGlass ,faDownload,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

const Notifications = () => {

  const navigate = useNavigate();
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

  const data = [
    { id: 1, name: 'John Doe', age: 25, city: 'New York', occupation: 'Developer', salary: '$80,000', date: '2022-01-01', status: 'Active' },
     
  ];

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
              display:'flex',
              justifyContent:'space-between'
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
            N<span className="innerText">OTIFICATIONS</span>
            </div>
            {/* <div>
            <input  value="CREATE PROPERTY" style={{ fontWeight:'600',color:'white',background:'#E50000',border:'none',borderRadius:'3px',padding:'6px 10px',fontFamily:'inherit',letterSpacing:'0.5px' }} type="button"    />
              <input type="text" style={{height:'25px'}}  />
            </div> */}

          </div>

          {/* <div
            className="mainHeading"
            style={{
               
              // background: "white",
               
              padding: "8px 0px 0px 0px",
              fontWeight: "600",
              // color: "white",
              // letterSpacing: "0.5px",
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          > 
              <div style={{display:'flex',             
              alignItems:'center'}}>
                <span style={{
                background: 'rgb(2, 141, 128)',
                padding: '8.5px',
                borderTopLeftRadius: '3px',
                borderBottomLeftRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                
              }}>
                <FontAwesomeIcon style={{ color: 'white' }} icon={faMagnifyingGlass} />
              </span>
              
              
              <input  className="search" type="text"  placeholder="Search Properties" 
              style={{ fontWeight:'400',color:'#737373' ,boxSizing:'border-box',outline: 'none',fontSize:'16px',
              border:'none', borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',padding:'7px 20px 7px 7px',
              fontFamily:'inherit',letterSpacing:'0.5px',background:'white',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}   />
                &nbsp;

                <select  className="type" type="text"  placeholder="Search Properties" 
              style={{ fontWeight:'400',color:'#737373' ,boxSizing:'border-box',outline: 'none',fontSize:'16px',
              border:'none', borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',padding:'6px 20px 6px 6px',
              fontFamily:'inherit',letterSpacing:'0.5px',background:'white',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}> 
              <option value="">Type</option>
              <option value="">Open/Empty plot</option>
              <option value="">building</option>
              <option value="">ground</option>
              <option value="">NA</option>
              
              </select>

              &nbsp;
              <select  className="validator" type="text"  placeholder="Search Properties" 
              style={{ fontWeight:'400',color:'#737373' ,boxSizing:'border-box',outline: 'none',fontSize:'16px',
              border:'none', borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',padding:'6px 20px 6px 6px',
              fontFamily:'inherit',letterSpacing:'0.5px',background:'white',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}> 
              <option value="">Validator</option>
              <option value="">Open/Empty plot</option>
              <option value="">building</option>
              <option value="">ground</option>
              <option value="">NA</option>
              
              </select>
                
                
              
              </div>

              <div style={{display:'flex',             
              alignItems:'center'}}>
              <input  value="CREATE PROPERTY" 
              style={{
                 fontWeight:'600',
                 color:'white',background:'#E50000',border:'none',borderRadius:'3px',
                 padding:'10px 10px',fontFamily:'inherit',letterSpacing:'0.5px', boxSizing:'border-box',outline: 'none',
                 }} type="button"    />
                &nbsp;
                <span style={{
                background: 'rgb(2, 141, 128)',
                padding: '8.5px',
                borderTopLeftRadius: '3px',
                borderBottomLeftRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                
              }}>
                 
                <FontAwesomeIcon style={{ color: 'white' }} icon={faDownload} />
              </span>
                <select  className="type" type="text"  placeholder="Search Properties" 
              style={{ fontWeight:'400',color:'#737373' ,boxSizing:'border-box',outline: 'none',fontSize:'16px',
              border:'none', borderTopRightRadius: '3px',
              borderBottomRightRadius: '3px',padding:'6px 0px 6px 6px',
              fontFamily:'inherit',letterSpacing:'0.5px',background:'white',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}> 
              <option value="">Export</option>
              <option value="">Pdf</option>
              <option value="">Excel</option>               
              </select> 
              </div>

          </div> */}

          <div
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              
              flexDirection: "column",
            }}
          >
            

            <div
              className="Subdiv1"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "1% 0 0 0%", 
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
                    fontFamily:'inherit', 
                    // paddingLeft:'10px',
                    letterSpacing: "0.6px",
                  }}
                >
                  Notifications list
                </div>

                <div className="dataTable not">
                  <table>
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Notification Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Message</th>                          
                      </tr>
                    </thead>
                    <tbody>
                      {/* {data.map((item) => ( */}
                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Validation</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been completed</td>
                            
                        </tr>
                      {/* ))} */}

                      <tr >
                        {/* key={item.id} */}
                          <td>002</td>
                          <td>Desk 8</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been created</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>003</td>
                          <td>Validation</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been completed</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Desk 8</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been created</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Validation</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been completed</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Desk 8</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been created</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Validation</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been completed</td>
                            
                        </tr>

                        <tr >
                        {/* key={item.id} */}
                          <td>001</td>
                          <td>Desk 8</td>
                          <td> </td>
                          <td> </td>
                          <td>A new validation has been created</td>
                            
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
export default Notifications;
