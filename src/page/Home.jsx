import BestContent from "@/compounts/hero/BestContent";
import Hero from "@/compounts/hero/Hero";
import MobileAppDownload from "@/compounts/hero/MobileAppDownload";
import Order from "@/compounts/hero/Order";
import ShopReview from "@/compounts/hero/ShopReview";
import Slider from "@/compounts/hero/Slider";
import Filter from "@/compounts/products/Filter";
import FilterProduct from "@/compounts/products/FilterProduct";
import React from "react";

const Home = () => {
  return (
    <div className="w-[100%] p-0 m-0 ">
      {/* slider */}
      <div className="bg-black ">
        <Slider />
      </div>
      {/* hero */}
      <div className="flex w-full bg-black">
        <Hero />
      </div>
      {/* best content and shop */}
      <div className="bg-black">
        <BestContent />
      </div>
      {/* filter */}
      <div className="w-full bg-black overflow-x-hidden">
        <Filter />
      </div>
      {/* Product filter */}
      <div className="bg-black">
        <FilterProduct />
      </div>
      {/* order */}
      <div className="bg-black">
        <Order />
      </div>
      {/* mobile app download */}
      <div className="bg-black pb-5 pt-5">
        <MobileAppDownload />
      </div>
      {/* review */}
      <div className="w-full bg-black">
        <ShopReview />
      </div>
    </div>
  );
};

export default Home;
