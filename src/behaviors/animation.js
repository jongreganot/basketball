import { wait } from "./utilities";
import $ from "jquery";

export const animateEnter = async () => {
    let elements = $(".slide-right");

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        
        if (!$(element).hasClass("animated")) {
            $(element).css({ left: "-200px" });
            $(element).animate({ left: "0px", opacity: "1" }, 400, "swing");
            $(element).addClass("animated");
    
            await wait(100);
        }
    }

    await wait(200);
}

export const animateEnterNext = (className) => {
    let elements = $(`.${className}`);

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        
        $(element).removeClass(className);
        $(element).addClass("slide-right");
    }

    animateEnter();
}