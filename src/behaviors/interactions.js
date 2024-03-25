import $ from "jquery";
import { wait } from "./utilities";
import { StatTypes } from "../constants/stat-type.ts";

export const disableDefaultSpaceBarBehavior = () => {
    $(document).on("keydown", (e) => {
        if (e.code === "Space") {
            e. preventDefault();
        }
    });
}

export const registerHotkeyEvents = () => {
    $(document).on("keydown", async (e) => {
        if (e.code === "Digit1") {
            flashAddedStats("pts1");
        }
        else if (e.code === "Digit2") {
            flashAddedStats("pts2");
        }
        else if (e.code === "Digit3") {
            flashAddedStats("pts3");
        }
        else if (e.code === "KeyR") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Rebs][0]);
        }
        else if (e.code === "KeyA") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Ast][0]);
        }
        else if (e.code === "KeyS") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Stl][0]);
        }
        else if (e.code === "KeyB") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Blk][0]);
        }
        else if (e.code === "KeyT") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Tov][0]);
        }
        else if (e.code === "KeyF") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Fls][0]);
        }
    });
}

const flashAddedStats = async (statType) => {
    $(`#flashPullOut${statType}Selected`).addClass("active");
    await wait(1200);
    $(`#flashPullOut${statType}Selected`).removeClass("active");
}