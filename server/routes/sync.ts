import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticate';

const router = Router();

router.post('/sync', authenticateToken, (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Expected array of items' });
    }
    const results = items.map((item: any) => ({
      id: item.id,
      status: 'synced',
      timestamp: Date.now(),
    }));
    res.json({ synced: results.length, results });
  } catch (error) {
    res.status(500).json({ error: 'Sync failed' });
  }
});

export { router as syncRouter };
