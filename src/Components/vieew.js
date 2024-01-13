import React, { useEffect, useRef, useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Vieew = (props) => {
    const context = useContext(noteContext);
    let { isChecked } = context;
    // const [bgc, setbgc] = useState("E0F4FF");    
    const { no, hideVieew, isVieewVisible } = props;
    const ref = useRef(null);
    let [bgc, setBgc] = useState("F3F8FF");
    useEffect(() => {
        // console.log("isChecked");
        setBgc(isChecked ? "7FC7D9" : "F3F8FF");
    }, [isChecked]);
    useEffect(() => {
        if (isVieewVisible) {
            ref.current.click();
        }
    }, [isVieewVisible,isChecked]);

    return (
        <div onClick={hideVieew}>
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLong" style={{ display: 'none' }}>
                Launch demo modal
            </button>

            <div className="modal fade custom-modal" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog custom-modal-dialog" role="document">
                    <div className="modal-content custom-modal-content" style={{ backgroundColor: `#${bgc}` ,color:'black'}}>
                        <div className="modal-header" style={{ backgroundColor: `#${bgc}` }}>
                            <h5 className="modal-title" id="exampleModalLongTitle" style={{
                                fontFamily: 'Sacramento, cursive',
                                color: '#66BFBF',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                margin: 'auto auto 0 auto',
                                textAlign: 'center',
                                marginBottom: '2%',
                            }}>{no.title}</h5>
                        </div>
                        <div className="modal-body">
                            <h4 style={{
                                textAlign: 'center',
                                fontFamily: 'Sacramento, cursive',
                                color: '#80BCBD',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                marginBottom: '2%',
                            }}>Description</h4>
                            <div className="mb-3">
                                <p style={{
                                    fontFamily: '-moz-initial'
                                }}>{no.description}</p>
                            </div>
                            <h5 style={{
                                textAlign: 'center',
                                fontFamily: 'Sacramento, cursive',
                                color: '#80BCBD',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                marginBottom: '2%',
                            }}>Tag</h5>
                            <div className="mb-3">
                                <h6>{no.tag}</h6>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideVieew}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vieew;
