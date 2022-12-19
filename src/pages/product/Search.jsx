import React, { useEffect, useState } from "react";
import NavHeader from "../../components/Header/NavHeader";
import Product from "../../services/api/product/index";
import CardProduct from "../../components/CardProduct";
import NotFound from "../../components/History/NotFound";
import Icon from "../../assets/nodata.png";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [productsPopular, setProductsPopular] = useState([]);
  const [productsFound, setProductsFound] = useState([]);
  const [search, setSearch] = useState("");

  const getProduct = async () => {
    try {
      const response = await Product.getAllProducts();
      setProducts(response.data.data);
    } catch (error) {}
  };
  const getPopularProduct = async () => {
    try {
      const response = await Product.getPopularProduct();
      setProductsPopular(response.data.data);
    } catch (error) {}
  };

  const searchProducts = (value) => {
    let data = products;
    let found = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setProductsFound(found);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const itemSearch = (item) => {
    setSearch(item)
    searchProducts(item)
  }
  useEffect(() => {
    getProduct();
    getPopularProduct();
  }, [search]);

  return (
    <main>
      <NavHeader
        type="search"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        onKeyUp={() => searchProducts(search)}
        clearSearch={clearSearch}
      />
      {search ? (
        <div className="">
          {productsFound.length === 0 ? (
            <NotFound
              icon={Icon}
              title="Yahh, pencarian kamu tidak ditemukan"
              subtitle="Silahkan pesan produk lain, dan tambahkan 
              produk yang kamu inginkan 
              di catatan tambahan pada halaman checkout"
            />
          ) : (
            <div className="">
              {productsFound.map((item, index) => (
                <CardProduct
                  key={index}
                  image={item.thumbnail}
                  title={item.title}
                  discount={item.promo}
                  price={item.price}
                  max={item.max_promo}
                  unit={item.unit}
                  desc={item.info}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <h4 className="text-sm font-bold my-4">
            Pencarian Produk Terpopuler
          </h4>
          {productsPopular.map((item, index) => (
            <button
              key={index}
              className="font-normal text-xs bg-[#F1F2F6] rounded-full py-[7px] px-2.5 border-[#F2F2F2] border mb-3 mr-2.5 hover:shadow-md"
                onClick={() => itemSearch(item.title)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default Search;
