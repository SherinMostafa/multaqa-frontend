import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';

function Plans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/plans');
        setPlans(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPlans();
  }, []);

  if (error) {
    return <div>Error fetching plans: {error.message}</div>;
  }

  return (
    <div className="flex-1 pl-2 pt-4 lg:p-10 min-h-96">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#6F1A07]">Our Subscription Plans</h1>
      <hr className='my-4 w-full' />
      <section className="mb-8 w-full">
        <h2 className="text- mb-4 text-center py-6">Explore our flexible subscription plans designed for event organizers of all sizes. Find the ideal balance of features, pricing, and support to create unforgettable events.</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          {plans.map((plan) => (
            <div 
              key={plan._id} 
              className={`bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform transition-all duration-500} `}
              style={{ minWidth: '250px', maxWidth: '300px', height: '350px' }}
            >
              <div>
                <h3 className="text-xl font-bold text-[#6F1A07] mb-2 text-center">{plan.name}</h3>
                <p className="text-lg font-semibold text-gray-800 my-4 text-center">EGP {plan.price}/month</p>
                <div className="text-gray-600 mb-4">
                  <p className="text-center">Duration {plan.duration}</p>
                  <p className="text-center">Number of Tickets {plan.noOfTickets}</p>
                </div>
                <div className="text-gray-600 mb-6 list-disc list-inside">
                  {plan.features.split(',').map((feature, index) => (
                    <div key={index} className="mb-2 text-center">{feature.trim()}</div>
                  ))}
                </div>
              </div>
              {/* Conditionally render button based on plan type */}
              {plan.type === 'Basic' ? (
                <div className="p-4 font-semibold w-full text-center text-sm bg-gray-50 text-[#A8763E] cursor-default">Current Plan</div>
              ) : (
                <Button
                  type="button"
                  label="Subscribe"
                  customStyle="px-8 py-4 text-[18px] font-bold w-full"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Plans;
