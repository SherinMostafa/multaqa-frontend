import React, { useState } from 'react';
import Button from '../Components/Button';

const Tickets = ({ ticket }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
        setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleProceedToCheckout = () => {
    // Here you can implement the logic to proceed to the checkout process
    // For demonstration purposes, let's just log the selected quantity
    console.log(`Proceeding to checkout with ${quantity} ticket(s)`);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white border border-[#6F1A07] shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          {/* <p className="text-gray-700 mb-2">{ticket.description}</p> */}
          <div className="flex flex-col space-y-8 justify-between items-center mb-4">
            <label htmlFor="quantity" className="text-[#2B2118] text-xl font-semibold">Tickets Title</label>
            <div className="flex items-center">
              <div onClick={handleDecreaseQuantity}>
                <Button label={'-'} customStyle={'px-3 py-1 font-semibold text-[26px] leading-8'} />
              </div>
              <input
                id="quantity"
                type="text"
                min="0"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-40 p-2 text-center bg-white"
                disabled
              />
              <div onClick={handleIncreaseQuantity}>
                <Button label={'+'} customStyle={'px-3 py-1 font-semibold text-xl leading-8'} />
              </div>
            </div>
          </div>
          <div onClick={handleProceedToCheckout}>
            <Button label={'Get Tickets'} customStyle={'w-full py-3 font-semibold text-[18px] leading-[32px]'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
