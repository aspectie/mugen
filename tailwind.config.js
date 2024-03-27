export default {
  content: ["./app/**/*.{tsx,ts}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1272px',
    },
    container: {
      padding: {
        DEFAULT: '8px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '24px',
      },
    },
    spacing: {
      'xs': '4px',
      's': '8px',
      'm': '16px',
      'l': '24px',
      'xl': '32px',
      '2xl': '40px',
      '3xl': '48px',
      '4xl': '64px',
    },
    colors: {
      'accent': {
        120: '#F27317',
        100: '#FE8127',
        80: '#FC9850',
        60: '#FAB079',
        40: '#F9C7A3',
        20: '#F7DECC',
      },
      'black': {
        100: '#202020',
        80: '#4A4A4A',
        60: '#757575',
        40: '#A0A0A0',
        20: '#CACACA',
      },
      'gray': {
        100: '#C3C3C3',
        80: '#D9D9D9',
        60: '#EAEAEA',
        40: '#F5F5F5',
        20: '#FAFAFA',
      },
      'white': '#FFFFFF'
    },
    extend: {},
  },
  plugins: [],
}