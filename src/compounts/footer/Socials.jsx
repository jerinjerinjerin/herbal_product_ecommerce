import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Socialicons } from "@/data/data";

const SocialMedia = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.2 } },
  };

  const shakeAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    shake: {
      x: [0, -10, 10, -10, 10, -10, 10, -10, 0],
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      controls.start("shake");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col items-center container lg:w-[50%] md:w-[80%] w-full mx-auto pb-5 ">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="text-center"
      >
        <motion.h2
          variants={shakeAnimation}
          className="mb-4 text-2xl text-white font-bold"
        >
          Best Herbal Product Service
        </motion.h2>
        <motion.p variants={shakeAnimation} className="mb-4 text-white">
          We provide exceptional customer service for our range of high-quality
          herbal products. Connect with us on our social media channels for more
          information and updates.
        </motion.p>
      </motion.div>
      <motion.div
        className="flex space-x-4"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {Socialicons.map(({ icon, link, color }, index) => (
          <motion.a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            variants={shakeAnimation}
            whileHover={{ scale: 1.2 }} // Example of hover animation
            className={`text-3xl ${color}`}
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialMedia;
