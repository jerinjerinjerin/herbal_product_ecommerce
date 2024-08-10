import React from 'react';
import successImage from '../assets/paymentSuccess.gif';
import { Button } from '@/components/ui/button';


const Success = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <img src={successImage} className='rounded-md md:h-[400px] md:w-[550px] w-[400px] h-[300px]' alt="paymentSuccess" />
      <p className='text-green-600 font-semibold text-xl'>Payment Successfully</p>
      <Button className="bg-transparent text-white border border-green-600 hover:bg-green-600">See Order</Button>
    </div>
  )
}

export default Success