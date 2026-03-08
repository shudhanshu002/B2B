🌿 ECO-AI: The Intelligent Sustainability Suite
Running a sustainable brand is hard. Managing inventory, pitching to big clients, and calculating environmental impact shouldn't be.

ECO-AI is a smart operations hub I built to help eco-friendly businesses scale without the "manual labor" headache. Using the Google Gemini AI "brain," this suite handles everything from cataloging products to talking to customers, allowing brand owners to focus on what matters: the planet.

✨ What this project actually does
Brainy Cataloging: Stop wasting hours on SEO. Drop a product name and a messy description; the AI categorizes it, writes your SEO tags, and identifies its eco-credentials instantly.

The "Perfect Mix" Salesman: Need to pitch to a hotel with a $5,000 budget? The AI builds a custom product bundle that fits their industry and respects their wallet.

Environmental Storytelling: We turn raw order data into heart-warming stats. It tells your customers exactly how much plastic they saved and how many "trees" their purchase represents.

Support that Scales: A 24/7 chat assistant that knows your return policy by heart and flags high-priority complaints (like broken items or refunds) so you never miss a critical customer issue.

🏗️ The Tech Behind the Magic
I built this using a modern "Modular" approach to keep the code clean and scalable.

Frontend: A sleek, responsive dashboard built with React, Vite, and Tailwind CSS. It feels like a professional SaaS tool.

Backend: A robust Node.js & Express server written in TypeScript for rock-solid reliability.

Intelligence: Deeply integrated with Gemini 1.5 Flash using custom-engineered prompts to ensure the AI always speaks in "Clean JSON."

Database: MongoDB acts as the permanent memory for every product, proposal, and support log.

📁 How I Organized the Code
The Backend (/backend)
I separated the "Brain" from the "Body."

Services: This is where the AI logic lives. Each module has its own service to keep the prompts clean.

Controllers: These handle the "Traffic"—taking requests from the frontend and sending back data.

Models: The blueprints for how our data is stored in the database.

The Frontend (/frontend)
I prioritized a fast, "app-like" experience.

Modules: Each feature (like the Chatbot or the Proposal Gen) lives in its own folder with its own logic and styling. No "spaghetti code."

API: A centralized Axios setup that connects everything to the backend with a single config change.

🛠️ Want to run it locally?
1. Fire up the Backend
cd backend

npm install

Create a .env file and drop in your Mongo URL and Gemini API Key.

npm run dev — Your server is now alive on Port 5000!

2. Launch the Frontend
cd frontend

npm install

npm run dev — Open the link in your browser and start exploring.

🌐 Deploying to the Real World
This project is optimized for the Vercel (Frontend) + Render (Backend) combo.

The Golden Rule for Deployment:
Always make sure your CORS settings in the backend include your Vercel URL, and your VITE_API_URL in Vercel points to your Render backend (don't forget the /api at the end!).

Built with 💚 by Shudhanshu Singh I'm always looking for ways to make e-commerce more sustainable through tech. If you have ideas or feedback, let’s connect!