import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import CartProduct from "../../components/CardProduct";
import NavHeader from "../../components/Header/NavHeader";
import Product from "../../services/api/Product";
import "swiper/css";
import "swiper/css/navigation";
import Categories from "../../services/api/Category";
import InfoCart from "../../components/InfoCart";

const Products = () => {
  let { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(category);
  const [loading, setLoading] = useState(true);

  const handleActive = (item) => {
    setActive(item);
    setLoading(true);
  };
  const getProducts = async () => {
    try {
      const response = await Product.getProductsOnCategory(category);
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await Categories.getAllCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, [active]);

  return (
    <>
      <div className="text-sm font-medium text-secondary">
        <NavHeader type="search" />
        <div className="shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] mx-[-15px] ">
          <Swiper
            spaceBetween={10}
            slidesPerView={"auto"}
            freeMode={true}
            navigation={true}
            modules={[Navigation, FreeMode]}
            className=""
            style={{
              "--swiper-navigation-color": "#1C4463",
              "--swiper-navigation-size": "12px",
            }}
          >
            {categories.map((item, index) => (
              <SwiperSlide className="text-center w-fit" key={index}>
                <button
                  className={`${
                    active == item.id
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : ""
                  } h-12 px-3`}
                  onClick={() => handleActive(item.id)}
                >
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
          </div>
        ) : (
          <div className="mt-3">
            {products == 0 ? (
              <div className="flex justify-center items-center h-96">
                <h1 className="block mt-10 text-center font semibold">
                  Produk dalam kategori ini belum tersedia
                </h1>
              </div>
            ) : (
              <div>
                {products.map((item, index) => (
                  <CartProduct
                    key={index}
                    product_id={item.id}
                    stock={item.stock}
                    title={item.title}
                    discount={item.promo}
                    price={item.price}
                    desc={item.info}
                    max={item.max_promo}
                    unit={item.unit}
                    image={item.thumbnail}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <InfoCart />
    </>
  );
};

export default Products;
