import backendDomin from "@/commen/api";
import LoaderPage from "@/helpers/LoaderPage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import formatCurrency from "@/helpers/formatCurrency";
import { Button } from "@/components/ui/button";
import Context from "@/context/context";
import addToCart from "@/helpers/addToCart";

const SearchProduct = () => {
  const { search } = useLocation();

  const {fetchUserAddToCart} = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // Extract query parameters from the search string
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("q");
  const [searchProduct, setSearchProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inView, setInView] = useState([]);

  const fetchSearchProducts = async () => {
    setLoading(true);
    try {
      // Construct the URL with the query parameter
      const response = await axios.get(`${backendDomin}/api/search-products`, {
        params: { q: query },
      });

      if (response.data) {
        setSearchProduct(response.data.data);
        setInView(new Array(response.data.data.length).fill(false)); // Initialize inView array
        setLoading(false);
      }

      console.log("response", response?.data?.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (query) {
      fetchSearchProducts();
    }
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      const updatedInView = searchProduct.map((_, index) => {
        const element = document.getElementById(`product-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        }
        return false;
      });
      setInView(updatedInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchProduct]);

  return (
    <div>
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="container">
          {
            searchProduct.length === 0 &&(
              <div className="text-white  flex justify-center items-center gap-5 flex-col h-screen">
                <h2 className="font-semibold text-xl">No products found</h2>
                <p className="text-[15-px]">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )
          }
            <h1 className="text-white text-center font-semibold py-4">Search Result: {" "}{searchProduct.length}</h1>
          <div className="text-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {searchProduct.map((item, index) => (
              <motion.div
                key={index}
                id={`product-${index}`}
                className="relative p-5 bg-slate-900 bg-opacity-50 text-white rounded-md shadow-md transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: inView[index] ? 1 : 0,
                  y: inView[index] ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div className="absolute inset-0 bg-opacity-0 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h2 className="text-[15px] font-semibold whitespace-nowrap">
                    {item.productName.length > 30
                      ? `${item.productName.slice(0, 30)} ...`
                      : item.productName}
                  </h2>
                  {item.productImage && item.productImage.length > 0 && (
                    <div className="flex justify-center items-center h-64 overflow-hidden mt-2">
                      <img
                        src={item.productImage[0]}
                        alt={item.productName}
                        className="object-cover rounded-md w-full h-full transition-opacity duration-300 group-hover:opacity-20"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 mb-4">
                    <h5 className="text-[12px] font-semibold">
                      <del className="text-red-500">
                        Price: {formatCurrency(item.price)}
                      </del>
                    </h5>
                    <h5 className="text-[12px] font-semibold">
                      Discount price:{" "}
                      <span className="text-[15px] font-semibold text-green-600">
                        {formatCurrency(item.sellingPrice)}
                      </span>
                    </h5>
                    <h5 className="text-[12px] font-semibold">
                      Weight: {item.weight}
                    </h5>
                  </div>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 
   group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.p
                    className="text-white text-sm mb-4 z-[100] px-[40px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView[index] ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {item.productDescription.slice(0, 70)}...
                  </motion.p>
                  <motion.div
                    className="flex flex-col space-y-2 z-[100]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView[index] ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button
                      className="border border-green-600 bg-transparent hover:bg-green-600 text-white 
         transition-colors duration-300"
                      onClick={(e) => handleAddToCart(e, item?._id)}
                    >
                      Add to bag
                    </Button>
                    <Link to={`/view-product/${item._id}`}>
                      <Button
                        className="border border-green-600 bg-transparent hover:bg-green-600 
         text-white transition-colors duration-300"
                      >
                        View product
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
