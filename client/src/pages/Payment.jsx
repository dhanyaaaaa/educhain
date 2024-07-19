/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
        const margin = 20;
        const startX = margin;
        let startY = margin + 25;
        const rowHeight = 10;
        const colWidth = 80;
        const tableWidth = colWidth * 2;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('EDUCHAIN', 105, margin, { align: 'center' });
        doc.line(margin, margin + 5, 190, margin + 5);
        doc.text('Fees Structure for All Classes', 105, margin + 15, { align: 'center' });

        data.forEach((item, index) => {
            if (startY + 70 > pageHeight) { // Check if there's enough space for the table
                doc.addPage();
                startY = margin;
            }

            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(`${item.class} Standard`, startX, startY);
            startY += rowHeight;

            // Draw table outline
            doc.rect(startX - 5, startY, tableWidth + 10, rowHeight * 6);

            // Draw table header
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Fee Type', startX, startY + rowHeight);
            doc.text('Amount', startX + colWidth, startY + rowHeight);
            doc.line(startX - 5, startY + rowHeight + 2, startX + tableWidth + 5, startY + rowHeight + 2); // Line after header

            const fees = [
                { label: 'School Fees', value: item.school_fees },
                { label: 'Exam Fees', value: item.exam_fees },
                { label: 'Uniform Fees', value: item.uniform_fees },
                { label: 'Textbook Fees', value: item.textbook_fees },
                { label: 'Extracurricular Fees', value: item.extracurricular_fees }
            ];

            doc.setFont('helvetica', 'normal');
            fees.forEach((fee, rowIndex) => {
                const y = startY + (rowIndex + 2) * rowHeight;
                doc.text(fee.label, startX, y);
                doc.text(String(fee.value), startX + colWidth, y);
                doc.line(startX - 5, y + 2, startX + tableWidth + 5, y + 2); // Line after each row
            });

            startY += rowHeight * 7; // Move startY down for the next table
        });

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="payment--content">
            <div className="payment--card">
                <h2>Enter Fees for Each Class</h2>
                <form onSubmit={handleSubmitClassSelect}>
                    <label>Class:</label>
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
        </div>
    );
};

export default Payment;
