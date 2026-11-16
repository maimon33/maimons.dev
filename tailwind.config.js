const colorNames = [
    "secondary-fixed", "on-primary-fixed", "on-error", "on-error-container", "surface-container-high",
    "surface-container-lowest", "primary", "on-background", "on-primary", "surface-tint", "inverse-on-surface",
    "background", "on-tertiary", "on-secondary-fixed-variant", "tertiary-container", "surface-variant",
    "tertiary-fixed", "surface-container-highest", "secondary-container", "on-tertiary-fixed-variant",
    "on-surface-variant", "on-primary-fixed-variant", "on-secondary-container", "primary-container", "error",
    "outline", "error-container", "tertiary-fixed-dim", "surface-bright", "inverse-surface",
    "on-tertiary-container", "primary-fixed", "secondary", "surface-container", "surface", "tertiary",
    "secondary-fixed-dim", "on-primary-container", "surface-container-low", "on-secondary", "inverse-primary",
    "on-tertiary-fixed", "primary-fixed-dim", "on-surface", "outline-variant", "surface-dim", "on-secondary-fixed",
];

/** Colors and radii are CSS variables (defaults in src/input.css) so project pages can re-theme via :root. */
module.exports = {
    content: ["./*.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: Object.fromEntries(colorNames.map((n) => [n, `rgb(var(--c-${n}) / <alpha-value>)`])),
            fontFamily: {
                headline: ["Space Grotesk", "sans-serif"],
                body: ["Manrope", "sans-serif"],
                label: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "var(--r)",
                lg: "var(--r-lg)",
                xl: "var(--r-xl)",
                full: "var(--r-full)",
            },
        },
    },
};
