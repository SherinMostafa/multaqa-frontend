import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaint'); // Replace with your API endpoint
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleAcceptReport = async (reportId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/complaint/${reportId}`);
      console.log(response.data); // Handle success, e.g., display a success message

      // Remove the accepted report from state immediately
      setReports(reports.filter(report => report._id !== reportId));
    } catch (err) {
      console.error('Error accepting report:', err);
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
        <h1 className="text-2xl font-bold text-center">User Reports on Events</h1>
        <div className='py-8'>
            {reports.map((report) => (
                <div className='flex gap-4 items-center justify-center'>
                    <div key={report._id} className="flex bg-white rounded-lg shadow-md p-8 mb-4 w-3/4">
                        <div className="flex-auto justify-between">
                            <div className="flex justify-between mb-4">
                                <div className="flex gap-4">
                                    <div className="font-semibold">Report ID:</div>
                                    <div>{report._id}</div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="font-semibold">Event ID:</div>
                                    <div>{report.event_id}</div>
                                </div>
                          </div>
                          <div className="flex justify-between mb-4">
                              <div className="flex gap-4">
                                  <div className="font-semibold">User Email:</div>
                                  <div>{report.email}</div>
                              </div>
                          </div>
                          <div className="flex justify-between mb-4">
                              <div className="flex gap-4">
                                  <div className="font-semibold">Reason:</div>
                                  <div>{report.reason}</div>
                              </div>
                              <div className="flex gap-4">
                                  <div className="font-semibold">Details:</div>
                                  <div>{report.details}</div>
                                  </div>
                              </div>
                              <div className="flex justify-between">
                                  <div className="flex gap-4">
                                      <div className="font-semibold">Created At:</div>
                                      <div>{new Date(report.createdAt).toLocaleString()}</div>
                                  </div>
                                  <div className="flex gap-4">
                                      <div className="font-semibold">Updated At:</div>
                                      <div>{new Date(report.updatedAt).toLocaleString()}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className="flex items-end ml-4">
                        <Button label="Accept" onClick={() => handleAcceptReport(report._id)} customStyle={'px-8 py-4 font-bold flex justify-center'} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Reports;
