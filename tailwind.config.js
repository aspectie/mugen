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
    extend: {},
  },
  plugins: [],
}