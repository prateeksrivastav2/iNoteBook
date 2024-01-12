import React, { useContext, useEffect, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import Notes from './Notes';
const Home = (props) => {
  const {showAlert}=props;
  const context = useContext(noteContext);
    let { isChecked } = context;
    let [bgc, setBgc] = useState("F3F8FF");
    useEffect(() => {
        // console.log("isChecked");
        setBgc(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);
  return (
    <div>
      {/* <p>Hello</p> */}
      {/* <div className="container" style={{marginTop:"60px"}}></div> */}
      <div className="con" style={ {backgroundColor:  `#${bgc}`, marginLeft:'0px',marginRight:'0px',marginTop:'0px',marginBottom:'0px',textAlign:'center',overflowX:'hidden'}}>
        <Notes showAlert={showAlert}/>
      </div>
    </div>
  )
}

export default Home
