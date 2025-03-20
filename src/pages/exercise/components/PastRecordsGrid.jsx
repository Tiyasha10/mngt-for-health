import React from 'react';
import { FaTrash } from 'react-icons/fa';

const PastRecordsGrid = ({ records, onDelete }) => {
    if (records.length === 0) {
        return (
            <div className="text-gray-400 text-center py-4">
                No records available. Add a new record to see it here.
            </div>
        );
    }

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-700 text-green-400">
                    <th className="p-2">Height (cm)</th>
                    <th className="p-2">Weight (kg)</th>
                    <th className="p-2">Sex</th>
                    <th className="p-2">BMI</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Actions</th> {/* New column for delete icon */}
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
                        <td className="p-2">
                            {new Date(record.createdAt).toLocaleDateString()} {/* Format the date */}
                        </td>
                        <td className="p-2">
                            <button
                                onClick={() => onDelete(index)} // Call onDelete with the record index
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash /> {/* Trash icon */}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PastRecordsGrid;