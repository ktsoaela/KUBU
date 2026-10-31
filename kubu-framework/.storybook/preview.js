// The theme toolbar sets data-theme on <html>, the same override the docs' theme radios make.
// Auto removes it, so the canvas follows the system setting.
export const globalTypes = {
    theme: {
        description: 'Colour scheme',
        toolbar: { title: 'Theme', icon: 'mirror', items: ['auto', 'dark', 'light'], dynamicTitle: true },
    },
};

export const initialGlobals = { theme: 'auto' };

export const decorators = [
    (story, { globals }) => {
        const root = document.documentElement;
        if (globals.theme === 'auto') delete root.dataset.theme;
        else root.dataset.theme = globals.theme;
        return story();
    },
];

export const parameters = { layout: 'padded' };

// Storybook swaps the canvas without a page load, so ask htmx to read the new markup each time.
new MutationObserver(() => window.htmx?.process(document.getElementById('storybook-root'))).observe(document.body, {
    childList: true,
    subtree: false,
});
