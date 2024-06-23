import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/delete-requests'); // Replace with your API endpoint
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptReport = async (id, status) => {
    try {
      const response = await axios.patch(`http://localhost:5000/delete-request/${id}`, { status: status });
      console.log(id, status);
      console.log(response.data); // Handle success, e.g., display a success message

      // Update the request status in the state
      setRequests(requests.map(request => 
        request._id === id ? { ...request, status: status } : request
      ));
    } catch (err) {
      console.error('Error:', err);
      // Handle error, e.g., display an error message
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex-1 pl-2 pt-4 lg:px-10">
    <h1 className="text-2xl font-bold text-center">User Requests</h1>
    <div className='py-8'>
        {requests.map((request) => (
            <div className='flex gap-4 items-center justify-center'>
                <div key={request._id} className="flex bg-white rounded-lg shadow-md p-8 mb-4 w-3/4">
                    <div className="flex-auto justify-between">
                        <div className="flex justify-between mb-4">
                            <div className="flex gap-4">
                                <div className="font-semibold">Request ID:</div>
                                <div>{request._id}</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-semibold">User ID:</div>
                                <div>{request.user_id}</div>
                            </div>
                      </div>
                      <div className="flex justify-between mb-4">
                          <div className="flex gap-4">
                              <div className="font-semibold">Target ID:</div>
                              <div>{request.target_id}</div>
                          </div>
                          <div className="flex gap-4">
                              <div className="font-semibold">Request Type:</div>
                              <div>{request.target_type}</div>
                          </div>
                      </div>
                      <div className="flex justify-between mb-4">
                          <div className="flex gap-4">
                              <div className="font-semibold">Reason:</div>
                              <div>{request.reason}</div>
                          </div>
                      </div>
                          <div className="flex justify-between">
                              <div className="flex gap-4">
                                  <div className="font-semibold">Created At:</div>
                                  <div>{new Date(request.createdAt).toLocaleString()}</div>
                              </div>
                              <div className="flex gap-4">
                                  <div className="font-semibold">Status:</div>
                                  <div>{request.status}</div>
                              </div>
                          </div>
                      </div>
                  </div>
                <div className="flex items-end ml-4 gap-x-4">
                  <Button label="Accept" onClick={() => handleAcceptReport(request._id, 'Approved')} customStyle={'px-8 py-4 font-bold flex justify-center'} />
                  <Button label="Reject" onClick={() => handleAcceptReport(request._id, 'Rejected')} customStyle={'px-8 py-4 font-bold flex justify-center'} />
                </div>
            </div>
        ))}
    </div>
</div>
  );
};

export default Requests;
