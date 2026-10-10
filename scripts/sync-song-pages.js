// Superseded by tools/build.sh, which compiles the site, generates every song
// page (with SEO and social tags), and creates social-previews/<slug>.jpg for new songs.
// Kept so `node scripts/sync-song-pages.js` still works: it simply runs the build.
const path = require('path');
const { execFileSync } = require('child_process');

execFileSync('bash', [path.join(__dirname, '..', 'tools', 'build.sh')], { stdio: 'inherit' });
