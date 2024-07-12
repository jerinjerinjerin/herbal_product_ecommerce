import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MostBought, BestOffers, MensHelth, WomenHelth } from "../data/data"; // Import your data arrays
import { Button } from "@/components/ui/button";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import StarRating from "./StarRating";
import { motion } from "framer-motion"; // Import motion
import ProductReviews from "./ProductReviews";
import RelactedProduct from "./RelactedProducts";
import { ModeToggle } from "@/components/mode-toggle";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Function to find product by id from multiple arrays
    const findProductById = (id) => {
      // Check each array for the product with matching id
      const arrays = [MostBought, BestOffers, MensHelth, WomenHelth];
      for (let arr of arrays) {
        const foundProduct = arr.find((item) => item.id === parseInt(id));
        if (foundProduct) {
          return foundProduct;
        }
      }
      return null; // Return null if no product is found
    };

    const selectedProduct = findProductById(id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setSelectedImage(selectedProduct.images[0].src); // Set the default selected image
    }

    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id]);

  // Function to handle thumbnail hover
  const handleThumbnailHover = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  if (!product) {
    return (
      <div className="w-full h-screen bg-black text-white text-2xl font-semibold flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 mt-[100px]"
      >
        <div className="grid lg:flex lg:gap-10 md:grid md:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex items-center gap-10 mx-auto flex-row md:flex-col md:h-[500px] md:justify-between">
            {product.images.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`rounded-md object-cover cursor-pointer border-2 ${
                  selectedImage === image.src
                    ? "border-green-800 border-4"
                    : "border-transparent"
                }`}
                style={{ width: "130px", height: "130px" }}
                onMouseEnter={() => handleThumbnailHover(image.src)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center">
            <motion.img
              src={selectedImage}
              alt={product.name}
              className="rounded-lg border-[3px] border-green-600 h-auto mb-4 object-cover"
              style={{ width: "500px", height: "500px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex w-full gap-5 justify-between items-center">
              <Link to={"/"}>
                <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 flex justify-start items-center gap-1 pb-2">
                  Go back <TiArrowBack className="text-white" />
                </Button>
              </Link>

              <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 flex justify-start items-center gap-1 pb-2">
                Add to bag <PiHandbagSimpleFill className="text-white" />
              </Button>
              <Link to={"/checkout"}>
                <Button className="bg-black border border-green-600 hover:border-white bg-opacity-70 flex justify-start items-center gap-1 pb-2">
                  Buy now <FaFileInvoiceDollar className="text-white" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-white flex flex-col gap-5 pl-7 lg:pl-0 items-left">
            <motion.h2
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {product.name}
            </motion.h2>
            <motion.p
              className="mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Description: {product.description}
            </motion.p>
            <div>
              {product.disCoundPrice ? (
                <span className="text-green-600 font-semibold">
                  <span className="text-white">Price: </span>
                  <del className="text-red-500"> {product.price}</del>{" "}
                  <span className="text-[20px]">{product.disCoundPrice}</span>
                </span>
              ) : (
                <span>Price: {product.price}</span>
              )}
            </div>
            <StarRating rating={product.rating} />
            <p className="text-slate-400 text-sm">
              Brand{" "}
              <span className="text-sm text-white font-semibold"> HXN</span>
            </p>
            <p className="text-slate-400 text-sm">
              Net Quantity{" "}
              <span className="text-sm text-white font-semibold">
                60.00 count
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Item Form{" "}
              <span className="text-sm text-white font-semibold">Tablet</span>
            </p>
            <p className="text-slate-400 text-sm">
              Item Weight{" "}
              <span className="text-sm text-white font-semibold">
                250 Grams
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Special{" "}
              <span className="text-sm text-white font-semibold">
                Amino Acid, Growth Support Super Foods, Minerals,
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Diet Type{" "}
              <span className="text-sm text-white font-semibold">
                Vegetarian
              </span>
            </p>
            <p className="text-slate-400 text-sm">
              Product{" "}
              <span className="text-sm text-white font-semibold">
                Bone & Joint Support, Muscle Growth
              </span>
            </p>
          </div>
        </div>
      </motion.div>
      <div className="">
        <RelactedProduct />
      </div>
      <div className="pb-5 pt-10">
        <ProductReviews />
      </div>
    </div>
  );
};

export default ViewProduct;
