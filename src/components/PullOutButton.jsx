import React from "react"

const PullOutButton = (props) => {
    return (
        <div className="pullout-button content-center" onClick={(e) => props.handleClick(e)} style={{backgroundColor: `${props.backgroundColor}`, height: `${props.height}`}}>
            <p className="mb-0 fs-small fw-bold">{props.description}</p>
        </div>
    )
};

export default PullOutButton;