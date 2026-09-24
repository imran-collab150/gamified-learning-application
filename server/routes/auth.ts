import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authenticateToken } from '../middleware/authenticate';

const router = Router();
const JWT_SECRET = 'gamified-learning-secret-key-change-in-production';
const users: Record<string, { passwordHash: string; userId: string }> = {};

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (users[username]) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `user-${Date.now()}`;
    users[username] = { passwordHash, userId };
    res.status(201).json({ userId, message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.userId, username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', authenticateToken, (req, res) => {
  res.json({ userId: (req as any).userId, username: (req as any).username });
});

export { router as authRouter };
