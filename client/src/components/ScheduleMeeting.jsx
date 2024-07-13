import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/schedulemeeting.css";

const ScheduleMeeting = ({ meetingHistory, setMeetingHistory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meetingToEdit, index } = location.state || {};

  const [formData, setFormData] = useState({
    purpose: '',
    mode: 'online',
    meetingId: '',
    password: '',
    date: '',
    time: '',
    venue: ''
  });

  useEffect(() => {
    if (meetingToEdit) {
      setFormData(meetingToEdit);
    }
  }, [meetingToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHistory = meetingToEdit
      ? meetingHistory.map((meeting, i) => (i === index ? formData : meeting))
      : [...meetingHistory, formData];
    setMeetingHistory(updatedHistory);
    navigate('/meetings');
  };

  return (
   
    <div className="schedule-meeting-page">
      <h1>Schedule Meeting</h1>
      <form className="meeting-form" onSubmit={handleSubmit}>
        <div>
          <label>Purpose of the Meeting:</label>
          <input type="text" name="purpose" value={formData.purpose} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Mode:</label>
          <select name="mode" value={formData.mode} onChange={handleInputChange} required>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        {formData.mode === 'online' && (
          <>
            <div>
              <label>Meeting ID:</label>
              <input type="text" name="meetingId" value={formData.meetingId} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
          </>
        )}
        {formData.mode === 'offline' && (
          <div>
            <label>Venue:</label>
            <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} required />
          </div>
        )}
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
   
  );
};

export default ScheduleMeeting;
