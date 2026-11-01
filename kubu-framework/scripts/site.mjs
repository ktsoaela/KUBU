// The KUBU site map: the header links and the sidebar menu, in order.
// Pages live in kubu-framework/pages. showcase/*.html is the one folder of finished screens.
// A link into that folder loads the whole page, so the header paths stay correct.
// scripts/pages.mjs stamps these into every page and builds the Contents list from them.
//
// Each sidebar item is [label, file, one-line purpose, CSS file it documents (optional)].

export const header = [
    { title: 'Home', href: 'index.html', purpose: 'What KUBU is, with themed components that work with scripts off.' },
    { title: 'Papers', href: 'papers.html', purpose: 'The documentation in reading order.' },
    { title: 'Use Cases', href: 'use-cases.html', purpose: 'Where KUBU fits: server-rendered apps, admin tools and static sites.' },
    { title: 'Icon Pack', href: 'icons.html', purpose: 'Line icons in one SVG sprite, coloured with currentColor.' },
    { title: 'Showcases', href: 'showcases.html', purpose: 'Whole pages built only from KUBU components.' },
    { title: 'News', href: 'news.html', purpose: 'What changed in each KUBU release.' },
    { title: 'Download', href: 'download.html', purpose: 'Link the bundle, or import only the files you use.' },
];

