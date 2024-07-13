/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../styles/schools.css';

const Schools = ({ schools, onEditSchool, onDeleteSchool, onAddSchool }) => {
    const [viewSchoolList, setViewSchoolList] = useState(false);
    const [schoolName, setSchoolName] = useState('');
    const [schoolDetails, setSchoolDetails] = useState({ address: '', contact: '', udise: '', email: '', year: '' });
    const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
    const [editSchoolIndex, setEditSchoolIndex] = useState(null);

    const handleEditSchool = (index) => {
        setEditSchoolIndex(index);
        setSchoolName(schools[index].name);
        setSchoolDetails(schools[index]);
        setShowAddSchoolForm(true);
        setViewSchoolList(false); // Hide school list when editing
    };

    const handleCloseView = () => {
        setViewSchoolList(false);
    };

    const handleAddSchoolSubmit = (e) => {
        e.preventDefault();
        setShowAddSchoolForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editSchoolIndex !== null) {
            onEditSchool(editSchoolIndex, { ...schoolDetails, name: schoolName });
        } else {
            onAddSchool({ ...schoolDetails, name: schoolName });
        }
        setShowAddSchoolForm(false);
        setSchoolName('');
        setSchoolDetails({ address: '', contact: '', udise: '', email: '', year: '' });
        setEditSchoolIndex(null);
    };

    return (
        <div>
            <button className="view-schools-button" onClick={() => setViewSchoolList(true)}>View Schools</button>
            {viewSchoolList && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal--content">
                            <h2>Schools List</h2>
                            <ul>
                                {schools.map((school, index) => (
                                    <li key={index}>{school.name}</li>
                                ))}
                            </ul>
                            <div className="modal--buttons">
                                <button onClick={handleCloseView}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleAddSchoolSubmit} className="add-school-form">
                <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Enter school name"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {showAddSchoolForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal--content">
                            <h2>School Details</h2>
                            <form onSubmit={handleFormSubmit}>
                                <label>
                                    Name:
                                    <input type="text" name="name" value={schoolName} readOnly />
                                </label>
                                <label>
                                    Address:
                                    <input type="text" name="address" value={schoolDetails.address} onChange={handleChange} required />
                                </label>
                                <label>
                                    Contact:
                                    <input type="tel" name="contact" value={schoolDetails.contact} onChange={handleChange} required />
                                </label>
                                <label>
                                    UDISE:
                                    <input type="text" name="udise" value={schoolDetails.udise} onChange={handleChange} required />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" value={schoolDetails.email} onChange={handleChange} required />
                                </label>
                                <label>
                                    Established Year:
                                    <input type="number" name="year" value={schoolDetails.year} onChange={handleChange} required />
                                </label>
                                <div className="modal--buttons">
                                    <button type="submit">{editSchoolIndex !== null ? 'Update' : 'Submit'}</button>
                                    {editSchoolIndex !== null && (
                                        <>
                                            <button className="edit-button" type="button" onClick={() => onEditSchool(editSchoolIndex)}>Edit</button>
                                            <button className="delete-button" type="button" onClick={() => onDeleteSchool(editSchoolIndex)}>Delete</button>
                                        </>
                                    )}
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

export default Schools;
