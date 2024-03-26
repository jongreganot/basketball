import React from "react"

const FlashPullOut = (props) => {
    return (
        <div className={`flash-pullout-button ${props.isPercentage ? "flash-pullout-percentage": ""} content-center flash-pullout-${props.pullOutId}`} style={{backgroundColor: `${props.backgroundColor}`, height: `${props.height}`, color: "white"}}>
            <p className="mb-0 fs-small fw-bold">{props.description}</p>
        </div>
    )
};

export default FlashPullOut;