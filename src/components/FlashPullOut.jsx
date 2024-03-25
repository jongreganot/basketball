import React from "react"

const FlashPullOut = (props) => {
    return (
        <div id={`flashPullOut${props.pullOutId}`} className="flash-pullout-button content-center" style={{backgroundColor: `${props.backgroundColor}`, height: `${props.height}`, color: "white"}}>
            <p className="mb-0 fs-small fw-bold">{props.description}</p>
        </div>
    )
};

export default FlashPullOut;