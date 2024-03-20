import React from "react"
import $ from "jquery";
import "../styles/game.scss";
import { PullOutSides } from "../constants/pullout-sides.ts";
import StatSheet from "../components/StatSheet.jsx";
import { isNumber } from "../helpers/datatype.ts";

class Game extends React.Component {
    countdownTimerInterval = null;
    maxMilliSeconds = 99;
    maxSeconds = 59;

    state = {
        minutes: 5,
        seconds: 0,
        milliseconds: 0,
        timerPlay: false,
        gameStarted: false,
        inputtedLastName1: "",
        inputtedJerseyNumber1: "",
        isInputtedPlayer1Valid: false,
        inputtedLastName2: "",
        inputtedJerseyNumber2: "",
        isInputtedPlayer2Valid: false
    }

    componentDidMount() {
        $(document).on("keyup", (e) => {
            if (e.code === "Space") {
                this.toggleTimer();

                let playBtns = document.querySelectorAll(".play-button");

                playBtns.forEach(playBtn => {
                    $(playBtn).removeClass("hovered");
                });
            }
            else if (e.code === "Enter") {
                if (this.state.isInputtedPlayer1Valid) {
                    this.props.addPlayer(this.getInputtedPlayer1());
                    this.clearPlayer1();
                    $("#jerseyNumber1")[0].focus();
                }
                
                if (!this.state.isInputtedPlayer1Valid && this.state.isInputtedPlayer2Valid) {
                    this.props.addPlayer(this.getInputtedPlayer2());
                    this.clearPlayer2();
                    $("#jerseyNumber2")[0].focus();
                }
            }
        });

        
        $(document).on("keydown", (e) => {
            if (e.code === "Space") {
                let playBtns = document.querySelectorAll(".play-button");

                playBtns.forEach(playBtn => {
                    $(playBtn).addClass("hovered");
                });
            }
        });
    }

    clearPlayer1 = () => {
        this.setState({
            inputtedJerseyNumber1: "",
            inputtedLastName1: "",
            isInputtedPlayer1Valid: false
        })
    }

    clearPlayer2 = () => {
        this.setState({
            inputtedJerseyNumber2: "",
            inputtedLastName2: "",
            isInputtedPlayer2Valid: false
        })
    }

    getInputtedPlayer1 = () => {
        let id = this.props.players.length > 0 ? Math.max(...this.props.players.map(p => p.id)) + 1 : 0;
        let player = {
            id: id,
            number: parseInt(this.state.inputtedJerseyNumber1),
            name: this.state.inputtedLastName1,
            team: 1
        };

        return player;
    }

    getInputtedPlayer2 = () => {
        let id = this.props.players.length > 0 ? Math.max(...this.props.players.map(p => p.id)) + 1 : 0;
        let player = {
            id: id,
            number: parseInt(this.state.inputtedJerseyNumber2),
            name: this.state.inputtedLastName2,
            team: 2
        };

        return player;
    }

    addPts = (e, pts, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addPts(pts, id);

        e.stopPropagation();
    }

    addReb = (e, rebs, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addReb(rebs, id);

        e.stopPropagation();
    }

    addAst = (e, ast, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addAst(ast, id);

        e.stopPropagation();
    }

    addStl = (e, stl, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addStl(stl, id);

        e.stopPropagation();
    }

    addBlk = (e, blk, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addBlk(blk, id);

        e.stopPropagation();
    }

    addFgMake = (e, fgMake, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addFgMake(fgMake, id);

        e.stopPropagation();
    }
  
    addFgAttempt = (e, fgAttempt, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addFgAttempt(fgAttempt, id);

        e.stopPropagation();
    }

    addFtMake = (e, ftMake, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addFtMake(ftMake, id);

        e.stopPropagation();
    }
  
    addFtAttempt = (e, ftAttempt, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addFtAttempt(ftAttempt, id);

        e.stopPropagation();
    }

    addThreePtMake = (e, threePtMake, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addThreePtMake(threePtMake, id);

        e.stopPropagation();
    }
  
    addThreePtAttempt = (e, threePtAttempt, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addThreePtAttempt(threePtAttempt, id);

        e.stopPropagation();
    }

