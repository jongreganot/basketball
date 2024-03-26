import React from "react"

const NameInput = (props) => {
    return (
        <input type="text" id={`lastName${props.gameStarted ? "Ingame": ""}${props.team}`} className={`form-control fs-normal registration-input ${props.gameStarted ? "slide-right-game-start": "slide-right"}`} placeholder="Name" onKeyDown={(e) => props.submit(e, props.team)}></input>
    )
};

export default NameInput;