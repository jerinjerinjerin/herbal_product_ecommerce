import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MobileAppDownload = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="w-full container flex items-center justify-center">
      <div className="w-full mx-auto relative" ref={ref}>
        <div
          className="w-full h-[600px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-3d-rendering-of-an-ecommerce-app-in-illustration-style-image_3819353.jpg')",
          }}
        ></div>
        {inView && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-5 flex-col text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.h1
              className="text-white text-3xl mb-0 font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring", stiffness: 300 }}
            >
              Download the App
            </motion.h1>
            <motion.p
              className="text-white text-lg mb-3 font-semibold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, type: "spring", stiffness: 300 }}
            >
              Stay connected with the latest updates and personalized
              recommendations.
            </motion.p>
            <motion.p
              className="text-white text-lg mb-6 font-semibold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, type: "spring", stiffness: 300 }}
            >
              Enjoy seamless shopping experience anytime, anywhere.
            </motion.p>
            <motion.div
              className="flex space-x-10 md:space-x-[60px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
              transition={{ delay: 3.5, type: "spring", stiffness: 300 }}
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="bg-black hover:bg-green-600 border-[2px] border-green-600 hover:border-white text-white px-4 py-2 rounded flex items-center flex-row gap-1"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4, type: "spring", stiffness: 300 }}
                >
                  <img
                    className="w-5 h-5"
                    src="https://static-00.iconduck.com/assets.00/google-play-icon-1917x2048-e4qduz99.png"
                    alt="google_play"
                  />
                  <span>Google Play</span>
                </motion.button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <motion.button className="bg-black border-[2px] hover:bg-green-600 border-green-600 hover:border-white text-white px-4 py-2 rounded flex items-center flex-row gap-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, type: "spring", stiffness: 300 }}
                >
                  <img
                    className="w-5 h-5"
                    src="https://static-00.iconduck.com/assets.00/apple-icon-1662x2048-d80o29ez.png"
                    alt="apple_store"
                    
                    
                    
                  />
                  <span>Apple Store</span>
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MobileAppDownload;
