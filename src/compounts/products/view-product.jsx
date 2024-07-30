import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backendDomin from "@/commen/api";
import formatCurrency from "@/helpers/formatCurrency";
import RelactedProduct from "./RelactedProducts";
import ProductReviews from "./ProductReviews";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);

  const mainSlider = useRef(null);
  const thumbnailSlider = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendDomin}/api/single-product/${id}`
        );

        if (response.data.success) {
          setProduct(response.data.product);
          setMainImage(response.data.product.productImage[0]); // Set initial main image
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

  const handleThumbnailHover = (image) => {
    setMainImage(image);
  };

  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSlider.current,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
  };

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: thumbnailSlider.current,
  };

  const handleZoomImage = useCallback((e) => {
    const target = e.target;

    setZoomImage(true);

    const { left, top, width, height } = target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  // Add to cart handler
  const addToCart = (product) => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      toast.error("Please log in to continue shopping");
      navigate("/login");
      return; // Exit the function to prevent further execution
    }
    if (product) {
      // Check if the product is already in the cart
      if (cart.some((p) => p._id === product._id)) {
        toast.error("product already added to cart");
        return;
      }
    }
    setCart((prevCart) => [...prevCart, product]);
    // Optionally, you can store the cart in localStorage to persist
    localStorage.setItem("cart", JSON.stringify([...cart, product]));

    toast.success("product added cart ");
  };

  return (
    <div className="flex flex-col lg:gap-[80px] md:gap-[0px] gap-[20px] pb-10">
      <motion.div
        className="text-white container lg:pb-14 pb-10"
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
            View Product
          </motion.h1>
        </div>
        {error && <p>{error}</p>}

        {product ? (
          <div className="grid md:grid-cols-2 lg:mt-0 md:mt-[30px] grid-cols-1 md:gap-4">
            <div
              className="relative object-scale-down"
              
              
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:relative"
              
              >
                <img
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                  className="object-cover lg:w-[60%]  md:w-[100%] w-[100%] lg:cursor-pointer h-[550px] md:h-[500px] rounded-lg  "
                  src={mainImage}
                  alt="Main product"
                />

                {/* product zoom */}
                {zoomImage && (
                  <div
                    className="overflow-hidden rounded-lg absolute xl:w-[800px] lg:w-[600px] lg:h-[500px] top-0 -right-[600px]  lg:block bg-white z-[100] p-1"
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundSize: "200%",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                      backgroundRepeat: "no-repeat",
                      border: "1px solid black", // Optional: to see the boundaries of the zoomed area
                    }}
                  />
                )}
              </div>

              <Slider
                {...thumbnailSettings}
                ref={thumbnailSlider}
                className="thumbnail-slider absolute mt-[30px]  lg:w-[60%] md:w-[100%]  w-[100%]  lg:mt-[20px] md:mt-[0px] left-0 bg-gray-900 bg-opacity-50 p-2"
              >
                {product.productImage.map((image, index) => (
                  <div
                    key={index}
                    className="px-1 cursor-pointer h-[150px] md:h-[100px]"
                    onMouseEnter={() => handleThumbnailHover(image)}
                  >
                    <img
                      className={`object-cover w-full md:h-[70px] lg:h-[100px] h-[100px] transition-transform duration-300 ease-in-out ${
                        mainImage === image ? "border-2 border-green-500" : ""
                      }`}
                      src={image}
                      alt={`product thumbnail ${index}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="flex flex-col items-start px-5 lg:mt-0 md:-mt-10 mt-[160px]">
              <motion.h1
                className="text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Name:{" "}
                </span>
                {product.productName}
              </motion.h1>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-[18px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Description:{" "}
                </span>
                {product.productDescription}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Brandname:{" "}
                </span>
                {product.brandName}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Category:{" "}
                </span>
                {product.category}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product AgeByShop:{" "}
                </span>
                {product.ageByShop}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Price:{" "}
                </span>{" "}
                <del className="text-red-600">
                  {formatCurrency(product.price)}
                </del>
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product SellingPrice:{" "}
                </span>
                {formatCurrency(product.sellingPrice)}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Weight:{" "}
                </span>
                {product.weight}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Quantity:{" "}
                </span>
                {product.quantity}
              </motion.p>
              <motion.p
                className="lg:mt-5 md:mt-3 mt-1 text-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4 }}
              >
                <span className="text-slate-300 text-[15px]">
                  Product Expiredate:{" "}
                </span>
                {moment(product.expireDate).format("ll")}
              </motion.p>
              <div className="flex md:flex-row flex-col gap-5 md:w-auto w-[60%] py-5">
                <Button className="bg-transparent text-white border border-green-600 hover:bg-green-600">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </motion.button>
                </Button>

                <Button className="bg-transparent text-white border border-green-600 hover:bg-green-600">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Buy Now
                  </motion.button>
                </Button>

                <Button className="bg-transparent text-white border border-green-600 hover:bg-green-600">
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Add to Wishlist
                  </motion.button>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 
                  22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 
                  27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226
                   50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 
                  20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666
                   0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694
                    10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331
                     15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083
                      38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </motion.div>
      <RelactedProduct />
      <ProductReviews />
    </div>
  );
};

export default ViewProduct;
