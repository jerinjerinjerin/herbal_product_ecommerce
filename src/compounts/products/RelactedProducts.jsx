import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, useAnimation } from "framer-motion";
import { Button } from "../../components/ui/button";
import { PiHandbagSimpleFill } from "react-icons/pi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRating from "../hero/StarRating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import axios from "axios";
import backendDomin from "@/commen/api";

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

const RelatedProduct = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const {id} = useParams()

  // Fetch related products
  const fetchRelatedCategory = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/get-product-category/${id}`, {
        withCredentials: true,
      });
      if (response.data.success && response.data.data) {
        setRelatedProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

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
    fetchRelatedCategory();

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setSliderSettings(prevSettings => ({
        ...prevSettings,
        slidesToShow: windowWidth <= 768 ? 1 : windowWidth <= 1024 ? 2 : 3,
      }));
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

  const renderItems = (items) => {
    return items.map((item) => (
      <motion.div
        key={item._id} // Use item._id or any unique identifier from your data
        className="relative p-2"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div className="bg-slate-800 bg-opacity-30 rounded-lg p-5 space-y-2 group overflow-hidden">
          <h1 className="text-center text-white font-semibold">
            {item.productName}
          </h1>
          <div className="flex justify-center items-center">
            {item.productImage && item.productImage.length > 0 ? (
              <img
                src={item.productImage[0]}
                className="w-[350px] rounded-md border-[3px] border-green-600 h-[400px] object-cover"
                alt={item.productName}
              />
            ) : (
              <div className="w-[350px] h-[400px] bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>
          <div className="bg-opacity-30 rounded-lg p-5 space-y-2 group overflow-hidden">
            <div className="flex w-full rounded-md px-2 py-2 mx-auto justify-between items-center">
              <div>
                {item.sellingPrice ? (
                  <span className="text-green-600 font-semibold">
                    <span className="text-white">Price</span>{" "}
                    <del className="text-red-500">{item.price}</del>{" "}
                    <span className="text-[20px]">{item.sellingPrice}</span>
                  </span>
                ) : (
                  item.price
                )}
              </div>
              <StarRating rating={item.rating || 0} /> {/* Default to 0 if rating is not available */}
            </div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 50, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              className="text-white text-center xl:text-xl md:text-sm text-md w-[300px] py-5"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {item.productDescription || "No description available"}
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="flex flex-col gap-5">
                <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 flex justify-start items-center gap-1 pb-2">
                  Add to bag{" "}
                  <span>
                    <PiHandbagSimpleFill className="text-white" />
                  </span>
                </Button>
                <Link to={`/view-product/${item._id}`}>
                  <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 mt-3 flex justify-start items-center gap-1">
                    View Product{" "}
                    <span>
                      <IoIosEye className="text-white" />
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
              <h1 className="px-8 text-left text-white font-semibold text-2xl">
                Related Products
              </h1>
            </div>

            <div className="min-h-[70vh] md:-mt-[70px] w-full bg-black">
              <Slider {...sliderSettings} className="px-6">
                {renderItems(relatedProducts)}
              </Slider>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RelatedProduct;
