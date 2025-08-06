const axios = require('axios');
let roadmap = "";

const generateRoadmap = async (req, res) => {
  const { topic,deadline} = req.body;

  try {
      const  response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192', 
        messages: [
          {
            role: 'user',
            content: `Create a detailed learning roadmap for ${topic}. Include beginner, intermediate, and advanced steps.`,
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


module.exports = { generateRoadmap,roadmap };
