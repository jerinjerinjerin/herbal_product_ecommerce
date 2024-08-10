import React from "react";
import cancelImage from "../assets/paymentCancel.gif";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img
        src={cancelImage}
        className="rounded-md md:h-[400px] md:w-[550px] w-[400px] h-[300px]"
        alt="paymentSuccess"
      />
      <p className="text-red-600 font-semibold text-xl">
        Payment Cancel
      </p>
      <Link className="" to={"/cart"}>
        <Button className="bg-transparent text-white border border-red-600 hover:bg-red-600">
          Go to Cart
        </Button>
      </Link>
    </div>
  );
};

export default Cancel;
