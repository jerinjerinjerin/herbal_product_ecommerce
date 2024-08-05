import { Button } from "@/components/ui/button";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";

const AllProductAdminList = ({ getAllProducts, deleteProduct }) => {
  const [editOpenUploadProduct, setEditOpenUploadProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const product = useSelector((state) => state?.product?.product);
  console.log('test product', product);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setEditOpenUploadProduct(true);
  };

  useEffect(() => {
    getAllProducts();
    window.scrollTo(0, 0);
  }, [getAllProducts]);

  const sortedProducts = product
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts?.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto h-full md:w-[98%] w-[100%] mx-auto bg-gray-900 rounded-md bg-opacity-40 pt-5 z-[2000]">
      <div className="text-white overflow-x-auto">
        {sortedProducts && sortedProducts.length === 0 ? (
          <div className="flex h-screen justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.976
                22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895
                27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 
                 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 8
                20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05
                 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9
                  10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 1
                   15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 3
                    38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        ) : (
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
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    ID
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Product Name
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Image
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Product Description
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Brand Name
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Category
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Age by Shop
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Quantity
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Price
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Selling Price
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Weight
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Expire Date
                  </th>
                  <th className="border border-green-600 px-2 py-1 text-center text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts &&
                  currentProducts.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {startIndex + index + 1}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.productName}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.productImage && item.productImage.length > 0 && (
                          <img
                            src={item.productImage[0]}
                            alt={item.productName}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        )}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.productDescription.slice(0, 50)}...
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.brandName}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.category}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.ageByShop}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.quantity}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        ${item.price}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        ${item.sellingPrice}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {item.weight}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs">
                        {moment(item.expireDate).format("ll")}
                      </td>
                      <td className="border border-green-600 px-2 py-1 text-xs flex h-[100px] items-center justify-center gap-1">
                        <Link to={`/admin-panel/view-admin-product/${item._id}`}>
                          <Button className="bg-transparent hover:bg-green-700 text-white border border-green-600">
                            <FaEye className="text-xl" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleOpen(item)}
                          className="bg-transparent hover:bg-green-700 text-yellow-600 border border-green-600"
                        >
                          <FaEdit className="text-xl" />
                        </Button>
                        <AlertDialog className="">
                          <AlertDialogTrigger>
                            <Button className="bg-transparent hover:bg-green-700 text-red-600 border border-green-600">
                              <MdDelete className="text-xl" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-black border border-green-600 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-white">
                                This action cannot be undone. This will
                                permanently delete the product and remove it from
                                our records.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-transparent border border-green-600 text-white hover:text-white hover:bg-blue-800">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteProduct(item._id)}
                                className="bg-transparent border border-green-600 text-white hover:bg-red-800"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>








                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </motion.table>
          </AnimatePresence>
        )}
      </div>
      {sortedProducts && sortedProducts.length > 0 && (
        <div className="flex justify-center mt-4 pb-5">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              className={`mx-1 px-4 border hover:bg-green-800 hover:text-white border-green-600 ${
                currentPage === i + 1
                  ? "bg-green-700 text-white"
                  : "bg-transparent text-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
      {editOpenUploadProduct && (
        <EditProduct
          onClose={() => setEditOpenUploadProduct(false)}
          getAllProducts={getAllProducts}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AllProductAdminList;
