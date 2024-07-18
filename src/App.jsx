import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./page/Home";
import ViewProduct from "./compounts/view-product";
import FilterProduct from "./compounts/FilterProduct";
import Footer from "./compounts/Footer";
import CopyRight from "./compounts/CopyRight";
import Navbar from "./compounts/Navbar";
import SocialMedia from "./compounts/Socials";
import Checkout from "./compounts/Checkout";
import Cart from "./compounts/Cart";
import { useDispatch } from "react-redux";
import backendDomin from "./commen/api";
import { setUserDetials } from "./redux/userSlice";
import { useEffect } from "react";
import axios from "axios";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import AllUsers from "./page/AllUsers";
import AdminPanel from "./page/AdminPanel";
import AllProducts from "./page/AllProducts";
import Context from "./context/context";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetials = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/user-detials`, {
        withCredentials: "include",
      });
      // console.log(response.data,"success data")
      if (response.status === 200) {
        dispatch(setUserDetials(response.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetials();
  }, []);

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Context.Provider
            value={{
              fetchUserDetials, //user detial fetch
            }}
          >
            <ToastContainer position="top-center" />
            <div className="w-full z-10 sticky bg-slate-900 top-0 overflow-x-hidden shadow-md shadow-green-200">
              <Navbar />
            </div>
            <main className="min-h-[calc(100vh-120px)]">
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin-panel/" element={<AdminPanel />}>
                  <Route path="all-users" element={<AllUsers />} />
                  <Route path="all-products" element={<AllProducts />} />
                </Route>
                <Route path="/filter-product" element={<FilterProduct />} />
                <Route path="/view-product/:id" element={<ViewProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <SocialMedia />
            <Footer />
            <CopyRight />
          </Context.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
