import React from "react"

const Scoreboard = (props) => {
    return (
        <div className={`${props.gameStarted ? "d-flex": "d-none"}`}>
            <div className="score-box standard-control content-center slide-right-game-start">
                <p className="mb-0 fs-title-2 fw-bold user-select-none">
                    {props.getTeamScore()}
                </p>
            </div>
        </div>
    )
};

export default Scoreboard;