/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                grass: '#4c9f35',
                water: '#3f78bd',
                mountain: '#767674',
                sand: '#e8ce79',
            },
        },
    },
    plugins: [],
};
