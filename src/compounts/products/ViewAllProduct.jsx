import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/helpers/formatCurrency";
import { motion } from "framer-motion";
import backendDomin from "@/commen/api";
import { Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { useSelector } from "react-redux";
import Context from "@/context/context";
import addToCart from "@/helpers/addToCart";

const ViewAllProduct = () => {
  const user = useSelector((state) => state.user.user);

  const {fetchUserAddToCart} = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [inView, setInView] = useState([]);
  const [cart, setCart] = useState([]);
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
        <div className="flex h-screen justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 
                22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 
                27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226
                50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 
                20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666
                0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694
                10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331
                15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083
                38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:w-[100%] w-[85%] mx-auto md:grid-cols-2 gap-5 grid-cols-1">
          {products.map((item, index) => (
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
                    Discount price: <span className="text-[15px] font-semibold text-green-600">{formatCurrency(item.sellingPrice)}</span>
                  </h5>
                  <h5 className="text-[12px] font-semibold">
                    Weight: {item.weight}
                  </h5>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    className="border border-green-600 bg-transparent hover:bg-green-600 text-white transition-colors duration-300"
                    onClick={(e) =>handleAddToCart(e, item?._id)}
                  >
                    Add to bag
                  </Button>
                  <Link to={`/view-product/${item._id}`}>
                    <Button className="border border-green-600 bg-transparent hover:bg-green-600 text-white transition-colors duration-300">
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
