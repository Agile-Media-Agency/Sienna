/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New calm, sophisticated palette
        // Primary - Chocolate/Brown tones
        sienna: {
          50: '#FAF8F6',   // Clay-tinted white
          100: '#EAE6DA',  // Clay
          200: '#DDD5C8',  // Light tan
          300: '#C9B9A8',  // Warm tan
          400: '#8B7355',  // Flat White (brown)
          500: '#6B5A48',  // Medium brown
          600: '#5D4037',  // Chocolate
          700: '#4A3328',  // Dark chocolate
          800: '#3D2A20',  // Deep brown
          900: '#2E1F18',  // Almost black brown
        },
        // Dusty Blue accent
        dusty: {
          50: '#F5F8FA',
          100: '#E8EFF3',
          200: '#D4E0E8',
          300: '#A8BCC8',  // Dusty Blue
          400: '#8AA4B4',
          500: '#6B8A9E',
          600: '#567080',
        },
        // Blush/Salmon tones
        blush: {
          50: '#FDF9F8',
          100: '#EDDCDC',  // Salmon
          200: '#E4CDCC',
          300: '#D4B5B2',
          400: '#C9A89D',  // Blush
          500: '#B89488',
          600: '#9E7B70',
        },
        // Warm gray for text/UI (adjusted to match)
        warm: {
          50: '#FAF8F6',
          100: '#F5F2EE',
          200: '#EAE6DA',  // Clay
          300: '#D4CFC4',
          400: '#A39B8C',
          500: '#78716C',
          600: '#5D5550',
          700: '#4A4340',
          800: '#353130',
          900: '#1C1917',
        },
        // Accent for favorites (soft coral/pink)
        coral: '#C9A89D',
      },
      fontFamily: {
        // Friendly, rounded sans-serif
        sans: ['Nunito', 'Quicksand', 'system-ui', 'sans-serif'],
        // Display/headings
        display: ['Quicksand', 'Nunito', 'sans-serif'],
      },
      fontSize: {
        // Larger base for accessibility
        'base': ['1.125rem', '1.75'],
        'lg': ['1.25rem', '1.75'],
        'xl': ['1.5rem', '1.4'],
        '2xl': ['1.875rem', '1.3'],
        '3xl': ['2.25rem', '1.2'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(93, 78, 66, 0.08)',
        'medium': '0 4px 16px rgba(93, 78, 66, 0.12)',
        'lifted': '0 8px 24px rgba(93, 78, 66, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
