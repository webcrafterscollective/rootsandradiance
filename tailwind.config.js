// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           // --- Blacks & Darks ---
//           background: '#101010',     // Deep Black (main website background)
//           card: '#181818',           // Slightly Lighter Black (for cards, content blocks)
//           footer: '#0A0A0A',         // Very Dark/True Black (footer background)
          
//           // --- Bright Golds ---
//           primary: {                 // Main interactive gold
//             DEFAULT: '#FFD700',   // Bright Gold (e.g., buttons, active links)
//             hover: '#E6C200',    // Darker Gold (for hover states)
//             light: '#FFFACD',    // Lemon Chiffon (very light gold for subtle highlights, secondary text)
//           },
//           accent: {                  // For specific highlights, CTAs
//             DEFAULT: '#FDB813',   // Vibrant, Bright Gold (e.g., sale tags, special icons)
//             hover: '#EAA100',    // Darker vibrant gold for hover
//           },
//           heading: '#FFD700',        // Bright Gold (for main headings)

//           // --- Text & Subtle Elements ---
//           foreground: '#F5F5F5',     // Off-White/Light Gray (main text on dark backgrounds)
//           'textOnPrimary': '#000000', // Black (text on gold buttons/elements for contrast)
          
//           subtle: {                  // For borders, dividers
//             DEFAULT: '#333333',    // Dark Gray (on dark backgrounds)
//             light: '#FFEFB0',     // Pale Gold (on light backgrounds, e.g., borders for section-light)
//           },

//           // --- Light Section Specifics (if you have them) ---
//           'section-light': '#FFFBEA', // Very Pale Warm Yellow/Light Gold (background for light sections)
//           'text-dark': '#101010',     // Black (text on light sections)
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'], // Assuming Inter is your desired font
//       },
//     },
//   },
//   plugins: [
//     function ({ addVariant }) {
//       addVariant('data-visible', '&[data-visible="true"]');
//     },
//     require('@tailwindcss/typography'), // For styling markdown/HTML content
//     // require('@tailwindcss/forms'),    // If you need enhanced default form styling
//   ],
// }

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // --- Blacks & Darks ---
          background: '#101010',     // Deep Black (main website background)
          card: '#181818',           // Slightly Lighter Black (for cards, content blocks)
          footer: '#0A0A0A',         // Very Dark/True Black (footer background)
          
          // --- Bright Golds & Pale Golds ---
          primary: {                // Main interactive gold
            DEFAULT: '#FFD700',    // Bright Gold (e.g., buttons, active links)
            hover: '#E6C200',     // Darker Gold (for hover states)
            light: '#FFF8DC',      // Cornsilk (pale, creamy gold for subtle highlights, strong text in prose)
          },
          accent: {                 // For specific highlights, CTAs
            DEFAULT: '#FDB813',    // Vibrant, Bright Gold (e.g., sale tags, special icons)
            hover: '#EAA100',     // Darker vibrant gold for hover
          },
          heading: '#FFD700',        // Bright Gold (for main headings H1, and prose H1-H6)

          // --- Text & Subtle Elements ---
          foreground: '#FFFFFF',      // Pure White (main text on dark backgrounds for max contrast)
          'textOnPrimary': '#000000', // Black (text on gold buttons/elements for contrast)
          
          subtle: {                  // For borders, dividers
            DEFAULT: '#333333',     // Dark Gray (on dark backgrounds)
            light: '#FFEFB0',      // Pale Gold (on light backgrounds, e.g., borders for section-light)
          },

          // --- Light Section Specifics (if you have them) ---
          'section-light': '#FFFBEA', // Very Pale Warm Yellow/Light Gold (background for light sections)
          'text-dark': '#101010',     // Black (text on light sections)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter is your desired font
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('data-visible', '&[data-visible="true"]');
    },
    require('@tailwindcss/typography'), // For styling markdown/HTML content
    // require('@tailwindcss/forms'),    // If you need enhanced default form styling
  ],
}