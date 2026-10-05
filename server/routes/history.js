import express from 'express';

const router = express.Router();
const historyStore = [];

router.get('/', (_req, res) => {
  res.json({ success: true, items: historyStore });
});

router.post('/', (req, res) => {
  const item = {
    id: Date.now(),
    title: req.body.title || 'Untitled content',
    type: req.body.type || 'Text',
    contentType: req.body.contentType || 'Text',
    platform: req.body.platform || 'General',
    status: req.body.status || 'Draft',
    content: req.body.content || '',
    createdAt: new Date().toISOString(),
  };

  historyStore.unshift(item);
  res.status(201).json({ success: true, item });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = historyStore.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'History item not found.' });
  }

  historyStore.splice(index, 1);
  res.json({ success: true, removed: true });
});

export default router;
