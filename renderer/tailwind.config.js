module.exports = {
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // 'media' or 'class' to enable dark mode support
    theme: {
        extend: {
            colors: {
                darkgray: "#44454a",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
