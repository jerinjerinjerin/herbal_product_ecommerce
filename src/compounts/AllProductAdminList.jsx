import { Button } from "@/components/ui/button";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";

const AllProductAdminList = ({ getAllProducts, deleteProduct }) => {
  const product = useSelector((state) => state?.product?.product);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const sortedProducts = product?.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts?.slice(startIndex, startIndex + productsPerPage);

  const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

  return (
    <div className="overflow-x-auto h-full md:w-[98%] w-[100%] mx-auto bg-gray-900 rounded-md bg-opacity-40 pt-5">
      <div className="text-white overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.table
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="min-w-full border border-green-600"
          >
            <thead>
              <tr>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">ID</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Product Name</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Image</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Product Description</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Brand Name</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Category</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Age by Shop</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Quantity</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Price</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Selling Price</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Weight</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Expire Date</th>
                <th className="border border-green-600 px-2 py-1 text-center text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-green-600 px-2 py-1 text-xs">{startIndex + index + 1}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.productName}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">
                      {item.productImage && item.productImage.length > 0 && (
                        <img
                          src={item.productImage[0]}
                          alt={item.productName}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      )}
                    </td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.productDescription}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.brandName}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.category}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.ageByShop}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.quantity}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">${item.price}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">${item.sellingPrice}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{item.weight}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs">{moment(item.expireDate).format("ll")}</td>
                    <td className="border border-green-600 px-2 py-1 text-xs flex items-center justify-center gap-1">
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                        <FaEye className="text-xl" />
                      </Button>
                      <Button className="bg-yellow-500 hover:bg-yellow-700 text-white">
                        <FaEdit className="text-xl" />
                      </Button>
                      <Button 
                        className="bg-red-500 hover:bg-red-700 text-white"
                        onClick={() => deleteProduct(item._id)}
                      >
                        <MdDelete className="text-xl" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </motion.table>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            className={`mx-1 px-4 border hover:bg-green-800 hover:text-white border-green-600 ${currentPage === i + 1 ? 'bg-green-700 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AllProductAdminList;
