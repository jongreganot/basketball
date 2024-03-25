import React from "react"
import PullOutButton from "./PullOutButton";
import FlashPullOut from "./FlashPullOut";

const SimplePullOutCell = (props) => {
    return (
        <div className="pullout-container content-center" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
            <p className="mb-0 text-center fs-small pe-none">{props.playerStat}</p>
            <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                        height="100%"
                                                        description="+1"
                                                        pullOutId={`${props.statType}${props.player && props.player.selected ? "Selected": ""}`} />
            <div className="pullout-action-right-panel">
                <PullOutButton handleClick={(e) => props.handleRightPanelClick(e)}
                                backgroundColor="rgb(4 44 67)"
                                height="100%"
                                description="+1" />
            </div>
            
            <div className="pullout-action-left-panel">
                <PullOutButton handleClick={(e) => props.handleLeftPanelClick(e)}
                                backgroundColor="rgb(49 49 49)"
                                height="100%"
                                description="-1" />
            </div>
        </div>
    )
};

export default SimplePullOutCell;