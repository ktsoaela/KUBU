Atomic Design
Atomic Design is similar to BEM, but in my opinion it reads nicer and more cleanly. As opposed to BEM’s top down approach, Atomic Design approaches this from bottom up. The Atomic Design pattern and eBook was written by Brad Frost, broken down into the following:
1. Atoms
2. Molecules
3. Organisms
4. Templates
5. Pages

Atoms
Atoms are the elements themselves, labels, spans, inputs, buttons etc. These are elements that cannot be broken down any further without ceasing to be useful, like actual atoms. These atoms will display your base styles at a glance.

Molecules
Molecules, as the name suggests, are composed of 2 or more different atoms, to create a new, useful feature. A label, input field and button can be composed to create a search function.

Organisms
Following the previous pattern, Organisms are comprised of multiple Molecules and Atoms to create a defined section of a page, such as a header containing the navigation (molecule), search bar (molecule), and logo (atom). Organisms are where Design patterns begin to become evident and reusable, these can be display grids (category, product, form construction), details (product, account, blog post)

Templates
Templates are where we compose multiple organisms to lay out what a page is and how it will feel. This is just the natural progression of this system at this point.

Pages
Looking through the examples given in Atomic Design, Pages appears to be the testing phase, not another progression of state like the previous 4. So approaching it through this lens, we populate the templates with wildly varying data & content. In mockups, a title may look great at 40 characters long, but what if it’s 140? How does this scale, flex and truncate? What about the whole section? Can the page be traversed easily without going back to a tooltip? Pages is the chance to show off the robustness of what you have just built.