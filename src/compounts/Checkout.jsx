import React, { useState } from 'react';

// Mock Data for Cart Items
const cartItems = [
  { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
  { id: 2, name: 'Product 2', price: 59.99, quantity: 2 },
];

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log('Order placed!', { shippingAddress, paymentDetails });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <section className="cart-summary">
        <h3>Cart Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
      </section>

      <section className="shipping-address">
        <h3>Shipping Address</h3>
        <input
          type="text"
          value={shippingAddress}
          onChange={e => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
        />
      </section>

      <section className="payment-information">
        <h3>Payment Information</h3>
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handlePaymentChange}
          placeholder="Card Number"
        />
        <input
          type="text"
          name="expiryDate"
          value={paymentDetails.expiryDate}
          onChange={handlePaymentChange}
          placeholder="Expiry Date"
        />
        <input
          type="text"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handlePaymentChange}
          placeholder="CVV"
        />
      </section>

      <section className="order-review">
        <h3>Order Review</h3>
        <p>Shipping Address: {shippingAddress}</p>
        <p>Payment Method: Credit Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
        <p>Total: ${calculateTotal()}</p>
      </section>

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
