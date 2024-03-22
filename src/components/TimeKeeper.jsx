import React from "react"
import { registerPlayBtnEventListener } from "../behaviors/play-button";
import $ from "jquery";
import sound from "../audio/buzzer.mp3";
import ShotClock from "./ShotClock";

class TimeKeeper extends React.Component {
    minutesPerQuarter = 10;
    maxMilliSeconds = 99;
    maxSeconds = 59;

    state = {
        quarter: 1,
    }

    changeQuarter = () => {
        this.setState({
            quarter: this.state.quarter + 1
        }, this.resetTimer)
    }

    resetTimer = () => {
        this.setState({
            minutes: this.minutesPerQuarter,
            seconds: 0,
            milliseconds: 0
        });
        this.props.stopTimer();
    }

    render () {
        return (
            <>
                <div className="d-flex flex-row align-items-center justify-content-center slide-right-game-start user-select-none">
                    <div className="cursor-pointer" onDoubleClick={this.changeQuarter}>
                        <p className="mb-0 quarter me-4">{`${this.state.quarter}Q`}</p>
                    </div>
                    <p className="mb-0 countdown-timer">{this.state.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:</p>
                    <p className="mb-0 countdown-timer">{this.state.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:</p>
                    <p className="mb-0 countdown-timer">{this.state.milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>
                </div>
                <ShotClock />
                {/* <div className="slide-right-game-start">
                    <div className="play-button-container cursor-pointer" onClick={this.toggleTimer} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-play-fill play-button ${this.state.timerPlay ? "d-none": "d-block"}`} viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pause-fill play-button ${this.state.timerPlay ? "d-block": "d-none"}`} viewBox="0 0 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                    </div>
                </div> */}
            </>
        )
    };
}

export default TimeKeeper;