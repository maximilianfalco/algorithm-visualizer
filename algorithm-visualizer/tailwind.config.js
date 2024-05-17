/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'title': ['Metropolis Bold'],
      'text': ['Metropolis Regular'],
      'button-text': ['Metropolis Medium'],
    },
    extend: {
      height: {
        'TILE': '20px',
        'BOARD': '480px',
      },
      width: {
        'TILE': '20px',
      },
      animation: {
        'spinOnce': 'spin 1s ease-in-out once',
      }
    },
  },
  plugins: [],
}

