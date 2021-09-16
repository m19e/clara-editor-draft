module.exports = {
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // 'media' or 'class' to enable dark mode support
    theme: {
        extend: {
            colors: {
                clara: {
                    light: "#f9f9fa",
                    dark: "#44454a",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
