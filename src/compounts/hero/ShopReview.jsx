import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reviews } from "@/data/data";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 hover:text-green-600 right-0 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className=" p-2 rounded-full bg-transparent border hover:border-green-600 text-3xl" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-0 hover:text-green-600 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowLeft className=" p-2 rounded-full hover:border-green-600 bg-transparent border text-3xl" />
    </div>
  );
};

const ShopReview = () => {
  const settings = {
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container w-full mx-auto bg-black p-6 rounded-lg shadow-lg text-white relative">
      <div className="md:w-[50%] mx-auto flex justify-between w-full mt-6">
        <h2 className="text-center text-2xl mb-6">Customers Reviews</h2>
        <Button className="bg-blue-500 hover:bg-green-700 bg-transparent border border-green-600 hover:border-white text-white font-semibold px-4 rounded">
          Add Review
        </Button>
      </div>

      <Slider {...settings} className="flex flex-row px-5 items-center">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center bg-black p-6 rounded-lg border border-green-600 gap-5"
          >
            <div className="flex justify-between items-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full mb-4 border-2 border-white"
              />
              <StarRating rating={review.rating} />
            </div>

            <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
            <p className="text-sm">{review.comment}</p>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default ShopReview;
