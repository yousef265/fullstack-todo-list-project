/**
 * Toaster Component for displaying toast notifications.
 *
 * This component utilizes the `react-hot-toast` library to display toast messages
 * of different types (success, error, loading) with customizable position and duration.
 *
 * @param {"success" | "error" | "loading"} toastType - The type of toast notification.
 * @param {string} message - The message to be displayed in the toast notification.
 * @param {number} [duration=2000] - The duration (in milliseconds) the toast will be visible.
 * @param {"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"} [position="top-center"] - The position of the toast on the screen.
 *
 * @returns {null} This component does not render any visible output.
 *
 */

import toast from "react-hot-toast";

interface IProps {
    toastType: "success" | "error" | "loading";
    message: string;
    duration?: number;
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
}

function Toaster({ toastType, message, duration = 2000, position = "top-center" }: IProps) {
    toast[toastType](message, {
        position,
        duration,
        style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
        },
    });

    return null;
}

export default Toaster;
