async function requestOpenAI(endpoint, payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-openai-key') {
    const error = new Error('AI generation is not configured. Add your OPENAI_API_KEY to the server .env file and restart the server.');
    error.statusCode = 503;
    throw error;
  }

  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error?.message || `AI provider request failed (${response.status}).`);
    error.statusCode = response.status === 429 ? 429 : 502;
    throw error;
  }

  return data;
}

async function generatePromptText(prompt, instruction) {
  if (!prompt?.trim()) {
    const error = new Error('A prompt is required.');
    error.statusCode = 400;
    throw error;
  }

  const data = await requestOpenAI('chat/completions', {
    model: process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: instruction },
      { role: 'user', content: prompt.trim() },
    ],
  });
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('The AI provider returned an empty response. Please try again.');
  }

  return content;
}

export async function generateTextContent({ prompt = '' }) {
  const content = await generatePromptText(
    prompt,
    'Follow the user prompt closely and create the requested text itself. Do not merely describe what should be written. Make reasonable assumptions if needed and do not invent factual claims.'
  );

  return { title: 'Generated text', content, status: 'Ready' };
}

export async function generateCodeContent({ prompt = '' }) {
  const code = await generatePromptText(
    prompt,
    'Implement the user request as working code. Follow the requested language and requirements. Return the code directly without markdown fences or unrelated commentary. If details are missing, choose sensible defaults.'
  );

  return { title: 'Generated code', language: 'Code', code, status: 'Ready' };
}

export async function generateImageContent({ prompt = '' }) {
  if (!prompt.trim()) {
    const error = new Error('A prompt is required.');
    error.statusCode = 400;
    throw error;
  }

  const data = await requestOpenAI('images/generations', {
    model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
    prompt: prompt.trim(),
    size: '1024x1024',
    output_format: 'png',
  });
  const image = data.data?.[0];
  const imageUrl = image?.b64_json ? `data:image/png;base64,${image.b64_json}` : image?.url;

  if (!imageUrl) {
    throw new Error('The AI provider did not return an image. Please try again.');
  }

  return { title: 'Generated image', imageUrl, prompt: prompt.trim(), status: 'Ready' };
}

export function generateCampaignContent({ platforms = ['Facebook', 'Instagram', 'LinkedIn'], tone = 'Professional', targetAudience = 'small business owners', callToAction = 'Learn More', description = 'Promote our new coffee shop' }) {
  const platformized = platforms.map((platform) => {
    if (platform === 'Facebook') {
      return {
        platform: 'Facebook',
        title: 'Facebook campaign',
        content: `🎉 We are opening a new coffee shop and we want you to be part of the launch! ${description}. This is a ${tone.toLowerCase()} campaign designed for ${targetAudience}. Join us for a warm welcome, freshly brewed coffee, and a memorable community experience. ${callToAction}! #CoffeeCulture #LocalBusiness #GrandOpening`,
      };
    }

    if (platform === 'Instagram') {
      return {
        platform: 'Instagram',
        title: 'Instagram caption',
        content: `New week, new coffee ritual ☕ ${description}. Designed for ${targetAudience}, this launch is all about great taste and great energy. ${callToAction} today. #CoffeeShop #InstagramReady #BrandLaunch #LocalFavorites`,
      };
    }

    return {
      platform: 'LinkedIn',
      title: 'LinkedIn announcement',
      content: `We are pleased to announce the launch of our new coffee shop, designed to bring exceptional experiences and community connection to ${targetAudience}. ${description}. This initiative reflects our continued focus on growth, customer experience, and meaningful local engagement. ${callToAction}. #BusinessGrowth #BrandLaunch #CustomerExperience #Community`,
    };
  });

  return {
    title: 'Multi-platform campaign',
    platforms: platformized,
    status: 'Ready to preview',
  };
}
