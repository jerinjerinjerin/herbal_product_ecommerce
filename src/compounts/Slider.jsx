import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderImageData } from "../data/data";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

const Slider = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const imageIndex = (current + SliderImageData.length) % SliderImageData.length;
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgColor, setBgColor] = useState('black'); // Initial background color
  const [shouldShake, setShouldShake] = useState(false); // State for shake animation
  const [dotClicked, setDotClicked] = useState(false); // State for dot click animation

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [current]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrent([current + 1, 1]);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrent([current - 1, -1]);
  };

  const goToSlide = (index) => {
    setIsAnimating(true);
    setCurrent([index, index > current ? 1 : -1]);
  };

  const variants = {
    enter: (direction) => ({
      x: 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30, duration: 2 },
        opacity: { duration: 2 },
      }
    },
    exit: (direction) => ({
      x: 0,
      opacity: 0,
    }),
    shakeVertical: {
      y: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
    dotClick: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    setBgColor(getComputedStyle(document.documentElement).getPropertyValue(`--color-${imageIndex}`));
  };

  const handleDotClick = (index) => {
    setShouldShake(true);
    setDotClicked(true);
    setTimeout(() => {
      setShouldShake(false);
      setDotClicked(false);
      goToSlide(index);
    }, 500); // Reset shake animation after 500ms
  };

  return (
    <div
      className=" w-full md:h-screen h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isAnimating ? 'transparent' : bgColor,
        animation: isAnimating ? 'rainbow .5s linear infinite' : 'none',
      }}
    >
      <div className="w-[90%] h-[80%]  mx-auto my-auto relative flex items-center justify-center">
        <AnimatePresence initial={false} className="h-full" custom={direction} onExitComplete={handleAnimationEnd}>
          <motion.div
            key={current}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            custom={direction}
            variants={variants}
            initial="enter"
            animate={dotClicked ? "dotClick" : (shouldShake ? "shakeVertical" : "center")}
            exit="exit"
          >
            <img
              src={SliderImageData[imageIndex].imgSrc}
              alt="slider-image"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-5  p-4 bg-black text-white bg-opacity-75 rounded-lg">
              <motion.div
                className="content-container flex flex-col gap-5"
                animate={dotClicked ? "dotClick" : (shouldShake ? "shakeVertical" : "center")}
              >
                {SliderImageData[imageIndex].content}
                <Button className="border-[2px] border-green-600 hover:border-white bg-transparent hover:bg-green-600">Go to shop</Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.button
          className="absolute rounded-full hidden left-0 z-5 p-2 bg-white text-green-900 hover:text-green-500 bg-opacity-50 hover:bg-opacity-75 md:flex items-center justify-center"
          onClick={() => handleDotClick((current - 1) % SliderImageData.length)} // Adjusted onClick to handle prev slide
          whileTap={{ scale: 1.2 }}
          whileHover={{ x: -10 }}
        >
          <FaArrowLeft size={24} />
        </motion.button>
        <motion.button
          className="absolute rounded-full hidden right-0 z-5 p-2 bg-white text-green-900 hover:text-green-500 bg-opacity-50 hover:bg-opacity-75 md:flex items-center justify-center"
          onClick={() => handleDotClick((current + 1) % SliderImageData.length)} // Adjusted onClick to handle next slide
          whileTap={{ scale: 1.2 }}
          whileHover={{ x: 10 }}
        >
          <FaArrowRight size={24} />
        </motion.button>
      </div>
      <div className="absolute md:bottom-0 bottom-[280px] w-full flex justify-center space-x-2">
        {SliderImageData.map((_, index) => (
          <motion.button
            key={index}
            className={`w-4 h-4 rounded-full hover:bg-white ${index === imageIndex ? 'bg-green-500' : 'bg-gray-400'}`}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
