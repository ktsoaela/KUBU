// The same header, wording and component pages as the KUBU docs site (kubu-framework/scripts/site.mjs).
// Component pages are the static docs in kubu-framework/pages; set docsBase to where they are served.
// With `npm run dev` in kubu-framework they are at http://localhost:8080/kubu-framework/pages/.

export const docsBase = 'http://localhost:8080/kubu-framework/pages/'

// Built by the webpack config from kubu-framework/dist and kubu-framework/img.
export const kubuCss = '/static/kubu/kubu.min.css'
export const kubuCssReadable = '/static/kubu/kubu.css'
export const iconSprite = '/static/kubu/icons.svg'

export const header = [
  { title: 'Home', to: '/' },
  { title: 'Papers', to: '/papers' },
  { title: 'Use Cases', to: '/use-cases' },
  { title: 'Icon Pack', to: '/icons' },
  { title: 'Showcases', to: '/showcases' },
  { title: 'News', to: '/news' },
  { title: 'Download', to: '/download' }
]

export const groups = [
  {
    title: 'Atoms',
    items: [
      ['Buttons', 'atom-buttons.html', 'Actions in every state: hover, active, disabled and loading.'],
      ['Badge', 'atom-badge.html', 'A short label for a count or a status.'],
      ['colors', 'atom-colors.html', 'The semantic tokens a theme overrides.'],
      ['typography', 'atom-typography.html', 'The type scale from metadata to the page title.']
    ]
  },
  {
    title: 'Molecules',
    items: [
      ['Dropdowns', 'molecule-dropdowns.html', 'A menu that opens from a labelled button, no script.'],
      ['FormGroups', 'molecule-form-groups.html', 'A label, a field, a hint and an error, kept together.'],
      ['Navbar', 'molecule-navbar.html', 'The labelled row of links in a header.'],
      ['Navs', 'molecule-navs.html', 'Links between views of one section: tabs, pills or a stack.']
    ]
  },
  {
    title: 'Organisms',
    items: [
      ['Card', 'organism-card.html', 'A header, body and footer around one subject.'],
      ['Modal', 'organism-modal.html', 'A native <dialog> built from header, body and footer.'],
      ['Tabs', 'organism-tabs.html', 'A tab bar that switches panels with radio buttons.'],
      ['Forms', 'organism-forms.html', 'Forgiving validation with :user-invalid and inline errors.'],
      ['Tables', 'organism-tables.html', 'Data tables with captions, stripes and alignment.'],
      ['Toasts', 'organism-toasts.html', 'Short confirmations stacked in a corner.']
    ]
  }
]

export const showcases = [
  ['HomePage', 'page-home.html', 'A product home page: header snippet, a hero, a card grid and the footer.'],
  ['AboutPage', 'page-about.html', 'Team cards, a timeline as a list group, and a facts table.'],
  ['ProductPage', 'page-product.html', 'A scroll-snap gallery, tabs for details, a rating and a buy form.'],
  ['ContactPage', 'page-contact.html', 'Forgiving validation: errors appear after you leave a field, and say how to fix it.'],
  ['main-template', 'template-main.html', 'The layout the pages share: header, breadcrumb, content, aside and footer.']
]
