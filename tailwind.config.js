/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Keep defaultTheme import

export default {
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      // --- Skincare Color Palette ---
      colors: {
        'brand-background': '#FDFBF8', // Very light, warm off-white (main background)
        'brand-foreground': '#4B4B4B', // Dark, soft gray (main text)
        'brand-primary': {
          DEFAULT: '#86A891', // Muted, calming green (buttons, active links, accents)
          'hover': '#70917a',  // Darker shade for hover (ensure this contrasts well)
        },
        'brand-accent': {
          DEFAULT: '#E8B4B8', // Soft, dusty rose/pink (secondary accents, cart count?) - Changed from previous example
          'hover': '#d19fa3',  // Darker shade for hover
        },
        'brand-subtle': '#EAEAEA', // Light gray (borders, dividers) - Changed from previous example
        'brand-footer': '#383838', // Darker gray (footer background)

        // *** Added the missing heading color definition ***
        'brand-heading': '#333333', // Darker gray for headings (adjust color if needed)

        // --- Keep existing custom color if still used ---
        'minimalist-orange': '#FF6F00',
      },
      // --- Add Inter Font as Default Sans-Serif ---
      fontFamily: {
        // Set Inter as the primary sans-serif font, falling back to Tailwind's defaults
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // Add other theme customizations here if needed in the future
      // e.g., spacing, borderRadius, etc.
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For styling markdown/HTML content with 'prose'
    require('@tailwindcss/forms'),    // For better default form styling
  ],
}