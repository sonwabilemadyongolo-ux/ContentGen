import { useState } from 'react';
import { generateCode, generateImage, generateText } from './services/api';
import './styles.css';

const socialBrandMap = {
  Facebook: { className: 'facebook', symbol: 'f' },
  Instagram: { className: 'instagram', symbol: '◎' },
  LinkedIn: { className: 'linkedin', symbol: 'in' },
};

const features = [
  {
    title: 'Text',
    description: 'Blog posts, emails, product copy and stories in your tone.',
    accent: 'text',
    promptType: 'Text',
  },
  {
    title: 'Images',
    description: 'Original visuals in any style and aspect ratio.',
    accent: 'image',
    promptType: 'Image',
  },
  {
    title: 'Code',
    description: 'Working code in 10+ languages, with explanations.',
    accent: 'code',
    promptType: 'Code',
  },
  {
    title: 'Social Media',
    description: 'One idea, tailored posts for Facebook, Instagram and LinkedIn.',
    accent: 'social',
  },
  {
    title: 'Prompt Library',
    description: 'Start from proven prompts or save your own favorites.',
    accent: 'library',
  },
  {
    title: 'Create once. Customize everywhere.',
    description: 'Preview posts for each platform and get them ready to publish.',
    accent: 'customize',
  },
];

const promptLibrary = {
  Text: 'Write a compelling blog post about growing a small business with AI tools in a professional tone.',
  Image: 'Create a premium promotional image for a modern coffee shop launch in a clean editorial style.',
  Code: 'Build a responsive pricing card component in HTML and CSS with a call-to-action button.',
};

