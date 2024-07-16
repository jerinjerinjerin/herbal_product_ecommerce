import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed  flex justify-center items-center bg-black bg-opacity-50 z-[20]">
      <div className="relative">
        <button
          onClick={onClose}
          className="text-white hover:bg-red-600 bg-red-500 rounded-full p-2 cursor-pointer absolute top-2 right-2"
        >
          <CgClose className="text-xl" />
        </button>

        <img
          src={imgUrl}
          alt="displayimage"
          className="mx-auto h-[400px] w-[500px] object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default DisplayImage;
