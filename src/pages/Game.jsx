import React from "react"
import $ from "jquery";
import "../styles/game.scss";
import { PullOutSides } from "../constants/pullout-sides.ts";
import StatSheet from "../components/StatSheet.jsx";
import { animateEnter, animateEnterNext } from "../behaviors/animation.js";
import JerseyNumberInput from "../components/JerseyNumberInput.jsx";
import NameInput from "../components/NameInput.jsx";
import Scoreboard from "../components/Scoreboard.jsx";
import { disableDefaultSpaceBarBehavior, registerHotkeyEvents } from "../behaviors/interactions.js";
import Controls from "../components/Controls.jsx";
import { registerTimerEventListener } from "../behaviors/play-button.js";
import sound from "../audio/buzzer.mp3";
import { clearTemporaryMargins } from "../behaviors/temporary-margins.js";
import { wait } from "../behaviors/utilities.js";
import { StatTypes } from "../constants/stat-type.ts";

class Game extends React.Component {
    gameclockTimerInterval = null;
    minutesPerQuarter = 10;
    shotclockLimit = 24;
    shotclock14 = 14;
    maxMilliSeconds = 99;
    maxSeconds = 59;
    audio = new Audio(sound);

    state = {
        gameStarted: false,
        timerPlay: false,
        quarter: 1,
        minutes: this.minutesPerQuarter,
        seconds: 0,
        milliseconds: 0,
        shotclock: 24
    }

    changeQuarter = () => {
        this.setState({
            quarter: this.state.quarter + 1
        })

        this.resetTimer();
        this.resetShotclockTimer();
    }

    componentDidMount() {
        animateEnter();
        this.setDefaultFocus();
    }

    updateStat = (e, statPt, id, pullOutSide, statType) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.updateStat(statPt, id, statType);

