import backendDomin from '@/commen/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewAdminProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendDomin}/api/single-product/${id}`);

        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        setError('An error occurred while fetching the product details');
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='text-white'>
      {error && <p>{error}</p>}
      {product ? (
        <div>
          <h1>{product.productName}</h1>
          <p>{product.productDescription}</p>
          <p>Price: {product.price}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>ViewAdminProduct</div>
    </div>
  );
};

export default ViewAdminProduct;
