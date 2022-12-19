import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { RiQuestionLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo.svg";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import Help from "../../services/api/Help/index";
import { useEffect } from "react";

const HomeHeader = () => {
  const [help, setHelp] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const contentStyle = { background: "#000" };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/product-search");
  };
  const getHelp = async () => {
    try {
      const response = await Help.help();
      setHelp(response.data.data)
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getHelp();
  }, []);
  return (
    <header className="bg-primary -mx-[15px] -mt-5 py-5 px-[25px] ">
      <div className="flex items-center text-white">
        <img src={logo} alt="Logo" />{" "}
        <span className="text-[22px] font-medium ml-1">dapurfreshid</span>
        <button className="ml-auto" onClick={() => setOpen((o) => !o)}>
          <RiQuestionLine size="40px" />
        </button>
        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          {...{
            contentStyle,
            overlayStyle,
          }}
        >
          <div className="bg-white w-[310px] h-[325px] rounded-[5px] p-[15px]">
            <a
              className="text-gray-400 ml-60 block cursor-pointer"
              onClick={closeModal}
            >
              <AiOutlineClose size={30} />
            </a>
            {help.map((help, i) => (
              <div className="" key={i}>
                <div className="flex flex-col items-center border-b-2 border-gray-300 -mx-[15px] pb-2 mb-2 -mt-2">
                  <RiQuestionLine size={50} color="#6AA434" />
                  <h4 className="font-medium text-base">{help.title}</h4>
                </div>
                <div className="font-normal text-xs flex flex-col space-y-2">
                  <p dangerouslySetInnerHTML={{__html : help.description}}></p>
                </div>
              </div>
            ))}
          </div>
        </Popup>
      </div>
      <div className="mt-2.5">
        <div className="relative flex w-full flex-wrap items-center mb-3">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-red-500 bg-transparent rounded text-base items-center justify-center w-8 pl-4 py-3">
            <GrSearch size="20px" />
          </span>
          <input
            onClick={onNavigate}
            type="text"
            placeholder="Cari sayur, bumbu dapur, lauk pauk ..."
            className="px-3 py-3 placeholder-slate-500 placeholder:text-[12px] rounded-full text-slate-600 relative bg-white text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
