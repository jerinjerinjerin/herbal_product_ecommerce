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
import formatCurrency from "@/helpers/formatCurrency";

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
     className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75 
     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
     <p className="text-[15px]">DiscountPrice: {" "}
       <span className="text-green-600 text-[20px]">{formatCurrency(item.sellingPrice)}</span></p>
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
