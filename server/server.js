import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import favoriteRoutes from './routes/favorites.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('LocalCommerce API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
