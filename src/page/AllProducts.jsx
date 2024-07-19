import backendDomin from "@/commen/api";
import { Button } from "@/components/ui/button";
import AllProductAdminList from "@/compounts/AllProductAdminList";
import UploadProduct from "@/compounts/UploadProduct";
import { setProductDetials } from "@/redux/productSlice";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const dispatch = useDispatch();

  // Function to fetch all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/getall-products`, {
        withCredentials: "include",
      });

      if (response.data.success) {
        dispatch(setProductDetials(response.data.products));
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //product delete api endpoint

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendDomin}/api/delete-product/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        getAllProducts();
        toast.success(response.data.message)
      } else {
        console.log("Error deleting product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  


  // useMemo to call getAllProducts only once
  useMemo(() => {
    getAllProducts();
  }, []);

  const handleOpen = () => {
    setOpenUploadProduct(!openUploadProduct);
  };
  return (
    <div className="overflow-hidden">
      <div className="bg-slate-900 bg-opacity-40 py-2 px-4 flex-row gap-2 flex md:justify-between items-center overflow-x-hidden">
        <h2 className="font-bold md:text-lg text-[15px] text-white text-nowrap">all Product</h2>
        <Button
          className="border hover:bg-green-600  bg-transparent md:text-lg text-sm text-white border-green-600 md:py-2 md:px-4"
          onClick={handleOpen}
        >
          Upload Product
        </Button>
      </div>
      {/* upload product components */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}

      <AllProductAdminList
        getAllProducts={getAllProducts} 
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default AllProducts;
