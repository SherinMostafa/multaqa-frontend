import React from 'react';
import Button from '../Components/Button';

const About = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">About Us</h1>
          <p className="text-gray-600">
            Multaqa brings people together through live experiences.
            Discover events that match your passions or create your own.
          </p>
        </div>
        <div className="mb-12">
          <img src="/Images/photo_24_2024-06-22_23-13-16.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="mb-12 text-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Multaqa, we believe in the power of shared experiences.
              We aspire to be the go-to source for curated event experiences, seamlessly connecting eventgoers and event makers.
              We are here to help you get offline and get together to explore your interests and pursue new passions.
            </p>
          </div>
        </div>
        
        {/* New Section with Images and Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative group">
            <img src="/Images/photo_17_2024-06-22_23-13-16.jpg" alt="Marketing" className="w-full h-80 object-cover rounded-lg shadow-md" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                label={'Discover new experiences'}
                linkURL={'/Register'}
                customStyle={'p-4'}
              />
            </div>
          </div>
          <div className="relative group">
            <img src="/Images/photo_3_2024-06-22_23-13-16.jpg" alt="Event Creator" className="w-full h-80 object-cover rounded-lg shadow-md" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                label={'Organize an event'}
                linkURL={'/Register'}
                customStyle={'p-4'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
