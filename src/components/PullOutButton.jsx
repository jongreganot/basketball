import React from "react"

const PullOutButton = (props) => {
    return (
        <div className="pullout-button content-center" onClick={(e) => props.handleClick(e)} style={{backgroundColor: `${props.backgroundColor}`, height: `${props.height}`, color: "white"}}>
            <p className={`mb-0 fs-small fw-bold ${props.isUndo ? "d-none": "d-block"}`}>{props.description}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className={`bi bi-arrow-counterclockwise ${props.isUndo ? "d-block": "d-none"}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
            </svg>
        </div>
    )
};

export default PullOutButton;