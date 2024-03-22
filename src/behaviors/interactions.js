import $ from "jquery";

export const disableDefaultSpaceBarBehavior = () => {
    $(document).on("keydown", (e) => {
        if (e.code === "Space") {
            e. preventDefault();
        }
    });
}