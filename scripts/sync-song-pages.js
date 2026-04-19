const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://thezikaronproject.com';

global.window = {};
require(path.join(ROOT, 'songs-data.js'));
const songs = window.songs || [];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildDescription = (song) =>
  `Hebrew, transliteration, and English lyrics for "${song.title}" by ${song.artist} on The Zikaron Project.`;

const buildSongPage = (song) => {
  const slug = slugify(song.title);
  const title = `${song.title} | Zikaron Project`;
  const description = buildDescription(song);
  const pageUrl = `${SITE_URL}/songs/${slug}/`;
  const imageUrl = song.videoUrl
    ? `https://i.ytimg.com/vi/${song.videoUrl}/hqdefault.jpg`
    : `${SITE_URL}/Logo.png`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../../styles.css">
  <link rel="icon" type="image/png" href="../../Logo.png">
  <link rel="apple-touch-icon" href="../../Logo.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="The Zikaron Project">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${escapeHtml(imageUrl)}">
  <meta property="og:image:alt" content="${escapeHtml(song.title)} video thumbnail">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    window.__SITE_ROOT__ = "../../";
  </script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            deepRed: '#931F1D',
            earthBrown: '#937B63',
            oliveGreen: '#8A9B68',
            sageGreen: '#B6C197',
            lightBeige: '#D5DDBC',
          }
        }
      }
    }
  </script>
</head>
<body class="antialiased bg-lightBeige text-earthBrown">
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="../../songs-data.js"></script>
  <script type="text/babel" src="../../components.js"></script>
  <script type="text/babel" src="../../song-page.js"></script>
</body>
</html>
`;
};

for (const song of songs) {
  const slug = slugify(song.title);
  const songDir = path.join(ROOT, 'songs', slug);
  const songPagePath = path.join(songDir, 'index.html');

  fs.mkdirSync(songDir, { recursive: true });
  fs.writeFileSync(songPagePath, buildSongPage(song), 'utf8');
}

console.log(`Updated ${songs.length} song pages.`);
