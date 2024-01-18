import React, { useState, useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from 'react-router-dom';

const Ssignup = (props) => {
    const context = useContext(noteContext);
    let { isChecked } = context;
    let [bgc, setBgc] = useState("F3F8FF");
    let [b, setB] = useState("#fff");
    const [bg, setBg] = useState("#cbced1");

    useEffect(() => {
        setBg(isChecked ? "#A9A9A9" : "#cbced1");
        setB(isChecked ? "#7FC7D9" : "#fff");
        setBgc(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);
    const Base_URL = "http://localhost:3001";
    // const Base_URL = "https://inotebook-backend-1nhc.onrender.com";
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const { name, email, password, cpassword } = credentials;

    useEffect(() => {
        document.body.style.overflowY = props.isModalOpen ? 'hidden' : 'auto';

        return () => {
            // Cleanup: revert back to the original overflow property when the component is unmounted
            document.body.style.overflowY = 'auto';
        };
    }, [props.isModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cpassword !== password) {
            props.showAlert("Password and Confirm Password must be the same", "warning");
            navigate('/ssignup');
        } else {
            const response = await fetch(`${Base_URL}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const json = await response.json();

            const { authToken } = json;
            if (json.success) {
                localStorage.setItem('token', authToken);
                navigate('/');
                props.showAlert("Account Created Successfully", "success");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: `#${bgc}`, paddingTop: '5%' }}>
            <form onSubmit={handleSubmit} className="text-center" style={{
                maxWidth: "350px",
                backgroundColor: "#ecf0f3",
                borderRadius: "15px",
                boxShadow: `13px 13px 20px ${bg} , -13px -13px 20px ${b} `,
                paddingLeft: "20px",
                paddingRight: "20px"
            }}>
                <div className="text-center mt-3">
                    <h1 style={{
                        width: "100%",
                        display: "block",
                        border: "none",
                        outline: "none",
                        background: "none",
                        fontSize: "1.8rem",
                        color: "#666",
                        marginBottom: "5%"
                    }}
                    >Join Us Now</h1>
                    <img className="rounded-circle"
                        style={{
                            width: "100px",
                            height: "100px",
                            marginBottom: "10px",
                        }} src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg" alt="" />
                </div>
                <div className="container">
                    <div className="fm">
                        <div style={{
                            paddingLeft: "10px",
                            marginBottom: "20px",
                            borderRadius: "20px",
                            boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
                        }} className="fm" >
                            <input
                                style={{
                                    width: "100%",
                                    display: "block",
                                    border: "none",
                                    outline: "none",
                                    background: "none",
                                    fontSize: "1.2rem",
                                    color: "#666",
                                    padding: "10px 15px 10px 10px",
                                }}
                                name='name'
                                value={credentials.name}
                                onChange={onchange}
                                type="text" className="fm"
                                id="name" placeholder="Name"
                            />
                        </div>
                        <div style={{
                            paddingLeft: "10px",
                            marginBottom: "20px",
                            borderRadius: "20px",
                            boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
                        }} className="fm my-3" >
                            <input
                                style={{
                                    width: "100%",
                                    display: "block",
                                    border: "none",
                                    outline: "none",
                                    background: "none",
                                    fontSize: "1.2rem",
                                    color: "#666",
                                    padding: "10px 15px 10px 10px",
                                }}
                                onChange={onchange}
                                name='email'
                                value={credentials.email}
                                type="email" className="form my-2"
                                id="inputPassword" placeholder="Email"
                            />
                        </div>
                        <div style={{
                            paddingLeft: "10px",
                            marginBottom: "20px",
                            borderRadius: "20px",
                            boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
                        }} className="fm my-3" >
                            <input
                                style={{
                                    width: "100%",
                                    display: "block",
                                    border: "none",
                                    outline: "none",
                                    background: "none",
                                    fontSize: "1.2rem",
                                    color: "#666",
                                    padding: "10px 15px 10px 10px",
                                }}
                                onChange={onchange}
                                name='password' value={credentials.password}
                                type="password" className="form my-2"
                                id="inputPassword4" placeholder="Password"
                                minLength={5} required
                            />
                        </div>
                        <div style={{
                            paddingLeft: "10px",
                            marginBottom: "20px",
                            borderRadius: "20px",
                            boxShadow: "inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff",
                        }} className="f my-3" >
                            <input
                                style={{
                                    width: "100%",
                                    display: "block",
                                    border: "none",
                                    outline: "none",
                                    background: "none",
                                    fontSize: "1.2rem",
                                    color: "#666",
                                    padding: "10px 15px 10px 10px",
                                }}
                                onChange={onchange}
                                name='cpassword'
                                value={credentials.cpassword}
                                type="text" className="form my-2"
                                id="inputcPassword5" placeholder="Confirm Password"
                                minLength={5} required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Link to="/login" style={{ color: "#11cdd4", textDecoration: "underline" }}>Login</Link>
                </div>
                <button style={{ width: "50%" }} type="submit" className="btn btn-primary my-2" >Sign up</button>
            </form>
        </div>
    );
};

export default Ssignup;
