import React from "react";
import QuickLinks from "./QuickLinks";
import Address from "./Address";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <footer className="bg-black h-auto container pb-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-3">
        <div className="border rounded-md border-green-600 bg-slate-800 bg-opacity-20">
          <QuickLinks />
        </div>
        <div className="border rounded-md border-green-600">
          <Address />
        </div>
        <div className="border rounded-md border-green-600">
          <Subscribe />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
