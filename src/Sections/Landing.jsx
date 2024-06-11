import React from 'react';
import Button from '../Components/Button';
import Slider from '../Components/Slider';
import { landingImages } from '../Constants/index';
import 'swiper/css';

function Landing() {
  return (
    <main className="mx-auto">
      <div className="container py-8 lg:py-10">
        <div className="flex flex-col md:flex-row items-center justify-around lg:gap-x-8">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/2 text-center pt-8 md:text-left md:pt-2">
            <h2 className="text-3xl md:text-3xl lg:text-5xl xl:text-5xl font-bold text-gray-800 mb-4 md:pb-4">
              Discover Upcoming Events
            </h2>
            <p className="text-lg md:text-base xl:text-2xl text-gray-600 mb-6 md:pr-2">
              Find exciting events happening near you and book your tickets now!
            </p>
            <div className="flex justify-center md:justify-start mt-10">
              <Button label="Explore Events" linkURL="/Events" customStyle="px-6 py-4 text-[16px]" />
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 mt-16 md:mt-0">
            <div className="swiper-container">
              <Slider landingSlider={true} images={landingImages} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Landing;
