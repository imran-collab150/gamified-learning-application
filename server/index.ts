import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { authRouter } from './routes/auth';
import { syncRouter } from './routes/sync';

const app = express();
const PORT = 3001;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sync', syncRouter);

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
