import $ from "jquery";

export const registerPlayBtnEventListener = (toggleTimer, resetShotclockTimer, setShotClock14) => {
    $(document).on("keyup", (e) => {
        if (e.code === "Space") {
            toggleTimer();
            removeHover("play-button-container.play");
        }
        else if (e.code === "KeyR") {
            resetShotclockTimer();
            removeHover("play-button-container.reset-24");
        }
        else if (e.code === "KeyY") {
            setShotClock14();
            removeHover("play-button-container.reset-14");
        }
    });

    $(document).on("keydown", (e) => {
        if (e.code === "Space") {
            addHover("play-button-container.play");
        }
        else if (e.code === "KeyR") {
            addHover("play-button-container.reset-24");
        }
        else if (e.code === "KeyY") {
            addHover("play-button-container.reset-14");
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