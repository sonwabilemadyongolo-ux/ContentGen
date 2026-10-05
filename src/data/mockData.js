export const defaultPrompts = [
  {
    id: 'text-blog',
    name: 'Blog Post',
    category: 'Text',
    description: 'Draft a clear and engaging blog article.',
    prompt: 'Write a blog post about building a modern personal brand with simple steps and practical advice.',
  },
  {
    id: 'image-promo',
    name: 'Social Graphic',
    category: 'Image',
    description: 'Create a promotional graphic for a product launch.',
    prompt: 'Create a modern promotional image for a new coffee shop opening with warm lighting and bold brand colours.',
  },
  {
    id: 'code-js',
    name: 'JavaScript Snippet',
    category: 'Code',
    description: 'Generate a reusable JavaScript function with comments.',
    prompt: 'Create a JavaScript utility that validates an email address and trims whitespace.',
  },
  {
    id: 'social-facebook',
    name: 'Facebook Promotion',
    category: 'Social Media',
    description: 'Write a detailed Facebook post with CTA and hashtags.',
    prompt: 'Create a Facebook promotion for a new coffee shop launch in Cape Town with an inviting tone and strong call to action.',
  },
];

export const stats = {
  contentGenerated: 42,
  imagesCreated: 15,
  codeGenerated: 10,
  socialPosts: 17,
  published: 23,
};
