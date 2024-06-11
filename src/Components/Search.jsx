import React from 'react';
import { HiSearch } from "react-icons/hi";

const Search = ({ placeholder, value, className, disabled }) => {
  return (
    <div className="relative w-full lg:w-auto">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        disabled={disabled}
        className={`w-full pl-12 pr-4 py-2 text-xs sm:text-sm border border-[#ECF0F1] rounded-full leading-5 bg-white text-[#2B2118] placeholder-[#A8763E] focus:outline-none focus:border-[#2B2118] focus:placeholder-[#2B2118] ${className}`}
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiSearch className='text-[#A8763E] text-lg' />
      </div>
    </div>
  );
};

export default Search;


// import React from 'react';
// import { HiSearch } from "react-icons/hi";
// import Button from './Button';
// import Input from './Input';

// const Search = ({ placeholder, value, className }) => {
//   return (
//     <form className="relative w-full lg:w-auto">
//       <Input
//         type={'text'}
//         value={value}
//         placeholder={placeholder}
//         customStyle={`pl-12 pr-4 py-2 text-xs sm:text-sm border border-[#ECF0F1] rounded-full leading-5 bg-white text-[#2B2118] placeholder-[#A8763E] focus:outline-none focus:border-[#2B2118] focus:placeholder-[#2B2118] ${className}`}
//       />
//       <Button label={<HiSearch className='text-[#A8763E] text-base' />} type={'submit'} form={true} customStyle={'absolute inset-y-0 left-0 ml-4 hover bg-transparent shadow-none border-none  hover:bg-transparent'} />
//     </form>
//   );
// };

// export default Search;

// import React, { useState } from 'react';
// import { HiSearch } from 'react-icons/hi';

// const Search = ({ placeholder }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div className="relative w-fit h-fit">
//       <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
//         <HiSearch className='text-[#6F1A07] text-LG' />
//       </div>
//       <input
//         type="text"
//         className={`h-12 w-12 border-none p-2.5 text-lg tracking-wider outline-none rounded-full transition-all duration-500 ease-in-out bg-white pr-10 text-[#6F1A07] placeholder-[#6F1A07] placeholder-opacity-50 placeholder:text-sm placeholder-tracking-wider placeholder:font-medium ${
//           isFocused ? 'w-72 rounded-none bg-transparent border-b border-[#6F1A07]' : ''
//         }`}
//         placeholder={placeholder}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//       />
//     </div>
//   );
// };

// export default Search;
