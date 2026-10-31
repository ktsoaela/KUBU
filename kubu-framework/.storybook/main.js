// Storybook is a workshop beside the docs, not part of KUBU. It loads dist/kubu.min.css, the same
// one file a site links, and each story reuses the preview markup from pages/.
export default {
    framework: '@storybook/html-vite',
    stories: ['../stories/**/*.stories.js'],
    // The previews use ../img and ../templates, as they do in pages/. From iframe.html those
    // resolve to /img and /templates.
    staticDirs: [
        { from: '../dist', to: '/kubu' },
        { from: '../img', to: '/img' },
        { from: '../templates', to: '/templates' },
        { from: '../js', to: '/js' },
    ],
    core: { disableTelemetry: true },
};
