import React from "react";
import "../styles/controls.scss";
import GameClock from "./GameClock";

const Controls = (props) => {
    return (
        <div className={`controls shadow ${props.gameStarted ? "d-flex": "d-none"} flex-row justify-content-center align-items-center`}>
                <div className="d-flex flex-row justify-content-center gap-3">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-play-circle-fill play-button ${props.timerPlay ? "d-none": "d-block"}`} viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                    </svg> */}

                    <div onClick={props.setShotClock14} className="slide-right-game-start play-button-container reset-14 content-center cursor-pointer">
                        <p className="mb-0 fs-large">R14 (Y)</p>
                    </div>

                    <div onClick={props.toggleTimer} className="slide-right-game-start play-button-container play cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-play-fill play-button ${props.timerPlay ? "d-none": "d-block"}`} viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pause-fill play-button ${props.timerPlay ? "d-block": "d-none"}`} viewBox="0 0 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                    </div>

                    <div onClick={props.resetShotclockTimer} className="slide-right-game-start play-button-container reset-24 content-center cursor-pointer">
                        <p className="mb-0 fs-large">R24 (R)</p>
                    </div>
                </div>
            </div>
    )
};

export default Controls;