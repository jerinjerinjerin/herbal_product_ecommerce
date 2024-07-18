import React, { useEffect, useState } from "react";
import { NavItem_Left, NavItem_Right } from "../data/data";
import { BsSearch } from "react-icons/bs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "../components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import backendDomin from "@/commen/api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { setUserDetials } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";

const Navbar = () => {

 
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const handlechangeMenu = () => {
    setMenuDisplay(!menuDisplay);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/logout`, {
        withCredentials: "include",
      });
      if (response.data.success) {
        toast.success(response.data.message || "logout success");
        dispatch(setUserDetials(null));
      } else {
        toast.error("logout failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <nav className="justify-between items-center flex lg:px-5 md:px-2  h-[100px]">
        <div className="px-10 md:px-0"></div>
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

        {/* admin panel */}
        <div className="hidden lg:space-x-4 space-x-2 lg:flex">
          <div className="relative flex justify-center">
            {user?.data._id && (
              <div
                className="text-2xl cursor-pointer"
                onClick={handlechangeMenu}
              >
                
                {user && (
                  <img
                    src={user?.data.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.data.name}
                  />
                )}
              </div>
            )}
            {menuDisplay && (
              <div
                className="absolute bg-transparent text-white top-10 
    h-fit  "
                onClick={handlechangeMenu}
              >
                {user?.data.role === "ADMIN" && (
                  <nav>
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:text-green-600 p-2 z-50"
                    >
                      Admin Panel
                    </Link>
                  </nav>
                )}
              </div>
            )}
          </div>
          {NavItem_Right.map((item, index) => (
            <div
              className="flex items-center space-x-1 text-white hover:text-green-500 font-semibold cursor-pointer"
              key={index}
            >
              <div className="">
                <Link
                  to={item.path}
                  className="flex lg:gap-1 gap-0 text-xs xl:text-[15px] items-center"
                >
                  {item.icon}
                  <p>{item.name}</p>
                </Link>
              </div>
            </div>
          ))}
          {/* handle logout */}
          <div className="">
            {user?.data._id ? (
              <div className="flex gap-1 items-center">
              <Button
                onClick={handleLogout}
                className="text-white group bg-transparent hover:bg-slate-900 hover:text-green-600 cursor-pointer"
              >
                Logout <span className="ml-1"><CiLogout className="text-white group-hover:text-green-600"/></span>
              </Button>
              
              </div>
            ) : (
              <Link to="/login" className="">
                <Button className="text-white bg-transparent group hover:bg-slate-900 hover:text-green-600 cursor-pointer">
                  Login <span className="ml-1 "><FaUser className="text-white group-hover:text-green-600"/></span>
                </Button>

              

              </Link>
            )}
          </div>
        </div>

        <div className="lg:hidden flex px-4">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="text-white" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>
                <span></span>
              </SheetTitle>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
