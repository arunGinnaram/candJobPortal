import React, { useEffect, useState } from "react";
 
import "./Login.css"; 
import mainlogo from '../assets/images/mainlogo.png';
import axios from "axios";
import MumbaiPoliceLogoMobile from '../assets/images/MumbaiPoliceLogoMobile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckCircle, faTimesCircle,faDashboard,faChartSimple, faBuildingUser,faLandmark,faEnvelope,faHotel } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Sidevavbardesk8 = ({height}) => {

  const navigate = useNavigate();


  const [showProperties,setShowProperties] = useState(false);

   

  return (
    <div className="mainDivSidenav" style={{width:'16%',height:height,background:'white'}}>
      
      <br></br>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <div className="logoDivSi" >
        <img className="logoDivImageSi"   src ={MumbaiPoliceLogoMobile}></img>       
        </div>
        <div style={{
            background: '#e7e6e6',
            color: 'var(--color-text)',
            padding: '3px 10px',
            borderRadius: '3px',
            fontSize:'14px',
            fontWeight:'600'
          }}>MUMBAI POLICE</div>
      </div>

      <div className="moduleNamesDiv" style={{fontSize:'16px',color:'grey'}}>
        <ul style={{listStyle:'none',color:'#6d6d6d'  }}>
          <li  onClick={() => {navigate("/mumbaipolicestation/Dashboard");}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faChartSimple} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}>Dashboard</div>
           
          </li>

          <li> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faLandmark} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}>Police station</div>
           
          </li>

          <li onClick={() => {navigate("/mumbaipolicestation/Notifications");}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faEnvelope} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}} >Notifications</div>
           
          </li>

          <li onClick={() => {navigate("/mumbaipolicestation/Properties");}}  > 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faHotel} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}  >Properties</div>


          {showProperties && (
            <ul>
            <li>Listed</li>
            <li>Non-Listed</li></ul>
          )}

          
          </li>
          
          
          
          
           
           
        </ul> 
      </div>

       
      
    </div>
    
  );
};

export default Sidevavbardesk8;
