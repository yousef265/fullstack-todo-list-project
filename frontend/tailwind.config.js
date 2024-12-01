/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",

    theme: {
        extend: {},

        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                md: "3rem",
                lg: "4rem",
                xl: "6rem",
                "2xl": "10rem",
            },

            // screens: {
            //     sm: "600px",
            //     md: "700px",
            //     lg: "900px",
            //     xl: "1000px",
            //     "2xl": "1200px",
            // },
        },
    },
    plugins: [],
};
