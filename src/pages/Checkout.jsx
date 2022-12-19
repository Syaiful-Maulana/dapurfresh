import React, { useEffect, useState } from "react";
import NavHeader from "../components/Header/NavHeader";
import { BsFileEarmarkTextFill, BsCartXFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import CartProduct from "../components/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Order from "../services/api/Order";
import SweetAlert from "../components/SweetAlert";
import { clearProducts } from "../features/cartSlice";
import countDiscount from "../utils/discount";

const Checkout = () => {
    const cart = useSelector((state) => state.cart.products);
    const total = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let totalPrice = 0;
    total.products.forEach((element) => {
        if (element.qty <= element.max) {
            totalPrice +=
                countDiscount(element.price, element.discount) * element.qty;
        } else {
            let discountedPrice = countDiscount(element.price, element.discount) * element.max; 
            let originPrice = element.price * (element.qty - element.max) 
            totalPrice += discountedPrice + originPrice
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ name, telepon, alamat, note }, e) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                phone_number: telepon,
                address: alamat,
                sub_total: totalPrice,
                delivery_cost: 3000,
                total: totalPrice + 3000,
                note: note,
                order_items: cart.map(item => {
                    return {
                        product_id: item.product_id,
                        discount: item.discount,
                        qty: item.qty,
                        price: item.price
                    }
                }),
            };
            if(cart.length<1){
                return await SweetAlert({ title: "Pesanan Kamu Tidak Ada", icon: "error" });
            }
            const response = await Order.userOrder(data);
            console.log(response);
            dispatch(clearProducts())
            navigate("/history")
            await SweetAlert({ title: "Order Barang Sukses", icon: "success" });
        } catch (error) {
            await SweetAlert({ title: "Terjadi Kesalahan", icon: "error" });
            console.log(error);
        }
    };

    return (
        <div>
            <NavHeader title="CheckOut" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="-mx-[15px]">
                    <div className="pr-10 pb-5 bg-white shadow-xs">
                        <FloatingInput
                            type="text"
                            name="name"
                            label="Nama Lengkap"
                            value={user?.name || ""}
                            register={register}
                            validation={{
                                required: "Nama tidak boleh kosong",
                            }}
                        />
                        {errors.name && (
                            <span className="mt-2 ml-20 text-center text-xs text-red-400">
                                {errors.name?.message}
                            </span>
                        )}
                        <FloatingInput
                            type="text"
                            name="telepon"
                            label="Nomor Telepon"
                            value={user?.phone_number || ""}
                            register={register}
                            validation={{
                                required: "Nomor telepon tidak boleh kosong",
                            }}
                            instruction="* Nomor yang dapat dihubungi"
                        />
                        {errors.telepon && (
                            <span className="mt-2 ml-20 text-center text-xs text-red-400">
                                {errors.telepon?.message}
                            </span>
                        )}
                        <FloatingInput
                            type="text"
                            name="alamat"
                            label="Alamat"
                            value={user?.address || ""}
                            register={register}
                            validation={{
                                required: "Alamat tidak boleh kosong",
                            }}
                        />
                        {errors.alamat && (
                            <span className="mt-2 ml-20 text-center text-xs text-red-400">
                                {errors.alamat?.message}
                            </span>
                        )}
                    </div>
                    <div className="mt-2.5 px-6 py-5 bg-white shadow-xs text-secondary">
                        <h4 className="text-[19px] font-semibold">
                            Catatan Tambahan
                        </h4>
                        <label
                            htmlFor="note"
                            className="mt-3.5 py-3 pl-5 flex bg-neutral-100 rounded-md"
                        >
                            <BsFileEarmarkTextFill size={24} color="#C4C4C4" />
                            <input
                                name="note"
                                id="note"
                                className="ml-3 bg-transparent opacity-40 font-medium  focus:outline-none"
                                {...register("note", {required: true})}
                            />
                        </label>
                        {errors.note && (
                            <span className="mt-2 ml-20 text-center text-xs text-red-400">
                                Note tidak boleh kosong
                            </span>
                        )}
                    </div>
                    <div className="mt-2.5 px-6 py-5 bg-white shadow-xs text-[#9FA3A6]">
                        <label
                            htmlFor="note"
                            className="py-3 px-3 flex flex-row bg-neutral-100 rounded-md"
                        >
                            <AiFillInfoCircle
                                size={16}
                                color="#9FA3A6"
                                className="basis-1/6"
                            />
                            <p className="text-xs basis-5/6">
                                Order <b>sebelum jam 8 malam</b> akan diantarkan
                                oleh kurir <b>kami Besok Pagi</b>.Order{" "}
                                <b>setelah jam 8 malam</b> akan diantarkan oleh
                                kurir <b>kami Besok Lusa</b>.
                            </p>
                        </label>
                    </div>
                    <div className="mt-2.5 py-6 bg-white shadow-xs text-secondary">
                        <div className="px-5 flex justify-between items-center pb-3 border-b-2 border-dashed border-dark">
                            <h5 className="text-[19px] font-semibold">
                                Pesanan
                            </h5>
                            <Link
                                to="/"
                                className="text-[15px] font-semibold text-primary"
                            >
                                + tambah
                            </Link>
                        </div>
                        <div className="px-5 mt-6 mx-[-15px]">
                            {cart.length >= 1 ? (
                                cart.map((item) => (
                                    <CartProduct
                                        key={item.product_id}
                                        product_id={item.product_id}
                                        stock={item.stock}
                                        image={item.image}
                                        title={item.title}
                                        discount={item.discount}
                                        price={item.price}
                                        desc={item.desc}
                                        max={item.max}
                                        unit={item.unit}
                                    />
                                ))
                            ) : (
                                <section className="flex flex-col items-center">
                                    <BsCartXFill size={50} color="#4b5563" />
                                    <h3 className="font-medium text-center">
                                        Keranjang Kamu Kosong Nih.
                                    </h3>
                                </section>
                            )}
                        </div>
                    </div>
                    <div className="mt-2.5 px-6 py-5 bg-white shadow-xs">
                        <div className="grid grid-cols-3 text-secondary font-medium text-sm">
                            <h6 className="col-span-2">Subtotal</h6>
                            <h6 className="text-right">
                                Rp. {totalPrice}
                            </h6>
                            <h6 className="col-span-2 mt-2">Ongkos Kirim</h6>
                            <h6 className="text-right mt-2">Rp. {totalPrice >= 1 ? 3000 : 0}</h6>
                            <h6 className="col-span-2 mt-2">
                                Total Pembayaran
                            </h6>
                            <h6 className="text-right mt-2 font-bold text-base">
                                Rp. {totalPrice >= 1 ? totalPrice + 3000 : 0}
                            </h6>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-3 rounded-md text-white bg-primary text-[19px] font-bold"
                        >
                            Pesan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
