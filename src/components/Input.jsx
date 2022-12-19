import React, { useState } from "react";

const Input = ({ type, placeholder, name, register, validation, isError, location }) => {
    const [change, setChange] = useState("")

    return (
        <>
            {location === "auth" ? 
                <input
                    className={`py-3 px-5 mt-5 rounded-full w-full border focus:outline-none 
                    ${change && "border-neutral-300 focus:border-neutral-400"} ${isError && "border-red-300 focus:border-red-300"}`}
                    type={type} 
                    placeholder={placeholder}
                    {...register(name, {
                        onChange: (e) => {
                            setChange(e.target.value)
                        },
                        ...validation
                    })}
                />
                :
                <input 
                    className={`mt-4 px-5 py-4 w-full bg-gray-100 text-zinc-500 font-semibold border-[0.2px] rounded-md focus:outline-gray-200 
                    ${isError && "border-red-500"}`}
                    type={type} 
                    placeholder={placeholder}
                    {...register(name, {
                        onChange: (e) => {
                            setChange(e.target.value)
                        },
                        ...validation
                    })}
                />     
            }
        </>

    );
};

export default Input;
