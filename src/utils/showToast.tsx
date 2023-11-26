import { toast } from "react-toastify";
type PropTypes = {
    type?: "success" | "warning" | "error" | "info";
    message: string;
    position?:
        | "top-left"
        | "top-right"
        | "top-center"
        | "bottom-left"
        | "bottom-right"
        | "bottom-center";
    options?: object;
};
const showToast = ({
    type = "success",
    message,
    position = "top-right",
    options = {},
}: PropTypes) => {
    toast[type](message, {
        theme: "colored",
        position,
        ...options,
    });
};

export default showToast;
