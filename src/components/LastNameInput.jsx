import React from "react"

const LastNameInput = (props) => {
    return (
        <input type="text" id={`lastName${props.team}`} className="form-control fs-normal registration-input slide-right" placeholder="Last Name" onKeyDown={(e) => props.submit(e, props.team)}></input>
    )
};

export default LastNameInput;