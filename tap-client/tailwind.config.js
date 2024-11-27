/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    '"Helvetica"',
                    '"Arial"',
                    '"Roboto"',
                    '"Open Sans"',
                    '"Lato"',
                    "sans-serif",
                ],
            },
            colors: {
                // Towson colors
                towsonGold: "#FFBB00",
                towsonGraphite: "#3C3C3C",
                towsonWhite: "#FFFFFF",
                towsonLineGold: "#cc9900",
                towsonBlack: "#151500",
                towsonMist: "#dddddd",
                towsonRed: "#cc0033",
                towsonSilver: "#c0c0c0",

                // Lighter shades
                towsonGoldLight: "#FFE066",
                towsonGoldDark: "#CC9900",
                towsonGraphiteLight: "#5A5A5A",
                towsonGraphiteDark: "#2B2B2B",
                towsonMistLight: "#EEEEEE",
                towsonMistDark: "#BBBBBB",

                // Darker shades
                towsonDarkerWhite: "#F5F5F5"
            },
        },
    },
    plugins: [],
};
