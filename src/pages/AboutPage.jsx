// // // src/pages/AboutPage.jsx
// // import React, { useState, useEffect } from 'react';
// // import { fetchPageBySlug } from '../api/wordpressApi'; // Your API function

// // const AboutPage = () => {
// //   const [pageContent, setPageContent] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const pageSlug = 'about-us'; // Slug for your "About Us" page in WordPress

// //   useEffect(() => {
// //     const loadPage = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const pageData = await fetchPageBySlug(pageSlug);
// //         if (pageData) {
// //           setPageContent(pageData);
// //         } else {
// //           setError('Page not found. Please ensure an "About Us" page with the slug "about-us" exists in WordPress.');
// //         }
// //       } catch (err) {
// //         setError('Failed to load page content. Please check the API connection and page slug.');
// //         console.error("Error fetching About Us page:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadPage();
// //   }, []); // Fetch once on mount

// //   // Standard page structure with a clear loading/error/content display logic
// //   return (
// //     <div className="bg-brand-background text-brand-foreground min-h-[calc(100vh-200px)] py-12 md:py-16">
// //       <div className="container mx-auto px-4 sm:px-6">
// //         {loading && (
// //           <p className="text-center text-lg text-brand-foreground opacity-75 py-10">
// //             Loading Our Story...
// //           </p>
// //         )}
// //         {error && (
// //           <div className="text-center py-10">
// //             <h2 className="text-2xl font-semibold text-red-500 mb-4">Failed to Load Content</h2>
// //             <p className="text-brand-foreground opacity-80 mb-2">{error}</p>
// //             <p className="text-sm text-brand-foreground opacity-60">
// //               Please try refreshing the page or contact support if the issue persists.
// //             </p>
// //           </div>
// //         )}
// //         {pageContent && (
// //           <article className="prose lg:prose-lg xl:prose-xl max-w-3xl mx-auto">
// //             {/* Page Title: Styled with theme's heading color */}
// //             <h1
// //               className="text-4xl sm:text-5xl font-bold mb-8 text-brand-heading text-center !leading-tight"
// //               dangerouslySetInnerHTML={{ __html: pageContent.title?.rendered || 'About Us' }}
// //             />

// //             {/* WordPress Content: Rendered HTML styled by 'prose' classes.
// //               The .prose class in your index.css should apply:
// //               - `text-brand-foreground` for paragraphs and general text.
// //               - `text-brand-heading` for any H2, H3, etc., within the content.
// //               - `text-brand-primary` for links.
// //             */}
// //             <div
// //               className="wordpress-content" // For any specific custom styles if needed
// //               dangerouslySetInnerHTML={{ __html: pageContent.content?.rendered || '' }}
// //             />

// //             {/* Example of how structured content from WordPress (if it includes headings, lists, etc.)
// //               would be styled by the `prose` classes.
// //               This section is illustrative if your WordPress content is rich.
// //             */}
// //             {/*
// //             <div className="mt-12 border-t border-brand-subtle pt-8">
// //               <h2 className="text-2xl text-brand-heading mb-4">Our Mission (Example Section)</h2>
// //               <p>If your WordPress content for 'About Us' includes sections like these (using H2, p, ul), 
// //                  the 'prose' classes will automatically style them according to your theme.</p>
// //               <ul className="list-disc pl-5 space-y-2">
// //                 <li>Commitment to quality.</li>
// //                 <li>Focus on customer satisfaction.</li>
// //                 <li>Innovation in skincare.</li>
// //               </ul>
// //             </div>
// //             */}
// //           </article>
// //         )}
// //         {!loading && !pageContent && !error && (
// //           <p className="text-center text-lg text-brand-foreground opacity-75 py-10">
// //             The "About Us" content is currently unavailable.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AboutPage;

// // src/pages/AboutPage.jsx
// import React, { useState, useEffect } from 'react';
// import { fetchPageBySlug } from '../api/wordpressApi'; // Your API function

// const AboutPage = () => {
//   const [pageContent, setPageContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const pageSlug = 'about-us'; // Slug for your "About Us" page in WordPress

