import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import countDiscount from "../utils/discount";

const InfoCart = () => {
    const cart = useSelector((state) => state.cart);

    let totalPrice = 0;
    cart.products.forEach((element) => {
        if (element.qty <= element.max) {
            totalPrice +=
                countDiscount(element.price, element.discount) * element.qty;
        } else {
            let discountedPrice = countDiscount(element.price, element.discount) * element.max; 
            let originPrice = element.price * (element.qty - element.max) 
            totalPrice += discountedPrice + originPrice
        }
    });

    return (
        <>
            {cart.amount >= 1 ? (
                <Link to="/checkout">
                    <section className={`flex flex-row font-semibold items-center z-50 bottom-16 text-white bg-primary max-w-[340px] w-full fixed -ml-[5px] h-[50px] rounded-[10px] px-5 drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]`}>
                        <h1 className="basis-3/12 border-r-2 border-white">
                            {cart.amount} item
                        </h1>
                        <h1 className="basis-8/12 pl-3">{totalPrice}</h1>
                        <i className="fa-solid basis-1/12 fa-bag-shopping"></i>
                    </section>
                </Link>
            ) : null}
        </>
    );
};

export default InfoCart;