export const sidebar = [
    {
        title: 'Jumping In',
        items: [
            ['Intro', 'start-intro.html', 'How Atomic Design, BEM and native HTML fit together.'],
            ['KUBU 2.0', 'v2.html', 'The 2.0 contract: one CSS file, BEM parts, page endpoints, optional packages.'],
            ['Download', 'download.html', 'Link the bundle, or import only the files you use.'],
            ['Contents', 'start-contents.html', 'Every component with a one-line purpose.'],
            ['Browser & Devices', 'start-browsers.html', 'Supported browsers and the native features KUBU relies on.'],
            ['JavaScript', 'start-javascript.html', 'What the optional scripts add, and what works without them.'],
        ],
    },
    {
        title: 'Atoms',
        items: [
            ['Reset', 'atom-reset.html', 'Page colours, the focus ring and reduced motion.', 'atoms/Reset.css'],
            ['Avatar', 'atom-avatar.html', 'A photo or initials for a person or a shop.', 'atoms/Avatar.css'],
            ['Badge', 'atom-badge.html', 'A short label for a count or a status.', 'atoms/Badge.css'],
            ['Buttons', 'atom-buttons.html', 'Actions in every state: hover, active, disabled and loading.', 'atoms/Buttons.css'],
            ['Close', 'atom-close.html', 'The labelled close control for dialogs, panels and alerts.', 'atoms/Close.css'],
            ['Colors', 'atom-colors.html', 'The semantic tokens a theme overrides.', 'atoms/colors.css'],
            ['Spacing', 'atom-spacing.html', 'The --space-* scale and the margin and padding helpers.', 'atoms/spacing.css'],
            ['Spinners', 'atom-spinners.html', 'Small loading indicators for a control or a region.', 'atoms/Spinners.css'],
            ['Typography', 'atom-typography.html', 'The type scale from metadata to the page title.', 'atoms/typography.css'],
        ],
    },
    {
        title: 'Molecules',
        items: [
            ['Announcements', 'molecule-announcements.html', 'A one-line message across the top of the site.', 'molecules/Announcements.css'],
            ['Breadcrumb', 'molecule-breadcrumb.html', 'Where this page sits in the site.', 'molecules/Breadcrumb.css'],
            ['Button Groups', 'molecule-button-groups.html', 'Related actions joined into one control.', 'molecules/ButtonGroups.css'],
            ['Dropdowns', 'molecule-dropdowns.html', 'A menu that opens from a labelled button, no script.', 'molecules/Dropdowns.css'],
            ['Form Groups', 'molecule-form-groups.html', 'A label, a field, a hint and an error, kept together.', 'molecules/FormGroups.css'],
            ['List Groups', 'molecule-list-groups.html', 'Rows with an icon, a title and a line of text.', 'molecules/ListGroups.css'],
            ['Navbar', 'molecule-navbar.html', 'The labelled row of links in a header.', 'molecules/Navbar.css'],
            ['Navs', 'molecule-navs.html', 'Links between views of one section: tabs, pills or a stack.', 'molecules/Navs.css'],
            ['Pagination', 'molecule-pagination.html', 'Links to the pages of a long list.', 'molecules/Pagination.css'],
        ],
    },
    {
        title: 'Organisms',
        items: [
            ['Accordion', 'organism-accordion.html', 'Stacked sections that open one at a time, or each on its own.', 'organisms/Accordion.css'],
            ['Alerts', 'organism-alerts.html', 'A message with a tone, an icon and a sentence.', 'organisms/Alerts.css'],
            ['Card', 'organism-card.html', 'A header, body and footer around one subject.', 'organisms/Card.css'],
            ['Carousel', 'organism-carousel.html', 'Slides that snap into place as you scroll.', 'organisms/Carousel.css'],
            ['Collapse', 'organism-collapse.html', 'Show and hide one region with <details>.', 'organisms/Collapse.css'],
            ['Date Picker', 'organism-datepicker.html', 'Choose a date with the native input, or show a month.', 'organisms/DatePicker.css'],
            ['File Upload', 'organism-file-upload.html', 'A labelled file field that looks like a button.', 'organisms/FileUpload.css'],
            ['Forms', 'organism-forms.html', 'Forgiving validation with :user-invalid and inline errors.', 'organisms/Forms.css'],
            ['List Groups', 'organism-list-groups.html', 'A panel of selectable rows, like a settings menu.', 'organisms/ListGroups.css'],
            ['Modal', 'organism-modal.html', 'A native <dialog> built from header, body and footer.', 'organisms/Modal.css'],
            ['Offcanvas', 'organism-offcanvas.html', 'A panel that slides in from the edge.', 'organisms/Offcanvas.css'],
            ['Popovers', 'organism-popovers.html', 'Extra content on demand with the popover attribute.', 'organisms/Popovers.css'],
            ['Progress', 'organism-progress.html', 'How far a task has got.', 'organisms/Progress.css'],
            ['Scrollspy', 'organism-scrollspy.html', 'A sticky in-page menu that marks the section you jumped to.', 'organisms/Scrollspy.css'],
            ['Stepper', 'organism-stepper.html', 'The steps of a process and where you are.', 'organisms/Stepper.css'],
            ['Tables', 'organism-tables.html', 'Data tables with captions, stripes and alignment.', 'organisms/Tables.css'],
            ['Tabs', 'organism-tabs.html', 'A tab bar that switches panels with radio buttons.', 'organisms/Tabs.css'],
            ['Timeline', 'organism-timeline.html', 'What happened, in order, with a date on each step.', 'organisms/Timeline.css'],
            ['Toasts', 'organism-toasts.html', 'Short confirmations stacked in a corner.', 'organisms/Toasts.css'],
            ['Tooltips', 'organism-tooltips.html', 'A short text hint on hover and keyboard focus.', 'organisms/Tooltips.css'],
            ['Rating', 'organism-rating.html', 'A star rating made of radio buttons.', 'organisms/Rating.css'],
        ],
    },
    {
        title: 'Utilities',
        items: [
            ['Ajax', 'utility-ajax.html', 'Loading, skeleton and swap states for htmx requests.', 'utilities/Ajax.css'],
            ['Animations', 'utility-animations.html', 'Fade and slide in with transform and opacity.', 'utilities/Animations.css'],
            ['Event Delegation', 'utility-event-delegation.html', 'One htmx listener on a parent instead of one per child.'],
            ['Helpers', 'utility-helpers.html', 'Visually hidden text, borders and section spacing.', 'utilities/Helpers.css'],
            ['Notifications', 'utility-notifications.html', 'Inline status messages for a region.', 'utilities/Notifications.css'],
            ['Flexbox', 'utility-flexbox.html', 'The sidebar, main and footer page layout.', 'utilities/Flexbox.css'],
        ],
    },
    {
        title: 'Pages',
        items: [
            ['Home Page', 'page-home.html', 'A product home page from the header, card and footer snippets.'],
            ['About Page', 'page-about.html', 'A team and history page from cards, a list group and a table.'],
            ['Product Page', 'page-product.html', 'A product page with a carousel, tabs, rating and a buy form.'],
            ['Contact Page', 'page-contact.html', 'A contact form with forgiving validation.'],
        ],
    },
    {
        title: 'Snippets',
        items: [
            ['Forms', 'snippet-forms.html', 'Base styles for bare form elements.', 'snippets/Forms.css'],
            ['Navbar', 'snippet-navbar.html', 'The site header: logo, labelled menu and a utility row.', 'snippets/Header.css'],
            ['Footer', 'snippet-footer.html', 'Footer links and the copyright line.', 'snippets/Footer.css'],
            ['Dock', 'snippet-dock.html', 'The navbar at the bottom of a phone screen.', 'snippets/Dock.css'],
        ],
    },
    {
        title: 'Templates',
        items: [['Main Template', 'template-main.html', 'A full page layout: header, breadcrumb, content, footer.']],
    },
];

