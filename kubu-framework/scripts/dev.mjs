// Serves the site on port 8080 and the Acme Corp desk on port 3000.
// Ctrl+C stops both.

import { spawn } from 'node:child_process';

const isWin = process.platform === 'win32';
const children = [];

function run(command, args, shell) {
    const child = spawn(command, args, { stdio: 'inherit', shell });
    children.push(child);
    return child;
}

function stop() {
    for (const child of children) {
        if (child.exitCode !== null || child.killed) continue;
        if (isWin) spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore', shell: true });
        else child.kill('SIGTERM');
    }
}

process.on('SIGINT', () => { stop(); process.exit(0); });
process.on('SIGTERM', () => { stop(); process.exit(0); });

const desk = run(process.execPath, ['demo/server.mjs'], false);
const site = run(isWin ? 'npx.cmd' : 'npx', ['--yes', 'http-server', '..', '-p', '8080', '-c-1', '-o', '/kubu-framework/pages/index.html'], isWin);

desk.on('exit', (code) => {
    if (code) console.error('The desk on port 3000 stopped. The site on port 8080 is still up.');
});

site.on('exit', (code) => {
    stop();
    process.exit(code ?? 0);
});
