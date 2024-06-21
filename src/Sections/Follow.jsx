import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RiUserFollowLine, RiUserUnfollowFill } from 'react-icons/ri';

const Follow = ({ userId }) => {
  const [creatorData, setCreatorData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [userType, setUserType] = useState(null);

  const fetchCreatorDetails = useCallback(async () => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/users/id/${userId}`);
      if (userResponse.data) {
        setCreatorData(userResponse.data);
      }
      const followersResponse = await axios.get(`http://localhost:5000/followers/${userId}`);
      if (followersResponse.data) {
        setFollowersCount(followersResponse.data.followersCount);
      }
    } catch (error) {
      console.error('Error fetching creator details or followers count:', error);
    }
  }, [userId]);

  const checkFollowStatus = useCallback(() => {
    const isFollowedInStorage = localStorage.getItem(`followed_${userId}`);
    setIsFollowed(isFollowedInStorage === 'true');
  }, [userId]);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
    
    // if (!storedUserType) {
    //   alert('Please log in to your account.');
    //   return;
    // }

    if (storedUserType !== 'Organizer') {
      fetchCreatorDetails();
      checkFollowStatus();
    }
  }, [fetchCreatorDetails, checkFollowStatus]);

  const handleFollowClick = async (event) => {
    event.stopPropagation();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/follow', {
        attendee_id: user._id,
        organizer_id: userId
      });
      if (response.status === 200) {
        localStorage.setItem(`followed_${userId}`, 'true');
        setIsFollowed(true);
        setFollowersCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Error following organizer:', error);
    }
  };

  const handleUnfollowClick = async (event) => {
    event.stopPropagation();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/unfollow', {
        attendee_id: user._id,
        organizer_id: userId
      });
      if (response.status === 200) {
        localStorage.removeItem(`followed_${userId}`);
        setIsFollowed(false);
        setFollowersCount(prevCount => prevCount - 1);
      }
    } catch (error) {
      console.error('Error unfollowing organizer:', error);
    }
  };

  if (!userType || userType === 'Organizer') {
    return null; // Hide component if no userType or userType is Organizer
  }

  if (!creatorData) {
    return null; // Return null or loading indicator while fetching data
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#6F1A07]">Organized By</h2>
      <div className="flex justify-between items-center mt-8 px-8 py-3 max-w-xl rounded-full bg-gradient-to-r from-[#A8763E] to-[#a8773ec5] text-white shadow-lg">
        <Link to={`/Organizer/${userId}`} className="flex-grow no-underline">
          <div className="flex justify-between items-center w-full">
            <div className='flex flex-col'>
              <p className="font-semibold text-sm">{`${creatorData.fname} ${creatorData.lname}`}</p>
              <p className="font-semibold text-xs">{`${followersCount} followers`}</p>
            </div>
          </div>
        </Link>
        {isFollowed ? (
          <RiUserUnfollowFill onClick={handleUnfollowClick} size='16' className="ml-4 cursor-pointer" />
        ) : (
          <RiUserFollowLine onClick={handleFollowClick} size='16' className="ml-4 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Follow;
