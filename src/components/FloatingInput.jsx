import { BsEmojiLaughing, BsFillTelephoneFill, BsFillPinMapFill } from "react-icons/bs";
import { useState } from "react";

const FloatingInput = ({ type, name, register, validation, isError, value, label, instruction }) => {
  const [change, setChange ] = useState(value)
  let icon   
  if(name === "name" ){
      icon = <BsEmojiLaughing size={25} color="#A9CF46" className="basis-1/4" />
    }else if(name === "telepon"){
      icon = <BsFillTelephoneFill size={25} color="#A9CF46" className="basis-1/4" />
    }else if(name === "alamat"){
      icon = <BsFillPinMapFill size={25} color="#A9CF46" className="basis-1/4" />
    }


  return (
    <div className="flex flex-row items-center pt-5">
      {icon}
      <div className="relative basis-3/4">
          <input type={type} id={name} value={change}
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm font-semibold text-secondary border-0 border-b border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer" placeholder=" "
          {...register(name, {
            onChange: (e) => {
              setChange(e.target.value)
            },
            ...validation
          })}
          />
          <label htmlFor={name} 
          className="absolute text-sm text-secondary duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{label}</label>
          <span className="text-xs font-medium text-secondary">{instruction}</span>
      </div>
    </div>
   );
}
 
export default FloatingInput;