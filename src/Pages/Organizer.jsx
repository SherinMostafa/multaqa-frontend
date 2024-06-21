import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaFacebook, FaInstagram, FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Cards from '../Sections/Cards';
import { RiUserFollowLine, RiUserUnfollowFill } from 'react-icons/ri';

const Organizer = () => {
  const { userId } = useParams();
  const [organizerData, setOrganizerData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  // Function to check follow status
  const checkFollowStatus = (userId) => {
    const isFollowedInStorage = localStorage.getItem(`followed_${userId}`);
    return isFollowedInStorage === 'true';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organizer data
        const organizerResponse = await axios.get(`http://localhost:5000/organizer/${userId}`);
        if (organizerResponse.data) {
          setOrganizerData(organizerResponse.data);
        }

        // Fetch initial followers count
        const followersResponse = await axios.get(`http://localhost:5000/followers/${userId}`);
        if (followersResponse.data) {
          setFollowersCount(followersResponse.data.followersCount);
        }

        // Fetch events data
        const eventsResponse = await axios.get(`http://localhost:5000/events/creator/${userId}`);
        if (eventsResponse.data) {
          setEventsData(eventsResponse.data);
        }

        // Set initial follow status
        setIsFollowed(checkFollowStatus(userId));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/follow', {
        attendee_id: user._id,
        organizer_id: userId,
      });
      if (response.status === 200) {
        setIsFollowed(true);
        setFollowersCount(prevCount => prevCount + 1);
        localStorage.setItem(`followed_${userId}`, 'true');
      }
    } catch (error) {
      console.error('Error following organizer:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/unfollow', {
        attendee_id: user._id,
        organizer_id: userId,
      });
      if (response.status === 200) {
        setIsFollowed(false);
        setFollowersCount(prevCount => prevCount - 1);
        localStorage.removeItem(`followed_${userId}`);
      }
    } catch (error) {
      console.error('Error unfollowing organizer:', error);
    }
  };

  if (!organizerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start gap-8 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 max-w-md">
        <div className="min-h-screen bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-fit">
              {organizerData.profileImage ? (
                <img
                  src={organizerData.profileImage}
                  alt="Profile"
                  className="mx-auto rounded-full w-10 h-10 object-cover"
                />
              ) : (
                <FaUser className="p-2 w-10 h-10 mx-auto text-gray-400 border rounded-full" />
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#6F1A07]">
              {organizerData.fname} {organizerData.lname}
            </h1>
            <div>
              {isFollowed ? (
                <RiUserUnfollowFill onClick={handleUnfollow} size='16' className="ml-4 cursor-pointer" />
              ) : (
                <RiUserFollowLine onClick={handleFollow} size='16' className="ml-4 cursor-pointer" />
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{followersCount} Followers</p>
          <p className="text-gray-600 mb-20">{organizerData.bio}</p>
          <div className="flex flex-col gap-2">
            {organizerData.website_url && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={organizerData.website_url}>{organizerData.website_url}</a>
              </p>
            )}
            {organizerData.phone && <p><strong>Phone:</strong> {organizerData.phone}</p>}
            <div className="flex justify-center gap-x-4 mt-8">
              <a
                href="https://twitter.com/organizerTwitter"
                className="text-blue-400 hover:text-blue-600"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://facebook.com/organizerFacebook"
                className="text-blue-600 hover:text-blue-800"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com/organizerInstagram"
                className="text-pink-400 hover:text-pink-600"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-md">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <h2 className="text-2xl font-bold text-[#6F1A07]">Events</h2>
        </div>
        <div className="">
          {eventsData && eventsData.map(eventData => (
            <Cards key={eventData._id} horizontal={true} events={eventData} />
          ))}
          {eventsData && eventsData.length === 0 && (
            <p className="text-gray-600 text-center mt-4">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organizer;
