import React from "react"
import PullOutButton from "./PullOutButton";
import SimplePullOutCell from "./SimplePullOutCell";
import { PullOutSides } from "../constants/pullout-sides.ts";
import { StatTypes } from "../constants/stat-type.ts";
import FlashPullOut from "./FlashPullOut.jsx";

const StatSheet = (props) => {
    const isInvalidPercentage = (number) => number === 0 || isNaN(number) || !isFinite(number);

    return (
        <div className={`w-100 ${props.gameStarted ? "pe-auto": "pe-none"}`}>
            <table onClick={props.closePanels} className="slide-right-game-start">
                <thead>
                    <tr>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">No.</p></th>
                        <th scope="col"><p className="mb-0 fs-normal fw-bold">Name</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">PTS</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">REB</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">AST</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">STL</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">BLK</p></th>
                        <th scope="col" className="multi-state-width">
                            <p className="mb-0 text-center fs-normal fw-bold">FT</p>
                            <div className="d-flex flex-row mt-1">
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-normal fw-300">M/A</p>
                                </div>
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-normal fw-300">FT<span className="fs-large manrope-font">%</span></p>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="multi-state-width">
                            <p className="mb-0 text-center fs-normal fw-bold">2 PT</p>
                            <div className="d-flex flex-row mt-1">
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-normal fw-300">M/A</p>
                                </div>
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-large manrope-font fw-300">%</p>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="multi-state-width">
                            <p className="mb-0 text-center fs-normal fw-bold">3 PT</p>
                            <div className="d-flex flex-row mt-1">
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-normal fw-300">M/A</p>
                                </div>
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-large manrope-font fw-300">%</p>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="multi-state-width">
                            <p className="mb-0 text-center fs-normal fw-bold">FG</p>
                            <div className="d-flex flex-row mt-1">
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-normal fw-300">M/A</p>
                                </div>
                                <div className="content-center col-6">
                                    <p className="mb-0 fs-large manrope-font fw-300">%</p>
                                </div>
                            </div>
                        </th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">TOV</p></th>
                        <th scope="col"><p className="mb-0 text-center fs-normal fw-bold">FLS</p></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.players.sort((a, b) => b["isActive"] - a["isActive"] || a["number"] - b["number"]).filter(player => player.team === props.team).map((player, i) => {
                            return (
                                <tr key={`row-${i}`} className={`slide-right ${player.isActive ? "activePlayer": ""} ${player.isActive && props.gameStarted ? "pe-auto": "pe-none"} ${player.selected ? "selected": ""}`}>
                                    <th scope="row" className={`cursor-pointer ${props.gameStarted ? "pe-auto": "pe-none"}`} onDoubleClick={() => props.toggleActivePlayer(player.id)}><p className="mb-0 text-center fs-small fw-bold">{player.number}</p></th>
                                    <th style={{width: "70px", maxWidth: "70px"}} className={`cursor-pointer ${player.isActive && props.gameStarted ? "pe-auto": "pe-none"}`} onClick={() => props.changeSelected(player.id)}><p className="mb-0 fs-small text-break pe-none">{player.name}</p></th>
                                    <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                        <div className="content-center">
                                            <p className="mb-0 text-center fs-small">{player.pts}</p>
                                            <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                            height="100%"
                                                            description="+1"
                                                            pullOutId={`pts1${player.selected ? "-selected": ""}`} />
                                            <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                            height="100%"
                                                            description="+2"
                                                            pullOutId={`pts2${player.selected ? "-selected": ""}`} />
                                            <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                            height="100%"
                                                            description="+3"
                                                            pullOutId={`pts3${player.selected ? "-selected": ""}`} />
                                            <div className="pullout-action-right-panel">
                                                
                                                {/* <PullOutButton handleClick={(e) => props.updateStat(e, 3, player.id, PullOutSides.Right, StatTypes.Pts)}
                                                                backgroundColor="#FF8E8F"
                                                                height="50%"
                                                                description="+3" /> */}
                                            </div>
                                            
                                            <div className="pullout-action-left-panel">
                                                <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Pts)}
                                                                backgroundColor="rgb(49 49 49)"
                                                                height="100%"
                                                                description="-1" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Rebs][0]}
                                                            playerStat={player.rebs}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Rebs)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Rebs)} />
                                        
                                    </td>
                                    <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Ast][0]}
                                                            playerStat={player.ast}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Ast)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Ast)} />
                                    </td>
                                    <td>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Stl][0]}
                                                            playerStat={player.stl}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Stl)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Stl)} />
                                    </td>
                                    <td>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Blk][0]}
                                                            playerStat={player.blk}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Blk)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Blk)} />
                                    </td>

                                    <td>
                                        <div className="d-flex flex-row">
                                            <div className="content-center col-6 pullout-container" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                                <p className="mb-0 fs-small pe-none">{player.ftMake}/{player.ftAttempt}</p>
                                                <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                                height="100%"
                                                                description="+1"
                                                                isPercentage={true}
                                                                pullOutId={`pts1${player.selected ? "-selected": ""}`} />
                                                <div className="pullout-action-right-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.FtMake)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="+Make" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Right, StatTypes.FtMake)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            
                                                <div className="pullout-action-left-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Left, StatTypes.FtAttempt)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="+Miss" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.FtAttempt)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            </div>
                                            <div className="content-center col-6">
                                                <p className="mb-0 fs-small">{isInvalidPercentage(player.ftMakeAttemptPercent) ? "-": `${player.ftMakeAttemptPercent.toFixed(1)}`}<span className={`manrope-font ${isInvalidPercentage(player.ftMakeAttemptPercent) ? "d-none": "d-inline"}`}>%</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-row">
                                            <div className="content-center col-6 pullout-container" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                                <p className="mb-0 fs-small pe-none">{player.fgMake}/{player.fgAttempt}</p>
                                                <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                                height="100%"
                                                                description="+1"
                                                                isPercentage={true}
                                                                pullOutId={`pts2${player.selected ? "-selected": ""}`} />
                                                <div className="pullout-action-right-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.FgMake)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="+1" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Right, StatTypes.FgMake)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            
                                                <div className="pullout-action-left-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Left, StatTypes.FgAttempt)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="Miss" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.FgAttempt)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            </div>
                                            <div className="content-center col-6">
                                                <p className="mb-0 fs-small">{isInvalidPercentage(player.fgMakeAttemptPercent) ? "-": `${player.fgMakeAttemptPercent.toFixed(1)}`}<span className={`manrope-font ${isInvalidPercentage(player.fgMakeAttemptPercent) ? "d-none": "d-inline"}`}>%</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-row">
                                            <div className="content-center col-6 pullout-container" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                                <p className="mb-0 fs-small pe-none">{player.threePtMake}/{player.threePtAttempt}</p>
                                                <FlashPullOut backgroundColor="rgb(4 44 67)"
                                                                height="100%"
                                                                description="+1"
                                                                isPercentage={true}
                                                                pullOutId={`pts3${player.selected ? "-selected": ""}`} />
                                                <div className="pullout-action-right-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.ThreePtMake)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="+1" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Right, StatTypes.ThreePtMake)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            
                                                <div className="pullout-action-left-panel">
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Left, StatTypes.ThreePtAttempt)}
                                                                    backgroundColor="rgb(4 44 67)"
                                                                    height="50%"
                                                                    description="Miss" />
                                                    <PullOutButton handleClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.ThreePtAttempt)}
                                                                    backgroundColor="rgb(49 49 49)"
                                                                    height="50%"
                                                                    isUndo={true} />
                                                </div>
                                            </div>
                                            <div className="content-center col-6">
                                                <p className="mb-0 fs-small">{player.threePtMakeAttemptPercent === 0 ? "-": `${player.threePtMakeAttemptPercent.toFixed(1)}`}<span className={`manrope-font ${player.threePtMakeAttemptPercent === 0 ? "d-none": "d-inline"}`}>%</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="no-hover">
                                        <div className="d-flex flex-row">
                                            <div className="content-center col-6 pe-none" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                                <p className="mb-0 fs-small pe-none">{player.totalFgMake}/{player.totalFgAttempt}</p>
                                            </div>
                                            <div className="content-center col-6">
                                                <p className="mb-0 fs-small">{isInvalidPercentage(player.totalFgMakeAttemptPercent) === 0 ? "-": `${player.totalFgMakeAttemptPercent.toFixed(1)}%`}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Tov][0]}
                                                            playerStat={player.tov}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Tov)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Tov)} />
                                    </td>
                                    <td>
                                        <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                            player={player}
                                                            statType={Object.entries(StatTypes)[StatTypes.Fls][0]}
                                                            playerStat={player.fls}
                                                            handleRightPanelClick={(e) => props.updateStat(e, 1, player.id, PullOutSides.Right, StatTypes.Fls)}
                                                            handleLeftPanelClick={(e) => props.updateStat(e, -1, player.id, PullOutSides.Left, StatTypes.Fls)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default StatSheet;
<div>

</div>