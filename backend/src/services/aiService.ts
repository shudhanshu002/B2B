import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const callNvidiaJSON = async (prompt: string) => {
    try {
        const response = await axios.post(
            'https://integrate.api.nvidia.com/v1/chat/completions',
            {
                model: 'meta/llama3-70b-instruct',
                messages: [
                    {
                        role: 'user',
                        content: `${prompt}

Return ONLY valid JSON.
Do not include explanations or markdown.`,
                    },
                ],
                temperature: 0.2,
                max_tokens: 600,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        const text = response.data.choices[0].message.content;

        // Remove markdown formatting if present
        const cleaned = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Extract JSON 
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}') + 1;

        const jsonString = cleaned.substring(start, end);

        return JSON.parse(jsonString);
    } catch (error) {
        console.error('NVIDIA AI Error:', error);

        throw new Error('AI Service was unable to generate a structured response.');
    }
};

export const logAIInteraction = (moduleName: string, prompt: string, response: any) => {
    console.log(`--- [AI LOG: ${moduleName}] ---`);
    console.log(`Prompt: ${prompt.substring(0, 100)}...`);
    console.log(`Status: Success`);
};
