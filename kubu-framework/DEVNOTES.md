# Component map

Each Atomic Design name, the file that holds it, and its docs page in `pages/`. Components are CSS; JavaScript is optional and lives in `kubu.20/`.

## Atoms

| Name | CSS | Page |
| --- | --- | --- |
| Reset | `css/atoms/Reset.css` | `atom-reset.html` |
| Badge | `css/atoms/Badge.css` | `atom-badge.html` |
| Buttons | `css/atoms/Buttons.css` | `atom-buttons.html` |
| Close | `css/atoms/Close.css` | `atom-close.html` |
| colors | `css/atoms/colors.css` | `atom-colors.html` |
| spacing | `css/atoms/spacing.css` | `atom-spacing.html` |
| Spinners | `css/atoms/Spinners.css` | `atom-spinners.html` |
| typography | `css/atoms/typography.css` | `atom-typography.html` |
| Icons | `css/atoms/Icons.css`, `img/icons.svg` | `icons.html` |

## Molecules

| Name | CSS | Page |
| --- | --- | --- |
| Announcements | `css/molecules/Announcements.css` | `molecule-announcements.html` |
| Breadcrumb | `css/molecules/Breadcrumb.css` | `molecule-breadcrumb.html` |
| ButtonGroups | `css/molecules/ButtonGroups.css` | `molecule-button-groups.html` |
| Dropdowns | `css/molecules/Dropdowns.css` | `molecule-dropdowns.html` |
| FormGroups | `css/molecules/FormGroups.css` | `molecule-form-groups.html` |
| ListGroups | `css/molecules/ListGroups.css` | `molecule-list-groups.html` |
| Navbar | `css/molecules/Navbar.css` | `molecule-navbar.html` |
| Navs | `css/molecules/Navs.css` | `molecule-navs.html` |
| Pagination | `css/molecules/Pagination.css` | `molecule-pagination.html` |

## Organisms

| Name | CSS | Page |
| --- | --- | --- |
| Accordion | `css/organisms/Accordion.css` (with `.tab` from `Tabs.css`) | `organism-accordion.html` |
| Alerts | `css/organisms/Alerts.css` | `organism-alerts.html` |
| Card | `css/organisms/Card.css` | `organism-card.html` |
| Carousel | `css/organisms/Carousel.css` | `organism-carousel.html` |
| Collapse | `css/organisms/Collapse.css` | `organism-collapse.html` |
| DatePicker | `css/organisms/DatePicker.css` | `organism-datepicker.html` |
| FileUpload | `css/organisms/FileUpload.css` | `organism-file-upload.html` |
| Forms | `css/organisms/Forms.css` | `organism-forms.html` |
| ListGroups | `css/organisms/ListGroups.css` | `organism-list-groups.html` |
| Modal | `css/organisms/Modal.css` | `organism-modal.html` |
| Offcanvas | `css/organisms/Offcanvas.css` | `organism-offcanvas.html` |
| Popovers | `css/organisms/Popovers.css` | `organism-popovers.html` |
| Progress | `css/organisms/Progress.css` | `organism-progress.html` |
| Scrollspy | `css/organisms/Scrollspy.css` | `organism-scrollspy.html` |
| Stepper | `css/organisms/Stepper.css` | `organism-stepper.html` |
| Tables | `css/organisms/Tables.css` | `organism-tables.html` |
| Tabs | `css/organisms/Tabs.css` | `organism-tabs.html` |
| Toasts | `css/organisms/Toasts.css` | `organism-toasts.html` |
| Tooltips | `css/organisms/Tooltips.css` | `organism-tooltips.html` |
| Rating | `css/organisms/Rating.css` | `organism-rating.html` |

## Utilities

| Name | CSS | Page |
| --- | --- | --- |
| Ajax | `css/utilities/Ajax.css` | `utility-ajax.html` |
| Animations | `css/utilities/Animations.css` | `utility-animations.html` |
| EventDelegation | none: htmx attributes on a parent | `utility-event-delegation.html` |
| Helpers | `css/utilities/Helpers.css` | `utility-helpers.html` |
| Notifications | `css/utilities/Notifications.css` | `utility-notifications.html` |
| Flexbox | `css/utilities/Flexbox.css` | `utility-flexbox.html` |
| Grid | `css/utilities/Grid.css` | `start-grid.html` |
| Dark mode | `css/utilities/Darkmode.css` | `start-theming.html` |

## Snippets, templates and pages

| Name | Source | Page |
| --- | --- | --- |
| Forms snippet | `css/snippets/Forms.css` | `snippet-forms.html` |
| Navbar snippet (the site header) | `css/snippets/Header.css` | `snippet-navbar.html` |
| Footer snippet | `css/snippets/Footer.css` | `snippet-footer.html` |
| main-template | `templates/main-template.html` | `template-main.html` |
| HomePage | built from the header, card and footer | `page-home.html` |
| AboutPage | cards, a list group and a table | `page-about.html` |
| ProductPage | carousel, tabs, rating and a form | `page-product.html` |
| ContactPage | forgiving validation | `page-contact.html` |
