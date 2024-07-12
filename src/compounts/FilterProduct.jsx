import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "../components/ui/button";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { MostBought, BestOffers, MensHelth, WomenHelth } from "../data/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "./StarRating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosEye } from "react-icons/io";

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

const FilterProduct = () => {
  const [currentTab, setCurrentTab] = useState("Most bought");
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

  const controls = useAnimation();

  useEffect(() => {
    const scrollHandler = () => {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 1 },
      });
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [controls]);

  const tabContentVariants = {
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
  };

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  const renderItems = (items) => {
    return items.map((item) => (
      <motion.div
        key={item.id}
        className="relative p-2"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div className="bg-slate-800 bg-opacity-30 rounded-lg p-5 space-y-2 group overflow-hidden">
          <h1 className="text-center text-white font-semibold">
            {item.name || item.price}
          </h1>
          <div className="flex justify-center items-center">
            <img
              src={item.images[0].src}
              className="w-[350px] rounded-md border-[3px] border-green-600 h-[400px] object-cover"
              alt="filter-images"
            />
          </div>
          <div className="bg-opacity-30 rounded-lg p-5 space-y-2 group overflow-hidden">
            <div className="flex xl:w-[100%] lg:w-[100%] md:w-[100%] w-[100%] rounded-md px-2 py-2 mx-auto justify-between items-center">
              <div>
                {item.disCoundPrice ? (
                  <span className="text-green-600 font-semibold">
                    <span className="text-white">price</span>{" "}
                    <del className="text-red-500"> {item.price}</del>{" "}
                    <span className="text-[20px]">{item.disCoundPrice}</span>
                  </span>
                ) : (
                  item.price
                )}
              </div>
              <StarRating rating={item.rating} />
            </div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 50, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              className="text-white text-center xl:text-xl md:text-sm text-md md:w-[250px] xl:w-[300px] w-[300px] py-5"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {item.description || item.keyPoints}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="flex flex-col gap5">
                <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 flex justify-start items-center gap-1 pb-2">
                  Add to bag{" "}
                  <span>
                    <PiHandbagSimpleFill className="text-white" />
                  </span>
                </Button>
                <Link to={`/view-product/${item.id}`}>
                  <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 mt-3 flex justify-start items-center gap-1">
                    View Product{" "}
                    <span>
                    <IoIosEye className="text-white"/>
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
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
              <div className="flex bg-black flex-col gap-3 pb-2 md:pb-0 md:flex-row w-full md:max-w-[30%] max-w-[53%] mx-auto">
                {[
                  "Most bought",
                  "Best offers",
                  "Mens helth",
                  "Women helth",
                ].map((tab) => (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    key={tab}
                    className={`focus:outline-none mt-[0px] ${
                      currentTab === tab ? "bg-gray-700" : "bg-black"
                    }`}
                  >
                    <Button
                      onClick={() => handleTabChange(tab)}
                      className={`w-full border border-white bg-transparent${
                        currentTab === tab
                          ? "text-white border border-white font-semibold bg-green-700"
                          : "text-white border-[2px] border-green-600 "
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
                  variants={tabContentVariants}
                >
                  {currentTab === "Most bought" && (
                    <Slider {...sliderSettings} className="px-6">
                      {renderItems(MostBought)}
                    </Slider>
                  )}
                  {currentTab === "Best offers" && (
                    <Slider {...sliderSettings} className="px-6">
                      {renderItems(BestOffers)}
                    </Slider>
                  )}
                  {currentTab === "Mens helth" && (
                    <Slider {...sliderSettings} className="px-6">
                      {renderItems(MensHelth)}
                    </Slider>
                  )}
                  {currentTab === "Women helth" && (
                    <Slider {...sliderSettings} className="px-6">
                      {renderItems(WomenHelth)}
                    </Slider>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterProduct;
