import React from "react";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

const EditProductImageUpload = ({
  getRootProps,
  getInputProps,
  isDragActive,
  productImages,
  setFullScreenImage,
  setOpenFullScreenImage,
  handleDeleteProductImage,
}) => {
  return (
    <div>
      <label className="text-sm text-white flex justify-center items-center pt-3">
        Upload or Drop Product Image
      </label>
      <div className="flex justify-between items-center cursor-pointer mt-4">
        <div
          {...getRootProps()}
          className={`p-2 bg-black border border-green-600 rounded h-40 w-full flex justify-center items-center ${
            isDragActive ? "border-green-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <FaCloudUploadAlt className="text-3xl" />
            <p className="text-sm font-semibold text-white">
              {isDragActive
                ? "Upload or Drop image here ..."
                : "Drop image here"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-4">
        {productImages.map((imgUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={imgUrl}
              alt="Product"
              className="w-20 h-20 object-cover border border-green-600 rounded cursor-pointer"
              onClick={() => {
                setFullScreenImage(imgUrl);
                setOpenFullScreenImage(true);
              }}
            />
            <div
              className="absolute top-1 right-1 bg-black bg-opacity-80 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={() => handleDeleteProductImage(index)}
            >
              <MdDelete className="text-red-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProductImageUpload;
