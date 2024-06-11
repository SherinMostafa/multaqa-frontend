import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Button = ({ label, link, linkURL, form, dropdown, dropdownOptions, onSelect, customStyle, type, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    setIsOpen(false);
    onSelect(value);
  };

  // Default style for the button
  const buttonStyle = "text-sm md:text-md leading-none text-[#F7F3E3] bg-[#6F1A07] border border-[#6F1A07] rounded shadow-lg hover:bg-[#A8763E] hover:border-[#A8763E] transition duration-500";
  const linkStyle = "text-[#6F1A07] bg-none hover:bg-none font-semibold hover:text-[#A8763E] transition duration-500";
  const dropButtonStyle = "text-left mt-1 p-2 text-base focus:outline-none sm:text-sm rounded-md absolute top-full left-0 w-full bg-white rounded-lg transition duration-500 text-[#6F1A07]";

  if (link) {
    return (
      <Link to={linkURL} className={linkStyle + ` ${customStyle}`} onClick={onClick}>
        <button className='relative' type={type}>
          {label}
        </button>
      </Link>
    )
  } else if (dropdown) {
    return (
      <div className='relative'>
        <button className={dropButtonStyle} onClick={() => setIsOpen(!isOpen)} type={type}>
          <div className='p-2'>
            {label}
          </div>
        </button>
        {dropdownOptions && dropdownOptions.length > 0 && isOpen && (
          <div className={dropButtonStyle + ` ${customStyle}`}>
            {dropdownOptions.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-2 sm:text-sm rounded-md hover:text-[#A8763E] transition duration-500"
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  } else if (form) {
    return (
      <div>
        <button className={buttonStyle + ` ${customStyle}`} type={type}>
          {label}
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <Link to={linkURL} onClick={onClick}>
          <button type={type} className={buttonStyle + ` ${customStyle}`} >
            {label}
          </button>
        </Link>
      </div>
    )
  }
};

export default Button;
