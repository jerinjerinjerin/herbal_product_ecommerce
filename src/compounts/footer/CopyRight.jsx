import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CopyRight = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger animation every time the component comes into view
    threshold: 0.5 // Trigger animation when 50% of element is in view
  });

  return (
    <motion.div
      ref={ref} // Attach the ref to the animated element
      initial={{ opacity: 0 }} // Initial stage: fully transparent
      animate={{ opacity: inView ? 1 : 0 }} // Animate to opacity 1 if in view, otherwise 0
      transition={{ duration: 0.5, delay: 2 }} // Smooth transition with a delay of 2 seconds
      className="w-full relative bottom-0 items-start justify-center bg-slate-900 py-5"
    >
      <motion.h3
        initial={{ opacity: 0 }} // Initial stage: fully transparent
        animate={{ opacity: inView ? 1 : 0 }} // Animate to opacity 1 if in view, otherwise 0
        transition={{ duration: 0.5, delay: 2.2 }} // Smooth transition with a delay of 2.2 seconds
        className="text-white md:text-xl text-[15px] text-center"
      >
        © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </motion.h3>
    </motion.div>
  );
};

export default CopyRight;
