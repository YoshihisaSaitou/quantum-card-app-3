import { replaceInFile } from 'replace-in-file';

const REPO = 'quantum-card-app-3';

const results = await replaceInFile({
    files: 'docs/**/*.{html,js,css}',
    from: [/\/_next/g, /\/images/g, /\/favicon\.ico/g],
    to: [`/${REPO}/_next`, `/${REPO}/images`, `/${REPO}/favicon.ico`],
});

const total = results.reduce((sum, r) => sum + (r.numReplacements ?? 0), 0);
console.log(`✅ ${total} replacements done in ${results.length} files`);
