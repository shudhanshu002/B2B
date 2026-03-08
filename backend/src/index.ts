import express from 'express';
import cors from 'cors';
import connectDB from './config/db'
import productRoutes from './routes/productRoutes' // Module 1
import proposalRoutes from './routes/proposalRoutes' // Module 2
import impactRoutes from './routes/impactRoutes';     // Module 3
import botRoutes from './routes/botRoutes'; // Module 4

const app = express();
connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use('/api/products', productRoutes);    // Module 1 route
app.use('/api/proposals', proposalRoutes);  // Module 2 route
app.use('/api/impact', impactRoutes);       // Module 3 route
app.use('/api/webhook', botRoutes);         // Module 4 route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));