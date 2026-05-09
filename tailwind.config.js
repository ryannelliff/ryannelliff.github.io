/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#8B0000',
                'primary-light': '#A00000',
                'primary-dark': '#6B0000',
            },
            backgroundColor: {
                base: '#FFFFFF',
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#8B0000",
                    "primary-content": "#ffffff",
                    "secondary": "#000000",
                    "accent": "#000000",
                    "neutral": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9f9f9",
                    "base-300": "#efefef",
                    "info": "#0000ff",
                    "success": "#00ff00",
                    "warning": "#ff8800",
                    "error": "#ff0000",
                },
            },
        ],
    },
}
