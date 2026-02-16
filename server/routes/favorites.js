import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get User Favorites
router.get('/', auth, async (req, res) => {
    try {
        const [favs] = await db.query('SELECT business_id FROM favorites WHERE user_id = ?', [req.user.id]);
        res.json(favs.map(f => f.business_id));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Toggle Favorite (Add/Remove)
router.post('/toggle', auth, async (req, res) => {
    const { business_id } = req.body;
    try {
        console.log(`POST /favorites/toggle - User: ${req.user.id}, Business: ${business_id}`);
        const [existing] = await db.query(
            'SELECT * FROM favorites WHERE user_id = ? AND business_id = ?',
            [req.user.id, business_id]
        );

        if (existing.length > 0) {
            await db.query('DELETE FROM favorites WHERE user_id = ? AND business_id = ?', [req.user.id, business_id]);
            console.log(`Removed favorite: User ${req.user.id}, Business ${business_id}`);
            res.json({ message: 'Removed from favorites', favorited: false });
        } else {
            await db.query('INSERT INTO favorites (user_id, business_id) VALUES (?, ?)', [req.user.id, business_id]);
            console.log(`Added favorite: User ${req.user.id}, Business ${business_id}`);
            res.json({ message: 'Added to favorites', favorited: true });
        }
    } catch (err) {
        console.error('Toggle Favorite Error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
