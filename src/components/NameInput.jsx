import React from "react"

const NameInput = (props) => {
    const submit = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            props.submit(props.team);
        }
    }
    return (
        <input type="text" id={`lastName${props.gameStarted ? "Ingame": ""}${props.team}`} className={`form-control fs-normal registration-input ${props.gameStarted ? "slide-right-game-start": "slide-right"}`} placeholder="Name" onKeyDown={(e) => submit(e)}></input>
    )
};

export default NameInput;