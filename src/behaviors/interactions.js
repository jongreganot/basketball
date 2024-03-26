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

export const registerHotkeyEvents = (addStat) => {
    $(document).on("keydown", async (e) => {
        let statType = "";
        if (e.code === "Digit1") {
            flashAddedStats("pts1");
            statType = StatTypes.FtMake;
        }
        else if (e.code === "Digit2") {
            flashAddedStats("pts2");
            statType = StatTypes.FgMake;
        }
        else if (e.code === "Digit3") {
            flashAddedStats("pts3");
            statType = StatTypes.ThreePtMake;
        }
        else if (e.code === "KeyR") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Rebs][0]);
            statType = StatTypes.Rebs;
        }
        else if (e.code === "KeyA") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Ast][0]);
            statType = StatTypes.Ast;
        }
        else if (e.code === "KeyS") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Stl][0]);
            statType = StatTypes.Stl;
        }
        else if (e.code === "KeyB") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Blk][0]);
            statType = StatTypes.Blk;
        }
        else if (e.code === "KeyT") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Tov][0]);
            statType = StatTypes.Tov;
        }
        else if (e.code === "KeyF") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.Fls][0]);
            statType = StatTypes.Fls;
        }
        
        else if (e.code === "KeyZ") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.FtAttempt][0]);
            statType = StatTypes.FtAttempt;
        }
        else if (e.code === "KeyX") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.FgAttempt][0]);
            statType = StatTypes.FgAttempt;
        }
        else if (e.code === "KeyC") {
            flashAddedStats(Object.entries(StatTypes)[StatTypes.ThreePtAttempt][0]);
            statType = StatTypes.ThreePtAttempt;
        }

        addStat(statType);
    });
}

const flashAddedStats = async (statType) => {
    let elements = document.querySelectorAll(`.flash-pullout-${statType.toLowerCase()}-selected`);
    elements.forEach(element => {
        $(element).addClass("active");
        console.log(element);
    });
    await wait(1200);
    elements.forEach(element => {
        $(element).removeClass("active");
    });
}