        e.stopPropagation();
    }

    closePanels = () => {
        let openRightPanels = document.querySelectorAll(".pullout-action-right-panel.active");
        openRightPanels.forEach(op => this.togglePullOut(op));
        
        let openLeftPanels = document.querySelectorAll(".pullout-action-left-panel.active");
        openLeftPanels.forEach(op => this.togglePullOut(op));
    }

    gameStart = () => {
        this.setState({
            gameStarted: true
        }, () => {
            animateEnterNext("slide-right-game-start");
            disableDefaultSpaceBarBehavior();
            clearTemporaryMargins();
            registerHotkeyEvents(this.props.addStat);
            registerTimerEventListener(this.toggleTimer, this.resetShotclockTimer, this.setShotClock14);
        });
    }

    // addStat = (statType) => {
    //     this.props.addStat(statType);
    // }

    getPullOut = (pullOutSide, e) => pullOutSide === PullOutSides.Right ? e.target.closest(".pullout-action-right-panel"): e.target.closest(".pullout-action-left-panel");

    getTeamScore = (team) => {
        let teamScore = 0;
        this.props.players.filter(p => p.team === team).forEach(p => {
            teamScore += p.pts;
        });

        return teamScore;
    }

    handleIngameRegistration = (team) => {
        let elements = document.querySelectorAll(`.pullout-registration.team-${team}`);
        let registrationBtn = document.querySelector(`.pullout-registration-button.team-${team}`);

        $(registrationBtn).hasClass("active") ? $(registrationBtn).removeClass("active"): $(registrationBtn).addClass("active");
        elements.forEach(element => {
            $(element).hasClass("active") ? $(element).removeClass("active"): $(element).addClass("active");
        });
    }

    toggleActions = (e) => {
        if (e.type === 'click') {
            let pullOut = e.target.querySelector(".pullout-action-right-panel");
            this.togglePullOut(pullOut);
        } 
        else if (e.type === 'contextmenu') {
            let pullOut = e.target.querySelector(".pullout-action-left-panel");
            this.togglePullOut(pullOut);
            e. preventDefault();
        }

        e.stopPropagation();
    }

    togglePullOut = (pullOut) => $(pullOut).hasClass("active") ? $(pullOut).removeClass("active"): $(pullOut).addClass("active");

    setDefaultFocus = () => {
        let jerseyNumberElement = $("#jerseyNumber1")[0];
        $(jerseyNumberElement).trigger("focus");
    }

    checkJerseyNumber = (e, team) => {
        let number = e.target.value;

        let jerseyInputId = !this.state.gameStarted ? `#jerseyNumber${team}`: `#jerseyNumberIngame${team}`
        let jerseyNumberElement = $(jerseyInputId)[0];
        if (number === "" || isNaN(number)) {
            $(jerseyNumberElement).addClass("error-input");
        }
        else {
            $(jerseyNumberElement).removeClass("error-input");
        }
    }

    submit = (team) => {
        let jerseyInputId = !this.state.gameStarted ? `#jerseyNumber${team}`: `#jerseyNumberIngame${team}`
        let lastNameId = !this.state.gameStarted ? `#lastName${team}`: `#lastNameIngame${team}`
        let jerseyNumberElement = $(jerseyInputId)[0];
        let lastNameElement = $(lastNameId)[0];

        if (this.isInputValid(jerseyNumberElement, lastNameElement)) {
            this.props.addPlayer(this.getPlayer(team));
            this.clearInput(team);
        }
    }

    clearInput = (team) => {
        let jerseyInputId = !this.state.gameStarted ? `#jerseyNumber${team}`: `#jerseyNumberIngame${team}`
        let lastNameId = !this.state.gameStarted ? `#lastName${team}`: `#lastNameIngame${team}`
        let jerseyNumberElement = $(jerseyInputId)[0];
        let lastNameElement = $(lastNameId)[0];

        jerseyNumberElement.value = "";
        lastNameElement.value = "";
        $(jerseyNumberElement).trigger("focus");
    }

    getPlayer = (team) => {
        let id = this.props.players.length > 0 ? Math.max(...this.props.players.map(p => p.id)) + 1: 0;
        let jerseyInputId = !this.state.gameStarted ? `#jerseyNumber${team}`: `#jerseyNumberIngame${team}`
        let lastNameId = !this.state.gameStarted ? `#lastName${team}`: `#lastNameIngame${team}`
        let jerseyNumberElement = $(jerseyInputId)[0];
        let lastNameElement = $(lastNameId)[0];
        let player = {
            id: id,
            number: jerseyNumberElement.value,
            name: lastNameElement.value,
            team: team
        };

        return player;
    }

    isInputValid = (jerseyNumberElement, lastNameElement) => {
        return !$(jerseyNumberElement).hasClass("error-input") &&
        !$(lastNameElement).hasClass("error-input");
    }

    gameclockCountDown = () => {
        return setInterval(() => {
            if ((this.state.minutes === 0 && this.state.seconds === 0 && this.state.milliseconds === 0) || this.state.shotclock === 0) {
                this.soundBuzzer();
                this.stopTimer();
            }
            else {
                this.setState({
                    minutes: (this.state.milliseconds - 1) < 0 && this.state.seconds === 0 ? this.state.minutes - 1: this.state.minutes,
                    seconds: (this.state.milliseconds - 1) < 0 ? (this.state.seconds - 1) < 0 ? this.maxSeconds: this.state.seconds - 1: this.state.seconds,
                    milliseconds: (this.state.milliseconds - 1) < 0 ? this.maxMilliSeconds: this.state.milliseconds - 1,
                    shotclock: (this.state.milliseconds - 1) < 0 ? this.state.shotclock - 1: this.state.shotclock,
                })
            }
        }, 1000 / 100);
    }

    toggleTimer = () => {
        if (this.state.gameStarted) {
            this.setState({
                timerPlay: !this.state.timerPlay
            }, () => {
                if (this.state.timerPlay) {
                    this.gameclockTimerInterval = this.gameclockCountDown();
                }
                else {
                    clearInterval(this.gameclockTimerInterval);
                }
            });
        }
    }

    stopTimer = () => {
        this.setState({
            timerPlay: false
        }, () => {
            clearInterval(this.gameclockTimerInterval);
        });
    }
    
    soundBuzzer = () => {
        this.audio.play()
    }

    resetShotclockTimer = () => {
        if (this.state.gameStarted) {
            this.setState({
                shotclock: this.shotclockLimit
            })
        }
    }

    setShotClock14 = () => {
        if (this.state.gameStarted) {
            this.setState({
                shotclock: this.shotclock14
            })
        }
    }

    resetTimer = () => {
        this.setState({
            minutes: this.minutesPerQuarter,
            seconds: 0,
            milliseconds: 0
        });
        this.stopTimer();
    }

    shouldShotClockTurnOff = () => this.state.minutes === 0 && this.state.seconds <= this.shotclockLimit && this.state.shotclock >= this.state.seconds;

    render () {
        return (
            <div className="d-flex flex-column justify-content-between align-items-center position-fixed h-100">
                <div className="overflow-y-scroll">
                    <div className="temporary-margin"></div>
                    <div className={`flex-row justify-content-around mt-5 align-items-end scoreboard-line ${this.state.gameStarted ? "d-flex": "d-none"}`}>
                        <Scoreboard getTeamScore={() => this.getTeamScore(1)}
                                    gameStarted={this.state.gameStarted}
                        />
                        {/* <div style={{width: "310px"}} className="slide-right-game-start content-stack-center mt-5 standard-control">
                            <div className="d-flex flex-row align-items-center justify-content-center slide-right-game-start standard-bottom-border user-select-none">
                                
                                <p className={`mb-0 countdown-timer ${this.state.minutes === 0 ? "d-none": ""}`}>{this.state.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:</p>
                                <p className="mb-0 countdown-timer">{this.state.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>
                                <p className={`mb-0 countdown-timer  ${this.state.minutes === 0 ? "": "d-none"}`}>.{this.state.milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>
                            </div>
                            <p className={`mb-0 fs-title fw-bold shot-clock-text slide-right-game-start ${this.state.shotclock < 8 ? "color-red": ""} ${this.shouldShotClockTurnOff() ? "color-standard": ""}`}>{this.state.shotclock}</p>
                        </div> */}
                        <Scoreboard getTeamScore={() => this.getTeamScore(2)}
                                    gameStarted={this.state.gameStarted}
                        />
                    </div>

                    <div className={`flex-column align-items-center justify-content-center slide-right my-2 ${this.state.gameStarted ? "d-none": "d-flex"}`}>
                        <p className="mb-0 fs-title-2">ADD PLAYERS</p>
                        <div className="temporary-margin"></div>
                    </div>
                    <div className="d-flex flex-row justify-content-center gap-3 px-4 mb-4 col-12">
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                {/* <Scoreboard getTeamScore={() => this.getTeamScore(1)}
                                            gameStarted={this.state.gameStarted}
                                /> */}
                                <div className={`${this.state.gameStarted ? "d-none": "d-flex"} col-5 flex-row gap-3 mb-4`}>
                                    <JerseyNumberInput team={1}
                                                        submit={this.submit}
                                                        checkJerseyNumber={this.checkJerseyNumber}
                                                        gameStarted={false}
                                    />
                                    <div className="col-5">
                                        <NameInput team={1}
                                                        submit={this.submit}
                                                        gameStarted={false}
                                        />
                                    </div>
                                </div>
                                    {/* <div className="col-3">
                                    </div> */}
                                <StatSheet players={this.props.players}
                                            gameStarted={this.state.gameStarted}
                                            team={1}
                                            toggleActions={this.toggleActions}
                                            updateStat={this.updateStat}
                                            closePanels={this.closePanels}
                                            toggleActivePlayer={this.props.toggleActivePlayer}
                                            changeSelected={this.props.changeSelected}
                                            />
                                <div className={`${this.state.gameStarted ? "d-flex": "d-none"} align-items-center flex-row gap-3 mt-4 col-12`}>
                                    <svg onClick={() => this.handleIngameRegistration(1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill pullout-registration-button team-1 cursor-pointer slide-right-game-start" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                    </svg>
                                    <div className="hide-objects">
                                        <div className="pullout-registration team-1 d-flex flex-row gap-3">
                                            <JerseyNumberInput team={1}
                                                                submit={this.submit}
                                                                checkJerseyNumber={this.checkJerseyNumber}
                                                                gameStarted={true}
                                            />
                                            <div className="col-5">
                                                <NameInput team={1}
                                                            submit={this.submit}
                                                            gameStarted={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-6">
                            <div className="d-flex flex-column">
                                {/* <Scoreboard getTeamScore={() => this.getTeamScore(2)}
                                            gameStarted={this.state.gameStarted} 
                                /> */}
                                <div className={`${this.state.gameStarted ? "d-none": "d-flex"} col-5 flex-row gap-3 mb-4`}>
                                    <JerseyNumberInput team={2}
                                                        submit={this.submit}
                                                        checkJerseyNumber={this.checkJerseyNumber}
                                                        gameStarted={false}
                                    />
                                    <div className="col-5">
                                        <NameInput team={2}
                                                        submit={this.submit}
                                                        gameStarted={false}
                                        />
                                    </div>
                                </div>
                                <StatSheet players={this.props.players}
                                            gameStarted={this.state.gameStarted}
                                            team={2}
                                            toggleActions={this.toggleActions}
                                            updateStat={this.updateStat}
                                            closePanels={this.closePanels}
                                            toggleActivePlayer={this.props.toggleActivePlayer}
                                            changeSelected={this.props.changeSelected}
                                            />
                                <div className={`${this.state.gameStarted ? "d-flex": "d-none"} flex-row align-items-center gap-3 mt-4 col-12`}>
                                <svg onClick={() => this.handleIngameRegistration(2)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill pullout-registration-button team-2 cursor-pointer slide-right-game-start" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                    </svg>
                                    <div className="hide-objects">
                                        <div className="pullout-registration team-2 d-flex flex-row gap-3">
                                            <JerseyNumberInput team={2}
                                                                submit={this.submit}
                                                                checkJerseyNumber={this.checkJerseyNumber}
                                                                gameStarted={true}
                                            />
                                            <div className="col-5">
                                                <NameInput team={2}
                                                            submit={this.submit}
                                                            gameStarted={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`flex-row justify-content-center align-items-center mt-5 ${this.state.gameStarted ? "d-none": "d-flex"}`}>
                        <div className="start-button cursor-pointer mb-5 slide-right" onClick={this.gameStart}>
                            <p className="mb-0 fs-normal fw-bold shadow pe-none">START GAME</p>
                        </div>
                    </div>
                </div>
                
                {/* <Controls gameStarted={this.state.gameStarted}
                            toggleTimer={this.toggleTimer}
                            timerPlay={this.state.timerPlay}
                            resetShotclockTimer={this.resetShotclockTimer}
                            setShotClock14={this.setShotClock14}
                            quarter={this.state.quarter}
                            changeQuarter={this.changeQuarter}
                /> */}
                
            </div>
        )
    };
}

export default Game;