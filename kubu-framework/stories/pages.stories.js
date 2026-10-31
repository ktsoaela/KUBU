// Pages: each story is the live preview markup from its docs page in pages/.
import { story } from './docs.js';

export default { title: 'Pages' };

export const HomePage = story('page-home.html');
export const AboutPage = story('page-about.html');
export const ProductPage = story('page-product.html');
export const ContactPage = story('page-contact.html');
