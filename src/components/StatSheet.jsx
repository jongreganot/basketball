import React from "react"
import PullOutButton from "./PullOutButton";
import SimplePullOutCell from "./SimplePullOutCell";
import { PullOutSides } from "../constants/pullout-sides.ts";

const StateSheet = (props) => {
    return (
        <table onClick={props.closePanels}>
            <thead>
                <tr>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">No.</p></th>
                    <th scope="col"><p className="mb-0 fs-small fw-bold">Name</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">PTS</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">REB</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">AST</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">STL</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">BLK</p></th>
                    <th scope="col" className="multi-state-width">
                        <p className="mb-0 text-center fs-small fw-bold">Field Goal</p>
                        <div className="d-flex flex-row mt-1">
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">M/A</p>
                            </div>
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">%</p>
                            </div>
                        </div>
                    </th>
                    <th scope="col" className="multi-state-width">
                        <p className="mb-0 text-center fs-small fw-bold">Free Throw</p>
                        <div className="d-flex flex-row mt-1">
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">M/A</p>
                            </div>
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">FT%</p>
                            </div>
                        </div>
                    </th>
                    <th scope="col" className="multi-state-width">
                        <p className="mb-0 text-center fs-small fw-bold">3 PT</p>
                        <div className="d-flex flex-row mt-1">
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">M/A</p>
                            </div>
                            <div className="content-center col-6">
                                <p className="mb-0 fs-small fw-300">%</p>
                            </div>
                        </div>
                    </th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">TOV</p></th>
                    <th scope="col"><p className="mb-0 text-center fs-small fw-bold">FLS</p></th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    props.players.filter(player => player.team === props.team).map((player, i) => {
                        return (
                            <tr key={`row-${i}`}>
                                <th scope="row"><p className="mb-0 text-center fs-small fw-bold">{player.number}</p></th>
                                <td><p className="mb-0 fs-small">{player.name}</p></td>
                                <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                    <div className="content-center pe-none">
                                        <p className="mb-0 text-center fs-small">{player.pts}</p>
                                        <div className="pullout-action-right-panel">
                                                <PullOutButton handleClick={(e) => props.addPts(e, 2, player.id, PullOutSides.Right)}
                                                                backgroundColor="rgb(90 110 79)"
                                                                height="50%"
                                                                description="+2" />
                                                <PullOutButton handleClick={(e) => props.addPts(e, 3, player.id, PullOutSides.Right)}
                                                                backgroundColor="#FF8E8F"
                                                                height="50%"
                                                                description="+3" />
                                            </div>
                                        
                                        <div className="pullout-action-left-panel">
                                            <PullOutButton handleClick={(e) => props.addPts(e, -1, player.id, PullOutSides.Left)}
                                                            backgroundColor="gray"
                                                            height="100%"
                                                            description="-1" />
                                        </div>
                                    </div>
                                </td>
                                <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.rebs}
                                                        handleRightPanelClick={(e) => props.addReb(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addReb(e, -1, player.id, PullOutSides.Left)} />
                                </td>
                                <td className="td-with-actions cursor-pointer" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.ast}
                                                        handleRightPanelClick={(e) => props.addAst(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addAst(e, -1, player.id, PullOutSides.Left)} />
                                </td>
                                <td>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.stl}
                                                        handleRightPanelClick={(e) => props.addStl(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addStl(e, -1, player.id, PullOutSides.Left)} />
                                </td>
                                <td>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.blk}
                                                        handleRightPanelClick={(e) => props.addBlk(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addBlk(e, -1, player.id, PullOutSides.Left)} />
                                </td>

                                <td>
                                    <div className="d-flex flex-row">
                                        <div className="content-center col-6 pullout-container pe-auto" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                            <p className="mb-0 fs-small pe-none">{player.fgMake}/{player.fgAttempt}</p>
                                            <div className="pullout-action-right-panel">
                                                <PullOutButton handleClick={(e) => props.addFgMake(e, 1, player.id, PullOutSides.Right)}
                                                                backgroundColor="rgb(90 110 79)"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        
                                            <div className="pullout-action-left-panel">
                                                <PullOutButton handleClick={(e) => props.addFgAttempt(e, 1, player.id, PullOutSides.Left)}
                                                                backgroundColor="gray"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        </div>
                                        <div className="content-center col-6">
                                            <p className="mb-0 fs-small">{player.fgMakeAttemptPercent === 0 ? "-" : `${player.fgMakeAttemptPercent.toFixed(2)}%`}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-row">
                                        <div className="content-center col-6 pullout-container pe-auto" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                            <p className="mb-0 fs-small pe-none">{player.ftMake}/{player.ftAttempt}</p>
                                            <div className="pullout-action-right-panel">
                                                <PullOutButton handleClick={(e) => props.addFtMake(e, 1, player.id, PullOutSides.Right)}
                                                                backgroundColor="rgb(90 110 79)"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        
                                            <div className="pullout-action-left-panel">
                                                <PullOutButton handleClick={(e) => props.addFtAttempt(e, 1, player.id, PullOutSides.Left)}
                                                                backgroundColor="gray"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        </div>
                                        <div className="content-center col-6">
                                            <p className="mb-0 fs-small">{player.ftMakeAttemptPercent === 0 ? "-" : `${player.ftMakeAttemptPercent.toFixed(2)}%`}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-row">
                                        <div className="content-center col-6 pullout-container pe-auto" onClick={(e) => props.toggleActions(e)} onContextMenu={(e) => props.toggleActions(e)}>
                                            <p className="mb-0 fs-small pe-none">{player.threePtMake}/{player.threePtAttempt}</p>
                                            <div className="pullout-action-right-panel">
                                                <PullOutButton handleClick={(e) => props.addThreePtMake(e, 1, player.id, PullOutSides.Right)}
                                                                backgroundColor="rgb(90 110 79)"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        
                                            <div className="pullout-action-left-panel">
                                                <PullOutButton handleClick={(e) => props.addThreePtAttempt(e, 1, player.id, PullOutSides.Left)}
                                                                backgroundColor="gray"
                                                                height="100%"
                                                                description="+1" />
                                            </div>
                                        </div>
                                        <div className="content-center col-6">
                                            <p className="mb-0 fs-small">{player.threePtMakeAttemptPercent === 0 ? "-" : `${player.threePtMakeAttemptPercent.toFixed(2)}%`}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.tov}
                                                        handleRightPanelClick={(e) => props.addTov(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addTov(e, -1, player.id, PullOutSides.Left)} />
                                </td>
                                <td>
                                    <SimplePullOutCell toggleActions={(e) => props.toggleActions(e)}
                                                        playerStat={player.fls}
                                                        handleRightPanelClick={(e) => props.addFls(e, 1, player.id, PullOutSides.Right)}
                                                        handleLeftPanelClick={(e) => props.addFls(e, -1, player.id, PullOutSides.Left)} />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
};

export default StateSheet;