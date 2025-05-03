import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../api/wordpressApi'; // Import the fetch function

const AboutPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'about-us'; // The slug of the page you created

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageData = await fetchPageBySlug(pageSlug);
        if (pageData) {
          setPageContent(pageData);
        } else {
          setError('Page not found.');
        }
      } catch (err) {
        setError('Failed to load page content.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []); // Fetch once on mount

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {loading && <p className="text-center py-10">Loading...</p>}
      {error && <p className="text-center py-10 text-red-600">{error}</p>}
      {pageContent && (
        <article className="prose lg:prose-xl max-w-none"> {/* Basic styling using Tailwind typography plugin (optional) */}
          <h1
             className="text-3xl font-bold mb-6"
             dangerouslySetInnerHTML={{ __html: pageContent.title?.rendered || 'About Us' }}
           />
           {/* Render page content */}
          <div dangerouslySetInnerHTML={{ __html: pageContent.content?.rendered || '' }} />
        </article>
      )}
    </div>
  );
};

export default AboutPage;