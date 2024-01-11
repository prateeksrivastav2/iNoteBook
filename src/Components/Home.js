import React from 'react'

import Notes from './Notes';
const Home = (props) => {
  const {showAlert}=props;
  return (
    <div>
      {/* <p>Hello</p> */}
      {/* <div className="container" style={{marginTop:"60px"}}></div> */}
      <div className="container">
        <Notes showAlert={showAlert}/>
      </div>
    </div>
  )
}

export default Home
