import React from "react";

const Button = ({ text, icon, handleClick, type, customClass }) => {
  return (
    <button
      className={`${
        type === "submit" ? "w-full py-3" : "px-2 py-1 flex items-center"
      } bg-primary rounded-[5px] text-white font-semibold text-sm hover:bg-primary/90 ${customClass}`}
      onClick={handleClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default Button;
