/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        dtiktok: {
          primary: '#f0565f',
          secondary: '#ff4b4b', 
          accent: '#0693e3',
          dark: '#202020',
          light: '#ffffff',
          pink: '#ff69b4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dtiktok: {
          primary: '#f0565f',
          secondary: '#ff4b4b',
          accent: '#0693e3',
          neutral: '#2a2e37',
          'base-100': '#1a1a1a',
          'base-200': '#202020',
          'base-300': '#2a2a2a',
          info: '#0693e3',
          success: '#f0565f',
          warning: '#fbbf24',
          error: '#ff4b4b',
          pink: '#ff69b4',
        },
      },
    ],
  },
} 