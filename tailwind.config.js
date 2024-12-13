import { Input } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './auth/**/*.html',
    './listing/**/*.html',
    './profile/**/*.html',
    './my_bids/**/*.html',
    '/my_listings/**/*.html',
    '.listing/create/**/*.html',

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
        LabelsFooterMobile: 'var(--Labels-mobile-font-size)',
        BodyDesktop: 'var(--Body-Desktop-font-size)',
        BodyMobile: 'var(--Body-Mobile-font-size)',
      },
      fontFamily: {
        custom: 'var(--Font-1)',
        custom2: 'var(--Font-2)',
      },
      boxShadow: {
        custom: '0 8px 12px rgba(228, 176, 34, 0.5)',
        custom2: [
          '0 8px 12px rgba(228, 176, 34, 0.5)',
          'inset 0 0 20px rgba(0, 0, 0, 1)',
        ],
      },
    },
  },
  plugins: [],
};
