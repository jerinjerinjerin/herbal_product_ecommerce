import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ViewProduct from "./compounts/view-product";
import FilterProduct from "./compounts/FilterProduct";
import Footer from "./compounts/Footer";
import CopyRight from "./compounts/CopyRight";
import Navbar from "./compounts/Navbar";
import SocialMedia from "./compounts/Socials";
import Checkout from "./compounts/Checkout";
import Cart from "./compounts/Cart";

function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <div className="w-full z-10 sticky bg-slate-900 top-0 overflow-x-hidden border-b border-green-600">
            <Navbar />
          </div>
            <main className="min-h-[calc(100vh-120px)]">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filter-product" element={<FilterProduct />} />
              <Route path="/view-product/:id" element={<ViewProduct />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
          </Routes>
            </main>
          <SocialMedia />
          <Footer />
          <CopyRight />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
