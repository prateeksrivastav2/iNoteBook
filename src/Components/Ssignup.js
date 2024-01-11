// import React from 'react'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Ssignup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const { name, email, password, cpassword } = credentials;
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(cpassword);
        console.log(password);
        if (cpassword !== password) {
            // alert("Password and Confirm Password must be same");
            props.showAlert("Password and Confirm Password must be same", "warning");
            navigate('/ssignup')
        }
        else {
            const response = await fetch("http://localhost:3001/api/auth/createuser", {
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
                // alert('Invalid Email or Password');
                props.showAlert("Invalid Credentials", "danger");
            }
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="text-center" style={{
                    maxWidth: "350px",
                    minHeight: "300px",
                    margin: "100px auto",
                    padding: "20px 30px 30px 30px",
                    backgroundColor: "#ecf0f3",
                    borderRadius: "15px",
                    boxShadow: "13px 13px 20px #cbced1, -13px -13px 20px #fff",
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
                            marginBottom: "4%"
                            // padding: "10px 15px 10px 10px",
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
                                    id="inputPassword4" placeholder="Email"
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
                                    id="inputcPassword4" placeholder="Confirm Password"
                                    minLength={5} required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to="/login" style={{ color: "#11cdd4", textDecoration: "underline" }}>Login</Link>
                    </div>
                    <button style={{ width: "50%" }} type="submit" className="btn btn-primary my-2" >Sign up</button>
                </div>
            </form >
        </div >
    )
}

export default Ssignup
