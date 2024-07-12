import React from "react";
import Slider from "../compounts/Slider";
import Hero from "@/compounts/Hero";
import Filter from "@/compounts/Filter";
import Order from "@/compounts/Order";
import MobileAppDownload from "@/compounts/MobileAppDownload";
import ShopReview from "@/compounts/ShopReview";
import FilterProduct from "@/compounts/FilterProduct";
import BestContent from "@/compounts/BestContent";
import SocialMedia from "@/compounts/Socials";

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
