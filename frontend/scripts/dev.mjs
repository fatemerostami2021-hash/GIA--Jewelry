// `npm run dev` -> starts Next.js on 127.0.0.1:4010 and opens Chrome on the Persian home page when it is ready.
import { spawn } from 'node:child_process';

const PORT = 4010;
const URL = `http://127.0.0.1:${PORT}/fa`;

const next = spawn('npx', ['next', 'dev', '-p', String(PORT), '-H', '127.0.0.1'], { stdio: 'inherit', shell: true });
next.on('exit', (code) => process.exit(code ?? 0));

const run = (cmd, args) =>
  new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'ignore', detached: true });
    p.on('error', () => resolve(false));
    p.on('exit', (code) => resolve(code === 0));
    p.unref();
  });

async function openBrowser() {
  if (process.platform === 'win32') {
    if (!(await run('cmd', ['/c', 'start', '', 'chrome', URL]))) await run('cmd', ['/c', 'start', '', URL]);
  } else if (process.platform === 'darwin') {
    if (!(await run('open', ['-a', 'Google Chrome', URL]))) await run('open', [URL]);
  } else if (!(await run('google-chrome', [URL]))) await run('xdg-open', [URL]);
}

// Wait until the page really answers (this also pre-compiles it), then open the browser once.
(async () => {
  for (let i = 0; i < 240; i++) {
    try {
      const r = await fetch(URL);
      if (r.ok) return openBrowser().then(() => console.log(`\n  Opened ${URL}\n`));
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log(`\n  Server is slow to start. Open ${URL} manually.\n`);
})();
