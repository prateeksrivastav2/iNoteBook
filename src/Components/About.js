import React ,{useContext,useState} from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import noteContext from "../context/notes/noteContext";
import { useEffect } from 'react';


const About = () => {
    const context = useContext(noteContext);
    let { isChecked } = context;
    let [bgc, setBgc] = useState("F3F8FF");

    useEffect(() => {
        // console.log("isChecked");
        setBgc(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);
    const handleLinkedinClick = () => {
        window.open('https://www.linkedin.com/in/prateek-srivastav-9131aa21b/', '_blank');
    }

    const handleclick = () => {
        window.open('https://github.com/prateeksrivastav2', '_blank');
    }

    const handlecodechef = () => {
        window.open('https://www.codechef.com/users/prateek2692', '_blank');
    }
    const handlelc = () => {
        window.open('https://leetcode.com/Prateeksrivastav703/', '_blank');
    }

    return (
        <div className="c" style={{ backgroundColor: `#${bgc}`,marginTop:'4%' }}>
            <div className="middle-container" >
                <div className="profile" >
                    <img
                        className="impf"
                        src="https://media2.giphy.com/media/2oTyGzNunkbU7U6COX/200.webp?cid=ecf05e47084c8sbwnrsav85zf83mln3xt9ezq7jn3atnfaby&rid=200.webp&ct=s"
                        alt="obitoimage"
                    />
                    <h2>Hello🖐.</h2>
                    <p className="intro">
                        Welcome to iNotebook! I'm Prateek Srivastava, the proud owner of this website. Here, you can unleash the power
                        of iNotebook to organize your thoughts and ideas seamlessly. As a web development enthusiast, I'm dedicated to
                        creating tools that enhance user experiences. Feel free to explore iNotebook and check out more of my coding
                        endeavors on my  <FontAwesomeIcon icon={faGithub} onClick={handleclick} size='2x' style={{ cursor: 'pointer' }} />
                    </p>
                </div>
                <div className="hr">
                    <hr />
                </div>
                <div className="skills">
                    <div className="skill-row">
                        <img
                            className="imsk1"
                            src="https://media2.giphy.com/media/lP8xu5t2DLGG045H8F/giphy.webp?cid=ecf05e47e5b8ts07aogpncd23sb52ymm8lu92li1czvjo9y1&rid=giphy.webp&ct=s"
                            alt="compitative programming"
                        />
                        <h3>About iNoteBook</h3>
                        <p>
                            The purpose of the project, named iNoteBook, is to provide users with a comprehensive note-taking platform iNoteBook, built on the MERN (MongoDB, Express.js, React, Node.js) stack, is a comprehensive note-taking platform designed to offer users a seamless experience in managing their notes. The project's primary goals include enabling users to effortlessly add, update, and delete notes, along with providing a convenient interface for viewing their entire collection. Emphasizing data security, iNoteBook implements authentication using JSON Web Tokens (JWT), ensuring that only authorized users can access and manipulate their notes, thereby adding an extra layer of protection to sensitive information. The platform not only prioritizes user-friendly functionalities but also guarantees the security and confidentiality of user data, making it a reliable and efficient solution for individuals seeking an organized and secure note-taking environment.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className='cont'>
                    <div >
                        <FontAwesomeIcon icon={faLinkedin} onClick={handleLinkedinClick} size="3x" style={{ cursor: 'pointer' }} />
                        <FontAwesomeIcon icon={faLaptopCode} size='3x' style={{ cursor: 'pointer' ,marginLeft:"3%",marginRight:"3%"}} onClick={handlelc} />
                        <FontAwesomeIcon icon={faClosedCaptioning} size='3x' style={{ cursor: 'pointer' }} onClick={handlecodechef} />
                    </div>
                </div>
                <div className='query'>
                    <form
                        action="mailto:prateeksrivastav703@gmail.com"
                        method="post"
                        encType="text/plain"
                    >
                        <textarea className="form-control" id="message" name="message" rows="3" placeholder='Have an query' style={{backgroundColor:"#DCF2F1",borderRadius:"8px",width:"50%",marginLeft:"25%",marginBottom:"1%"}} required></textarea>
                        <div>

                        <button className="btn" type="submit" style={{width:"20%"}}>Ask?</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p className="lastname">© 2024 Prateek Srivastava @ iNoteBook</p>
                </div>
            </div>
        </div>
    );
};

export default About;
