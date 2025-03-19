import React from 'react';

const PastRecordsGrid = ({ records }) => {
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-700 text-green-400">
                    <th className="p-2">Height (cm)</th>
                    <th className="p-2">Weight (kg)</th>
                    <th className="p-2">Sex</th>
                    <th className="p-2">BMI</th>
                    <th className="p-2">Category</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    <tr key={index} className="border-t border-gray-600">
                        <td className="p-2">{record.height}</td>
                        <td className="p-2">{record.weight}</td>
                        <td className="p-2">{record.sex}</td>
                        <td className="p-2">{record.bmi}</td>
                        <td className="p-2">{record.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default PastRecordsGrid;