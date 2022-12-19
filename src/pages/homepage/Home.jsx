import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../../components/CardProduct";
import Category from "../../components/Category";
import HomeHeader from "../../components/Header/HomeHeader";
import InfoCart from "../../components/InfoCart";
import Navbar from "../../components/Navbar";
import Product from "../../services/api/Product";
import ReactLoading from "react-loading";

const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const popularProduct = async () => {
    try {
      const response = await Product.getPopularProduct();
      setData(response.data.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    popularProduct()
  }, []);
  return (
    <>
      <HomeHeader />
      <h4 className="text-base font-bold my-[15px]">Kategori Produk</h4>
      <Category />
      <div className="flex justify-between">
        <h4 className="text-base font-bold mb-[15px]">Produk Terpopuler</h4>
        <Link
          to="/product-popular"
          className="text-xm font-bold text-[#547F1E]"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="pb-10">
        {
          loading && 
          <div className="flex justify-center items-center h-[100px]">
            <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
          </div>
        }
        {data?.map((item) => (
          <CardProduct
            key={item.id}
            product_id={item.id}
            stock={item.stock}
            image={item.thumbnail}
            title={item.title}
            discount={item.promo}
            price={item.price}
            desc={item.info}
            max={item.max_promo}
            unit={item.unit}
          />
        ))}
      </div>
      <InfoCart />
      <Navbar />
    </>
  );
};

export default Home;
