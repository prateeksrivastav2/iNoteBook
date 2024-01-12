import React from 'react';

const Alert = (props) => {
    // const { type, msg } = props;

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <>
           
             {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show `}role="alert" style={{ marginTop: "65px", marginBottom: "15px" }}>
                    <strong>{props.alert.msg}</strong> 
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
           
        </>
    );
}

export default Alert;
