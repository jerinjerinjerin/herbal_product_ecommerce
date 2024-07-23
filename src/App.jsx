import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import backendDomin from "./commen/api";
import { setUserDetials } from "./redux/userSlice";
import { useEffect } from "react";
import axios from "axios";
import Context from "./context/context";
import Navbar from "./compounts/navbar/Navbar";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import AdminPanel from "./page/AdminPanel";
import AllUsers from "./page/AllUsers";
import AllProducts from "./page/AllProducts";
import ViewAdminProduct from "./compounts/admin/ViewAdminProduct";
import FilterProduct from "./compounts/products/FilterProduct";
import ViewProduct from "./compounts/products/view-product";
import Checkout from "./compounts/cart/Checkout";
import Cart from "./compounts/cart/Cart";
import SocialMedia from "./compounts/footer/Socials";
import Footer from "./compounts/footer/Footer";
import CopyRight from "./compounts/footer/CopyRight";
import Home from "./page/Home";
import ViewAllProduct from "./compounts/products/ViewAllProduct";
import SignInPage from "./auth/sign-in";
import SignUpPage from "./auth/sign-up";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetials = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/user-detials`, {
        withCredentials: "include",
      });
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
          <Context.Provider value={{ fetchUserDetials }}>
            <ToastContainer position="top-center" />
            <div className="w-full z-[1000] sticky bg-slate-900 top-0 overflow-x-hidden shadow-md shadow-green-200">
              <Navbar />
            </div>
            <main className="min-h-[calc(100vh-120px)]">
              <Routes>
              <Route path="/auth/sign-in" element={<SignInPage />} />
              <Route path="/auth/sign-up" element={<SignUpPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin-panel/" element={<AdminPanel />}>
                  <Route path="all-users" element={<AllUsers />} />
                  <Route path="admin-all-products" element={<AllProducts />} />
                  <Route
                    path="view-admin-product/:id"
                    element={<ViewAdminProduct />}
                  />
                </Route>
                <Route path="/filter-product" element={<FilterProduct />} />
                <Route path="/view-product/:id" element={<ViewProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products-shop" element={<ViewAllProduct/>} />
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
