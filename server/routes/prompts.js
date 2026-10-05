import express from 'express';

const router = express.Router();

const prompts = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    category: 'Text',
    description: 'Generate a persuasive blog post draft with a clear structure and CTA.',
    prompt: 'Write a blog post about the benefits of sustainable business growth for modern brands.',
  },
  {
    id: 'email-launch',
    name: 'Email Campaign',
    category: 'Text',
    description: 'Create a warm welcome email for a product or service launch.',
    prompt: 'Write an engaging launch email for a new premium product with a straightforward call to action.',
  },
  {
    id: 'product-image',
    name: 'Product Image',
    category: 'Image',
    description: 'Generate a modern product-focused image prompt.',
    prompt: 'Create a premium product image for a sleek skincare bottle on a minimal studio background.',
  },
  {
    id: 'html-card',
    name: 'HTML Landing Card',
    category: 'Code',
    description: 'Create a simple HTML landing section with a heading and CTA.',
    prompt: 'Create a responsive HTML landing card with a headline, supporting text, and call-to-action button.',
  },
  {
    id: 'facebook-promo',
    name: 'Facebook Promotion',
    category: 'Social Media',
    description: 'Develop a detailed Facebook promotional post with clear CTA and hashtags.',
    prompt: 'Create a Facebook promotion for a new boutique coffee shop opening in Cape Town with a warm tone.',
  },
  {
    id: 'linkedin-announcement',
    name: 'LinkedIn Announcement',
    category: 'Social Media',
    description: 'Write a polished professional business post for LinkedIn.',
    prompt: 'Create a professional LinkedIn announcement for a small business launch with business context and engagement call to action.',
  },
];

router.get('/', (_req, res) => {
  res.json({ success: true, items: prompts });
});

router.post('/', (req, res) => {
  const prompt = {
    id: `custom-${Date.now()}`,
    name: req.body.name || 'Custom Prompt',
    category: req.body.category || 'Text',
    description: req.body.description || '',
    prompt: req.body.prompt || '',
  };

  prompts.push(prompt);
  res.status(201).json({ success: true, item: prompt });
});

export default router;
