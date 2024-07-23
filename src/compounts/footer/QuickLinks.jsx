import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const QuickLinks = () => {
  const { ref, inView } = useInView({
    threshold: 0.5 // Trigger animation when 50% of element is in view
  });

  const listItems = [
    "About Us",
    "Products",
    "Product Category",
    "Shopping Cart",
    "Privacy Policy",
    "Terms & Conditions",
    "Returns & Refunds Policy",
    "Contact Us",
    "Help & Support"
  ];

  return (
    <div className="text-white ">
      <h2 className="text-center font-semibold text-xl mt-[50px]">Quick Links</h2>
      <ul className="grid grid-cols-3">
        {listItems.map((item, index) => (
          <motion.li
            key={index}
            ref={ref} // Attach the ref to each list item
            className="text-center py-2 text-[13px] hover:text-green-600 cursor-pointer rounded-md shadow-md transition-transform hover:scale-105"
            initial={{ opacity: 0, y: -10 }} // Initial state: invisible and slightly above
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }} // Fade in and drop down when in view
            transition={{ duration: 0.5, delay: index * 0.1 }} // Smooth transition with delay
            whileHover={{ scale: 1.05 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on tap
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
