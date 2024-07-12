import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Address = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Set to false to allow repeated triggering
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col text-center h-full gap-5 pt-8 text-white md:pb-[0px] pb-5 bg-slate-800 bg-opacity-20'
    >
      <h2>Our Address</h2>
      <p>1234 Street Name,</p>
      <p>City, Country</p>
      <p>Postal Code</p>
    </motion.div>
  );
}

export default Address;
