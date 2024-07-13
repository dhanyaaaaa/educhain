import React, { useState } from 'react';
import { BiHome, } from 'react-icons/bi';
import { GiSchoolBag } from 'react-icons/gi';
import { IoDocuments } from 'react-icons/io5';
import { MdCastForEducation } from 'react-icons/md';
import { MdFeedback } from "react-icons/md";
import { GiDiscussion } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import '../styles/sidebar.css';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="logo" onClick={toggleSidebar}>
                <MdCastForEducation className="logo-icon" />
                {isExpanded && <h2>EduChain</h2>}
            </div>
            <div className="menu--list">
                <a href="/Dashboard" className="item">
                    <BiHome className="icon" />
                    {isExpanded && <span>Dashboard</span>}
                </a>
                <a href="/Schools" className="item">
                    <GiSchoolBag className="icon" />
                    {isExpanded && <span>Schools</span>}
                </a>
                <a href="/Report" className="item">
                    <IoDocuments className="icon" />
                    {isExpanded && <span>Report</span>}
                </a>
                <a href="Meetings" className="item">
                    <GiDiscussion  className="icon" />
                    {isExpanded && <span>Meetings</span>}
                </a>
                <a href="Payment" className="item">
                    <MdPayments className="icon" />
                    {isExpanded && <span>Payment</span>}
                </a>
                
                <a href="Feedback" className="item">
                    <MdFeedback className="icon" />
                    {isExpanded && <span>Feedback</span>}
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
