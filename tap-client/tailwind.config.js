/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Helvetica"', '"Arial"', '"Roboto"', '"Open Sans"', '"Lato"', "sans-serif"],
            },
            colors: {
                towsonGold: "#FFBB00", // Gold
                towsonGraphite: "#3C3C3C", // Graphite
                towsonWhite: "#FFFFFF", // White
                towsonLineGold: "#cc9900", // Old Gold
                towsonBlack: "#151500", // Black
                towsonMist: "#dddddd", // Glen Mist
                towsonRed: "#cc0033", // Mascot Red
                towsonSilver: "#c0c0c0", // Athletic Silver
            },
        },
    },
    plugins: [],
};
