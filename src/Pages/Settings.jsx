import React, { useState } from 'react';
import { eventSettings } from '../Constants/index';
import Button from '../Components/Button';
import { TbHome, TbBusinessplan, TbCoins } from "react-icons/tb";

const Settings = () => {
  const [selectedItem, setSelectedItem] = useState(eventSettings[0]); // Initially select the first item
  const [activeButtonId, setActiveButtonId] = useState(eventSettings[0].id); // Initially set the active button

  const getIcon = (label) => {
    switch (label) {
      case 'Home':
        return <TbHome />;
      case 'Plans':
        return <TbBusinessplan />;
      case 'Finance':
        return <TbCoins />;
    //   case 'Credit/Debit Cards':
    //     return <MdCreditCard />;
    //   case 'Close Account':
    //     return <MdDeleteForever />;
      default:
        return null;
    }
  };

  const handleItemClick = (eventSetting) => {
    setSelectedItem(eventSetting);
    setActiveButtonId(eventSetting.id); // Update the active button ID
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#ECF0F1] mr-6 w-fit lg:w-48">
        <div className="mt-10 space-y-8">
          {eventSettings.map((eventSetting) => (
            <Button
              key={eventSetting.id}
              link={true}
              label={
                <span className="flex items-center gap-x-4 py-2 text-sm">
                  {getIcon(eventSetting.label)}
                  <span className="hidden lg:inline text-sm">{eventSetting.label}</span>
                </span>
              }
              customStyle={`w-full flex items-center justify-center lg:block lg:w-full text-left px-4 py-2 hover:bg-[#A8763E] hover:text-white rounded-none ${
                activeButtonId === eventSetting.id ? 'bg-[#A8763E] text-white rounded-none hover:text-white' : '' // Apply background color if active
              }`}
              onClick={() => handleItemClick(eventSetting)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full p-4 mb-20">
        {/* Render selected item's content */}
        {selectedItem.content}
      </div>
    </div>
  );
};

export default Settings;
