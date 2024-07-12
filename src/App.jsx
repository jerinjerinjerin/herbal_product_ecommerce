import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./page/Home"
import ViewProduct from "./compounts/view-product"
import FilterProduct from "./compounts/FilterProduct"
import Footer from "./compounts/Footer"
import CopyRight from "./compounts/CopyRight"
import Navbar from "./compounts/Navbar"
import SocialMedia from "./compounts/Socials"
import Checkout from "./compounts/Checkout"



function App() {
 

  return (
    <>
      <div className="">
         <BrowserRouter>
         <div className="w-full z-10 sticky bg-slate-900 top-0 overflow-x-hidden border-b border-green-600">

         <Navbar/>
         </div>
           <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/filter-product" element={<FilterProduct/>}/>
             <Route path="/view-product/:id" element={<ViewProduct/>}/>
             <Route path="/checkout" element={<Checkout/>}/>
           </Routes>
           <SocialMedia/>
           <Footer/>
           <CopyRight/>
         </BrowserRouter>
      </div>
    </>
  )
}

export default App
