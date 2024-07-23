import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Order = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false });

  return (
    <div className="container">
      <motion.h1
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 2 }}
      ></motion.h1>
      <motion.div
        className="flex flex-col md:flex-row md:justify-between items-center gap-5"
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        <motion.div
          className="py-5 w-full md:w-[40%]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 2 }}
        >
          <h1 className="text-white text-3xl pb-10 font-semibold">
            Order our products from anywhere
          </h1>
          <form className="w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 py-3 gap-5 w-full">
              {["Name", "Email", "Country", "ZipCode"].map((placeholder, index) => (
                <motion.input
                  key={index}
                  type="text"
                  placeholder={placeholder}
                  className="border w-full p-3 rounded-md focus:outline-none border-green-500 bg-transparent text-white"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 2, type: "spring", stiffness: 300 }}
                  whileHover={{ x: [0, -5, 5, -5, 5, 0] }}
                />
              ))}
            </div>
            <motion.div
              className="mt-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.6, duration: 2 }}
            >
              <Button className="w-full text-xl py-6 text-white border border-green-600 hover:border-white bg-transparent hover:bg-green-800">
                Order Now
              </Button>
            </motion.div>
          </form>
        </motion.div>
        <motion.div
          className="w-full md:w-[60%] flex justify-center md:justify-end"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.8, duration: 2 }}
        >
          <div className="w-full md:w-[80%]">
            <motion.img
              src="https://img.freepik.com/premium-vector/global-political-map-usa-highly-detailed-map-with-borders-countries-cities_599062-1236.jpg"
              alt="map"
              className="w-full h-[300px] cursor-pointer object-cover"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Order;
