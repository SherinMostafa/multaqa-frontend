import React, { useState, useEffect } from 'react';
import { accountSettings } from '../Constants/index';
import Button from '../Components/Button';
import { MdManageAccounts, MdEmail, MdLock, MdCreditCard, MdDeleteForever } from "react-icons/md";

const Account = () => {
  const [selectedItem, setSelectedItem] = useState(accountSettings[0]); // Initially select the first item
  const [activeButtonId, setActiveButtonId] = useState(accountSettings[0].id); // Initially set the active button
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Fetch userType from localStorage
    const userTypeFromStorage = localStorage.getItem('userType');
    setUserType(userTypeFromStorage);
  }, []);

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
        return null;
    }
  };

  const handleItemClick = (accountSetting) => {
    setSelectedItem(accountSetting);
    setActiveButtonId(accountSetting.id); // Update the active button ID
  };

  const shouldDisplayCreditCards = () => {
    // Check if userType is Organizer or organizer
    return (userType === 'Organizer');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#ECF0F1]">
        <div className="mt-10 space-y-8">
          {accountSettings.map((accountSetting) => (
            accountSetting.label === 'Credit/Debit Cards' && shouldDisplayCreditCards() ? null : (
              <Button
                key={accountSetting.id}
                link={true}
                label={
                  <span className="flex items-center gap-x-4 py-2 text-sm">
                    {getIcon(accountSetting.label)}
                    <span className="hidden lg:inline text-sm">{accountSetting.label}</span>
                  </span>
                }
                customStyle={`w-full flex items-center justify-center lg:block lg:w-full text-left px-4 py-2 hover:bg-[#A8763E] hover:text-white rounded-none ${
                  activeButtonId === accountSetting.id ? 'bg-[#A8763E] text-white rounded-none hover:text-white' : '' // Apply background color if active
                }`}
                onClick={() => handleItemClick(accountSetting)}
              />
            )
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-3/4 p-4 mb-20 mx-6">
        {/* Render selected item's content */}
        {selectedItem.content}
      </div>
    </div>
  );
};

export default Account;
