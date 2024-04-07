/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#fafafa',
      secondary: '#27272a',
      background: '#09090b',
      'muted-foreground': '#a1a1aa'
    },
    fontFamily: {
      abril: ['Abril Fatface', 'sans-serif']
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.size-screen': {
          width: '100vw',
          height: '100vh'
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
