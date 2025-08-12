const axios = require('axios');
const Roadmap = require('../schema/roadmapSchema'); 
const { getUserRoadmaps, findRoadmapById, deleteRoadmapById } = require('../service/roadmap');

// last generated roadmap ko memory me store karne ke liye
let roadmap = "";

// Generate Roadmap
const generateRoadmap = async (req, res) => {
    const { topic, deadline, roadmapName, goalName } = req.body;
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: `Create a detailed learning roadmap for ${topic}. from ${formattedToday} to ${deadline} in modules and in the last give a list of module names`,
                    },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        roadmap = response.data.choices[0].message.content; 
        res.status(200).json({ roadmap });

    } catch (error) {
        console.error('GROQ Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'GROQ API error occurred' });
    }
};

// Save Roadmap (from last generated)
const saveroadmap = async (req, res) => {
    try {
        const userId = req.user._id; // Auth middleware se aayega

        if (!roadmap) {
            return res.status(400).json({ message: 'No roadmap to save. Please generate first.' });
        }

        const newRoadmap = new Roadmap({
            user: req.user.id,
            content: roadmap,
            goalName: req.body.goalName,
            roadmapName: req.body.roadmapName,
            deadline: req.body.deadline
        });

        await newRoadmap.save();

        
        roadmap = "";

        res.status(201).json({
            message: 'Roadmap saved successfully',
            roadmap: newRoadmap
        });

    } catch (error) {
        res.status(500).json({ message: 'Error saving roadmap', error: error.message });
    }
};

async function getUserRoadmapsController(req, res) {
    try {
        const userId = req.user.id; 
        const roadmaps = await getUserRoadmaps(userId);
        return res.status(200).json({
            success: true,
            data: roadmaps,
            roadmapName: roadmaps.roadmapName
        });
    } catch (error) {
        console.log("Error in roadmapController -> getUserRoadmapsController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

async function findRoadmap(req, res) {
    try {
        const response = await findRoadmapById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the roadmap',
            error: {},
            data: response
        });
    } catch (error) {
        console.log(error);
    }
}

// Delete Roadmap
async function deleteRoadmap(req, res) {
    try {
        const deleted = await deleteRoadmapById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Roadmap deleted successfully',
            data: deleted
        });
    } catch (error) {
        console.log("Error in roadmapController -> deleteRoadmap:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Server error'
        });
    }
}

module.exports = { 
    generateRoadmap, 
    saveroadmap,  
    getUserRoadmapsController,
    findRoadmap,
    deleteRoadmap
};
