import React from "react"

const JerseyNumberInput = (props) => {
    return (
        <input type="text" 
                id={`jerseyNumber${props.gameStarted ? "Ingame": ""}${props.team}`}
                className={`form-control fs-normal registration-input ${props.gameStarted ? "slide-right-game-start": "slide-right"}`} 
                onKeyDown={(e) => props.submit(e, props.team)} 
                placeholder="Jersey #" 
                onChange={(e) => props.checkJerseyNumber(e, props.team)}></input>
    )
};

export default JerseyNumberInput;