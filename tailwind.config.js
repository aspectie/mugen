export default {
  content: ["./app/**/*.{tsx,ts}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1272px',
      "2xl": '1440px'
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
    fontSize: {
      'xs': ["14px", "22px"],
      's': ["16px", "24px"],
      'm': ["20px", "28px"],
      'l': ["24px", "32px"],
      'xl': ["24px", "32px"],
      '2xl': ["28px", "36px"],
      '3xl': ["32px", "40px"],
    },
    extend: {},
  },
  plugins: [],
}