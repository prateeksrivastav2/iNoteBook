// import logo from './logo.svg';
import Navbar from './Components/Navbar';
// import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import About from'./Components/About'
import Home from './Components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Edit from './Components/edit';
import Login from './Components/Login';
import { useState } from 'react';
// import App1 from './Components/App'
// import Signup from './Components/Signup';
import Ssignup from './Components/Ssignup';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },3000);
  }
  return (
    <>
    {/* <Router> */}
    <NoteState>
          <div className="App">
            <Navbar />
            {/* <div className='container' style={{ marginTop: "65px", marginBottom: "15px" }}> */}
              <Alert alert={alert} />
            {/* </div> */}
            <Routes>
              {/* <Route exact path="/" element={<NavBar />} /> */}
              {/* <News setProgress={this.setProgress} pageSize={5} country="in" category="Science"/> */}
              {/* <Route exact path="/" element={<News setProgress={this.setProgress} key="General" pageSize={6} country="in" category="General" />} /> */}
              <Route exact path="/About" element={<About/>} />
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/ssignup" element={<Ssignup showAlert={showAlert} />} />
              <Route exact path="/edit-note/:id" element={<Edit showAlert={showAlert}/>} />
            </Routes>
          </div>
        </NoteState>
    {/* </Router> */}
    </>
  );
}

export default App;
