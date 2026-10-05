import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import generateRoutes from './routes/generate.js';
import socialRoutes from './routes/social.js';
import historyRoutes from './routes/history.js';
import promptsRoutes from './routes/prompts.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'AI Content Generator API is running.' });
});

app.use('/api/generate', generateRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/prompts', promptsRoutes);

app.listen(port, () => {
  console.log(`AI Content Generator API listening on http://localhost:${port}`);
});
