import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { useParams } from 'react-router-dom';

const Organizer = () => {
  const { userId } = useParams();
  const [organizerData, setOrganizerData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/organizer/${userId}`);
        if (response.data) {
          setOrganizerData(response.data);
          setFollowersCount(response.data.followersCount);
        }
      } catch (error) {
        console.error('Error fetching organizer data:', error);
      }
    };

    fetchOrganizerData();
  }, [userId]);

  const handleToggleFollowClick = () => {
    if (isFollowed) {
      setIsFollowed(false);
      setFollowersCount(prevCount => prevCount - 1);
    } else {
      setIsFollowed(true);
      setFollowersCount(prevCount => prevCount + 1);
    }
  };

  if (!organizerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start gap-8 px-4 sm:px-6 lg:px-8">
      {/* Left Section: Organizer Profile */}
      <div className="flex-1 max-w-md">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center">
          {/* Organizer Profile Image */}
          <div className="mb-4">
            <img
              src={organizerData.profileImage || "/images/Login.jpg"}
              alt="Organizer Logo"
              className="mx-auto w-24 h-24 rounded-full"
            />
          </div>
          {/* Organizer Name */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{organizerData.fname} {organizerData.lname}</h1>
          {/* Follow/Unfollow Button */}
          {isFollowed ? (
            <RiUserUnfollowFill onClick={handleToggleFollowClick} size='16' className="ml-4 cursor-pointer" />
          ) : (
            <RiUserFollowLine onClick={handleToggleFollowClick} size='16' className="ml-4 cursor-pointer" />
          )}
          {/* Followers Count */}
          <p className="text-gray-700 mb-4">{followersCount} Followers</p>
          {/* Organizer Bio */}
          <p className="text-gray-600 mb-4">
            {organizerData.bio}
          </p>
          {/* Website URL, Phone, Social Media Links */}
          <div className="flex flex-col items-start gap-2">
            {organizerData.websiteUrl && (
              <p>
                <strong>Website:</strong> <a href={organizerData.websiteUrl}>{organizerData.websiteUrl}</a>
              </p>
            )}
            {organizerData.phone && (
              <p><strong>Phone:</strong> {organizerData.phone}</p>
            )}
            <div className="flex gap-4 mt-2">
              {organizerData.twitterUrl && (
                <a href={organizerData.twitterUrl} className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
              )}
              {organizerData.facebookUrl && (
                <a href={organizerData.facebookUrl} className="text-blue-600 hover:text-blue-800" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
              )}
              {organizerData.instagramUrl && (
                <a href={organizerData.instagramUrl} className="text-pink-400 hover:text-pink-600" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Events */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <h2 className="text-2xl font-bold text-[#6F1A07]">Events</h2>
        </div>
        {/* Render Events Here */}
        {organizerData.events.map(event => (
          <div key={event._id} className="border-b border-gray-200 py-4">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500 mt-2">{new Date(event.date).toLocaleDateString()}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
        {/* Handle no events scenario */}
        {organizerData.events.length === 0 && (
          <p className="text-gray-600 text-center mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Organizer;
