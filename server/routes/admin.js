import express from 'express';
import db from '../db.js';

const router = express.Router();

// Real-time metrics
router.get('/stats', async (req, res) => {
    try {
        const [userCount] = await db.query('SELECT COUNT(*) as count FROM users');
        const [favCount] = await db.query('SELECT COUNT(*) as count FROM favorites');

        // Mocking some analytical data for charts
        const stats = {
            totalUsers: userCount[0].count,
            totalFavorites: favCount[0].count,
            totalBusinesses: 12,
            monthlyVisits: 1250,
            engagementRate: 68,
            ficheConsultations: 450,
            // Data for Curve Chart (User registrations per month)
            registrationTrend: {
                labels: ['Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Féb'],
                data: [5, 12, 8, 15, 20, userCount[0].count + 5]
            },
            // Data for Circular Chart (Businesses by category)
            categoryDistribution: {
                labels: ['Boulangerie', 'Fleuriste', 'Librairie', 'Mode', 'Resto', 'Autre'],
                data: [3, 2, 2, 1, 2, 2]
            }
        };

        res.json(stats);
    } catch (err) {
        console.error('Admin Stats Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// User Management Routes
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, role, created_at FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const { name, email, role } = req.body;
    try {
        await db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, req.params.id]);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
