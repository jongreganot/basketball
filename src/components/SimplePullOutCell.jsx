import React from "react"
import PullOutButton from "./PullOutButton";

const SimplePullOutCell = (props) => {
    return (
        <div className="pullout-container content-center" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
            <p className="mb-0 text-center fs-small pe-none">{props.playerStat}</p>
            <div className="pullout-action-right-panel">
                <PullOutButton handleClick={(e) => props.handleRightPanelClick(e)}
                                backgroundColor="rgb(90 110 79)"
                                height="100%"
                                description="+1" />
            </div>
            
            <div className="pullout-action-left-panel">
                <PullOutButton handleClick={(e) => props.handleLeftPanelClick(e)}
                                backgroundColor="gray"
                                height="100%"
                                description="-1" />
            </div>
        </div>
    )
};

export default SimplePullOutCell;