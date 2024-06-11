import React, { useContext, useEffect, useState } from "react";
 
import "./Login.css"; 
import mainlogo from '../assets/images/mainlogo.png';
import axios from "axios";
import MumbaiPoliceLogoMobile from '../assets/images/MumbaiPoliceLogoMobile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckCircle, faTimesCircle,faDashboard,faChartSimple, faBuildingUser,faLandmark,faEnvelope,faHotel } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import { languageContext } from "../App";
import { Sidenav } from "../App";


const Sidevavbar = ({height}) => {

  const navigate = useNavigate();


  const { lang , setLang,sidenave,setSidenave,setColor} = useContext(languageContext);

  // const {  } = useContext(Sidenav);


  const [showProperties,setShowProperties] = useState(false);

  const handleProperties = () => {
    setShowProperties(!showProperties);

  }


  const [dashboardCSS,setDashboardCSS] = useState(false);
  const [notificationsCSS,setNotificationsCSS] = useState(false); 

  const [selectedOption, setSelectedOption] = useState('');  
   

  const handleClick = (value) => {

    // alert(sidenave);
    
    // alert(value);
    // alert(sidenave);
 
    if(value=='dashboard'){     
      // setSidenave(1);
      // if(sidenave==1){
        navigate("/mumbaipolicestation/Dashboard");
      // }
       
      //  alert(sidenave);
      
       
      //  if(sidenav==1){
      //   setSelectedOption(value);
      //  }else {

      //  }
      
      // alert(!dashboardCSS);
      // setDashboardCSS(!dashboardCSS);   
    
    }else {
      // setSidenave(0);
    } 

    if(value=="notifications"){
     
       navigate("/mumbaipolicestation/Notifications");
      //  setSidenave(1);
      //  if(sidenav==1){
      //   setSelectedOption(value);
      //  }else {

      //  }
      // alert(!notificationsCSS);
      // setNotificationsCSS(!notificationsCSS);  
    }else {
      // setSidenave(0);
    } 
    
    if (value=="propertiesListed"){
      navigate("/mumbaipolicestation/Properties")
      // setSidenave(1);
    }else {
      // setSidenave(0);
    } 
    
    if(value=="propertiesNotListed") {
      // navigate("/mumbaipolicestation/Properties")
    }

    
  }

   
  // const [lang,setLang] = useState(0);
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
          {/* <SelectedItemContext.Provider value={{selectedOption,setSelectedOption}}> */}
          <li className="dashboardList" 
          style={{
            backgroundColor:sidenave==1?'rgb(235, 232, 232)':'',
            color:sidenave==1?'rgb(3, 44, 83)':''
             }}  onClick={() => {handleClick("dashboard")}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon 
          style={{ width: '25px', padding:'4.5px 4px', 
          backgroundColor:sidenave==1?'rgb(255, 255, 255)':'',
          color:sidenave==1?'rgb(3, 44, 83)':'#636367',
          borderRadius:selectedOption=='dashboard'?'3px':'',           
        }} 
          className="icon iconDashboard"    
          icon={faChartSimple}
           
          size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}>{lang==0?'Dashboard':'डॅशबोर्ड'}</div>
           
          </li>

          {/* <li> 
          
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faLandmark} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}>Police station</div>
           
          </li> */}

          <li className="notificationsList"
           style={{
            backgroundColor:selectedOption=='notifications'?'rgb(235, 232, 232)':'',
            color:selectedOption=='notifications'?'rgb(3, 44, 83)':''
             }}
          
          onClick={() => {handleClick("notifications")}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon 
           style={{ width: '25px', padding:'4.5px 4px', 
           backgroundColor:selectedOption=='notifications'?'rgb(255, 255, 255)':'',
           color:selectedOption=='notifications'?'rgb(3, 44, 83)':'#636367',
           borderRadius:selectedOption=='notifications'?'3px':'',           
         }} 
          
          className="icon iconNotifications"    icon={faEnvelope} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}} >{lang==0?'Notifications':'अधिसूचना'}</div>
           
          </li>

          <li onClick={handleProperties}  > 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faHotel} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}}>{lang==0?'Properties':'गुणधर्म'}</div>

          </li>


          {showProperties && (
            <div style={{transition:'0.5s ease-out'}}>
             <li  onClick={() => {handleClick("propertiesListed")}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faEnvelope} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}} >{lang==0?'Listed':'सूचीबद्ध'}</div>
           
          </li> 
          <li  onClick={() => {handleClick("propertiesNotListed")}}> 
          {/* <FontAwesomeIcon icon="fa-light fa-building-circle-check" beatFade /> */}
          
          <FontAwesomeIcon style={{ width: '25px', padding:'4px 5px', color: "#636367" }} className="icon"    icon={faEnvelope} size="lg" /> 
         
          &nbsp;
          <div style={{display:'flex',alignItems:'center'}} >{lang==0?'Not listed':'यादीत नाही'}</div>
           
          </li>
            
            
          </div>
            
          )} 
           
           {/* </SelectedItemContext.Provider> */}
        </ul> 
      </div>

       
       
    </div>
    
  );
};

export default Sidevavbar;
