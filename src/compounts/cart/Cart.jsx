import React, { useEffect, useState, useCallback, useContext } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import formatCurrency from "@/helpers/formatCurrency";
import backendDomin from "@/commen/api";
import Context from "@/context/context";
import LoaderPage from "@/helpers/LoaderPage";

const Cart = () => {
  const { fetchUserAddToCart } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    fetchCartItems();
  }, [fetchCartItems]);

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

  const increaseQty = useCallback(
    async (id, qty) => {
      // const maxQuantityMap = cartItems.reduce((acc, item) => {
      // acc[item.productId._id] = item.productId.quantity;
      // return acc;
      // }, {});

      // console.log("max quantity map", maxQuantityMap);
      // console.log("id", id);

      // const maxQuantity = maxQuantityMap[id];
      // console.log("max quantity", maxQuantity);

      // if (maxQuantity === undefined) {
      // return toast.error(`No max quantity found for product ID ${id}`);
      // }

      // if (qty + 1 > maxQuantity) {
      // return toast.error(`Max quantity ${maxQuantity} exceeded`);
      // }

      setLoading(true);
      try {
        const response = await axios.post(
          `${backendDomin}/api/update-cart-product`,
          {
            _id: id,
            quantity: qty + 1,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          fetchCartItems();
        }
      } catch (error) {
        console.error("Error increasing quantity:", error);
        toast.error("Error increasing quantity");
      } finally {
        setLoading(false);
      }
    },
    [cartItems, fetchCartItems]
  );

  const decreaseQty = useCallback(
    async (id, qty) => {
      if (qty <= 1) {
        toast.error("Cannot decrease quantity below the minimum limit of 1.");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(
          `${backendDomin}/api/update-cart-product`,
          {
            _id: id,
            quantity: qty - 1,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          fetchCartItems();
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
        toast.error("Error decreasing quantity");
      } finally {
        setLoading(false);
      }
    },
    [fetchCartItems]
  );

  const handleRemoveItem = async (productId) => {
    console.log("Removing item with ID:", productId);
    setLoading(true);
    try {
      const response = await axios.delete(
        `${backendDomin}/api/delect-cart-product`, // Corrected endpoint
        {
          data: { _id: productId }, // Include the productId in the request body
          withCredentials: true,
        }
      );

      if (response.data.success) {
        fetchCartItems();
        fetchUserAddToCart();
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("An error occurred while removing the item from the cart");
    } finally {
      setLoading(false);
    }
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
          <LoaderPage />
        ) : (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-4 py-8">
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
                          onClick={() => decreaseQty(item._id, item.quantity)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="border rounded-md px-2 border-green-600 hover:bg-green-600"
                          onClick={() => increaseQty(item._id, item.quantity)}
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
                          onClick={() => handleRemoveItem(item?._id)}
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
