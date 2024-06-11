import React from 'react'
import { categories } from '../Constants'

function Categories() {
  return (
    <div className="flex flex-wrap justify-center pt-10 pb-20 gap-10 md:gap-20">
      {categories.slice(1).map((category, index) => (
        <div key={index} className="group flex flex-col items-center m-2 sm:m-3 md:m-4">
          <span className="peer hover:text-white text-3xl border text-[#2B2118] border-[#6F1A07] hover:bg-[#A8763E] hover:border-[#A8763E] transition duration-300 rounded-full mb-1 w-28 h-52 flex items-center justify-center">
            {category.icon}
          </span>
          <p className="peer-hover:text-[#6F1A07] text-md md:text-lg text-[#2B2118] font-bold mx-4 mt-8 text-center">{category.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Categories;