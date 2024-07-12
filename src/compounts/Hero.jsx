import { heroContent, HeroImage } from "@/data/data";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  return (
    <div className="flex md:ml-[70px] mx-auto pb-10 md:pb-0  justify-center w-[98%] md:w-[98%] md:mx-auto flex-col md:flex-row gap-10 md:gap-10">
      <div className="text-white pb-5 flex flex-col gap-5 md:gap-10 md:justify-center md:w-[40%] w-[90%] text-left px-2">
        {heroContent.map((item, index) => (
          <AnimatedText
            key={index}
            title={item.title}
            content={item.content}
            index={index}
          />
        ))}
      </div>
      <div className="md:w-[60%] w-[90%] h-[100%] mx-auto pb-5 flex items-center">
        <div className="w-[90%] mx-auto">
          <AnimatedImage src={HeroImage.src} alt={HeroImage.alt} />
        </div>
      </div>
    </div>
  );
};

export const AnimatedText = ({ title, content, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.9, delay: index * 0.3 }}
    >
      <h1 className="text-xl font-semibold pb-2">{title}</h1>
      <p className="text-sm text-slate-400">{content}</p>
    </motion.div>
  );
};

const AnimatedImage = ({ src, alt }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.8 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      transition={{ duration: 0.8 }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  );
};

export default Hero;
