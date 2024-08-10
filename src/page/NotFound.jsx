import React from 'react'

const NotFound = () => {
  return (
    <div className='flex justify-center  flex-col h-[400px] gap-5 items-center bg-black text-red-600'>
        <h1 className="md:text-2xl text-xl md:font-bold font-semibold">
          404 Page Not Found   
        </h1>
        <p className='md:text-xl text-sm'>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound