/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaSchool } from 'react-icons/fa';
import axios from 'axios';
import '../styles/schools.css';

const Schools = () => {
    const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
    const [showSchoolsTable, setShowSchoolsTable] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        udise: '',
        email: '',
        year: '',
        type: '',
        category: '',
        educationalBoard: '',
        fromGrade: '',
        toGrade: '',
        district: '',
        studentCount: '',
        teacherCount: '',
        principalName: '',
    });
    const [schools, setSchools] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/schools');
            setSchools(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    const toggleAddSchoolForm = () => {
        setShowAddSchoolForm(!showAddSchoolForm);
        setFormData({
            name: '',
            address: '',
            contact: '',
            udise: '',
            email: '',
            year: '',
            type: '',
            category: '',
            educationalBoard: '',
            fromGrade: '',
            toGrade: '',
            district: '',
            studentCount: '',
            teacherCount: '',
            principalName: '',
        });
        setSuccessMessage('');
        setIsEditing(false);
        setSelectedSchoolId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/schools/${selectedSchoolId}`, formData);
                setSuccessMessage('School updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/schools', formData);
                setSuccessMessage('School added successfully.');
            }
            fetchSchools();
            toggleAddSchoolForm(); // Close the form
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (schoolId) => {
        const school = schools.find(s => s.id === schoolId);
        if (school) {
            setFormData({ ...school });
            setIsEditing(true);
            setSelectedSchoolId(schoolId);
            setShowAddSchoolForm(true);
        }
    };

    const handleDelete = async (schoolId) => {
        try {
            await axios.delete(`http://localhost:5000/api/schools/${schoolId}`);
            setSuccessMessage('School deleted successfully.');
            fetchSchools();
        } catch (error) {
            console.error('Error deleting school:', error);
        }
    };

    const handleViewSchools = () => {
        setShowSchoolsTable(true);
        setShowAddSchoolForm(false);
    };

    const handleGoBack = () => {
        setShowAddSchoolForm(false);
        setShowSchoolsTable(false);
    };

    return (
        <div className="schools--content">
            {!showAddSchoolForm && !showSchoolsTable && (
                <div className="card--container">
                    <div className="card">
                        <div className="card--cover"><FaSchool /></div>
                        <div className="card--title">
                            <h2>Add School</h2>
                        </div>
                        <button onClick={toggleAddSchoolForm}>Add</button>
                    </div>
                    <button className="view-schools-btn" onClick={handleViewSchools}>
                        View Schools
                    </button>
                </div>
            )}
            {showAddSchoolForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal--content">
                            <h2>{isEditing ? 'Edit School Details Form' : 'Add School Details Form'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
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
                                    <label>
                                        Type:
                                        <select name="type" value={formData.type} onChange={handleChange} required>
                                            <option value="">Select Type</option>
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </label>
                                    <label>
                                        Category:
                                        <select name="category" value={formData.category} onChange={handleChange} required>
                                            <option value="">Select Category</option>
                                            <option value="co-ed">Co-ed</option>
                                            <option value="boys">Boys</option>
                                            <option value="girls">Girls</option>
                                        </select>
                                    </label>
                                    <label>
                                        Educational Board:
                                        <select name="educationalBoard" value={formData.educationalBoard} onChange={handleChange} required>
                                            <option value="">Select Board</option>
                                            <option value="CBSE">CBSE</option>
                                            <option value="ICSE">ICSE</option>
                                            <option value="State">State</option>
                                        </select>
                                    </label>
                                    <label>
                                        Grades Offered:
                                        <input type="text" name="fromGrade" placeholder="From" value={formData.fromGrade} onChange={handleChange} required />
                                        <input type="text" name="toGrade" placeholder="To" value={formData.toGrade} onChange={handleChange} required />
                                    </label>
                                    <label>
                                        District:
                                        <input type="text" name="district" value={formData.district} onChange={handleChange} required />
                                    </label>
                                    <label>
                                        Students Count:
                                        <input type="number" name="studentCount" value={formData.studentCount} onChange={handleChange} required />
                                    </label>
                                    <label>
                                        Teachers Count:
                                        <input type="number" name="teacherCount" value={formData.teacherCount} onChange={handleChange} required />
                                    </label>
                                    <label>
                                        Principal Name:
                                        <input type="text" name="principalName" value={formData.principalName} onChange={handleChange} required />
                                    </label>
                                </div>
                                <div className="modal--buttons">
                                    <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
                                    <button type="button" onClick={toggleAddSchoolForm}>Close</button>
                                </div>
                                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showSchoolsTable && (
                <div className="view-schools">
                    <h2>Schools List</h2>
                    <button onClick={handleGoBack}>Back</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>UDISE</th>
                                <th>Email</th>
                                <th>Year</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Board</th>
                                <th>Grades</th>
                                <th>District</th>
                                <th>Students</th>
                                <th>Teachers</th>
                                <th>Principal</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school) => (
                                <tr key={school.id}>
                                    <td>{school.name}</td>
                                    <td>{school.address}</td>
                                    <td>{school.contact}</td>
                                    <td>{school.udise}</td>
                                    <td>{school.email}</td>
                                    <td>{school.year}</td>
                                    <td>{school.type}</td>
                                    <td>{school.category}</td>
                                    <td>{school.educationalBoard}</td>
                                    <td>{school.fromGrade} - {school.toGrade}</td>
                                    <td>{school.district}</td>
                                    <td>{school.studentCount}</td>
                                    <td>{school.teacherCount}</td>
                                    <td>{school.principalName}</td>
                                    <td>
                                        <button onClick={() => handleEdit(school.id)}>Edit</button>
                                        <button onClick={() => handleDelete(school.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Schools;