//   useEffect(() => {
//     const loadPage = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const pageData = await fetchPageBySlug(pageSlug);
//         if (pageData) {
//           setPageContent(pageData);
//         } else {
//           setError('Page not found. Please ensure an "About Us" page with the slug "about-us" exists in WordPress.');
//         }
//       } catch (err) {
//         setError('Failed to load page content. Please check the API connection and page slug.');
//         console.error("Error fetching About Us page:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadPage();
//   }, []);

//   return (
//     // Main container with padding. Background is assumed to be black from App.jsx or body styles.
//     <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
//       {loading && (
//         // Loading text: Explicitly light gray for visibility on black.
//         <p className="text-center text-lg text-gray-300 opacity-80 py-10">
//           Loading Our Story...
//         </p>
//       )}
//       {error && (
//         <div className="text-center py-10">
//           {/* Error heading: Brighter red for visibility. */}
//           <h2 className="text-2xl font-semibold text-red-400 mb-4">Failed to Load Content</h2>
//           {/* Error details text: Explicitly light gray. */}
//           <p className="text-gray-300 opacity-90 mb-2">{error}</p>
//           <p className="text-sm text-gray-400 opacity-70">
//             Please try refreshing the page or contact support if the issue persists.
//           </p>
//         </div>
//       )}
//       {pageContent && (
//         // Article with prose styling. We will override prose colors here.
//         // Base text for prose elements is forced to white.
//         // Specific prose elements (headings, links, strong) are forced to golden or lighter shades.
//         <article
//           className="prose lg:prose-lg xl:prose-xl max-w-3xl mx-auto
//             text-white                         /* Base text for prose (p, li, etc.) to white */
//             prose-headings:text-yellow-400     /* All H1-H6 within prose to Tailwind's yellow-400 */
//             prose-a:text-yellow-500            /* Links to Tailwind's yellow-500 */
//             hover:prose-a:text-yellow-300      /* Link hover to a lighter gold */
//             prose-strong:text-gray-100         /* Strong text to off-white/very light gray */
//             prose-blockquote:border-yellow-400 /* Example: Blockquote border gold */
//             prose-blockquote:text-gray-300    /* Blockquote text light gray */
//             prose-code:text-amber-300          /* Code snippets in a light amber */
//             prose-hr:border-gray-700           /* Horizontal rule a darker gray, but visible */
//           "
//         >
//           {/* Page Title: Explicitly styled with a bright golden color. */}
//           <h1
//             className="text-4xl sm:text-5xl font-bold mb-10 text-yellow-400 text-center !leading-tight"
//             dangerouslySetInnerHTML={{ __html: pageContent.title?.rendered || 'About Us' }}
//           />

//           {/* WordPress Content Area: Styles will be inherited from the prose overrides above. */}
//           <div
//             className="wordpress-content"
//             dangerouslySetInnerHTML={{ __html: pageContent.content?.rendered || '' }}
//           />
//         </article>
//       )}
//       {!loading && !pageContent && !error && (
//         // Fallback message: Explicitly light gray.
//         <p className="text-center text-lg text-gray-300 opacity-75 py-10">
//           The "About Us" content is currently unavailable.
//         </p>
//       )}
//     </div>
//   );
// };

// export default AboutPage;

// src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../api/wordpressApi'; // Your API function
import Card from '../components/Card'; // Import the new Card component

const AboutPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSlug = 'about-us'; // Slug for your "About Us" page in WordPress

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageData = await fetchPageBySlug(pageSlug);
        if (pageData) {
          setPageContent(pageData);
        } else {
          setError('Page not found. Please ensure an "About Us" page with the slug "about-us" exists in WordPress.');
        }
      } catch (err) {
        setError('Failed to load page content. Please check the API connection and page slug.');
        console.error("Error fetching About Us page:", err);
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
            Loading Our Story...
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
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-brand-heading text-center !leading-tight">
              {pageContent.title.rendered}
            </h1>
            {pageContent.content.rendered.split('<h2>').map((item, index) => {
              if (index === 0) {
                return <div key={index} dangerouslySetInnerHTML={{ __html: item }} />;
              }
              const parts = item.split('</h2>');
              const title = parts[0];
              const content = parts[1];
              return <Card key={index} title={title} content={content} />;
            })}
          </div>
        )}
        {!loading && !pageContent && !error && (
          <p className="text-center text-xl text-brand-foreground opacity-75 py-16">
            The "About Us" content is currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
