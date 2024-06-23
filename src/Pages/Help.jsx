// src/components/Help.js
import React from 'react';
import { FAQs } from '../Constants/index';

const Help = () => {
  return (
    <div className="py-10 bg-[#ECF0F1]">
      <div className="container mx-auto px-4">
        {/* Help Articles */}
        <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {FAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#6F1A07]">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
