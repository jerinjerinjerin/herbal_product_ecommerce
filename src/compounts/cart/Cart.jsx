import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount

    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // Fetch maximum quantities for each item (simulated here as static)
    // In a real application, you'd fetch this from the backend
    const fetchMaxQuantities = async () => {
      // Simulate fetching from the backend
      const maxQuantities = {}; // e.g., { itemId1: 10, itemId2: 5 }
      setCartItems(prevItems =>
        prevItems.map(item => ({
          ...item,
          maxQuantity: maxQuantities[item._id] || 10 // Default to 10 if not specified
        }))
      );
    };
    fetchMaxQuantities();
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


  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    const currentQuantity = updatedItems[index].quantity;
    const maxQuantity = updatedItems[index].maxQuantity; // Assume each item has a maxQuantity property
    const newQuantity = currentQuantity + delta;
  
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }
    
    if (newQuantity > maxQuantity) {
      toast.error(`Cannot exceed the maximum quantity of ${maxQuantity}`);
      return;
    }
    
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };
  



  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    toast.success('Product removed from cart');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  const discountPrice = cartItems.reduce((total, item) => total + (item.price - item.sellingPrice) * item.quantity, 0);
  const tax = (totalPrice * 0.08).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        ref={containerRef}
        className="px-4 py-8 shadow-sm mt-5 text-white bg-gray-800 bg-opacity-30 rounded-lg"
      >
        <div className="py-2 text-2xl font-bold">Your Shopping Cart</div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-4 py-8">
          <div className="flex flex-col items-center">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                className="flex items-center gap-2 w-full pb-1 py-2 animate-in-view"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.productImage[0]}
                  alt={item.productName}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="flex flex-col items-center gap-1 text-center">
                  <h2 className="font-semibold">{item.productName}</h2>
                  <p className="text-xs">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-5">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                className="flex items-center gap-2 w-full animate-in-view"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-1 text-md py-2 px-2 rounded-md w-full">
                  <button
                    className="border rounded-md px-2 border-green-600 hover:bg-green-600"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <p className="px-2">{item.quantity}</p>
                  <button
                    className="border rounded-md px-2 border-green-600 hover:bg-green-600"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col px-3 py-1 rounded w-full">
                  <h3 className="text-sm font-semibold">${(item.sellingPrice * item.quantity).toFixed(2)}</h3>
                  <p className="text-[10px] text-slate-300">
                    ${(item.sellingPrice).toFixed(2)} / per item
                  </p>
                </div>
                <div className="">
                  <motion.div
                    className="flex items-center gap-2 py-1 px-2 rounded-md text-center w-full justify-center animate-in-view"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaHeart className="text-white " />
                    <button className="text-center" onClick={() => handleRemoveItem(index)}>
                      <FaTrash className="text-red-500 hover:text-red-800"/>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col w-full items-center gap-3 pb-5 bg-gray-900 pt-5 rounded-md">
            <div className="w-full flex justify-between px-5">
              <h1>Total price:</h1>
              <h1>${totalPrice.toFixed(2)}</h1>
            </div>
            <div className="w-full flex justify-between px-5">
              <h1>Discount price:</h1>
              <h1>${discountPrice.toFixed(2)}</h1>
            </div>
            <div className="w-full flex justify-between px-5">
              <h1>Tax:</h1>
              <h1>${tax}</h1>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full sm:w-[90%]">
              <Link to={"/checkout"} className="hover:bg-green-600 text-white bg-transparent w-full">
                <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                  Make Purchase
                </Button>
              </Link>
            </div>
            <div className="flex flex-row gap-5 items-center mx-auto w-full sm:w-[90%]">
              <Link to={"/all-products-shop"} className="hover:bg-green-600 text-white bg-transparent w-full">
                <Button className="hover:bg-green-600 text-white border border-green-600 bg-transparent w-full">
                  Back to shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
