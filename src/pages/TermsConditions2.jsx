// src/pages/TermsConditionsPage2.jsx
import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../api/wordpressApi'; // Your API function

const TermsConditionsPage2 = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'terms-conditions'; // Slug for your Terms & Conditions page

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageData = await fetchPageBySlug(pageSlug);
        if (pageData) {
          setPageContent(pageData);
        } else {
          setError(`Page not found. Please ensure a page with the slug "${pageSlug}" exists in WordPress.`);
        }
      } catch (err) {
        setError('Failed to load page content. Please check the API connection and page slug.');
        console.error(`Error fetching page with slug ${pageSlug}:`, err);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []); // Fetch once on mount

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {loading && (
          <p className="text-center text-xl text-brand-foreground opacity-75 py-16">
            Loading Terms & Conditions...
          </p>
        )}
        {error && (
          <div className="text-center py-16">
            <h2 className="text-3xl font-semibold text-red-400 mb-4">Failed to Load Content</h2>
            <p className="text-brand-foreground opacity-90 mb-3">{error}</p>
            <p className="text-sm text-brand-foreground opacity-70">
              Please try refreshing the page or contact support if the issue persists.
            </p>
          </div>
        )}
        {pageContent && (
          <article className="prose lg:prose-lg xl:prose-xl max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-10 text-brand-heading text-center !leading-tight"
              dangerouslySetInnerHTML={{ __html: pageContent.title?.rendered || 'Terms & Conditions' }}
            />
            <hr className="border-brand-subtle my-8 md:my-12" />
            <div
              className="wordpress-content"
              dangerouslySetInnerHTML={{ __html: pageContent.content?.rendered || '' }}
            />
          </article>
        )}
        {!loading && !pageContent && !error && (
          <p className="text-center text-xl text-brand-foreground opacity-75 py-16">
            The "Terms & Conditions" content is currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
};

export default TermsConditionsPage2;