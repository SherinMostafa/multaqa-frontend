import React from 'react';
import Search from '../Components/Search';

const Help = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <Search placeholder={'Search for help articles ...'} className={'h-12 rounded-md'} />

        {/* Help Articles */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Help Article Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">How do I create an event ?</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque, dolor sit amet varius
                fermentum.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">How do I create an event ?</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque, dolor sit amet varius
                fermentum.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">How do I create an event ?</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque, dolor sit amet varius
                fermentum.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">How do I create an event ?</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque, dolor sit amet varius
                fermentum.
              </p>
            </div>
            {/* Add more Help Article Cards here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
