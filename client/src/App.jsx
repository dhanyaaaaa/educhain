/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Feedback from './pages/Feedback';

import './App.css';
import Meetings from './pages/Meetings';
import ScheduleMeeting from './components/ScheduleMeeting';
import Dashboard from './pages/Dashboard'; // Ensure this path is correct
import Schools from './pages/Schools'; // Ensure this path is correct
import Payment from './pages/Payment';

const App = () => {
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [schools, setSchools] = useState([]);
  const [editSchoolIndex, setEditSchoolIndex] = useState(null);

  const handleAddSchool = (school, index) => {
    if (index !== null) {
      // Edit existing school
      const updatedSchools = [...schools];
      updatedSchools[index] = school;
      setSchools(updatedSchools);
    } else {
      // Add new school
      setSchools([...schools, school]);
    }
    setEditSchoolIndex(null);
  };

  const handleEditSchool = (index) => {
    setEditSchoolIndex(index);
  };

  const handleDeleteSchool = (index) => {
    const updatedSchools = [...schools];
    updatedSchools.splice(index, 1);
    setSchools(updatedSchools);
  };

  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard--content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/dashboard" element={<Dashboard onAddSchool={handleAddSchool} />} />
            <Route path="/schools" element={
              <Schools 
                schools={schools} 
                onEditSchool={handleEditSchool} 
                onDeleteSchool={handleDeleteSchool} 
              />} 
            />
            <Route path="/meetings" element={<Meetings meetingHistory={meetingHistory} setMeetingHistory={setMeetingHistory} />} />
            <Route path="/schedule-meeting" element={<ScheduleMeeting meetingHistory={meetingHistory} setMeetingHistory={setMeetingHistory} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
