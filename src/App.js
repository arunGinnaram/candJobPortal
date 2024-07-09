import logo from "./logo.svg";
import "./App.css";
// import Personaldetails from "./pagecomponents/Personaldetails";
// import Annualremarks from "./pagecomponents/Annualremarks";
// import Notifications from "./pagecomponents/Notifications";
// import Rewardsgoodentries from './pagecomponents/Rewardsgoodentries';
import Registration from "./pagecomponents/Registration";
import Login from "./pagecomponents/Login";
import UserHome from "./pagecomponents/UserHome";
import UserMainPage from "./pagecomponents/UserMainPage"; 
import UserProfiles from "./pagecomponents/UserProfiles";      
import CandidateEducationEdit from "./pagecomponents/CandidateEducationEdit";
// import Punishments from "./pagecomponents/Punishments";
// import Suspension from "./pagecomponents/Suspension";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import Awardsmedals from './pagecomponents/Awardsmedals'
// import Viewdata from "./pagecomponents/Viewdata";

// import HeaderM from "./components/HeaderM";
// import Sidevavbarmarati from "./pagecomponents/Sidevavbarmarati"; 

import Format from "./pagecomponents/Format";
import Propertycreation from "./pagecomponents/UserHome";
import Sidevavbar from "./pagecomponents/Sidevavbar";
import Dashboard from "./pagecomponents/Dashboard";
import Properties from "./pagecomponents/Properties";
import Notifications from "./pagecomponents/Notifications";
import Propertydatavalidation from "./pagecomponents/Propertydatavalidation";
import Propertyview from "./pagecomponents/Propertyview";

import desk8Sidevavbar from "./pagecomponents/desk8Sidevavbar";
import  Header  from './pagecomponents/Header'
import About from "./pagecomponents/About";

import React, { useState } from 'react';
import People from "./pagecomponents/People";
// import {SidenavBgOnClick} from './pagecomponents/Context'




//we can create this anywhere(below 2 lines)
const languageContext = React.createContext();
export { languageContext };

const Sidenav = React.createContext();
export { Sidenav };


function App() {
 // when providing - include these variables that you want to provide in this  <languageContext.Provider value={{ lang, setLang }}> 
  const [lang,setLang] = useState(0);
  const [sidenave,setSidenave] = useState(0);

  const setColor = () => {
    setSidenave(sidenave);
  }

  return (
    <div className="Application">
       <languageContext.Provider value={{ lang, setLang ,sidenave,setSidenave,setColor}}> 
       {/* <Sidenav.Provider value={{ sidenave,setSidenave }}> */}
      <Router>
        {/* header */} 
        <Routes>
           
            {/* <Route path="/dig" element={<Login name="dig"/>}  > </Route>  */}

            {/* <Route path="/" element={<About />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/UserHome" element={<UserHome />} />
            <Route path="/UserMainPage" element={<UserMainPage />} />       
            <Route path="/UserProfiles" element={<UserProfiles />} />    
            <Route path="/People" element ={<People/>}/>      
            {/* <Route path="/MyGroup"/>  */}
            <Route path="/CandidateEducationEdit" element={<CandidateEducationEdit />} />
        </Routes>
      </Router>
      {/* </Sidenav.Provider> */}
      </languageContext.Provider>
    </div>
  );
}

export default App;
 