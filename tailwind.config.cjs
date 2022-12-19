/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#6AA434",
                secondary: "#444444",
                success: "#00AC0F",
                danger: "#EF2636",
                dark : "#c4c4c4"
            },
            boxShadow: {
                'xs': '0 2px 3px 0 rgba(0,0,0,0.2)',
            },
        },
    },
    plugins: [],
};
