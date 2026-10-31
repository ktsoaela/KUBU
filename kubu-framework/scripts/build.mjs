// Bundles styles.css into dist/kubu.css and dist/kubu.min.css.
// Remote @imports (Google Fonts) are left out of the bundle and re-added at the top.
//
//   node scripts/build.mjs                 # styles.css      -> dist/kubu.css, dist/kubu.min.css
//   node scripts/build.mjs my-kubu.css     # your own entry  -> dist/my-kubu.css, dist/my-kubu.min.css
//
// A custom entry is a file of @import lines for only the atoms, molecules and organisms you use.
import { bundleAsync, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const remote = [];
const resolver = {
  resolve(specifier, from) {
    if (/^https?:/.test(specifier)) {
      remote.push(`@import url("${specifier}");`);
      return `remote:${remote.length}`;
    }
    return path.resolve(path.dirname(from), specifier);
  },
  read(file) {
    return file.startsWith('remote:') ? '' : readFileSync(file, 'utf8');
  },
};

const targets = browserslistToTargets(browserslist('>= 0.5%, last 2 versions, not dead'));
mkdirSync('dist', { recursive: true });

const entry = process.argv[2] || 'styles.css';
const name = entry === 'styles.css' ? 'kubu' : path.basename(entry, '.css');

for (const minify of [false, true]) {
  remote.length = 0;
  const { code, warnings } = await bundleAsync({ filename: entry, minify, targets, resolver });
  warnings.forEach((w) => console.warn(`${w.loc.filename}:${w.loc.line} ${w.message}`));
  const file = `dist/${name}${minify ? '.min' : ''}.css`;
  writeFileSync(file, [...new Set(remote)].join('\n') + '\n' + code);
  console.log(`${file}  ${(code.length / 1024).toFixed(1)} KB`);
}
