import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    if (!option.disabled) {
      onChange({ target: { id: 'city', value: option.value } });
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-[#6F1A07] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? options.find(option => option.value === value)?.label : 'Select an option'}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 rounded-b-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${option.disabled ? 'text-gray-400' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Input = ({ id, label, type, value, onChange, withFloatingEffect, placeholder, textArea, name, customStyle, selectOptions, rows, cols }) => {
  const defaultStyle = "w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-[#6F1A07]";

  if (selectOptions) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">{label}</label>
        <CustomDropdown
          options={selectOptions}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else if (textArea) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">{label}</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-[#6F1A07]"
          rows={rows}
          cols={cols}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  } else if (withFloatingEffect) {
    return (
      <div className="relative w-full sm:w-3/4 md:w-1/2 mb-4 md:mb-0">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-[#6F1A07] peer"
          id={id}
          type={type}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          required
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-2 text-gray-600 bg-white px-2 font-medium transition-all duration-300 transform ${value ? '-translate-y-4 text-xs' : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2'} peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#6F1A07]`}
        >
          {label}
        </label>
      </div>
    );
  } else {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">{label}</label>
        <input
          className={defaultStyle + ` ${customStyle}`}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }
};

export default Input;
