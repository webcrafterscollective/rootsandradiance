import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../api/wordpressApi'; // Import the fetch function

const ContactPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'contact-us'; // The slug of the page you created

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
         <article className="prose lg:prose-xl max-w-none">
           <h1
             className="text-3xl font-bold mb-6"
             dangerouslySetInnerHTML={{ __html: pageContent.title?.rendered || 'Contact Us' }}
           />
           {/* Render page content - This might include a form shortcode rendered as text */}
          <div dangerouslySetInnerHTML={{ __html: pageContent.content?.rendered || '' }} />
          {/* If using a form shortcode, you might need a React form component instead
              or find a way to make the rendered HTML form interactive if possible */}
         </article>
      )}
    </div>
  );
};

export default ContactPage;