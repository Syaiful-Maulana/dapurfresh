import Swal from "sweetalert2";

const SweetAlert = ({ title, icon, button, timer }) => {
    const bgColor = () => {
        if (icon === "success") {
            return "bg-primary";
        } else if (icon === "error") {
            return "bg-danger";
        }
    };
    return Swal.fire({
        title,
        icon,
        width: 280,
        buttonsStyling: false,
        showConfirmButton: !button,
        timer,
        customClass: {
            title: "!text-base !font-medium",
            confirmButton: `${bgColor()} text-xs px-5 py-2 rounded-sm text-white`,
        },
    });
};

export default SweetAlert;
