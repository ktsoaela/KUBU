// Reads the docs pages and returns the markup of their live previews, so a story shows exactly
// what the docs page shows. Nothing here runs inside the component markup itself.
const pages = import.meta.glob('../pages/*.html', { query: '?raw', import: 'default', eager: true });

export function previews(file) {
    const html = pages[`../pages/${file}`];
    if (!html) throw new Error(`pages/${file} not found`);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return [...doc.querySelectorAll('.doc-example__preview')].map((el) => el.innerHTML.trim());
}

// One story per docs page: every preview on it, in order, separated like the docs examples.
export const story = (file) => ({
    render: () => previews(file).map((html) => `<section class="story-example">${html}</section>`).join('\n'),
    parameters: { docs: { source: { code: previews(file).join('\n\n') } }, page: file },
});
