const baseUrl = '/api';

async function fetchJson(url, options = {}) {
  const res = await fetch(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  return data;
}

export async function generateText(payload) {
  return fetchJson('/generate/text', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function generateImage(payload) {
  return fetchJson('/generate/image', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function generateCode(payload) {
  return fetchJson('/generate/code', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function generateSocial(payload) {
  return fetchJson('/generate/social', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getPrompts() {
  return fetchJson('/prompts');
}

export async function createPrompt(payload) {
  return fetchJson('/prompts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchHistory() {
  return fetchJson('/history');
}

export async function saveHistory(payload) {
  return fetchJson('/history', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteHistoryItem(id) {
  return fetchJson(`/history/${id}`, {
    method: 'DELETE',
  });
}

export async function publishPlatform(platform, payload) {
  return fetchJson(`/social/${platform}/publish`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function publishAll(platforms, payload) {
  return fetchJson('/social/publish/all', {
    method: 'POST',
    body: JSON.stringify({ platforms, content: payload }),
  });
}
