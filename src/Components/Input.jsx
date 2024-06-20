import React, { useState, useEffect, useRef } from 'react';

const Input = ({
  id,
  label,
  type,
  value,
  onChange,
  withFloatingEffect,
  placeholder,
  textArea,
  name,
  customStyle,
  selectOptions,
  rows,
  cols,
  required,
  noLabel,
  disabled,
  checkboxOptions,
}) => {
  const defaultStyle = "w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-[#6F1A07]";
  const floatingStyle = "w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-[#6F1A07] peer";

  const CustomDropdown = ({ id, options, value, onChange, customDropdownStyle }) => {
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
        onChange({ target: { id, value: option.value } });
        setIsOpen(false);
      }
    };

    const defaultLabel = options.length > 0 ? options[0].label : 'All Categories';

    return (
      <div className="relative" ref={dropdownRef}>
        <div
          className={`w-full px-4 py-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-[#6F1A07] cursor-pointer ${customDropdownStyle}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? options.find(opt => opt.value === value)?.label : defaultLabel}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 rounded-b-lg shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.disabled ? 'text-gray-400' : ''} ${customDropdownStyle}`}
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

  if (selectOptions) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className={`block text-gray-700 font-semibold mb-2 ${customStyle}`}>{label}</label>
        <CustomDropdown
          id={id}
          options={selectOptions}
          value={value}
          onChange={onChange}
          customDropdownStyle={customStyle}
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
          required={required}
        />
      </div>
    );
  } else if (checkboxOptions) {
    return (
      <div className="mb-4">
        <label className=" text-xl block text-[#6F1A07] font-bold mb-6">{label}</label>
        <div className="flex flex-wrap gap-12">
          {checkboxOptions.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                name={option.value}
                checked={value === option.value}
                onChange={(e) => onChange({ target: { id, value: e.target.checked ? option.value : '' } })}
                className="form-checkbox h-5 w-5 text-[#6F1A07] border-gray-300 focus:border-[#6F1A07] focus:ring-[#6F1A07]"
              />
              <span className="ml-2">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (withFloatingEffect) {
    return (
      <div className="relative w-full sm:w-3/4 md:w-1/2 mb-4 md:mb-0">
        <input
          className={floatingStyle + ` ${customStyle}`}
          id={id}
          type={type}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-2 text-gray-600 bg-white px-2 font-medium transition-all duration-300 transform ${value ? '-translate-y-4 text-xs' : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2'} peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#6F1A07]`}
        >
          {label}
        </label>
      </div>
    );
  } else if (noLabel) {
    return (
      <div className="mb-4">
        <input
          className={defaultStyle + ` ${customStyle}`}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
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
          required={required}
          disabled={disabled}
        />
      </div>
    );
  }
};

export default Input;
