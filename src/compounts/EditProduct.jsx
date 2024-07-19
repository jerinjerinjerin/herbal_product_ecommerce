import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import productCategory from "../helpers/productCategory";
import ageByShop from "../helpers/productAgeByShop";
import DisplayImage from "./DisplayImage";
import backendDomin from "../commen/api";
import uploadImage from "@/helpers/UploadImage";
import { Button } from "@/components/ui/button";
import EditProductInput from "./EditProductInput";
import EditProductImageUpload from "./EditProductImageUpload";

const EditProduct = ({ onClose,getAllProducts,product }) => {

  const [data, setData] = useState({
    _id: product._id,
    productName: product.productName || "",
    productDescription: product.productDescription || "",
    brandName: product.brandName || "",
    ageByShop: product.ageByShop || "",
    category: product.category || "",
    productImage: product.productImage || [],
    quantity: product.quantity || "",
    price: product.price || "",
    sellingPrice: product.sellingPrice || "",
    weight: product.weight || "",
    expireDate: product.expireDate || "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

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

  const handleUploadProducts = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendDomin}/api/update-product`,
        data,
        {
          withCredentials: "include",
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
        onClose();
      }
    } catch (error) {
      console.error(
        "Error uploading product:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error uploading product");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-800 bg-opacity-75 z-50">
      <div className="bg-black text-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-lg">Edit Product</h1>
          <div className="ml-auto">
            <CgClose
              className="text-red-500 text-2xl hover:text-red-800 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
        <form onSubmit={handleUploadProducts}>
          <EditProductInput
            handleOnChange={handleOnChange}
            data={data}
            productCategory={productCategory}
            ageByShop={ageByShop}
          />

          <EditProductImageUpload
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            productImages={data.productImage}
            setFullScreenImage={setFullScreenImage}
            setOpenFullScreenImage={setOpenFullScreenImage}
            handleDeleteProductImage={handleDeleteProductImage}
          />


          <Button
            type="submit"
            className="mt-4 w-[100%] bg-transparent border border-green-600 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Edit Product
          </Button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default EditProduct;
