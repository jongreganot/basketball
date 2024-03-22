import React from "react"

class ShotClock extends React.Component {
    constructor(props) {
       super(props);
    }

    render () {
        return (
            <div>
                <div className="shot-clock content-stack-center mb-4 shotclock-shadow slide-right-game-start user-select-none">
                    <p className="mb-0 fs-title-2 fw-bold shot-clock-text">
                        24
                    </p>
                </div>
            </div>
        )
    };
}

export default ShotClock;