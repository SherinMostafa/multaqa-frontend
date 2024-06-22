import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { TbMessageReport } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import { adminDashboards } from '../Constants';
import { VscOrganization } from "react-icons/vsc";

function Dashboard() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(adminDashboards[0]); // Initially select the first item

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/users/logout');
      localStorage.clear();
      navigate('/Admin');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const getIcon = (label) => {
    switch (label) {
      case 'Reports':
        return <TbMessageReport />;
      case 'Contacts':
        return <MdOutlineContactSupport />;
      case 'Requests':
        return <TiUserDeleteOutline />;
      case 'Company':
        return <VscOrganization />;
      default:
        return null;
    }
  };

  const handleItemClick = (adminDashboard) => {
    setSelectedItem(adminDashboard);
  };

  return (
    <div>
      {/* Navbar */}
      <div className='flex items-center justify-between px-6 sm:px-8 lg:px-10 h-20 bg-white'>
        <div className="text-[#6F1A07] text-lg sm:text-2xl font-bold">
          <Link to={'/Dashboard'}>multaqa</Link>
        </div>
        <div className="flex-1 flex justify-end">
          <div className='relative group'>
            <div className='flex items-center gap-2 text-sm font-semibold text-[#2B2118] transition duration-500 cursor-pointer'>
              <FaUser className="p-1 w-5 h-5 mx-auto text-gray-400 border rounded-full" />
              {admin.fullName}
            </div>
            <div className="absolute right-0 top-6 z-50 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-96 group-hover:py-2">
              <button className="block w-full text-left pl-6 py-2 text-sm text-[#2B2118] hover:text-[#A8763E] transition duration-500 focus:outline-none" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="bg-[#ECF0F1] w-fit lg:w-48">
          <div className="mt-10 space-y-8">
            {adminDashboards.map((adminDashboard) => (
              <div
                key={adminDashboard.id}
                className={`flex items-center px-6 py-3 cursor-pointer hover:bg-[#A8763E] hover:text-white ${
                  selectedItem.id === adminDashboard.id ? 'bg-[#A8763E] text-white' : ''
                }`}
                onClick={() => handleItemClick(adminDashboard)}
              >
                {getIcon(adminDashboard.label)}
                <span className="hidden lg:inline text-sm ml-2">{adminDashboard.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex w-full p-4 mb-20">
          {/* Render selected item's content */}
          {selectedItem.content}
          {/* Add more conditions for rendering other content based on selectedItem */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
