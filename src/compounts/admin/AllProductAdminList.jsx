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
          <div className="text-center text-white py-4">No products found</div>
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
