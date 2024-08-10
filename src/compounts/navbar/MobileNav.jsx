import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '../../components/ui/sheet';
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
} from '@/components/ui/alert-dialog';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IoBag } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { IoMdLogOut } from 'react-icons/io';
import Context from '@/context/context';
import { FaUser } from 'react-icons/fa';

const MobileNav = ({
  user,
  menuDisplay,
  handleChangeMenu,
  NavItem_Left,
  NavItem_Right,
  handleLogout,
}) => {

  const context = useContext(Context);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const handleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };

  return (
    <div>
      <Sheet className="relative z-[1002] text-white border border-l border-green-600">
        <SheetTrigger onClick={handleMobileNav}>
          <MenuIcon className="text-white" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-5 bg-black justify-center items-center">
          <SheetTitle className="relative flex items-center justify-center">
            <div className="pb-5">
              <div className="flex items-center justify-center flex-col gap-5">
                {user?.data?._id && (
                  <motion.div
                    className="text-xl cursor-pointer"
                    onClick={handleChangeMenu}
                    whileHover={{ scale: 1.1 }}
                  >
                    {user && (
                      <motion.img
                        src={user?.data?.profilePic}
                        className="w-10 h-10 rounded-full"
                        alt={user?.data?.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.div>
                )}
                {menuDisplay && (
                  <motion.div
                    className="absolute bg-transparent text-white top-10 h-fit"
                    onClick={handleChangeMenu}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {user?.data?.role === 'ADMIN' && (
                      <nav className="flex justify-center items-center">
                        <Link
                          to={'/admin-panel/admin-all-products'}
                          className="whitespace-nowrap pt-2 text-center hover:text-green-600 text-xs"
                        >
                          Admin Panel
                        </Link>
                      </nav>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </SheetTitle>
          <motion.div
            className="space-y-5 flex items-center justify-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {NavItem_Right.map((item, index) => (
              <motion.div
                className="flex items-center space-x-1 text-white hover:text-green-500  font-semibold cursor-pointer"
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.div>
            ))}
            <motion.div
              className="text-white flex items-center gap-1 group text-xs"
              whileHover={{ scale: 1.1 }}
            >
              <span>
                <IoBag />
              </span>{' '}
              <Link
                to={'/cart'}
                className="hover:text-green-600 flex gap-1 items-center"
              >
                <h1 className="">My bag </h1>
              </Link>
              {user?.data?._id && (
                <span className="text-white-300 group-hover:text-green-600">
                  {context.cartProductCount}
                </span>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            className="space-y-5 flex items-center justify-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {NavItem_Left.map((item, index) => (
              <motion.div
                className="flex items-center space-x-1 text-xs xl:text-[15px] text-white hover:text-green-500 font-semibold cursor-pointer"
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p>{item.name}</p>
                {item.icon}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center justify-center text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user?.data?._id ? (
              <AlertDialog>
                <AlertDialogTrigger>
                  <motion.div
                    className="flex gap-1 items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-transparent hover:bg-transparent text-xs 
                    hover:text-green-600 text-white cursor-pointer">
                      <span className="font-semibold ">
                        <IoMdLogOut className="size-4" />
                      </span>
                      Logout
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-black border border-green-600 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      This action will log you out. You will need to log in
                      again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border border-green-600 
                    text-white hover:text-white hover:bg-blue-800">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-transparent text-xs border border-green-600 text-white
                       hover:bg-red-800"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Link to="/login" className="flex justify-center items-center">
                <Button className="text-white bg-transparent text-xs group hover:text-green-600 
                cursor-pointer hover:bg-transparent">
                  Login{' '}
                  <span className="ml-1">
                    <FaUser className="text-white group-hover:text-green-600" />
                  </span>
                </Button>
              </Link>
            )}
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
