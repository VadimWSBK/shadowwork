/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        'secondary': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#12656B', // deep teal (left swatch)
          light: '#2D7F86',
          dark: '#0B4D51'
        },
        secondary: {
          DEFAULT: '#4F8E95', // blue-gray teal (right swatch)
          light: '#6FA5AB',
          dark: '#3B747B'
        },
        frame: {
          DEFAULT: '#4B939B'
        },
        accent: {
          DEFAULT: '#F3FF52', // requested neon yellow
          light: '#F6FF7A',
          dark: '#E3F02F'
        }
      }
    }
  },
  plugins: []
};