import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'gamified-learning-secret-key-change-in-production';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
    (req as any).userId = decoded.userId;
    (req as any).username = decoded.username;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}
