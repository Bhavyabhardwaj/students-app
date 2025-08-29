const { generateSuggestionForGoal } = require('../service/contentSuggestionService');
const Content=require('../schema/contentSuggestionSchema')
 const{SavingContent,
    findContentById,
    getUserContents,
    deleteContentById}=require('../service/contwntSuggService2')
    const {findRoadmapById}=require('../service/roadmap')
    const axios=require('axios')
// const getSuggestionFromGoal= async (req, res) => {
//     try {
//         const goal=req.body.goal
//         const suggestion = await generateSuggestionForGoal(goal);

//         return res.status(201).json({
//             success: true,
//             message: 'Suggestion generated for goal',
//             data: suggestion,
//             error: {}
//         });

//     } catch (error) {
//         return res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.reason || "Something went wrong",
//             data: {},
//             error
//         });
//     }
// };
let suggestionText=''

const generateContent = async (req, res) => {
    const { goal,contentName} = req.body;
  

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: `For the goal: "${goal}", provide a list of YouTube video links and website links that will help in learning this topic. 
Ensure that every video entry includes:
1. The video title
2. The channel/author name
3. The duration (if available)
4. The direct clickable YouTube link

Also, provide at least 2 website links (blogs, documentation, tutorials) with proper titles and clickable links.
Format the response in a clean and readable way using markdown (with bullet points or numbered lists).
`,
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

          suggestionText = response.data.choices[0].message.content; 
        res.status(200).json({suggestionText });

    } catch (error) {
        console.error('GROQ Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'GROQ API error occurred' });
    }
};

const savecontent = async (req, res) => {
    try {
        const userId = req.user._id; 

        if (!suggestionText) {
            return res.status(400).json({ message: 'No content to save. Please generate first.' });
        }

        const newContent = new Content({
            user: req.user.id,
            suggestionText: suggestionText,
            goal: req.body.goal,
            contentName: req.body.contentName,
            
        });

        await newContent.save();

        res.status(201).json({
            message: 'Content saved successfully',
            content: newContent
        });

    } catch (error) {
        res.status(500).json({ message: 'Error saving content', error: error.message });
    }
};

async function getUserContentsController(req, res) {
    try {
        const userId = req.user.id; 
        const contents = await getUserContents(userId);
        return res.status(200).json({
            success: true,
            data: contents,
            contentName: contents.contentName
        });
    } catch (error) {
        console.log("Error in contentController -> getUserContentsController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

async function findContent(req, res) {
    try {
        const response = await findContentById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the content',
            error: {},
            data: response
        });
    } catch (error) {
        console.log(error);
    }
}

// Delete Roadmap
async function deleteContent(req, res) {
    try {
        const deleted = await deleteContentById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Content deleted successfully',
            data: deleted
        });
    } catch (error) {
        console.log("Error in contentController -> deleteContent:", error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || 'Server error'
        });
    }
}


//content according to roadmap
const generateRoadmapContent = async (req, res) => {

   
     const response = await findRoadmapById(req.params.id);
     const content=response.content
    
    const { moduleNo,day} = req.body;
    
  

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: `For the topic in day ${day} in module number"${moduleNo}" in ${content}, provide a list of YouTube video links and website links that will help in learning this topic. 
Ensure that every video entry includes:
1. The video title
2. The channel/author name
3. The duration (if available)
4. The direct clickable YouTube link

Also, provide at least 2 website links (blogs, documentation, tutorials) with proper titles and clickable links.
Format the response in a clean and readable way using markdown (with bullet points or numbered lists).
`,
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

          suggestionText = response.data.choices[0].message.content; 
        res.status(200).json({suggestionText });

    } catch (error) {
        console.error('GROQ Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'GROQ API error occurred' });
    }
};
        






module.exports = {
   generateContent, deleteContent,findContent,getUserContentsController,savecontent,generateRoadmapContent
};
