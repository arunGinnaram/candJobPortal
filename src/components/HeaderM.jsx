import React from "react";

import UPLogoh from "../assets/images/UPLogoHeader.jpg";
import "./HeaderM.css";
import { useNavigate } from "react-router-dom";


const HeaderM = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div
      className="d1"
      style={{
        height: "75px",
        backgroundColor: "rgb(253 253 253)",
        display: "flex",
        justifyContent: "space-between",
        padding: "1.2% 1%",
        marginBottom: "30px",
      }}
    >
      <div style={{display:'flex'}}>
      <div class="headerImg" style={{ paddingLeft: "20px" }}>
        <img className="logoInner" src={UPLogoh} style={{ height: "70px" }} />
      </div>

      <div
        className="headerText"
        style={{ padding: "0% 0% 0% 20px", color: "#2f2d2d" }}
      >
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: "700",
            fontSize: "25px",
            color: "#307d76",
            color:'rgb(0 87 79)'
          }}
        >
          Uttar Pradesh Police Recruitment And Promotion Board,Lucknow
        </div>
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: "600",
            fontSize: "21px",
            paddingTop: "2px",
            color: "#627371",
          }}
        >
          उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड, लखनऊ
        </div>
      </div> </div>

      <div style={{ display: "flex", alignItems: "center", paddingRight: "20px"  }}>
      <button
          style={{
            backgroundColor: "#2196F3",
            border: "#2196F3",
            borderRadius: "3px",
            padding: "7px 10px",
            color: "white",
            letterSpacing: "0.5px",
            fontFamily:'inherit'
          }}
        >
          Home
        </button>
        &nbsp;
        &nbsp;
        <button
          style={{
            backgroundColor: "rgb(167, 44, 31)",
            border: "rgb(167, 44, 31)",
            borderRadius: "3px",
            padding: "7px 10px",
            color: "white",
            letterSpacing: "0.5px",
            fontFamily:'inherit'
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderM;
