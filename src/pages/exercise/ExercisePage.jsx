import React, { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MedicalExercisePage = () => {
    const [userInfo, setUserInfo] = useState({
        height: "",
        weight: "",
        age: "",
        sex: "default",
    });

    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState("");
    const [bmiColor, setBmiColor] = useState("bg-gray-800");
    
    // Separate warnings for BMI & Exercise
    const [bmiWarningMessage, setBmiWarningMessage] = useState("");
    const [exerciseWarningMessage, setExerciseWarningMessage] = useState("");

    // State for exercise log
    const [exerciseLog, setExerciseLog] = useState([]);
    const [newExercise, setNewExercise] = useState({ name: "", sets: "", reps: "" });

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value);
    
        // Always update state first
        setUserInfo({ ...userInfo, [name]: value });
    
        if (name === "height" && (numValue < 46.3 || numValue > 213.36)) {
            setBmiWarningMessage("⚠️ Height must be between 46.3 cm and 213.36 cm.");
        } else if (name === "weight" && (numValue < 2.5 || numValue > 150)) {
            setBmiWarningMessage("⚠️ Weight must be between 2.5 kg and 150 kg.");
        } else {
            setBmiWarningMessage(""); // Clear warning when valid
        }
    };
    

    const calculateBMI = () => {
        const { height, weight, age, sex } = userInfo;

        if (!height || !weight || !age || sex === "default") {
            setBmiWarningMessage("⚠️ Please fill all required fields for BMI calculation!");
            return;
        }

        setBmiWarningMessage(""); // Clear warning when valid
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);

        setBmi(calculatedBMI.toFixed(2));

        if (calculatedBMI < 18.5) {
            setBmiCategory("Underweight");
            setBmiColor("bg-yellow-500");
        } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
            setBmiCategory("Normal");
            setBmiColor("bg-green-500");
        } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
            setBmiCategory("Overweight");
            setBmiColor("bg-orange-500");
        } else {
            setBmiCategory("Obese");
            setBmiColor("bg-red-500");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
            <div className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('/medical-bg.jpg')", filter: "brightness(20%)" }}>
            </div>

            <div className="relative z-10 container mx-auto p-6 rounded-lg bg-gray-800 bg-opacity-90 shadow-lg backdrop-blur-lg">
                <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
                    🏥 Medical Exercise Tracker
                </h1>

                {/* 🩺 User Info Form */}
                <div className="p-6 rounded-lg shadow-md border border-blue-500 bg-gray-900 hover:bg-gray-800 transition-all">
                    <h2 className="text-xl font-semibold text-blue-400 mb-4">🩺 Patient Information</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {["height", "weight", "age"].map((field) => (
                            <div key={field} className="relative group">
                                <input
                                    type="number"
                                    name={field}
                                    value={userInfo[field]}
                                    onChange={handleUserInfoChange}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    className="p-3 w-full border border-blue-500 rounded-md bg-gray-800 text-white text-lg pr-12 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-gray-700"
                                />
                                <span className="absolute right-3 top-3 text-gray-400 text-lg">
                                    {field === "height" ? "cm" : field === "weight" ? "kg" : "years"}
                                </span>
                            </div>
                        ))}

                        {/* Sex Dropdown */}
                        <div className="mb-4">
                            <select
                                name="sex"
                                value={userInfo.sex}
                                onChange={handleUserInfoChange}
                                className="p-3 w-full border rounded-md bg-gray-800 text-white text-lg"
                            >
                                <option value="default" disabled>Sex (♂️/♀️)</option>
                                <option value="male">♂️ Male</option>
                                <option value="female">♀️ Female</option>
                            </select>
                        </div>
                    </div>

                    {/* BMI Warning Message */}
                    {bmiWarningMessage && (
                        <div className="mt-4 p-3 text-yellow-400 bg-gray-800 border-l-4 border-yellow-500 rounded-md">
                            {bmiWarningMessage}
                        </div>
                    )}

                    <button
                        onClick={calculateBMI}
                        className="mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-md"
                    >
                        🧮 Calculate BMI
                    </button>
                </div>

                {/* BMI Analysis */}
                {bmi && (
                    <div className={`mt-6 p-4 text-center text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${bmiColor}`}>
                        BMI: {bmi} ({bmiCategory})
                    </div>
                )}

                {/* 💪 Exercise Log Input */}
                <div className="p-6 rounded-lg shadow-md border border-green-500 bg-gray-900 hover:bg-gray-800 transition-all mt-6">
                    <h2 className="text-xl font-semibold text-green-400 mb-4">💪 Add Exercise</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {["name", "sets", "reps"].map((field) => (
                            <input
                                key={field}
                                type={field === "name" ? "text" : "number"}
                                name={field}
                                value={newExercise[field]}
                                onChange={(e) => setNewExercise({ ...newExercise, [field]: e.target.value })}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                className="p-3 border border-green-500 rounded-md bg-gray-800 text-white text-lg transition-all duration-300 hover:border-green-400 hover:bg-gray-700"
                            />
                        ))}
                    </div>

                    {/* Exercise Warning Message */}
                    {exerciseWarningMessage && (
                        <div className="mt-4 p-3 text-yellow-400 bg-gray-800 border-l-4 border-yellow-500 rounded-md">
                            {exerciseWarningMessage}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            if (!newExercise.name || !newExercise.sets || !newExercise.reps) {
                                setExerciseWarningMessage("⚠️ Please fill all fields before adding an exercise.");
                                return;
                            }

                            setExerciseWarningMessage("");
                            setExerciseLog([...exerciseLog, newExercise]);
                            setNewExercise({ name: "", sets: "", reps: "" });
                        }}
                        className="mt-4 px-5 py-3 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold rounded-md"
                    >
                        ➕ Add Exercise
                    </button>
                    
                </div>
                 {/* 📌 Exercise Reminder Box */}
                 {exerciseLog.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600 mt-6">
                        <h2 className="text-xl font-semibold text-orange-400 mb-4">📌 Exercise Reminder</h2>
                        <ul className="list-disc pl-6 space-y-2 text-lg">
                            {exerciseLog.map((exercise, index) => (
                                <li key={index} className="flex justify-between items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-700">
                                    <span>
                                        <FaDumbbell className="inline-block mr-2 text-yellow-400" />
                                        {exercise.name} ({exercise.sets} sets, {exercise.reps} reps)
                                    </span>
                                    <button
                                        onClick={() => setExerciseLog(exerciseLog.filter((_, i) => i !== index))}
                                        className="text-red-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                                    >
                                        <MdDelete className="text-xl" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalExercisePage;
