kubu/
├── index.html           # Main entry point (e.g., home page)
├── docs/                # Documentation pages
│   ├── getting-started.html
│   ├── customization.html
│   ├── layout.html
│   ├── content.html
│   ├── forms.html
│   ├── components.html
│   ├── helpers.html
│   └── utils.html
├── src/
│   ├── css/             # Styles for atoms, molecules, organisms
│   │   ├── _atoms.css
│   │   ├── _molecules.css
│   │   ├── _organisms.css
│   │   ├── _helpers.css
│   │   └── main.css     # Compiled CSS (imports all partials)
│   ├── js/              # JavaScript for UI interactions
│   │   ├── atoms/
│   │   │   └── Button.js
│   │   ├── molecules/
│   │   │   ├── ButtonGroup.js
│   │   │   └── ToggleButton.js
│   │   ├── organisms/
│   │   │   ├── Accordion.js
│   │   │   ├── Navbar.js
│   │   │   └── Modal.js
│   │   ├── main.js      # Main JavaScript file (imports all modules)
│   └── assets/          # Images, fonts, icons
│       ├── images/
│       └── fonts/
└── README.md            # Project documentation
