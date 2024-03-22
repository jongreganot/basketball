import React from "react"

const PullOutButton = (props) => {
    return (
        <div className="pullout-button content-center pe-auto" onClick={(e) => props.handleClick(e)} style={{backgroundColor: `${props.backgroundColor}`, height: `${props.height}`}}>
            <p className="mb-0 fs-normal fw-bold">{props.description}</p>
        </div>
    )
};

export default PullOutButton;