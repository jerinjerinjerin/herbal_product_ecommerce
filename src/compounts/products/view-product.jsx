import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
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
import addToCart from "@/helpers/addToCart";
import Context from "@/context/context";
import LoaderPage from "@/helpers/LoaderPage";

const ViewProduct = () => {
  const {fetchUserAddToCart} = useContext(Context);


    const handleAddToCart = async (e, id) => {

      await addToCart(e, id);

      fetchUserAddToCart();
    };

  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
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
            <div className="relative object-scale-down">
              <div className="flex flex-col lg:flex-row gap-10 lg:relative">
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
                    onClick={(e) =>handleAddToCart(e, product?._id)}
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
          <LoaderPage/>
        )}
      </motion.div>
      <RelactedProduct />
      <ProductReviews />
    </div>
  );
};

export default ViewProduct;
