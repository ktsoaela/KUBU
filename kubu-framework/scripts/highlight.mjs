// Authoring helper for the docs: turns a snippet into escaped, colour-coded HTML for a
// <code class="doc-code__block">. It runs on your machine while you write a page, never in the browser.
//
//   node scripts/highlight.mjs < snippet.html          # HTML (default)
//   node scripts/highlight.mjs css < snippet.css       # css | js | shell
//
// Paste the output between <code class="doc-code__block"> and </code>.

import { fileURLToPath } from 'node:url';

const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const span = (cls, text) => `<span class="doc-code__${cls}">${escape(text)}</span>`;

export function dedent(source) {
    const lines = source.replace(/\t/g, '    ').split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines.at(-1).trim()) lines.pop();
    const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(indent).trimEnd()).join('\n');
}

const TAG = /<!--[\s\S]*?-->|<![A-Za-z][^>]*>|<\/?[A-Za-z][\w:.-]*(?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/g;
const ATTR = /(\s+)([^\s=>/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g;

function html(source) {
    let out = '';
    let last = 0;
    for (const match of source.matchAll(TAG)) {
        out += escape(source.slice(last, match.index));
        last = match.index + match[0].length;
        const token = match[0];
        if (token.startsWith('<!--')) {
            out += span('comment', token);
            continue;
        }
        if (token.startsWith('<!')) {
            out += span('tag', token);
            continue;
        }
        const name = token.match(/^<\/?[\w:.-]+/)[0];
        const end = token.match(/\s*\/?>$/)[0];
        const attrs = token.slice(name.length, token.length - end.length);
        if (!attrs.trim()) {
            out += span('tag', name + end.trim());
            continue;
        }
        out += span('tag', name);
        out += attrs.replace(ATTR, (_, space, attr, eq = '', value = '') =>
            escape(space) + span('attr', attr) + escape(eq) + (value ? span('string', value) : ''),
        );
        out += span('tag', end.trim());
    }
    return out + escape(source.slice(last));
}

// Each language is a list of [pattern, token class]; the first pattern that matches wins.
const RULES = {
    css: [
        [/\/\*[\s\S]*?\*\//, 'comment'],
        [/"[^"]*"|'[^']*'/, 'string'],
        [/--[\w-]+/, 'attr'],
        [/@[\w-]+/, 'tag'],
    ],
    js: [
        [/\/\/[^\n]*|\/\*[\s\S]*?\*\//, 'comment'],
        [/"[^"]*"|'[^']*'|`[^`]*`/, 'string'],
        [/\b(?:const|let|import|export|from|new|return|function|if|else|document)\b/, 'tag'],
    ],
    shell: [
        [/#[^\n]*/, 'comment'],
        [/"[^"]*"|'[^']*'/, 'string'],
        [/^(?:npm|npx|node|cd|git)\b/m, 'tag'],
    ],
};

function code(source, lang) {
    const rules = RULES[lang];
    const pattern = new RegExp(rules.map(([re]) => `(${re.source})`).join('|'), 'gm');
    let out = '';
    let last = 0;
    for (const m of source.matchAll(pattern)) {
        out += escape(source.slice(last, m.index));
        last = m.index + m[0].length;
        const group = m.slice(1).findIndex((g) => g !== undefined);
        out += span(rules[group][1], m[0]);
    }
    return out + escape(source.slice(last));
}

export function highlight(source, lang = 'html') {
    const text = dedent(source);
    return lang === 'html' ? html(text) : code(text, lang);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (input += chunk));
    process.stdin.on('end', () => process.stdout.write(highlight(input, process.argv[2] || 'html') + '\n'));
}
