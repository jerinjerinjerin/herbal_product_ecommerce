import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backendDomin from "@/commen/api";
import formatCurrency from "@/helpers/formatCurrency";

const ViewAdminProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendDomin}/api/single-product/${id}`
        );

        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError("Failed to fetch product details");
        }
      } catch (error) {
        setError("An error occurred while fetching the product details");
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <motion.div 
      className="text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center justify-center py-5">
        <motion.h1 
          className="text-2xl"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Admin View Product
        </motion.h1>
      </div>
      {error && <p>{error}</p>}
      {product ? (
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
            <div className="flex items-center justify-center">
              <Slider {...settings} style={{ width: '300px', height: '250px' }}>
                {product.productImage.map((image, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img className="object-cover w-[400px] h-[350px]" src={image} alt={`product image ${index}`} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="flex flex-col items-start px-5 md:mt-0 mt-[100px]">
              <motion.h1 className="text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <span className="text-slate-300 text-[15px]">Product Name: {" "}</span>{product.productName}
              </motion.h1>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-slate-300 text-[15px]">Product Description: {" "}</span>{product.productDescription}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <span className="text-slate-300 text-[15px]">Product Brandname: {" "}</span>{product.brandName}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <span className="text-slate-300 text-[15px]">Product Category: {" "}</span>{product.category}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
                <span className="text-slate-300 text-[15px]">Product AgeByShop: {" "}</span>{product.ageByShop}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0 }}>
                <span className="text-slate-300 text-[15px]">Product Price: {" "}</span > {" "}<del className="text-red-600">{formatCurrency(product.price) }</del>
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1 }}>
                <span className="text-slate-300 text-[15px]">Product SellingPrice: {" "}</span>{ formatCurrency(product.sellingPrice)}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
                <span className="text-slate-300 text-[15px]">Product Weight: {" "}</span>{product.weight}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.3 }}>
                <span className="text-slate-300 text-[15px]">Product Quantity: {" "}</span>{product.quantity}
              </motion.p>
              <motion.p className="md:mt-3 mt-1 text-xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4 }}>
                <span className="text-slate-300 text-[15px]">Product Expiredate: {" "}</span>{moment(product.expireDate).format("ll")}
              </motion.p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </motion.div>
  );
};

export default ViewAdminProduct;
