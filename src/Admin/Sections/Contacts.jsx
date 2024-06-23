import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contactUs'); // Replace with your API endpoint
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleAcceptReport = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/contact-Us/${id}`);
      console.log(response.data); // Handle success, e.g., display a success message

      // Remove the accepted report from state immediately
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
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
    <h1 className="text-2xl font-bold text-center">User Contacts</h1>
    <div className='py-8'>
        {contacts.map((contact) => (
            <div className='flex gap-4 items-center justify-center'>
                <div key={contact._id} className="flex bg-white rounded-lg shadow-md p-8 mb-4 w-3/4">
                  <div className="flex-auto justify-between">
                      <div className="flex justify-between mb-4">
                        <div className="flex gap-4">
                            <div className="font-semibold">Contact ID:</div>
                              <div>{contact._id}</div>
                            </div>
                          </div>
                          <div className="flex justify-between mb-4">
                            <div className="flex gap-4">
                              <div className="font-semibold">Name:</div>
                              <div>{contact.name}</div>
                          </div>
                      </div>
                      <div className="flex justify-between mb-4">
                          <div className="flex gap-4">
                              <div className="font-semibold">Message:</div>
                              <div>{contact.message}</div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end ml-4">
                    <Button label="Accept" onClick={() => handleAcceptReport(contact._id)} customStyle={'px-8 py-4 font-bold flex justify-center'} />
                  </div>
              </div>
        ))}
    </div>
</div>
  );
};

export default Contacts;
