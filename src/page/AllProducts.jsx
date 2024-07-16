import { Button } from '@/components/ui/button';
import UploadProduct from '@/compounts/UploadProduct';
import React, { useState } from 'react'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] =useState(false);

  const handleOpen = () => {
    setOpenUploadProduct(!openUploadProduct);
  }
  return (
    <div>
       <div className="bg-slate-900 bg-opacity-40 py-2 px-4 flex justify-between items-center">
         <h2 className="font-bold text-lg text-white">all Product</h2>
         <Button 
           className='border hover:bg-green-600 bg-transparent text-white border-green-600 py-2 px-4'
           onClick={handleOpen} 
         >
           Upload Product
         </Button>
       </div>
       {/* upload product components */}
       {
        openUploadProduct && (

          <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
        )
       }
    </div>
  )
}

export default AllProducts