import React from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BestContent = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: 1, type: "spring", stiffness: 100, damping: 10 },
      });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className="relative h-[500px] bg-cover bg-center container"
      style={{
        backgroundImage: "url('https://theherbalacademy.com/wp-content/uploads/2018/06/Store2.jpg')",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="absolute inset-0 flex flex-col z-5 gap-5 items-center justify-center bg-black bg-opacity-70 p-5 rounded text-center"
      >
        <motion.h1
          className="text-white md:text-2xl text-md font-semibold"
          initial={{ opacity: 0 }}
          animate={controls}
        >
          Our herbal products are crafted with the finest natural ingredients,
          ensuring the highest quality and efficacy. Customers consistently report
          improved wellness and vitality, praising the gentle yet powerful effects.
          Our commitment to sustainability and ethical sourcing resonates deeply with users.
          Many appreciate our transparent production process and dedication to purity.
          Discover the difference with our trusted herbal solutions, where customer
          satisfaction is always our top priority.
        </motion.h1>
        <Button className="border-[2px] border-green-600 hover:border-white bg-transparent hover:bg-green-600">
          View all products
        </Button>
      </motion.div>
    </div>
  );
};

export default BestContent;
