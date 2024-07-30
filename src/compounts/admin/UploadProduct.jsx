import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ProductInput from "./ProductInput";
import ProductImageUpload from "./ProductImageUpload";
import uploadImage from "@/helpers/UploadImage";
import backendDomin from "@/commen/api";
import ageByShop from "@/helpers/productAgeByShop";
import productCategory from "@/helpers/productCategory";
import DisplayImage from "./DisplayImage";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    productDescription: "",
    brandName: "",
    ageByShop: "",
    category: "",
    productImage: [],
    quantity: "",
    price: "",
    sellingPrice: "",
    weight: "",
    expireDate:"",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [errors, setErrors] = useState({});
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } });
  }, [controls]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (file) => {
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleDeleteProductImage = (index) => {
    const updatedProductImages = [...data.productImage];
    updatedProductImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: updatedProductImages,
    }));
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await handleUploadProduct(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validation rules
    if (!data.productName.trim()) {
      newErrors.productName = "Product name is required";
      valid = false;
    }

    if (!data.productDescription.trim()) {
      newErrors.productDescription = "Product description is required";
      valid = false;
    }

    if (!data.brandName.trim()) {
      newErrors.brandName = "Brand name is required";
      valid = false;
    }

    if (!data.category) {
      newErrors.category = "Category is required";
      valid = false;
    }

    if (!data.ageByShop) {
      newErrors.ageByShop = "Age by shop is required";
      valid = false;
    }

    if (data.productImage.length === 0) {
      newErrors.productImage = "Please upload product image";
      valid = false;
    }

    if (!data.quantity) {
      newErrors.quantity = "Product quantity is required";
      valid = false;
    }

    if (!data.price) {
      newErrors.price = "Product price is required";
      valid = false;
    }

    if (!data.sellingPrice) {
      newErrors.sellingPrice = "Selling price is required";
      valid = false;
    }

    if (!data.weight) {
      newErrors.weight = "Product weight is required";
      valid = false;
    }

    if (!data.expireDate) {
      newErrors.weight = "Product expire date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUploadProducts = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log("Form data to be sent:", data);
        const response = await axios.post(
          `${backendDomin}/api/create-product`,
          data
        ,{
          withCredentials: "include",
        });
        console.log("API response:", response);
        if (response.data.success) {
          setData({
            productName: "",
            productDescription: "",
            brandName: "",
            ageByShop: "",
            category: "",
            productImage: [],
            quantity: "",
            price: "",
            sellingPrice: "",
            weight: "",
          });
          toast.success(response.data.message);
          onClose();
        }
      } catch (error) {
        console.error("Error uploading product:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error uploading product");
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: -50 }}
    animate={controls}
    className="fixed inset-0 flex justify-center items-center bg-slate-800 z-[2000] bg-opacity-75">
      <div className="bg-black text-white p-4 rounded w-full max-w-2xl max-h-[80%] my-auto hide-scrollbar overflow-y-scroll">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-lg">Upload Product</h1>
          <div className="ml-auto">
            <CgClose
              className="text-red-500 text-2xl hover:text-red-800 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
        <form onSubmit={handleUploadProducts}>
          <ProductInput
            handleOnChange={handleOnChange}
            data={data}
            errors={errors}
            productCategory={productCategory}
            ageByShop={ageByShop}
          />

          <ProductImageUpload
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            productImages={data.productImage}
            setFullScreenImage={setFullScreenImage}
            setOpenFullScreenImage={setOpenFullScreenImage}
            handleDeleteProductImage={handleDeleteProductImage}
          />

          {Object.keys(errors).length > 0 && (
            <div className="mt-4 text-red-500 text-sm">
              Please fill out all required fields correctly.
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-[100%] bg-transparent border border-green-600 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Upload Product
          </Button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </motion.div>
  );
};

export default UploadProduct;
