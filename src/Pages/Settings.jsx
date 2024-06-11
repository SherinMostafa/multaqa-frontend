import React, { useState } from 'react';
import { items } from '../Constants/index';
import Button from '../Components/Button';
import { MdManageAccounts, MdEmail, MdLock, MdCreditCard, MdDeleteForever } from "react-icons/md";

const Settings = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]); // Initially select the first item
  const [activeButtonId, setActiveButtonId] = useState(items[0].id); // Initially set the active button

  const getIcon = (label) => {
    switch (label) {
      case 'Account Information':
        return <MdManageAccounts />;
      case 'Change Email':
        return <MdEmail />;
      case 'Change Password':
        return <MdLock />;
      case 'Credit/Debit Cards':
        return <MdCreditCard />;
      case 'Close Account':
        return <MdDeleteForever />;
      default:
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setActiveButtonId(item.id); // Update the active button ID
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#ECF0F1] mr-6">
        <div className="mt-10 space-y-8">
          {items.map((item) => (
            <Button
              key={item.id}
              link={true}
              label={
                <span className="flex items-center gap-x-4 py-2 text-sm">
                  {getIcon(item.label)}
                  <span className="hidden lg:inline text-sm ">{item.label}</span>
                </span>
              }
              customStyle={`w-full flex items-center justify-center lg:block lg:w-full text-left px-4 py-2 hover:bg-[#A8763E] hover:text-white rounded-none ${
                activeButtonId === item.id ? 'bg-[#A8763E] text-white rounded-none hover:text-white' : '' // Apply background color if active
              }`}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-4 mb-20">
        {/* Render selected item's content */}
        {selectedItem.content}
      </div>
    </div>
  );
};

export default Settings;
