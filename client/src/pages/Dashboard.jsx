/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FaSchool } from 'react-icons/fa6';
import { GiSchoolBag } from 'react-icons/gi';
import { LiaSchoolSolid } from 'react-icons/lia';
import '../styles/dashboard.css';


const modules = [
    { title: 'School1', icon: <FaSchool /> },
    { title: 'School2', icon: <GiSchoolBag /> },
    { title: 'School3', icon: <LiaSchoolSolid /> }
];

const Dashboard = ({ onAddSchool }) => {
    const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
    const [editSchoolIndex, setEditSchoolIndex] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        udise: '',
        email: '',
        year: '',
    });

    const handleAddSchool = (school) => {
        onAddSchool(school, editSchoolIndex);
        setShowAddSchoolForm(false);
        setEditSchoolIndex(null);
        setFormData({
            name: '',
            address: '',
            contact: '',
            udise: '',
            email: '',
            year: '',
        });
    };

    const toggleAddSchoolForm = () => {
        setShowAddSchoolForm(!showAddSchoolForm);
        setEditSchoolIndex(null); // Reset edit index when toggling form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddSchool(formData);
    };

    useEffect(() => {
        if (editSchoolIndex !== null) {
            setFormData(onAddSchool.schlData[editSchoolIndex]);
        }
    }, [editSchoolIndex, onAddSchool.schlData]);

    return (
        <div className="dashboard--content">
            <div className="card--container">
                {modules.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card--cover">{item.icon}</div>
                        <div className="card--title">
                            <h2>{item.title}</h2>
                            <button onClick={toggleAddSchoolForm}>Add</button>
                        </div>
                    </div>
                ))}
            </div>
            {showAddSchoolForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal--content">
                            <h2>{editSchoolIndex !== null ? 'Edit School' : 'Add School'} Details Form</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Name:
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </label>
                                <label>
                                    Address:
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                                </label>
                                <label>
                                    Contact:
                                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
                                </label>
                                <label>
                                    UDISE:
                                    <input type="text" name="udise" value={formData.udise} onChange={handleChange} required />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </label>
                                <label>
                                    Established Year:
                                    <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                                </label>
                                <div className="modal--buttons">
                                    <button type="submit">{editSchoolIndex !== null ? 'Update' : 'Submit'}</button>
                                    <button type="button" onClick={() => setShowAddSchoolForm(false)}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