function App() {
  const [selectedPromptType, setSelectedPromptType] = useState('Text');
  const [promptInput, setPromptInput] = useState(promptLibrary.Text);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [socialShareText, setSocialShareText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  const handlePromptType = (type) => {
    setSelectedPromptType(type);
    setPromptInput(promptLibrary[type]);
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const platformIcon = (platform) => {
    if (platform === 'Facebook') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V7.1c0-.9.3-1.6 1.7-1.6H16V2.5c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.3V10.8H7v3.2h2.4v8h4.1Z" />
        </svg>
      );
    }

    if (platform === 'Instagram') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm4.9-3.1a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.9 8.7A2.7 2.7 0 0 1 9.6 6h4.8a2.7 2.7 0 0 1 2.7 2.7v6.6a2.7 2.7 0 0 1-2.7 2.7H9.6a2.7 2.7 0 0 1-2.7-2.7V8.7Zm3 1.8h1.5v6.8H9.9V10.5Zm3.8-2.1h1.9v9.5h-1.9V8.4Zm-5.4 0h1.9v9.5H8.3V8.4Z" />
      </svg>
    );
  };

  const handleGenerate = async () => {
    const trimmedPrompt = promptInput.trim();

    if (!trimmedPrompt) {
      setGenerationError('Enter a prompt before generating.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setGeneratedResult(null);

    try {
      const generate = {
        Text: generateText,
        Image: generateImage,
        Code: generateCode,
      }[selectedPromptType];
      const response = await generate({ prompt: trimmedPrompt });
      const result = response.result;

      setGeneratedResult({ type: selectedPromptType.toLowerCase(), ...result });
      setSocialShareText(result.content || result.code || result.prompt || '');
    } catch (error) {
      setGenerationError(error.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (value) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(String(value));
      setSocialShareText(String(value));
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  const handleShareToSocial = async () => {
    const shareText = socialShareText || generatedResult?.content || generatedResult?.code || generatedResult?.title || 'Generated content from AI Content Generator';

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI Content Generator',
          text: shareText,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(String(shareText));
    } catch (error) {
      console.error('Share failed', error);
    }
  };

  return (
    <div className="landing-page">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">AI</div>
          <span>AI Content Generator</span>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#workspace">Workspace</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="chip-row">
              <span className="mini-badge">AI</span>
              <span className="label-inline">Create. Customize. Share.</span>
            </div>

            <h1>Create Anything With AI</h1>
            <p>
              Generate text, images, code and social-media content from one powerful workspace.
            </p>

            <div className="cta-row">
              <a href="#workspace" className="primary-cta large">Start Creating</a>
              <a href="#features" className="secondary-cta large">Explore Features</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Content generation preview">
            <div className="card-stack">
              <button type="button" className="visual-card card-primary" onClick={() => handlePromptType('Text')}>
                <span className="card-tag">Text</span>
                <h3>Blogs & Emails</h3>
                <p>Write compelling content in your chosen voice and audience.</p>
              </button>
              <button type="button" className="visual-card card-secondary" onClick={() => handlePromptType('Image')}>
                <span className="card-tag">Image</span>
                <h3>Visual Concepts</h3>
                <p>Generate on-brand visuals in any style or aspect ratio.</p>
              </button>
              <button type="button" className="visual-card card-tertiary" onClick={() => handlePromptType('Code')}>
                <span className="card-tag">Code</span>
                <h3>Snippets & Apps</h3>
                <p>Turn prompts into useful HTML, CSS, JavaScript and more.</p>
              </button>
            </div>
          </div>
        </section>

        <section className="prompt-builder" id="workspace">
          <div className="prompt-builder-header">
            <div>
              <p className="eyebrow">Workspace</p>
              <h2>Start with a prompt</h2>
            </div>
          </div>

          <div className="prompt-builder-box">
            <div className="prompt-type-switcher" aria-label="Prompt type selector">
              {['Text', 'Image', 'Code'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={selectedPromptType === type ? 'type-pill active' : 'type-pill'}
                  onClick={() => handlePromptType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <label className="prompt-label" htmlFor="prompt-input">
              <span>{selectedPromptType} prompt</span>
              <textarea
                id="prompt-input"
                value={promptInput}
                onChange={(event) => setPromptInput(event.target.value)}
                rows={7}
                placeholder={`Describe your ${selectedPromptType.toLowerCase()} idea...`}
              />
            </label>

            <div className="prompt-actions">
              <button type="button" className="primary-cta large" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {generationError && <p className="generation-error" role="alert">{generationError}</p>}
          </div>
        </section>

        {generatedResult && (
          <section className="result-panel" aria-live="polite">
            <div className="result-header-row">
              <div>
                <p className="eyebrow">Generated result</p>
                <h3>{generatedResult.title}</h3>
              </div>

              <div className="inline-share-row">
                <button type="button" className="secondary-cta" onClick={() => handleCopy(generatedResult.content || generatedResult.code || generatedResult.imageUrl)}>Copy</button>
                <button type="button" className="primary-cta" onClick={handleShareToSocial}>Share to Social</button>
              </div>
            </div>

            <div className="platform-badges" aria-label="Social platforms">
              {['Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                <span key={platform} className={`platform-badge ${socialBrandMap[platform].className}`}>
                  {platformIcon(platform)}
                </span>
              ))}
            </div>

            {generatedResult.type === 'text' && (
              <textarea value={generatedResult.content} rows={12} readOnly />
            )}

            {generatedResult.type === 'image' && (
              <img src={generatedResult.imageUrl} alt={generatedResult.title} className="generated-image" />
            )}

            {generatedResult.type === 'code' && (
              <pre className="generated-code"><code>{generatedResult.code}</code></pre>
            )}
          </section>
        )}

        <section className="features-section" id="features">
          <div className="section-heading">
            <h2>Everything you need to create</h2>
            <p>
              Four creative tools, one prompt library, and a social workspace that adapts every post to its platform.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <button
                key={feature.title}
                type="button"
                className={`feature-card ${feature.accent} ${feature.promptType ? 'is-clickable' : ''}`}
                onClick={() => feature.promptType && handlePromptType(feature.promptType)}
              >
                <div className="feature-icon">{feature.title.charAt(0)}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Ready to create something?</h2>
          <p>Your first piece of content is a prompt away.</p>
          <a href="#workspace" className="primary-cta large">Start Creating</a>
        </section>
      </main>

      <footer className="site-footer">© 2026 AI Content Generator</footer>
    </div>
  );
}

export default App;
