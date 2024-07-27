import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import backendDomin from "@/commen/api";
import formatCurrency from "@/helpers/formatCurrency";

// Arrow components for the slider
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowRight className="p-2 text-white hover:text-green-600 hover:border-green-600 rounded-full bg-transparent border text-3xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft className="p-2 text-white hover:text-green-600 hover:border-green-600 rounded-full bg-transparent border text-3xl" />
  </div>
);

const FilterBrand = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("");
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  });

  // Fetch all products from the backend
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${backendDomin}/api/getall-products`);
        if (response.data.success) {
          setAllProducts(response.data.products || []);
          // Set the initial tab to the first brand if available
          if (response.data.products.length > 0) {
            setCurrentTab(response.data.products[0].brandName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // Update slider settings on window resize
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        setSliderSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: 1,
        }));
      } else if (windowWidth <= 1024) {
        setSliderSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: 2,
        }));
      } else {
        setSliderSettings((prevSettings) => ({
          ...prevSettings,
          slidesToShow: 3,
        }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get unique brands for tabs
  const getBrands = () => {
    const brands = allProducts.map((product) => product.brandName);
    return [...new Set(brands)]; // Remove duplicates
  };

  // Change the current tab
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // Filter products based on the current tab
  const getFilteredProducts = (tab) => {
    return Array.isArray(allProducts)
      ? allProducts.filter((product) => product.brandName === tab)
      : [];
  };

  // Render items in the slider
  const renderItems = (items) => {
    return items.map((item) => (
      <motion.div
        key={item._id}
        className="relative p-2"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div className="bg-slate-800 bg-opacity-30 rounded-lg p-3 space-y-0 group overflow-hidden">
          <h1 className="text-center text-white font-semibold">
            {item.productName.length > 30 ? (
              item.productName.slice(0, 30) + "..."
            ): item.productName}
          </h1>
          <div className="flex justify-center items-center">
            <img
              src={item.productImage[0]}
              className="w-full max-w-[300px] rounded-md border-[3px] border-green-600 h-[300px] object-cover"
              alt="filter-images"
            />
          </div>
          <div className="bg-opacity-30 rounded-lg p-5 space-y-2 group overflow-hidden">
            <div className="flex w-full rounded-md px-2 py-2 mx-auto justify-between items-center"></div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 50, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              className="text-white text-center text-sm px-[100px] py-5"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {item.productDescription.slice(0, 80)}...
            </motion.p>


            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="flex flex-col gap-2 items-center mb-[60px]">
                <Button className=" border w-full border-green-600 bg-transparent hover:bg-green-600 flex  items-center gap-1 ">
                  Add to bag{" "}
                </Button>
                <Link to={`/view-product/${item._id}`} className="w-full">
                  <Button className=" border w-full border-green-600 bg-transparent hover:bg-green-600 flex  items-center gap-1">
                    View Product{" "}
                  </Button>
                </Link>
                
                <Button className=" border w-full border-green-600 bg-transparent hover:bg-green-600 flex  items-center gap-1 ">
                  Add to wishlist{" "}
                </Button>
              </div>
            </motion.div>

          </motion.div>
          <div className="flex justify-between items-center text-white mb-2">
            <p className="text-[15px]"><del className="text-red-500">price: {formatCurrency(item.price)}</del></p>
            <p className="text-[15px]">DiscountPrice: {" "}<span className="text-green-600 text-[20px]">{formatCurrency(item.sellingPrice)}</span></p>
            <p className="text-[15px]">Weight: {item.weight}</p>
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="min-h-[50vh] flex items-center pt-0"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:gap-[100px] mb-[10px]">
            <div>
              <div className="flex bg-black gap-3 pb-2 md:pb-0
                w-full overflow-x-scroll  mx-auto  hide-scrollbar">
                {getBrands().map((tab) => (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    key={tab}
                    className={`focus:outline-none mt-[0px] ${
                      currentTab === tab ? "bg-green-700" : "bg-black"
                    }`}
                  >
                    <Button
                      onClick={() => handleTabChange(tab)}
                      className={`w-full border border-white bg-transparent ${
                        currentTab === tab
                          ? "text-white border border-white font-semibold bg-green-700"
                          : "text-white border-[2px] border-green-600 hover:bg-green-600"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="min-h-[70vh] md:-mt-[70px] w-full bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { x: "-100vw", opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.9, ease: "easeInOut" },
                    },
                    exit: {
                      x: "100vw",
                      opacity: 0,
                      transition: { duration: 0.9, ease: "easeInOut" },
                    },
                  }}
                >
                  <Slider {...sliderSettings} className="px-6">
                    {renderItems(getFilteredProducts(currentTab))}
                  </Slider>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterBrand;
