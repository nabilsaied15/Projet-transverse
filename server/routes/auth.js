import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Signup
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        console.log(`POST /auth/signup - Email: ${email}, Name: ${name}`);
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            console.log(`Signup failed: User ${email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, 'user']
        );

        console.log(`User created with ID: ${result.insertId}`);
        const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: result.insertId, email, name, role: 'user' } });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`POST /auth/login - Email: ${email}`);
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            console.log(`Login failed: User ${email} not found`);
            return res.status(400).json({ message: 'User not found' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Login failed: Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`User logged in: ${user.name}`);
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
