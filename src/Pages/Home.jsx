import React from 'react'
import Landing from '../Sections/Landing'
import Cards from '../Sections/Cards'
import Categories from '../Sections/Categories'
import { events } from '../Constants'

function Home() {
  return (
    <>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
        <Landing />
      </div>

      <div className="container mx-auto py-10 sm:py-20">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2B2118] font-bold mx-4 mb-6 md:mb-10">Upcoming Events</h1>
        <div>
          <Cards withSlider={true} events={events} />
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <Categories />
      </div>
    </>
  )
}

export default Home;
