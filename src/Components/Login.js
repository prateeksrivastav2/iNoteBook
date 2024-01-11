import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        const {authToken}=json;
        // console.log(authToken);
        // console.log("json");
        if (json.success) {
            localStorage.setItem('token', authToken);
            // localStorage.setItem('token', json.authtoken);
            navigate('/');
            // props.showAlert()
            props.showAlert("Logged in successfully","success");
        } else {
            //console.log("kk")
            // alert('Invalid Email or Password');
            props.showAlert("Invalid Credentials","danger");
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="text-center " style={{
                    maxWidth: "350px",
                    minHeight: "425px",
                    margin: "100px auto",
                    marginTop:"6%",
                    padding: "35px 30px 30px 30px",
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
                                        padding: "10px 15px 10px 10px",
                                    }}
                        >Sign In Now</h1>
                        <img className="rounded-circle"
                            style={{
                                width: "100px",
                                height: "100px",
                                marginBottom:"2%"
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
                    <Link to="/ssignup" style={{ color: "#11cdd4", textDecoration: "underline", }}>Sign-up</Link>
                    {/* <a href="/ssignup" target="_blank" rel="noopener noreferrer">Sign-up</a> */}
                    </div>
                    <button style={{ width: "50%" }} type="submit" className="btn btn-primary my-2" >Login</button>
                </div>
            </form >
        </div >
    );
}

export default Login;
