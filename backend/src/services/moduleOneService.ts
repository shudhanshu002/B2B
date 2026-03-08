import axios from 'axios';

export const categorizeProductAI = async (name: string, description: string) => {
    const prompt = `
Analyze this product:

Name: "${name}"
Description: "${description}"

1. Assign a primary category from: [Kitchen, Lifestyle, Personal Care, Office].
2. Suggest a specific sub-category.
3. Generate 7 SEO tags.
4. List sustainability filters.

Return ONLY valid JSON:

{
  "category": "string",
  "subCategory": "string",
  "seoTags": ["string"],
  "sustainabilityFilters": ["string"]
}
`;

    const response = await axios.post(
        'https://integrate.api.nvidia.com/v1/chat/completions',
        {
            model: 'meta/llama3-70b-instruct',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 400,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
                'Content-Type': 'application/json',
            },
        },
    );

    const text = response.data.choices[0].message.content;

    const cleaned = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}') + 1;

    const jsonString = cleaned.substring(jsonStart, jsonEnd);

    const result = JSON.parse(jsonString);

    return result;
};
