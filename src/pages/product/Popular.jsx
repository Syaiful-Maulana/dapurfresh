import React from "react";
import NavHeader from "../../components/Header/NavHeader";
import CardProduct from "../../components/CardProduct";
import { useState } from "react";
import Product from "../../services/api/Product";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import InfoCart from "../../components/InfoCart";

const Popular = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const popularProduct = async () => {
        try {
            const response = await Product.getPopularProduct();
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        popularProduct();
    }, []);
    return (
        <main>
            <NavHeader title="Produk Terpopuler" />
            {loading && (
                <div className="flex justify-center items-center h-[100px]">
                    <ReactLoading
                        type="spin"
                        color="#6AA434"
                        height={36}
                        width={36}
                    />
                </div>
            )}
            {data?.map((item) => (
                <CardProduct
                    key={item.id}
                    image={item.thumbnail}
                    title={item.title}
                    discount={item.promo}
                    price={item.price}
                    desc={item.info}
                    max={item.max_promo}
                    unit={item.unit}
                />
            ))}
            <InfoCart />
        </main>
    );
};

export default Popular;
