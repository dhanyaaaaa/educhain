/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/meetings.css";

const Meetings = ({ meetingHistory, setMeetingHistory }) => {
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedHistory = meetingHistory.filter((_, i) => i !== index);
    setMeetingHistory(updatedHistory);
  };

  const handleEdit = (index) => {
    const meetingToEdit = meetingHistory[index];
    navigate('/schedule-meeting', { state: { meetingToEdit, index } });
  };

  const navigateToSchedule = () => {
    navigate('/schedule-meeting');
  };

  return (
  
    <div className="meetings-page">
      <div className="top-section">
        <button className="schedule-button" onClick={navigateToSchedule}>
          Schedule Meeting
        </button>
      </div>
      <div className="right-section">
        <div className="meeting-history">
          <h2>Meeting History</h2>
          {meetingHistory.length === 0 ? (
            <p>No meetings scheduled yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Mode</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetingHistory.map((meeting, index) => (
                  <tr key={index}>
                    <td>{meeting.purpose}</td>
                    <td>{meeting.mode}</td>
                    <td>
                      {meeting.mode === 'online' ? (
                        <>
                          <strong>ID:</strong> {meeting.meetingId}<br />
                          <strong>Password:</strong> {meeting.password}
                        </>
                      ) : (
                        <>{meeting.venue}</>
                      )}
                    </td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
   
  );
};

export default Meetings;