// Pages linked from the docs that are not menu items.
export const extras = [
    { title: 'Grid', href: 'start-grid.html', purpose: 'The 12-column grid and the auto-fit grid.' },
    { title: 'Theming and dark mode', href: 'start-theming.html', purpose: 'Override the tokens; dark is the master theme.' },
    { title: 'Paid invoice', href: 'use-case-invoice-paid.html', purpose: 'A paid invoice a server template can print.' },
    { title: 'Invoice due', href: 'use-case-invoice-due.html', purpose: 'An invoice that is still waiting for payment.' },
    { title: 'Credit note', href: 'use-case-invoice-credit.html', purpose: 'A credit against a returned blanket.' },
    { title: 'Waiting to ship', href: 'use-case-ship-waiting.html', purpose: 'A button that asks the server for the next line.' },
    { title: 'Shipped', href: 'use-case-ship-shipped.html', purpose: 'The line the server returns after the order leaves.' },
    { title: 'Delivered', href: 'use-case-ship-delivered.html', purpose: 'The line once the blanket is in Maseru.' },
    { title: 'Stock row', href: 'use-case-admin-stock.html', purpose: 'One stock row, a saved notice, and two tabs.' },
    { title: 'Order row', href: 'use-case-admin-order.html', purpose: 'One order row with its state and a note.' },
    { title: 'Weaver row', href: 'use-case-admin-weaver.html', purpose: 'One weaver row and the workshop they work in.' },
    { title: 'Shop landing', href: 'use-case-shop-landing.html', purpose: 'A shop header, a title, and two blankets.' },
    { title: 'Blanket list', href: 'use-case-shop-list.html', purpose: 'Three blankets on a public page.' },
    { title: 'Workshop visit', href: 'use-case-shop-visit.html', purpose: 'Where the workshop is and when it is open.' },
    { title: 'Storefront', href: 'showcase/storefront.html', purpose: 'The shop homepage: a title, three ways in, and a footer.' },
    { title: 'Product', href: 'showcase/product.html', purpose: 'A blanket for sale, with colour, price, and details.' },
    { title: 'Contact', href: 'showcase/contact.html', purpose: 'A letter to the workshop.' },
    { title: 'About', href: 'showcase/about.html', purpose: 'The people who weave.' },
    { title: 'Dashboard', href: 'showcase/dashboard.html', purpose: 'The desk: orders to ship, money taken, and a short list.' },
];

const items = [
    ...header.map((h) => ({ label: h.title, href: h.href, purpose: h.purpose })),
    ...sidebar.flatMap((g) => g.items.map(([label, href, purpose, css]) => ({ label, href, purpose, css, group: g.title }))),
    ...extras.map((e) => ({ label: e.title, href: e.href, purpose: e.purpose })),
];

// One entry per file. A sidebar label wins over a header label (Download is in both).
export const pages = new Map();
for (const item of items) pages.set(item.href, { ...pages.get(item.href), ...item });

export const allPages = [...pages.keys()];
