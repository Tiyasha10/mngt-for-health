// server/bmiRecords.js
import express from 'express';
import { db } from '../src/utils/dbConfig.js';
import { pastRecords } from '../src/utils/schema.js';

const router = express.Router();

// Route to save BMI record
router.post('/save-record', async (req, res) => {
    try {
        const { height, weight, sex } = req.body;
        
        if (!height || !weight || !sex) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const bmiValue = Number((weight / (height * height)).toFixed(2));
        let category = "";
        let colorClass = "";
        
        if (bmiValue < 16) {
            category = "Severe Thinness";
            colorClass = "bg-red-900";
        } else if (bmiValue < 17) {
            category = "Moderate Thinness";
            colorClass = "bg-red-700";
        } else if (bmiValue < 18.5) {
            category = "Mild Thinness";
            colorClass = "bg-yellow-500";
        } else if (bmiValue < 25) {
            category = "Normal";
            colorClass = "bg-green-500";
        } else if (bmiValue < 30) {
            category = "Overweight";
            colorClass = "bg-yellow-400";
        } else if (bmiValue < 35) {
            category = "Obese Class I";
            colorClass = "bg-yellow-600";
        } else if (bmiValue < 40) {
            category = "Obese Class II";
            colorClass = "bg-red-600";
        } else {
            category = "Obese Class III";
            colorClass = "bg-red-900";
        }
        
        await db.insert(pastRecords).values({ height, weight, sex, bmi: bmiValue, category, createdAt: new Date() });
        res.status(201).json({ message: 'BMI record saved successfully', bmi: bmiValue, category, colorClass });
    } catch (error) {
        console.error('Error saving BMI record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch past BMI records
router.get('/past-records', async (req, res) => {
    try {
        const records = await db.select().from(pastRecords).orderBy(pastRecords.createdAt.desc());
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching BMI records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;