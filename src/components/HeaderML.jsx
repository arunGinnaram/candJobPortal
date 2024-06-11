import React from 'react'


import "./HeaderM.css"
 
const HeaderML = () => {
    return ( 

          <div   style={{  backgroundColor: "rgb(253 253 253)", 
           display: "flex",padding:'0% 0.1% 1% 0.1%' ,textAlign:'center'  }}>
        
            
        
            <div className='headerText' style={{padding: "0% 0% 0% 20px",color:'#2f2d2d',height:"90px",display:'flex',flexDirection:'column',alignItems:'center', height: '100%' }} > 
              <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  fontWeight: '700',
                fontSize: '28px',color:'#307d76'}}>
                Uttar Pradesh Police Recruitment And Promotion Board,Lucknow
              </div> 
              <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' ,fontWeight: "600",fontSize: "21px" ,color: '#627371'}}>				
                उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड, लखनऊ  
              </div> 
            </div> 

          </div> 
    
      )
}

export default HeaderML
