import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Vieew = (props) => {
    const { no, hideVieew, isVieewVisible } = props;
    const ref = useRef(null);

    useEffect(() => {
        if (isVieewVisible) {
            ref.current.click();
        }
    }, [isVieewVisible]);

    return (
        <div onClick={hideVieew}>
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLong" style={{ display: 'none' }}>
                Launch demo modal
            </button>

            <div className="modal fade custom-modal" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{maxWidth:"5000px"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle" style={{ 
                               
                                fontFamily: 'Sacramento, cursive',
                                color: '#66BFBF',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                margin: 'auto auto 0 auto',
                                // marginLeft:'18%',
                                textAlign: 'center',

                                    marginBottom: '2%' }}>{no.title}</h5>
                        </div>
                        <div className="modal-body">
                            <h4 style={{
                                textAlign: 'center',
                                fontFamily: 'Sacramento, cursive',
                                color: '#80BCBD',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                // margin: '50px auto 0 auto',
                                marginBottom: '2%',
                            }}>Description</h4>
                            <div className="mb-3">
                                <p style={{
                                    fontFamily:'-moz-initial'
                                }}>{no.description}</p>
                            </div>
                            <h5 style={{
                                textAlign: 'center',
                                fontFamily: 'Sacramento, cursive',
                                color: '#80BCBD',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                // margin: '50px auto 0 auto',
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
