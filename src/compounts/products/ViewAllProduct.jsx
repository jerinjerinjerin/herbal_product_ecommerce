import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/helpers/formatCurrency";
import { motion } from "framer-motion";
import backendDomin from "@/commen/api";
import { Link } from "react-router-dom";
import Context from "@/context/context";
import addToCart from "@/helpers/addToCart";
import LoaderPage from "@/helpers/LoaderPage";

const ViewAllProduct = () => {

  const {fetchUserAddToCart} = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const [products, setProducts] = useState([]);
  const [inView, setInView] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const allProduct = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/getall-products`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setProducts(response.data.products);
        setInView(new Array(response.data.products.length).fill(false)); // Initialize visibility state
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
  };

  useEffect(() => {
    allProduct();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const updatedInView = products.map((_, index) => {
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
  }, [products]);



  return (
    <section className="container py-10">
      {loading ? (
        <LoaderPage/>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:w-[100%] w-[85%] mx-auto md:grid-cols-2 gap-5 grid-cols-1">
          {products.map((item, index) => (
            <motion.div
              key={index}
              id={`product-${index}`}
              className="relative p-5 bg-slate-900 bg-opacity-50 text-white rounded-md shadow-md transition-all duration-300 
              group overflow-hidden"
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
                    Discount price: <span className="text-[15px] font-semibold text-green-600">
                      {formatCurrency(item.sellingPrice)}</span>
                  </h5>
                  <h5 className="text-[12px] font-semibold">
                    Weight: {item.weight}
                  </h5>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 
              group-hover:opacity-100 transition-opacity duration-300">
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
                    onClick={(e) =>handleAddToCart(e, item?._id)}
                  >
                    Add to bag
                  </Button>
                  <Link to={`/view-product/${item._id}`}>
                    <Button className="border border-green-600 bg-transparent hover:bg-green-600 
                    text-white transition-colors duration-300">
                      View product
                    </Button>
                  </Link>
                </motion.div>


              </div>





            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewAllProduct;
