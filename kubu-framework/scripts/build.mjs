// Bundles styles.css into dist/kubu.css and dist/kubu.min.css.
// Remote @imports (Google Fonts) are left out of the bundle and re-added at the top.
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

for (const minify of [false, true]) {
  remote.length = 0;
  const { code, warnings } = await bundleAsync({ filename: 'styles.css', minify, targets, resolver });
  warnings.forEach((w) => console.warn(`${w.loc.filename}:${w.loc.line} ${w.message}`));
  const file = minify ? 'dist/kubu.min.css' : 'dist/kubu.css';
  writeFileSync(file, [...new Set(remote)].join('\n') + '\n' + code);
  console.log(`${file}  ${(code.length / 1024).toFixed(1)} KB`);
}
