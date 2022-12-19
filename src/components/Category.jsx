import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Categories from "../services/api/Category";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const response = await Categories.getAllCategories();
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {loading === true ? (
        <div className="flex justify-center items-center h-[100px]">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={-30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="-mx-[15px]"
          style={{
            "--swiper-pagination-color": "#6AA434",
            "--swiper-pagination-bullet-vertical-gap": "6px",
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index} className="">
              <div className="w-[100px] h-[100px] bg-center bg-cover rounded-[5px] relative overflow-hidden text-white ml-[15px] mb-8" style={{backgroundImage: `url(${cat.thumbnail})`}}>
                <Link to={`/product/${cat.id}`}>
                  <div className="bg-gradient-to-b from-[#C4C4C4]/0 to-black/60 w-full h-full z-10 absolute flex items-end hover:to-black/30">
                    <h6 className="text-sm font-bold mx-[10px] my-[7px]">
                      {cat.title}
                    </h6>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Category;
