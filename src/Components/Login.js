import React, { useState, useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
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

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const Base_URL = "http://localhost:3001";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${Base_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        const { authToken } = json;

        if (json.success) {
            localStorage.setItem('token', authToken);
            navigate('/');
            props.showAlert("Logged in successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: `#${bgc}` ,paddingTop:'5%'}}>
            <form onSubmit={handleSubmit} className="text-center" style={{
                maxWidth: "350px",
                backgroundColor: "#ecf0f3",
                borderRadius: "15px",
                boxShadow: `13px 13px 20px ${bg} , -13px -13px 20px ${b} `,
                padding: "20px"
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
                    }}>Sign In Now</h1>
                    <img className="rounded-circle" style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "2%"
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
                                name='email' value={credentials.email}
                                onChange={onchange}
                                type="email" className="fm"
                                id="inputEmail4" placeholder="Email"
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
                                onChange={onchange} name='password' value={credentials.password}
                                type="password" className="form my-2"
                                id="inputPassword4" placeholder="Password"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Link to="/ssignup" style={{ color: "#11cdd4", textDecoration: "underline" }}>Sign-up</Link>
                </div>
                <button style={{ width: "50%" }} type="submit" className="btn btn-primary my-2" >Login</button>
            </form >
        </div >
    );
}

export default Login;
