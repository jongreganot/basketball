import $ from "jquery";

export const registerTimerEventListener = (toggleTimer, resetShotclockTimer, setShotClock14) => {
    $(document).on("keyup", (e) => {
        if (e.code === "Space") {
            toggleTimer();
            removeHover("control-button-container.play");
        }
        // else if (e.code === "KeyR") {
        //     resetShotclockTimer();
        //     removeHover("control-button-container.reset-24");
        // }
        else if (e.code === "KeyY") {
            setShotClock14();
            removeHover("control-button-container.reset-14");
        }
    });

    $(document).on("keydown", (e) => {
        if (e.code === "Space") {
            addHover("control-button-container.play");
        }
        else if (e.code === "KeyR") {
            addHover("control-button-container.reset-24");
        }
        else if (e.code === "KeyY") {
            addHover("control-button-container.reset-14");
        }
    });
}

const addHover = (className) => {
    let playBtns = document.querySelectorAll(`.${className}`);

    playBtns.forEach(playBtn => {
        $(playBtn).addClass("hovered");
    });
}

const removeHover = (className) => {
    let playBtns = document.querySelectorAll(`.${className}`);

    playBtns.forEach(playBtn => {
        $(playBtn).removeClass("hovered");
    });
}