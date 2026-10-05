import express from 'express';
import { getOAuthLink, publishToPlatform } from '../services/socialService.js';

const router = express.Router();

router.get('/:platform/connect', (req, res) => {
  const { platform } = req.params;
  const oAuth = getOAuthLink(platform);
  res.json({
    success: true,
    platform,
    configured: oAuth.configured,
    connectUrl: oAuth.url,
    message: oAuth.configured ? 'OAuth is ready to be configured.' : 'Demo mode: social API credentials are not configured yet.',
  });
});

router.get('/:platform/callback', (req, res) => {
  const { platform } = req.params;
  res.json({
    success: true,
    platform,
    connected: true,
    message: `${platform} account connection callback received.`,
  });
});

router.post('/:platform/publish', (req, res) => {
  const { platform } = req.params;
  const payload = req.body || {};
  const result = publishToPlatform(platform, payload.content || payload.caption || 'Generated social content');

  if (result.status === 'error') {
    return res.status(400).json({ success: false, error: result.message, platform });
  }

  res.json({ success: true, result });
});

router.post('/publish/all', (req, res) => {
  const payload = req.body || {};
  const platforms = Array.isArray(payload.platforms) ? payload.platforms : ['Facebook'];
  const results = platforms.map((platform) => ({
    platform,
    ...publishToPlatform(platform, payload.content || 'Campaign content'),
  }));

  res.json({ success: true, results });
});

export default router;
