import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import backendDomin from "@/commen/api";
import formatCurrency from "@/helpers/formatCurrency";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendDomin}/api/view-product-cart`,
        {
          withCredentials: true,
        }
      );
      if (response.data && response.data.success) {
        setCartItems(response.data.data);
      } else {
        toast.error("Failed to load cart items");
      }
    } catch (error) {
      toast.error("An error occurred while fetching cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchCartItems();
  }, []);

  const { ref: containerRef, inView: containerInView } = useInView({
    triggerOnce: false,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (containerInView) {
      const elements = document.querySelectorAll(".animate-in-view");

      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-visible");
        }, index * 100);
      });
    }
  }, [containerInView]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId._id !== productId)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.productId.sellingPrice,
    0
  );

  const discountPrice = totalPrice * 0.02;
  const tax = totalPrice * 0.01;
  const finalTotalPrice = totalPrice - discountPrice + tax;

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-white flex flex-col h-auto lg:pt-[5%] pt-[30%] justify-center items-center">
        <h1 className="text-xl md:text-2xl font-semibold pb-10">
          Your cart is empty
        </h1>
        <Link to="/all-products-shop" className="">
          <Button className="bg-transparent border border-green-600 hover:bg-green-600 ">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        ref={containerRef}
        className="px-4 py-8 shadow-sm mt-5 text-white bg-gray-800 bg-opacity-30 rounded-lg"
      >
        <div className="py-2 text-2xl font-bold">Your Shopping Cart</div>
        {loading ? (
          <div className="flex h-screen justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 
                22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 
                27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.672
                 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.816
                20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C5
                 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.0487
                  10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.545
                   15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.875
                    38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 px-4 py-8">
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col items-center">
                  <motion.div
                    className={`flex items-center gap-2 w-full pb-1 py-2 animate-in-view bg-slate-800`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={item.productId.productImage[0]}
                      className="w-10 h-10 object-cover rounded-md"
                      alt={item.productId.productName}
                    />
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-sm font-semibold">
                        {item.productId.productName}
                      </h3>
                    </div>
                  </motion.div>
                  <div className="flex flex-col w-full gap-5">
                    <motion.div
                      className="flex items-center justify-between w-full animate-in-view bg-slate-900"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 text-md py-2 px-2 rounded-md w-full">
                        <button
                          className="border rounded-md px-2 border-green-600 hover:bg-green-600"
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="border rounded-md px-2 border-green-600 hover:bg-green-600"
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center flex-row">
                        <p className="text-[15px] text-white flex text-nowrap">
                          ${item.productId.sellingPrice} x {item.quantity}
                        </p>
                      </div>
                      <motion.div
                        className="flex items-center gap-2 py-1 px-2 rounded-md 
                        text-center w-full justify-center animate-in-view"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaHeart className="text-white" />
                        <button
                          onClick={() => handleRemoveItem(item.productId._id)}
                          className="text-center"
                        >
                          <FaTrash className="text-red-500 hover:text-red-800" />
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-full items-center gap-3 pb-5 bg-gray-900 pt-5 rounded-md">
              <div className="w-full flex justify-between px-5">
                <h1>Price: {formatCurrency(totalPrice)}</h1>
              </div>
              {/* Assuming discount price and tax are static for this example */}
              <div className="w-full flex justify-between px-5">
                <h1>Discount price: {formatCurrency(discountPrice)}</h1>
              </div>
              <div className="w-full flex justify-between px-5">
                <h1>Tax: {formatCurrency(tax)}</h1>
              </div>
              <div className="w-full flex justify-between px-5">
                <h1>Total Price: {formatCurrency(finalTotalPrice)}</h1>
              </div>
              <div className="flex flex-row gap-5 items-center justify-between w-full sm:w-[90%]">
                <Link
                  to="/checkout"
                  className="hover:bg-green-600 text-white bg-transparent w-full"
                >
                  <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                    Make Purchase
                  </Button>
                </Link>
              </div>
              <div className="flex flex-row gap-5 items-center mx-auto w-full sm:w-[90%]">
                <Link
                  to="/all-products-shop"
                  className="hover:bg-green-600 text-white bg-transparent w-full"
                >
                  <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                    Back to shop
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
