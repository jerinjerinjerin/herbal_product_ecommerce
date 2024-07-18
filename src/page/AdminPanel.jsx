import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(user?.data.role !== "ADMIN"){
      navigate('/')
    }
  },[user])

  const getLinkClassName = (path) => {
    return location.pathname === path ? 'bg-green-500 text-white hover:bg-green-800 ' : '';
  };


  return (
    <div className="min-h-[calc(100vh-120px)] flex pb-5">
      <aside className="bg-black text-white min-h-[100%] w-full drop-shadow-sm shadow-green-500  md:max-w-60 max-w-32 shadow-md">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-2xl cursor-pointer">
            {user ? (
              <img
                src={user?.data.profilePic}
                className="w-10 h-10 rounded-full"
                alt={user?.data.name}
              />
            ) : (
              <FaUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.data.name}</p>
          <p className="text-[10px]">{user?.data.role}</p>
        </div>
        {/* navigation */}
        <div className="md:w-full w-[50%]">
          <nav className="grid p-4 gap-5">
          <Link to="/admin-panel/all-users" className={`px-2 py-1 text-center rounded-sm border hover:bg-green-400 border-green-600 ${getLinkClassName('/admin-panel/all-users')}`}>All Users</Link>
          <Link to="/admin-panel/all-products" className={`px-2 py-1 text-center rounded-md border hover:bg-green-400 border-green-600 ${getLinkClassName('/admin-panel/all-products')}`}>Products</Link>
          </nav>
        </div>
      </aside>
      <main className="w-screen overflow-hidden h-full  p-2">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminPanel;
