// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../api/wordpressApi'; // Your API function

const FAQPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'faq'; // Slug for your "About Us" page in WordPress

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch page data. If you want to include featured images,
        // you might need to modify fetchPageBySlug or the API call
        // to include `_embed=true` if using the standard WP REST API.
        const pageData = await fetchPageBySlug(pageSlug);
        if (pageData) {
          setPageContent(pageData);
        } else {
          setError('Page not found. Please ensure a FAQ page with the slug FAQ exists in WordPress.');
        }
      } catch (err) {
        setError('Failed to load page content. Please check the API connection and page slug.');
        console.error("Error fetching FAQ page:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []); // Fetch once on mount

  // The overall page background (black) is assumed to be set by a higher-level component (e.g., App.jsx or body styles).
  // Text colors will be dictated by your theme's 'brand.foreground' (white/light) and 'brand.heading' (golden).
  return (
    <div className="min-h-[calc(100vh-200px)] py-12 md:py-20"> {/* Added more vertical padding */}
      <div className="container mx-auto px-4 sm:px-6">
        {loading && (
          // Loading text using themed foreground color
          <p className="text-center text-xl text-brand-foreground opacity-75 py-16">
            Loading FAQ...
          </p>
        )}
        {error && (
          <div className="text-center py-16">
            {/* Error heading, can use a theme accent or a visible error color */}
            <h2 className="text-3xl font-semibold text-red-400 mb-4">Failed to Load Content</h2>
            {/* Error details text using themed foreground color */}
            <p className="text-brand-foreground opacity-90 mb-3">{error}</p>
            <p className="text-sm text-brand-foreground opacity-70">
              Please try refreshing the page or contact support if the issue persists.
            </p>
          </div>
        )}
        {pageContent && (
          // 'article' provides semantic meaning.
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-brand-heading text-center !leading-tight">
              Frequently Asked Questions
            </h1>
            {pageContent.content.rendered.split('<h2>').slice(1).map((item, index) => {
              const parts = item.split('</h2>');
              const title = parts[0];
              const content = parts[1];
              return <Card key={index} title={title} content={content} />;
            })}
          </div>
        )}
        {!loading && !pageContent && !error && (
          // Fallback message if no content, using themed foreground color
          <p className="text-center text-xl text-brand-foreground opacity-75 py-16">
            The "FAQ" content is currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
