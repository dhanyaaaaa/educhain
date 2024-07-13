/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import '../styles/payment.css';

const Payment = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [feesData, setFeesData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [allFeesData, setAllFeesData] = useState([]);

    const handleClassSelect = (e) => {
        setSelectedClass(e.target.value);
        setShowForm(false);
    };

    const handleSubmitClassSelect = (e) => {
        e.preventDefault();
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeesData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveFees = async (e) => {
        e.preventDefault();
        const fees = {
            school_fees: feesData[`${selectedClass}_school_fees`] || '',
            exam_fees: feesData[`${selectedClass}_exam_fees`] || '',
            uniform_fees: feesData[`${selectedClass}_uniform_fees`] || '',
            textbook_fees: feesData[`${selectedClass}_textbook_fees`] || '',
            extracurricular_fees: feesData[`${selectedClass}_extracurricular_fees`] || ''
        };

        try {
            await axios.post('http://localhost:5000/save-fees', { className: selectedClass, fees });
            alert('Fees data saved successfully.');
            setShowForm(false);
        } catch (error) {
            console.error("Error saving fees data:", error);
        }
    };

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-all-fees');
            setAllFeesData(response.data);
            generatePDF(response.data);
        } catch (error) {
            console.error("Error fetching fee structures:", error);
        }
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Fees Structure for All Classes', 10, 10);

        data.forEach((item, index) => {
            const position = 20 + (index * 50);  // Reducing the space between sections

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`${item.class} Standard`, 10, position);

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`School Fees: ${item.school_fees}`, 10, position + 10);
            doc.text(`Exam Fees: ${item.exam_fees}`, 10, position + 15);
            doc.text(`Uniform Fees: ${item.uniform_fees}`, 10, position + 20);
            doc.text(`Textbook Fees: ${item.textbook_fees}`, 10, position + 25);
            doc.text(`Extracurricular Fees: ${item.extracurricular_fees}`, 10, position + 30);
            
            if (index !== data.length - 1 && position + 40 > 270) {
                doc.addPage();
            }
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="payment--content">
            <h2>Enter Fees for Each Class</h2>
            <form onSubmit={handleSubmitClassSelect}>
                <label>Select Class:</label>
                <select value={selectedClass} onChange={handleClassSelect} required>
                    <option value="">Select Class</option>
                    <option value="1st">1st Standard</option>
                    <option value="2nd">2nd Standard</option>
                    <option value="3rd">3rd Standard</option>
                    <option value="4th">4th Standard</option>
                    <option value="5th">5th Standard</option>
                </select>
                <button type="submit">Enter</button>
            </form>

            {showForm && (
                <div>
                    <h3>Enter Fees for {selectedClass} Standard</h3>
                    <form onSubmit={handleSaveFees}>
                        <div className="class-fees">
                            <div className="class-fees--item">
                                <h4>School Fees</h4>
                                <input
                                    type="number"
                                    name={`${selectedClass}_school_fees`}
                                    value={feesData[`${selectedClass}_school_fees`] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="class-fees--item">
                                <h4>Exam Fees</h4>
                                <input
                                    type="number"
                                    name={`${selectedClass}_exam_fees`}
                                    value={feesData[`${selectedClass}_exam_fees`] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="class-fees--item">
                                <h4>Uniform Fees</h4>
                                <input
                                    type="number"
                                    name={`${selectedClass}_uniform_fees`}
                                    value={feesData[`${selectedClass}_uniform_fees`] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="class-fees--item">
                                <h4>Textbook Fees</h4>
                                <input
                                    type="number"
                                    name={`${selectedClass}_textbook_fees`}
                                    value={feesData[`${selectedClass}_textbook_fees`] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="class-fees--item">
                                <h4>Extracurricular Fees</h4>
                                <input
                                    type="number"
                                    name={`${selectedClass}_extracurricular_fees`}
                                    value={feesData[`${selectedClass}_extracurricular_fees`] || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="generate-structure">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )}
            

            <hr />

            <h2>Generate Fee Structure Report</h2>
            <button onClick={handleGenerateReport}>Generate Report</button>
        </div>
    );
};

export default Payment;
