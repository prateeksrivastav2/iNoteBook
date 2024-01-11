import React, { Component,useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes, Link ,useLocation, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo} from '@fortawesome/free-solid-svg-icons';
// import { faLinkedin, faGithub ,faInfo} from '@fortawesome/free-brands-svg-icons';

const NavBar =()=>{
    let location= useLocation();
    const navigate=useNavigate();
    const handlelogout=()=>{
         localStorage.removeItem('token');
         navigate('/login')
    }
    useEffect(() => {
        return () => {
           // console.log(location)
        };
    }, [location])
        return (
            <div >
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" style={{ maxHeight: "55px" }} >
                    <div className="container-fluid">
                        <Link className="navbar-brand active" to="/" style={{marginLeft:'35px'}}><FontAwesomeIcon icon={faInfo} size='2x'/>NoteBook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                                <li className="nav-item" style={{marginLeft:'20px',marginRight:"30px"}}>
                                    <Link className={`nav-link ${location.pathname==="/"?"active":""}`}aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item"style={{marginRight:'65px'}}>
                                    <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/About">About us</Link>
                                </li>
                            </ul>
                            {!localStorage.getItem('token')? <form className="d-flex">
                                <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
                                <Link className="btn btn-primary mx-1" to="/ssignup" role='button'>Signup</Link>
                            </form>:<button className="btn btn-primary mx-1" onClick={handlelogout} role='button'>Logout</button>}
                        </div>
                    </div>
                </nav>
            </div>
        )
    
}

export default NavBar
