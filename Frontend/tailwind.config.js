/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A5ACD', // SlateBlue
          light: '#836FFF',
          dark: '#483D8B',
        },
        secondary: {
          DEFAULT: '#4682B4', // SteelBlue
        },
        success: {
          DEFAULT: '#3CB371', // MediumSeaGreen
        },
        warning: {
          DEFAULT: '#FFA500', // Orange
        },
        danger: {
          DEFAULT: '#DC143C', // Crimson
        },
        background: {
          light: '#F8F9FA',
          dark: '#121212',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1E1E1E',
        },
        text: {
          light: '#212529',
          dark: '#E5E7EB',
        },
        subtle: {
            light: '#6C757D',
            dark: '#9CA3AF',
        },
        border: {
            light: '#DEE2E6',
            dark: '#374151',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}