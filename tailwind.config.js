/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared Primary Color for buttons and highlights
        'primary': '#6366f1', // A pleasant indigo
        'primary-hover': '#4f46e5',
        
        // Dark Theme (As you liked before)
        'dark': {
          bg: '#0a041c',
          card: '#1E1B2E',
          text: '#e5e7eb',
          border: '#8B5CF6',
        },
        
        // --- NEW & IMPROVED LIGHT THEME ---
        'light': {
          bg: '#f8fafc',      // Soft, off-white background (slate-50)
          card: '#ffffff',      // Pure white cards for contrast
          text: '#0f172a',      // Very dark, readable text (slate-900)
          subtle: '#64748b',   // Softer text for descriptions (slate-500)
          border: '#cbd5e1',   // Clear but not harsh borders (slate-300)
          input: '#f1f5f9',     // A distinct background for form inputs (slate-100)
        },
      },
    },
  },
  plugins: [],
}