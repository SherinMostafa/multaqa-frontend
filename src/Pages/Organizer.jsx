import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { RiUserFollowLine, RiUserUnfollowFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import Cards from '../Sections/Cards';

const Organizer = () => {
  const { userId } = useParams();
  const [organizerData, setOrganizerData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
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

    const fetchEventsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/creator/${userId}`);
        if (response.data) {
          setEventsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching organizer data:', error);
      }
    };

    fetchOrganizerData();
    fetchEventsData();
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {organizerData.fname} {organizerData.lname}
            </h1>
            {isFollowed ? (
              <RiUserUnfollowFill
                onClick={handleToggleFollowClick}
                size="16"
                className="ml-4 cursor-pointer"
              />
            ) : (
              <RiUserFollowLine
                onClick={handleToggleFollowClick}
                size="16"
                className="ml-4 cursor-pointer"
              />
            )}
          </div>
          <p className="text-gray-700 mb-4">{followersCount} Followers</p>
          <p className="text-gray-600 mb-4">{organizerData.bio}</p>
          <div className="flex flex-col items-start gap-2">
            {organizerData.websiteUrl && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={organizerData.websiteUrl}>{organizerData.websiteUrl}</a>
              </p>
            )}
            {organizerData.phone && <p><strong>Phone:</strong> {organizerData.phone}</p>}
            <div className="flex gap-4 mt-2">
              {organizerData.twitterUrl && (
                <a
                  href={organizerData.twitterUrl}
                  className="text-blue-400 hover:text-blue-600"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {organizerData.facebookUrl && (
                <a
                  href={organizerData.facebookUrl}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
              )}
              {organizerData.instagramUrl && (
                <a
                  href={organizerData.instagramUrl}
                  className="text-pink-400 hover:text-pink-600"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Events */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-md">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <h2 className="text-2xl font-bold text-[#6F1A07]">Events</h2>
        </div>
        <div className="">
          {/* Map through events and render cards horizontally */}
          {eventsData.map(event => (
                <Cards key={event._id} horizontal={true} events={event} />
            ))}
          {/* Handle no events scenario */}
          {eventsData.length === 0 && (
            <p className="text-gray-600 text-center mt-4">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organizer;
