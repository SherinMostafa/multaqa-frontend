import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFlask, FaPaintBrush, FaHeartbeat, FaHandsHelping, FaShoppingBag, FaFilm } from 'react-icons/fa';

// Map category titles to react-icons components
const categoryIcons = {
  "Science": <FaFlask size={28} />,
  "Art": <FaPaintBrush size={28} />,
  "Health": <FaHeartbeat size={28} />,
  "Charity": <FaHandsHelping size={28} />,
  "Bazars": <FaShoppingBag size={28} />,
  "Entertainment": <FaFilm size={28} />,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-center pt-10 pb-20 gap-10 md:gap-16">
      {categories.map((category, index) => (
        <div key={index} className="group flex flex-col items-center m-1 sm:m-2 md:m-3">
          <span className="peer hover:text-white text-3xl border text-[#2B2118] border-[#6F1A07] hover:bg-[#A8763E] hover:border-[#A8763E] transition duration-300 rounded-full mb-1 w-28 h-52 flex items-center justify-center">
            {categoryIcons[category.title]}
          </span>
          <p className="peer-hover:text-[#6F1A07] text-md md:text-lg text-[#2B2118] font-bold mx-4 mt-8 text-center">{category.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
