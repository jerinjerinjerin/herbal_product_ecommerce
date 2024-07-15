import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cartItems } from "@/data/data";
import { Link } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []);

  const { ref: containerRef, inView: containerInView } = useInView({
    triggerOnce: false,
    rootMargin: "-100px 0px", // Adjust root margin as needed to trigger animations earlier
  });

  useEffect(() => {
    if (containerInView) {
      const elements = document.querySelectorAll(".animate-in-view");

      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-visible");
        }, index * 100); // Adjust delay as needed
      });
    }
  }, [containerInView]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        ref={containerRef}
        className="px-4 py-8 shadow-sm mt-5 text-white bg-gray-800 bg-opacity-30 rounded-lg"
      >
        <div className="py-2 text-2xl font-bold">Your Shopping Cart</div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-4 py-8">
          <div className="flex flex-col items-center">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-2 w-full pb-1 py-2 animate-in-view"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="flex flex-col items-center gap-1 text-center">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-xs">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-5">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-2 w-full animate-in-view"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-1 text-md py-2 px-2 rounded-md w-full">
                  <button className="border rounded-md px-2 border-green-600 hover:bg-green-600">
                    -
                  </button>
                  <p className="px-2">{item.quantity}</p>
                  <button className="border rounded-md px-2 border-green-600 hover:bg-green-600">
                    +
                  </button>
                </div>
                <div className="flex flex-col px-3 py-1 rounded w-full">
                  <h3 className="text-sm font-semibold">${item.price}.00</h3>
                  <p className="text-[10px] text-slate-300">
                    ${(item.price / item.quantity).toFixed(2)} / per item
                  </p>
                </div>
                <div className="">
                  <motion.div
                    className="flex items-center gap-2 py-1 px-2 rounded-md text-center w-full justify-center animate-in-view"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaHeart className="text-red-500" />
                    <button className="text-center">Remove</button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col w-full items-center gap-3 bg-gray-900 pt-5 rounded-md">
            <div className="w-full flex justify-between px-5">
              <h1>Total price:</h1>
              <h1>$360.00</h1>
            </div>
            <div className="w-full flex justify-between px-5">
              <h1>Discount price:</h1>
              <h1>$30.00</h1>
            </div>
            <div className="w-full flex justify-between px-5">
              <h1>Tax:</h1>
              <h1>$3.00</h1>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full sm:w-[90%]">
              <Link to={"/checkout"} className="hover:bg-green-600 text-white bg-transparent w-full">
                <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                  Make Purchase
                </Button>
              </Link>
            </div>
            <div className="flex flex-row gap-5 items-center mx-auto w-full sm:w-[90%]">
              <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                Back to shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
