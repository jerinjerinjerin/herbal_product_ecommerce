import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import backendDomin from "./commen/api";
import { setUserDetials } from "./redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Context from "./context/context";
import Navbar from "./compounts/navbar/Navbar";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import AdminPanel from "./page/AdminPanel";
import AllUsers from "./page/AllUsers";
import AllProducts from "./page/AllProducts";
import ViewAdminProduct from "./compounts/admin/ViewAdminProduct";
import FilterProduct from "./compounts/products/FilterCategory";
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
import Filter from "./compounts/products/FilterBrand";
import SearchProduct from "./compounts/products/SearchProduct";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/user-detials`, {
        withCredentials: "include",
      });
      if (response.data.success) {
        // console.log("data", response.data);
        dispatch(setUserDetials(response.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await axios.get(
        `${backendDomin}/api/count-product-cart`,
        {
          withCredentials: "include",
        }
      );

      // console.log("api response", response.data?.data?.count);

      setCartProductCount(response.data?.data?.count);

      if (response.data.success) {
        dispatch(setUserDetials(response.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    fetchUserAddToCart();
     // to fetch user cart items count and update the user details in the state
  }, [cartProductCount]);

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Context.Provider
            value={{
              fetchUserDetails,
              cartProductCount, //current user add to cart
              fetchUserAddToCart,
            }}
          >
            <ToastContainer position="top-center" />
            <div className="w-full z-[25] sticky bg-slate-900 top-0 overflow-x-hidden shadow-md shadow-green-200">
              <Navbar />
            </div>
            <main className="min-h-[calc(100vh-120px)]">
              <Routes>
                <Route path="/auth/sign-in" element={<SignInPage />} />
                <Route path="/auth/sign-up" element={<SignUpPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchProduct/>}/>
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
                <Route path="/go-to-shop" element={<Filter />} />
                <Route path="/all-products-shop" element={<ViewAllProduct />} />
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
