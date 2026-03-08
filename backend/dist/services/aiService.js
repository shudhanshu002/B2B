"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAIInteraction = exports.callNvidiaJSON = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const callNvidiaJSON = async (prompt) => {
    try {
        const response = await axios_1.default.post('https://integrate.api.nvidia.com/v1/chat/completions', {
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
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
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
    }
    catch (error) {
        console.error('NVIDIA AI Error:', error);
        throw new Error('AI Service was unable to generate a structured response.');
    }
};
exports.callNvidiaJSON = callNvidiaJSON;
const logAIInteraction = (moduleName, prompt, response) => {
    console.log(`--- [AI LOG: ${moduleName}] ---`);
    console.log(`Prompt: ${prompt.substring(0, 100)}...`);
    console.log(`Status: Success`);
};
exports.logAIInteraction = logAIInteraction;
//# sourceMappingURL=aiService.js.map