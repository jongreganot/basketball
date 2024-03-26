import React from "react"

const JerseyNumberInput = (props) => {
    const submit = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            props.submit(props.team);
        }
    }
    return (
        <input type="text" 
                id={`jerseyNumber${props.gameStarted ? "Ingame": ""}${props.team}`}
                className={`form-control fs-normal w-25 registration-input ${props.gameStarted ? "slide-right-game-start": "slide-right"}`} 
                onKeyDown={(e) => submit(e)} 
                placeholder="Jersey #" 
                onChange={(e) => props.checkJerseyNumber(e, props.team)}></input>
    )
};

export default JerseyNumberInput;