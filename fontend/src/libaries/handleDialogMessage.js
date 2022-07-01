import Swal from "sweetalert2";

function handleDialogMessage(messageArray, classAlert = "") {
    let message = `<ul class='list-style-none alert ${classAlert} pt-0'>`;
    // let message = `<ul class='list-style-none alert ${classAlert}'>`;
    if (typeof messageArray === "object") {
        // const [key, value] of Object.entries(messageArray)
        for (const value of Object.values(messageArray)) {
            message += `<li class='text-align-left mt-1 text-center'>${value}</li>`;
        }
    } else {
        for (let i = 0; i < messageArray.length; i++) {
            message += `<li class='text-align-left mt-1 text-center'>${messageArray[i]}</li>`;
        }
    }
    message += "<ul>";
    return message;
}

function showDialogError(message) {
    Swal.fire({
        icon: "error",
        title: "<strong>Error message</strong>",
        text: message,
        html: message,
        showDenyButton: true,
        denyButtonText: "Close",
        showConfirmButton: false,
    });
}

function showDialogSuccess(message) {
    Swal.fire({
        icon: "success",
        title: "<strong>Success message</strong>",
        text: message,
        html: message,
        focusConfirm: false,
        showConfirmButton: true,
        confirmButtonText: "close",
        confirmButtonColor: "#6c757d",
    });
}

export {
    handleDialogMessage,
    showDialogError,
    showDialogSuccess
};