    addTov = (e, tov, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addTov(tov, id);

        e.stopPropagation();
    }

    addFls = (e, fls, id, pullOutSide) => {
        let pullOut = this.getPullOut(pullOutSide, e);
        this.togglePullOut(pullOut);
        this.props.addFls(fls, id);

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
        });
    }

    getPullOut = (pullOutSide, e) => pullOutSide === PullOutSides.Right ? e.target.closest(".pullout-action-right-panel") : e.target.closest(".pullout-action-left-panel");

    getTeamScore = (team) => {
        let teamScore = 0;
        this.props.players.filter(p => p.team === team).forEach(p => {
            teamScore += p.pts;
        });

        return teamScore;
    }

    handleJerseyNumberChange1 = (e) => {
        let number = e.target.value;
        let input = e.target;

        this.setState({inputtedJerseyNumber1: number});

        if (number === "") {
            this.setState({isInputtedPlayer1Valid: false});
            return;
        }

        if (isNaN(number)) {
            $(input).addClass("error-input");
            this.setState({isInputtedPlayer1Valid: false});
            return;
        }

        if ($(input).hasClass("error-input"))
            $(input).removeClass("error-input");

        this.setState({isInputtedPlayer1Valid: true});
    }

    handleLastNameChange1 = (e) => {
        let name = e.target.value;
        
        this.setState({inputtedLastName1: e.target.value});

        this.setState({inputtedLastName1: e.target.value});
        if (name === "") {
            this.setState({isInputtedPlayer1Valid: false});
            return;
        }
        
        this.setState({isInputtedPlayer1Valid: true});
    }

    handleJerseyNumberChange2 = (e) => {
        let number = e.target.value;
        let input = e.target;

        this.setState({inputtedJerseyNumber2: number});

        if (number === "") {
            this.setState({isInputtedPlayer2Valid: false});
            return;
        }

        if (isNaN(number)) {
            $(input).addClass("error-input");
            this.setState({isInputtedPlayer2Valid: false});
            return;
        }

        if ($(input).hasClass("error-input"))
            $(input).removeClass("error-input");

        this.setState({isInputtedPlayer2Valid: true});
    }

    handleLastNameChange2 = (e) => {
        let name = e.target.value;

        this.setState({inputtedLastName2: e.target.value});

        if (name === "") {
            this.setState({isInputtedPlayer2Valid: false});
            return;
        }

        this.setState({isInputtedPlayer2Valid: true});
    }

    startCountdown = () => {
        return setInterval(() => {
            this.setState({
                minutes: (this.state.milliseconds - 1) < 0 && this.state.seconds === 0 ? this.state.minutes - 1 : this.state.minutes,
                seconds: (this.state.milliseconds - 1) < 0 ? (this.state.seconds - 1) < 0 ? this.maxSeconds : this.state.seconds - 1 : this.state.seconds,
                milliseconds: (this.state.milliseconds - 1) < 0 ? this.maxMilliSeconds : this.state.milliseconds - 1
            })
        }, 1000 / 100);
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

    togglePullOut = (pullOut) => $(pullOut).hasClass("active") ? $(pullOut).removeClass("active") : $(pullOut).addClass("active");

    toggleTimer = () => {
        if (this.state.gameStarted) {
            this.setState({
                timerPlay: !this.state.timerPlay
            }, () => {
                if (this.state.timerPlay)
                    this.countdownTimerInterval = this.startCountdown();
                else
                    clearInterval(this.countdownTimerInterval);
            });
        }
    }

    render () {
        return (
            <div className="my-2 px-4">
                <div className={`d-flex flex-column justify-content-center align-items-center ${this.state.gameStarted ? "d-block" : "d-none"}`}>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <p className="mb-0 quarter me-4">1Q</p>
                        <p className="mb-0 countdown-timer">{this.state.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:</p>
                        <p className="mb-0 countdown-timer">{this.state.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:</p>
                        <p className="mb-0 countdown-timer">{this.state.milliseconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" id="play" fill="currentColor" onClick={this.toggleTimer} className={`bi bi-play-circle-fill play-button cursor-pointer ${this.state.timerPlay ? "d-none" : "d-block"}`} viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="pause" fill="currentColor" onClick={this.toggleTimer} className={`bi bi-pause-circle-fill play-button cursor-pointer ${this.state.timerPlay ? "d-block" : "d-none"}`} viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                        </svg>
                    </div>
                </div>
                <div className={`flex-row justify-content-center align-items-center mt-5 ${this.state.gameStarted ? "d-none" : "d-flex"}`}>
                    <div className="start-button cursor-pointer" onClick={this.gameStart}>
                        <p className="mb-0 fs-normal fw-bold shadow">START GAME</p>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-center gap-3 px-4 my-4 col-12">
                    <div className="col-6">
                        <div className="d-flex flex-column align-items-center">
                            <div className={`score-box-width shadow px-3 py-1 content-center mb-3 ${this.state.gameStarted ? "d-flex" : "d-none"}`}>
                                <p className="mb-0 fs-title-2">
                                    {this.getTeamScore(1)}
                                </p>
                            </div>
                            <div className={`${this.state.gameStarted ? "d-none" : "d-flex"} flex-row gap-3 mb-4 col-12`}>
                                <div className="col-2">
                                    <input type="text" id="jerseyNumber1" className="form-control fs-small registration-input" placeholder="Jersey Number" onKeyUp={this.handleKeyUp} onChange={this.handleJerseyNumberChange1} value={this.state.inputtedJerseyNumber1}></input>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control fs-small registration-input" placeholder="Last Name" onChange={this.handleLastNameChange1} value={this.state.inputtedLastName1}></input>
                                </div>
                            </div>
                            <StatSheet players={this.props.players}
                                        team={1}
                                        toggleActions={this.toggleActions}
                                        addPts={this.addPts}
                                        addReb={this.addReb}
                                        addAst={this.addAst}
                                        addStl={this.addStl}
                                        addBlk={this.addBlk}
                                        addFgMake={this.addFgMake}
                                        addFgAttempt={this.addFgAttempt}
                                        addFtMake={this.addFtMake}
                                        addFtAttempt={this.addFtAttempt}
                                        addThreePtMake={this.addThreePtMake}
                                        addThreePtAttempt={this.addThreePtAttempt}
                                        addTov={this.addTov}
                                        addFls={this.addFls}
                                        closePanels={this.closePanels}
                                        />
                        </div>
                    </div>


                    <div className="col-6">
                        <div className="d-flex flex-column align-items-center">
                            <div className={`score-box-width shadow px-3 py-1 content-center mb-3 ${this.state.gameStarted ? "d-flex" : "d-none"}`}>
                                <p className="mb-0 fs-title-2">
                                    {this.getTeamScore(2)}
                                </p>
                            </div>
                            <div className={`${this.state.gameStarted ? "d-none" : "d-flex"} flex-row gap-3 mb-4 col-12`}>
                                <div className="col-2">
                                    <input type="text" id="jerseyNumber2" className="form-control fs-small registration-input" placeholder="Jersey Number" onKeyUp={this.handleKeyUp} onChange={this.handleJerseyNumberChange2} value={this.state.inputtedJerseyNumber2}></input>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control fs-small registration-input" placeholder="Last Name" onChange={this.handleLastNameChange2} value={this.state.inputtedLastName2}></input>
                                </div>
                            </div>
                            <StatSheet players={this.props.players}
                                        team={2}
                                        toggleActions={this.toggleActions}
                                        addPts={this.addPts}
                                        addReb={this.addReb}
                                        addAst={this.addAst}
                                        addStl={this.addStl}
                                        addBlk={this.addBlk}
                                        addFgMake={this.addFgMake}
                                        addFgAttempt={this.addFgAttempt}
                                        addFtMake={this.addFtMake}
                                        addFtAttempt={this.addFtAttempt}
                                        addThreePtMake={this.addThreePtMake}
                                        addThreePtAttempt={this.addThreePtAttempt}
                                        addTov={this.addTov}
                                        addFls={this.addFls}
                                        closePanels={this.closePanels}
                                        />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Game;