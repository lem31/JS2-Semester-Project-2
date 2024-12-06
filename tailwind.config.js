import { Input } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
    'index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
      },
      fontSize: {
        H1Desktop: 'var(--H1-Desktop-font-size)',
        H1Mobile: 'var(--H1-Mobile-font-size)',
        H2Desktop: 'var(--H2-Desktop-font-size)',
        H2Mobile: 'var(--H2-Mobile-font-size)',
        ButtonInputDesktop: 'var(--Button-and-Input-desktop-font-size)',
        ButtonInputMobile: 'var(--Button-and-Input-mobile-font-size)',
        NavDesktop: 'var(--Nav-Desktop-font-size)',
        LabelsFooterDesktop: 'var(--Labels-and-footer-desktop-font-size)',
        LabelsFooterMobile: 'var(--Labels-and-footer-mobile-font-size)',
        Font1: 'var(--Font-1)',
        Font2: 'var(--Font-2)',
      },
      fontFamily: {
        charm: 'var(--Font-1)',
        sen: 'var(--Font-2)',
      },
    },
  },
  plugins: [],
};
