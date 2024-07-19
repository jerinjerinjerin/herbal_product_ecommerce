import React from "react";

const EditProductInput = ({
  handleOnChange,
  data,
  productCategory,
  ageByShop,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="productName" className="text-sm text-white ">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={data.productName}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          placeholder="Enter product name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="productDescription" className="text-sm text-white">
          Product Description
        </label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={data.productDescription}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          placeholder="Enter product description"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="brandName" className="text-sm text-white">
          Brand Name
        </label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          value={data.brandName}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          placeholder="Enter brand name"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm text-white">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
        >
          <option value="">Select category</option>
          {productCategory.map((category, index) => (
            <option
              className="bg-black text-white hover:bg-green-600"
              key={index}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="ageByShop" className="text-sm text-white">
          Age by Shop
        </label>
        <select
          id="ageByShop"
          name="ageByShop"
          value={data.ageByShop}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
        >
          <option value="">Select age by shop</option>
          {ageByShop.map((age, index) => (
            <option
              className="bg-black text-white hover:bg-green-600"
              key={index}
              value={age.ageGroup}
            >
              {age.ageGroup}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm text-white">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={data.quantity}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          placeholder="Enter product quantity"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm text-white">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={data.price}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"      
          placeholder="Enter product price"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="sellingPrice" className="text-sm text-white">
          Selling Price
        </label>
        <input
          type="number"
          id="sellingPrice"
          name="sellingPrice"
          value={data.sellingPrice}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          placeholder="Enter product selling price"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="weight" className="text-sm text-white">
          Weight
        </label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={data.weight}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600"
          
          placeholder="Enter product weight"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="expireDate" className="text-sm text-white">
          expire date
        </label>
        <input
          type="date"
          id="expireDate"
          name="expireDate"
          value={data.expireDate}
          onChange={handleOnChange}
          className="p-2 border rounded outline-none bg-transparent border-green-600 text-white"
         
          style={{
            colorScheme: "dark", // Ensures the calendar icon is visible in dark mode
            WebkitAppearance: "none", // Removes the default styles for WebKit browsers
            MozAppearance: "none", // Removes the default styles for Firefox browsers
            appearance: "none", // Removes the default styles for other browsers
            
          }}
          placeholder="Enter product expire date"
        />

      </div>
    </div>
  );
};

export default EditProductInput;
