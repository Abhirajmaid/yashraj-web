'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Save } from 'lucide-react';
import { Card, Field } from '@/components/admin/ProjectFormFields';
import {
  isValidExternalUrl,
  listenToSiteSettings,
  updateSiteSettings,
} from '@/lib/siteSettingsRepository';

export default function AdminPortfolioPage() {
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToSiteSettings(
      (settings) => {
        setPortfolioLink(settings.portfolioLink);
        setIsLoading(false);
        setError(null);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSuccessMessage(null);
    setError(null);

    if (!isValidExternalUrl(portfolioLink)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setIsSaving(true);
    try {
      await updateSiteSettings({ portfolioLink });
      setSuccessMessage('Portfolio link saved successfully.');
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to save portfolio link.';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-brand-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <p className="mt-2 text-gray-500">Add the portfolio link shown on the website hero and footer</p>
      </div>

      <Card
        title="Portfolio Link"
        description="Paste a URL to your company portfolio or brochure. It opens in a new tab — no file upload needed."
      >
        <Field
          label="Link URL"
          value={portfolioLink}
          onChange={setPortfolioLink}
          placeholder="https://example.com/your-portfolio"
        />

        {portfolioLink && isValidExternalUrl(portfolioLink) && (
          <a
            href={portfolioLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-primary transition hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Preview link
          </a>
        )}

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {successMessage && (
          <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving…' : 'Save Link'}
        </button>
      </Card>
    </div>
  );
}
