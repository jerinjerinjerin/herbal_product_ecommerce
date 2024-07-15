import React from "react";
import { NavItem_Left, NavItem_Right } from "../data/data";
import { BsSearch } from "react-icons/bs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "../components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav className="justify-between items-center flex lg:px-5 md:px-2  h-[100px]">
      <div className="px-10 md:px-0">
      </div>
      <div className="space-x-5 hidden lg:flex">
        {NavItem_Left.map((item, index) => (
          <div
            className="flex items-center space-x-1 text-xs xl:text-[15px] text-white hover:text-green-500 font-semibold cursor-pointer"
            key={index}
          >
            <p>{item.name}</p>
            {item.icon}
          </div>
        ))}
      </div>
      <div className="">
        <div className="bg-white py-1 md:py-2 px-2 lg:px-2  rounded-full md:w-auto w-[150px]">
          <div className="flex items-center xl:gap-2 gap-0 px-1 lg:px-2">
            <BsSearch className="size-5 md:size-5 " />
            <input
              type="text"
              placeholder="search"
              className="outline-none ml-3  md:ml-auto md:w-auto w-[70px]"
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:space-x-4 space-x-2 lg:flex">
        {NavItem_Right.map((item, index) => (
          <div
            className="flex items-center space-x-1 text-white hover:text-green-500 font-semibold cursor-pointer"
            key={index}
          >
            <div className="">
              <Link to={item.path} className="flex lg:gap-1 gap-0 text-xs xl:text-[15px] items-center">
                {item.icon}
                <p>{item.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:hidden flex px-4">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="text-white" />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>
              <span>
                <ModeToggle />
              </span>
            </SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
