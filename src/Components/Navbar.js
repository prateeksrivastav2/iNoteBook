import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Warning from './warning';
import noteContext from '../context/notes/noteContext';

const NavBar = () => {
    const location = useLocation();
    const context = useContext(noteContext);
    const { isChecked, setIsChecked } = context;
    const navigate = useNavigate();
    const [isVieewVisible, setIsVieewVisible] = useState(false);
    const [isCollapsed, setCollapsed] = useState(true);

    const handleTogglenav = () => {
        setCollapsed(!isCollapsed);
    };

    let navcolor = isChecked ? '3887BE' : '7FC7D9';
    let DM = isChecked ? 'black' : 'white';

    useEffect(() => {
        navcolor = isChecked ? '3887BE' : '7FC7D9';
        DM = isChecked ? 'black' : 'white';
    }, [isChecked]);

    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/About');
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const handleout = () => {
        setIsVieewVisible(true);
    };

    const hideleout = () => {
        setIsVieewVisible(false);
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{ maxHeight: '55px', backgroundColor: `#${navcolor}`, marginBottom: '0px',maxHeight:'fit-content' }}>
                <div className="container-fluid" >
                    <Link className="navbar-brand active" to="/" style={{ marginLeft: '35px' }}>
                       <FontAwesomeIcon icon={faInfo} size="2x" />
                        NoteBook
                    </Link>
                    {/* {!isCollapsed&&<div style={{marginTop:'200px',backgroundColor:'green'}}>

            </div>} */}
                    {/* <button className="navbar-toggler" style={{ backgroundColor: isCollapsed ? 'B4D4FF' : 'transparent' }} onClick={handleTogglenav} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    
                        <span className="navbar-toggler-icon"></span> */}
                    {/* </button> */}
                    <button
                        className="navbar-toggler custom-toggler"
                        type="button"
                        data-toggle="collapse"
                        onClick={handleTogglenav}
                        style={{ backgroundColor: isCollapsed ? 'B4D4FF' : 'transparent' ,marginTop:'0px'}}
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            <li className="nav-item" style={{ marginLeft: '20px', marginRight: '30px' }}>
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">
                                   Home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ marginRight: '15px' }}>
                                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`} to="/About">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                        <div className="mx-3">
                            {isChecked ? (
                                <FontAwesomeIcon icon={faSun} className="text-light mx-1" style={{ cursor: 'pointer' }} size="1x" onClick={handleToggle} />
                            ) : (
                                <FontAwesomeIcon icon={faMoon} style={{ cursor: 'pointer' }} size="1x" onClick={handleToggle} />
                            )}
                        </div>

                        {!localStorage.getItem('token') ? (
                            <form className="d-flex">
                                <Link className="btn btn-primary mx-1" to="/login" role="button" style={{ color: `${DM}` }}>
                                    Login
                                </Link>
                                <Link className="btn btn-primary mx-1" to="/ssignup" role="button" style={{ color: `${DM}` }}>
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <button className="btn btn-primary mx-1" onClick={handleout} role="button" style={{ color: `${DM}` }}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {isVieewVisible && <Warning isVieewVisible={isVieewVisible} hideleout={hideleout} handlelogout={handlelogout} isChecked={isChecked} />}
        </div>
    );
};

export default NavBar;
