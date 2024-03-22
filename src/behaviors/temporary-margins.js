import $ from "jquery";

export const clearTemporaryMargins = () => {
    let elements = $(".temporary-margin");

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        
        $(element).addClass("d-none");
    }
}