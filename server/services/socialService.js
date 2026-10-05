export function isPublishingConfigured() {
  const metaConfigured = Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET);
  const linkedinConfigured = Boolean(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET);

  return metaConfigured || linkedinConfigured;
}

export function getOAuthLink(platform) {
  if (platform === 'facebook') {
    return {
      url: process.env.META_APP_ID ? `https://www.facebook.com/dialog/oauth?client_id=${process.env.META_APP_ID}&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:4000/api/social/facebook/callback')}` : 'https://example.com/demo/facebook-oauth',
      configured: Boolean(process.env.META_APP_ID),
    };
  }

  if (platform === 'instagram') {
    return {
      url: process.env.META_APP_ID ? `https://www.facebook.com/dialog/oauth?client_id=${process.env.META_APP_ID}&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:4000/api/social/instagram/callback')}` : 'https://example.com/demo/instagram-oauth',
      configured: Boolean(process.env.META_APP_ID),
    };
  }

  return {
    url: process.env.LINKEDIN_CLIENT_ID ? `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:4000/api/social/linkedin/callback')}&state=demo` : 'https://example.com/demo/linkedin-oauth',
    configured: Boolean(process.env.LINKEDIN_CLIENT_ID),
  };
}

export function publishToPlatform(platform, content) {
  const configured = isPublishingConfigured();

  if (!configured && process.env.DEMO_MODE !== 'true') {
    return {
      status: 'error',
      message: 'Publishing is not configured yet. Connect and configure the required social-media API credentials to enable publishing.',
      platform,
    };
  }

  return {
    status: 'published',
    message: 'Demo — Not Actually Published',
    platform,
    content,
    demo: true,
  };
}
