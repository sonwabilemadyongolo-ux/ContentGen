import express from 'express';
import { generateTextContent, generateImageContent, generateCodeContent, generateCampaignContent } from '../services/aiService.js';

const router = express.Router();

const handleGeneration = (generator) => async (req, res) => {
  try {
    const result = await generator(req.body || {});
    res.json({ success: true, result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message || 'Generation failed.' });
  }
};

router.post('/text', handleGeneration(generateTextContent));
router.post('/image', handleGeneration(generateImageContent));
router.post('/code', handleGeneration(generateCodeContent));

router.post('/social', (req, res) => {
  const payload = req.body || {};
  const generated = generateCampaignContent(payload);
  res.json({ success: true, result: generated });
});

export default router;
