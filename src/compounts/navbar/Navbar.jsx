import React, { useContext, useEffect, useState } from "react";
import { NavItem_Left, NavItem_Right } from "../../data/data";
import { BsSearch } from "react-icons/bs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "../../components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import backendDomin from "@/commen/api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { IoMdLogOut } from "react-icons/io";
import { setUserDetials } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import { IoBag } from "react-icons/io5";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Context from "@/context/context";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const handleChangeMenu = () => {
    setMenuDisplay(!menuDisplay);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message || "Logout success");
        dispatch(setUserDetials(null));
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <nav className="justify-between items-center flex lg:px-5 z-[10] md:px-2 h-[100px]">
      <div className="px-10 md:px-0">
        <Link to={"/"}>
          <img
            className="w-16 h-16 object-cover rounded-full"
            src="https://dynamic.brandcrowd.com/asset/logo/a2c58d20-7c6f-4e8f-ab27-206467df00e8/logo-search-grid-1x?logoTemplateVersion=1&v=637786131320670000"
            alt="logoimage"
          />
        </Link>
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
        <div className="bg-white py-1 md:py-2 px-2 lg:px-2 rounded-full md:w-auto w-[150px]">
          <div className="flex items-center xl:gap-2 gap-0 px-1 lg:px-2">
            <BsSearch className="size-5 md:size-5 " />
            <input
              type="text"
              placeholder="search"
              className="outline-none ml-3 md:ml-auto md:w-auto w-[70px]"
            />
          </div>
        </div>
      </div>

      {/* admin panel */}
      <div className="hidden lg:space-x-4 space-x-2 lg:flex">
        <div className="relative flex justify-center">
          {user?.data?._id && (
            <div className="text-2xl cursor-pointer" onClick={handleChangeMenu}>
              {user && (
                <img
                  src={user?.data?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.data?.name}
                />
              )}
            </div>
          )}
          {menuDisplay && (
            <div
              className="absolute bg-transparent text-white top-10 h-fit"
              onClick={handleChangeMenu}
            >
              {user?.data?.role === "ADMIN" && (
                <nav>
                  <Link
                    to={"/admin-panel/admin-all-products"}
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

        <div className="text-white flex items-center gap-1 group">
          <span>
            <IoBag />
          </span>{" "}
          <Link
            to={"/cart"}
            className="hover:text-green-600 flex gap-1 items-center"
          >
            <h1 className="">My bag </h1>
          </Link>
          {user?.data?._id && (
            <span className="text-white-300 group-hover:text-green-600">
              {context.cartProductCount}
            </span>
          )}
        </div>

        <div className="">
          {user?.data?._id ? (
            <div className="flex gap-1 items-center">
              <AlertDialog className="">
                <AlertDialogTrigger>
                  <Button className="bg-transparent hover:text-green-600 text-white cursor-pointer">
                    <span className="mr-1 font-semibold">
                      <IoMdLogOut className="size-4" />
                    </span>
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black border border-green-600 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      This action will log you out. You will need to log in
                      again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border border-green-600 text-white hover:text-white hover:bg-blue-800">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-transparent border border-green-600 text-white hover:bg-red-800"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Link to="/login" className="">
              <Button className="text-white bg-transparent group hover:bg-slate-900 hover:text-green-600 cursor-pointer">
                Login{" "}
                <span className="ml-1">
                  <FaUser className="text-white group-hover:text-green-600" />
                </span>
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
  );
};

export default Navbar;
