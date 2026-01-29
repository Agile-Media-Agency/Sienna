/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Sienna earth tones
        sienna: {
          50: '#FDF8F4',
          100: '#F9EDE3',
          200: '#F2D9C7',
          300: '#E8C4A8',
          400: '#D4A574',
          500: '#C38D6B',  // Primary brand color
          600: '#A67458',
          700: '#8A5D47',
          800: '#6E4A39',
          900: '#5D4E42',
        },
        // Accent - Soft sage for calm/success states
        sage: {
          50: '#F4F7F4',
          100: '#E8EFE8',
          200: '#D1DFD1',
          300: '#A8C4A8',
          400: '#7FA87F',
          500: '#5E8A5E',
          600: '#4A6F4A',
        },
        // Warm gray for text/UI
        warm: {
          50: '#FAFAF9',
          100: '#F5F4F2',
          200: '#E8E6E3',
          300: '#D4D1CC',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        // Soft accent colors (muted pastels)
        blush: '#E8A87C',
        lavender: '#B4A7C7',
        sky: '#9BC4CB',
        coral: '#E07A5F',
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
