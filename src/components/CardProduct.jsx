import React, { useEffect, useState } from "react";
import Button from "./Button";
import { HiMinus, HiPlus } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux";
import { addAmount, addProduct, decrease, increase } from "../features/cartSlice";
import SweetAlert from "./SweetAlert";
import countDiscount from "../utils/discount";

const CartProduct = ({ product_id, image, title, discount, price, desc, max, checkout, unit, stock}) => {
  const cart = useSelector((state)=> state.cart.products)
  const dispatch = useDispatch()
  const [displayQty, setdisplayQty] = useState(0)

  const newCart = {
    product_id, image, title, discount, price, desc, max, checkout, unit, stock
  }

  const arrowStyle = {
    color: "#fff",
  };

  const contentStyle = {
    background: "#fff",
    marginLeft: "7px",
    width: "184px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "10px 0 10px 10px",
  };

  const addToCart = () => {
    dispatch(addProduct(newCart))
    dispatch(addAmount())
  }
  
  useEffect(() => {
    if(cart){
      setdisplayQty(display(product_id))
    }
  }, [cart])
  
  const display = (product_id) => cart.find(item => item.product_id === product_id)
  return (
    <section
      className={`${
        checkout === true ? "" : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
      } w-full min-h-[143px] bg-white p-[15px] rounded-sm mb-2.5`}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-4 rounded-[5px] pr-[15px]">
          <img src={image} alt="kangkung" className="w-20"  />
        </div>
        <div className="col-span-7 grow relative">
          <h3 className="text-lg font-semibold font leading-5">{title}</h3>
          <span
            className={`${
              discount ? "inline-block rounded-full bg-[#FFD600] text-red-600 font-semibold px-2 text-[10px]" : "hidden mt-2"
            }`}
          >
            {discount}%
          </span>

          <div>
            <span className="text-[15px] font-semibold mr-1">Rp {countDiscount(price, discount)}</span>
            <span
              className={`${
                discount ? "text-[13px] font-medium line-through text-[#444444]/50" : "hidden"
              }`}
            >
              Rp {price}
            </span>
          </div>
          {displayQty?.qty >= 1 ? (
            <div className="flex items-center">
              <button
                type="button"
                className="bg-white text-secondary shadow-[1px_2px_5px_rgba(0,0,0,0.15)] p-1.5 rounded-md"
                onClick={()=>{
                  dispatch(decrease(product_id))
                }}
              >
                <HiMinus size={16} />
              </button>
              <span className="px-3">{displayQty?.qty}</span>
              <button
                type="button"
                className="bg-primary p-1.5 text-center text-white rounded-md shadow-[1px_2px_5px_rgba(0,0,0,0.15)]" 
                onClick={()=>{
                  if(stock <= displayQty?.qty){
                    return SweetAlert({title: "Stock tidak tersedia lagi", icon: "error"})
                  }
                  dispatch(increase({product_id, displayQty: displayQty?.qty}))
                }}>
                <HiPlus size={16} />
              </button>
              <span className="font-medium text-[#444444] text-sm ml-1">
                x {unit}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Button text="Tambah" icon={<HiPlus size={20} />} handleClick={addToCart} />
              <span className="font-medium text-[#444444] text-sm ml-1">
                x {unit}
              </span>
            </div>
          )}
        </div>
        <span>
          <Popup
            trigger={
              <button type="button">
                <BiInfoCircle color="#C4C4C4" size={20} />
              </button>
            }
            position="bottom right"
            on={["hover", "focus"]}
            {...{ contentStyle, arrowStyle }}
          >
            <span>{desc}</span>
          </Popup>
        </span>
      </div>
      {max && (
        <div className="flex justify-end">
          <span className="text-danger font-normal text-[11px]">
            Promo! Maximal: {max}
          </span>
        </div>
      )}
    </section>
  );
};

export default CartProduct;
