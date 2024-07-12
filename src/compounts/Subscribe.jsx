import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Subscribe = () => {
  const controls = useAnimation(); // Initialize controls for animation

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1, 
        staggerChildren: 0.2 
      } 
    },
  };
  
  const shakeAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1 
      } 
    },
    shake: {
      x: [0, -10, 10, -10, 10, -10, 10, -10, 0],
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      controls.start("shake"); // Start the shake animation
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col items-center md-pb-5  pb-[50px] bg-slate-800 bg-opacity-20">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      variants={containerVariants}
      className="text-center md:w-full w-[80%]"
    >
      <motion.h3
        variants={shakeAnimation} // Apply shakeAnimation variants
        className="mb-4 text-white text-[15px] md:w-[350px] w-[250px]"
      >
        Stay ahead with exclusive updates on our latest products! Subscribe now
        for first access.
      </motion.h3>
      <motion.input
      whileHover={{ scale: 1.1 }}
        type="text"
        placeholder="Enter your email"
        className="outline-none  w-[90%] mb-4 py-2 px-2 border border-green-600 text-white bg-black rounded-md"
      />
      <motion.button
      
        whileHover={{ scale: 1.1 }} // Example of hover animation using Framer Motion
        className="subscribe-button bg-black mb-4 border w-[90%] border-green-600 rounded-md py-2 px-4 text-white "
      >
        Subscribe
      </motion.button>
    </motion.div>
    </div>
  );
};

export default Subscribe;
