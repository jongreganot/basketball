import React from "react"

const JerseyNumberInput = (props) => {
    return (
        <input type="text" 
                id={`jerseyNumber${props.team}`}
                className="form-control fs-normal registration-input slide-right" 
                onKeyDown={(e) => props.submit(e, props.team)} 
                placeholder="Jersey #" 
                onChange={(e) => props.checkJerseyNumber(e, props.team)}></input>
    )
};

export default JerseyNumberInput;