import React, { useContext, useEffect, useState } from "react";
 
import "./Login.css"; 
import "./applicationWhole.css";
import mainlogo from '../assets/images/mainlogo.png';
import axios from "axios";
import MumbaiPoliceLogoMobile from '../assets/images/MumbaiPoliceLogoMobile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 
{ faCoffee, faCheckCircle, 
  faTimesCircle,faDashboard,faChartSimple,
   faBuildingUser,faLandmark,faEnvelope,faBell,faHotel,faCommentDots,faPersonWalkingLuggage,faRightFromBracket,
   faMagnifyingGlass,faHouseUser,faPeopleGroup 
  } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import lang from '../assets/images/translate.png'

import {languageContext } from '../App'
import urlGlobal from './application.json'

const Header = () => { 
const url = urlGlobal.urlGlobal;
const port = urlGlobal.port;
const contextPath = urlGlobal.ContextPath; 

const userId = sessionStorage.getItem("userId");
const roleId = sessionStorage.getItem("roleId");

  
 
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
     
    Swal.fire({
      position: "top-end",
      width: "auto",
      // padding: '0',
      showConfirmButton: false,
      background: "rgb(22, 145, 101)",
      html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;margin: 0px ;font-family: Montserrat, sans-serif;">Logout Successfull</p>',
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
    navigate("/login");
  }

  const axiosInstance = axios.create();

  const cfg={
    headers:{
       "Content-Type":"application/json",
        Accept:"application/json",
    }
  }

  axiosInstance.interceptors.response.use( 
    (cfg)=>{return cfg;},
    (err)=>{return Promise.reject(err);}
  )

   

  const handleSearch = async (e) => {
    if(e.key=="Enter"){
      let skill = e.target.value;
      let skillName = skill?skill.toLowerCase().trim():'';
      // navigate("/master/InventoryMasterView",{state:{viewData:getData.data.itemDetails,itemHistory:getData.data.itemHistory,imageData:getData.data.imageData}})
      navigate("/UserProfiles",{state:{skillName:skillName}});
       
    }
    
  }

  return (
    
    <div style={{
      background: "white",
      height: "55px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      alignItems:'center',
      fontWeight:'bold',
      fontSize:'21px',
      color:'rgb(3, 44, 83)',
      borderBottom:'0.5px solid #dfdcdc',
       
      backgroundColor:'white',
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
         }}>
         

   <div style={{width:'1130px'}}>
    <div  style={{ display:'flex',justifyContent:'space-between'  }} >
      <div style={{ display:'flex',alignItems:'center'}}>
          <div style={{cursor:'pointer'}}  
          onClick={()=>{
            navigate("/UserMainPage")
          }} > CJP</div> 
          &nbsp; &nbsp; 
          <span
          style={{outline:'none',border:'none',background:'#e9e9e9',
            lineHeight:'35px',fontWeight:'600',color:'#4f4d4d',
            fontFamily:'inherit',fontSize:'16px',
            padding:'1px 10px',borderRadius:'3px 0 0 3px'   }}
            >
          <FontAwesomeIcon
            className="editIcons"
            style={{}}
            icon={faMagnifyingGlass}
          /></span>
          <input type="text" 
          style={{outline:'none',border:'none',background:'#e9e9e9',
            lineHeight:'35px',fontWeight:'400',color:'#4f4d4d',
            fontFamily:'inherit',fontSize:'16px',
            paddingLeft:'6px',borderRadius:'0 3px 3px 0',width:'230px'   }}
          name="search" id="search" placeholder="search"
          onKeyDown={(e)=>{handleSearch(e)}}
          />
       </div>


       <div style={{ display:'flex',width:'430px' }}>
           
          {/* <div
          style={{outline:'none',border:'none',
             
            lineHeight:'35px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faHouseUser}
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              My Home</div>
          
          </div>  */}

          <div
          style={{outline:'none',border:'none',
            // background:'#e9e9e9',
            lineHeight:'30px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faPeopleGroup}
                  
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              My Group</div>
          
          </div> 

           

 

<div
          style={{outline:'none',border:'none',
            // background:'#e9e9e9',
            lineHeight:'30px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faEnvelope}
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              Message</div>
          
          </div>

          <div
          style={{outline:'none',border:'none',
            // background:'#e9e9e9',
            lineHeight:'30px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faBell}
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              Notifications</div>
          
          </div>

          <div
          style={{outline:'none',border:'none',
            // background:'#e9e9e9',
            lineHeight:'30px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faPersonWalkingLuggage}
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              Get Work</div>
          
          </div>

          <div
          style={{outline:'none',border:'none',
            // background:'#e9e9e9',
            lineHeight:'30px',color:'rgb(103 103 103)',
            fontFamily:'inherit' ,
             borderRadius:'3px 0 0 3px',
             cursor:'pointer',flex:'1',
             display:'flex',
             justifyContext:'center' ,
             flexDirection:'column',
             alignItems:'center',
             textAlign:'center'   }}
            >
              <div style={{fontSize:'17px',padding:'0',fontWeight:'400' }}>
                <FontAwesomeIcon
                  className="editIconHead"
                  style={{}}
                  size="lg"
                  icon={faRightFromBracket}
                  
                /> 
              </div>
          
              <div style={{fontSize:'12px',padding:'0',fontWeight:'400',lineHeight:'14px', }}>
              Sign out</div>
          
          </div>

       </div>


    </div>
     

    </div>
    
    </div>
    
  );
};

export default Header;
