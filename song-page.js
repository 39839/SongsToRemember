const { useMemo, useState, useEffect } = React;
const { PageShell, ShareButton, Icon } = window.SharedComponents || {};
const {
  resolvePath,
  slugify,
  getYouTubeId,
  thumbnailFor,
  handleThumbError,
  handleThumbLoad,
  songUrl,
  useReveal,
} = window.Zikaron || {};

if (!PageShell || !ShareButton) {
  throw new Error('Shared components missing on song page.');
}

const songsData = window.songs || [];

const extractSlugFromPath = () => {
  // Extract slug from /songs/[slug]/ or /songs/[slug]/index.html
  const match = window.location.pathname.match(/\/songs\/([a-z0-9-]+)\/?(?:index\.html)?$/i);
  return match ? match[1].toLowerCase() : null;
};

const pad = (n) => String(n).padStart(2, '0');

// Lines with no text mark a stanza break.
const toStanzas = (lyrics = []) =>
  lyrics.reduce(
    (stanzas, line) => {
      const empty = !line.he && !line.en && !line.tr;
      if (empty) {
        if (stanzas[stanzas.length - 1].length) stanzas.push([]);
      } else {
        stanzas[stanzas.length - 1].push(line);
      }
      return stanzas;
    },
    [[]]
  ).filter((stanza) => stanza.length);

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

const Linkified = ({ text }) =>
  text.split(URL_PATTERN).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https?:\/\//, '')}</a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const readPref = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (err) {
    return fallback;
  }
};

const writePref = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* storage unavailable — preference simply isn't remembered */
  }
};

/* --------------------------------------------------------------------------
   Pieces
   -------------------------------------------------------------------------- */

const Player = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(song.videoUrl);
  if (!videoId) return null;

  return (
    <div className="container player">
      <div className="player__frame reveal">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${song.title} — lyric video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="player__poster" onClick={() => setPlaying(true)} aria-label={`Play the lyric video for ${song.title}`}>
            <img src={thumbnailFor(song)} alt="" onError={handleThumbError} onLoad={handleThumbLoad} />
            <span className="player__play">
              <span><Icon.Play /></span>
              <span>Watch the lyric video</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const Story = ({ song }) => {
  const paragraphs = (song.context || '').split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (!paragraphs.length) return null;

  return (
    <section className="section" aria-labelledby="story-title">
      <div className="container story">
        <div className="story__aside reveal">
          <h2 id="story-title" className="h-section">
            Context &amp; <em>Story</em>
          </h2>
        </div>
        <div className="story__body prose dropcap reveal" style={{ '--i': 1 }}>
          {paragraphs.map((p, i) => (
            <p key={i} dir="auto"><Linkified text={p} /></p>
          ))}
        </div>
      </div>
    </section>
  );
};

const Lyrics = ({ song }) => {
  const [mode, setMode] = useState(() => readPref('zikaron:lyrics-mode', 'parallel'));
  const [showTr, setShowTr] = useState(() => readPref('zikaron:show-tr', true));
  const stanzas = useMemo(() => toStanzas(song.lyrics), [song]);
  const hasTr = (song.lyrics || []).some((l) => l.tr);

  useEffect(() => writePref('zikaron:lyrics-mode', mode), [mode]);
  useEffect(() => writePref('zikaron:show-tr', showTr), [showTr]);
  useReveal([mode, showTr]);

  if (!stanzas.length) return null;

  const showHe = mode !== 'english';
  const showEn = mode !== 'hebrew';
  const layout = mode === 'parallel' ? 'lyrics--parallel' : `lyrics--single lyrics--${mode}`;

  const modes = [
    { key: 'parallel', label: 'Side by side' },
    { key: 'english', label: 'English' },
    { key: 'hebrew', label: 'עברית', hebrew: true },
  ];

  return (
    <section className="section lyrics-section" aria-labelledby="lyrics-title">
      <div className="container">
        <div className="lyrics-head reveal">
          <div>
            <h2 id="lyrics-title" className="h-section">
              Lyrics
            </h2>
          </div>
          <div className="controls">
            <div className="segmented" role="group" aria-label="Lyrics language">
              {modes.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={mode === m.key}
                  onClick={() => setMode(m.key)}
                  className={m.hebrew ? 'hebrew-label' : ''}
                  lang={m.hebrew ? 'he' : undefined}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {hasTr && (
              <label className="switch">
                <input type="checkbox" checked={showTr} onChange={(e) => setShowTr(e.target.checked)} />
                <span className="switch__track" aria-hidden="true"></span>
                Transliteration
              </label>
            )}
          </div>
        </div>

        <div className={`stanzas ${layout}`}>
          {stanzas.map((stanza, si) => (
            <div key={`${mode}-${si}`} className="stanza reveal">
              <span className="stanza__num" aria-hidden="true">{pad(si + 1)}</span>
              {stanza.map((line, li) => (
                <div key={li} className="line">
                  {showHe && line.he && <p className="line__he" lang="he">{line.he}</p>}
                  {showTr && line.tr && <p className="line__tr">{line.tr}</p>}
                  {showEn && line.en && <p className="line__en">{line.en}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="lyrics-end reveal">
          <img src={resolvePath('assets/flower-sm.png')} alt="" />
          <p>May their memory be a blessing</p>
          <p className="hebrew" lang="he">יהי זכרם ברוך</p>
        </div>
      </div>
    </section>
  );
};

const Pager = ({ song }) => {
  const index = songsData.indexOf(song);
  if (index < 0 || songsData.length < 2) return null;
  const prev = songsData[(index - 1 + songsData.length) % songsData.length];
  const next = songsData[(index + 1) % songsData.length];

  const Item = ({ target, label }) => (
    <a href={songUrl(target)}>
      <span className="pager__bg" aria-hidden="true">
        <img src={thumbnailFor(target, 'mqdefault')} alt="" loading="lazy" />
      </span>
      <span className="pager__label">{label}</span>
      <p className="pager__title">{target.title}</p>
      {target.titleHebrew && <p className="hebrew pager__hebrew" lang="he">{target.titleHebrew}</p>}
    </a>
  );

  return (
    <nav className="pager" aria-label="More songs">
      <Item target={prev} label="← Previous song" />
      <Item target={next} label="Next song →" />
    </nav>
  );
};

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

const NotFound = () => (
  <PageShell current="songs">
    <header className="page-hero on-ink">
      <div className="page-hero__media">
        <img src={resolvePath('assets/candle.webp')} alt="" />
      </div>
      <div className="page-hero__veil" aria-hidden="true"></div>
      <div className="container page-hero__content">
        <p className="eyebrow rise">Not found</p>
        <h1 className="display page-hero__title rise" style={{ '--i': 1 }}>
          We couldn’t find <em>that song</em>.
        </h1>
        <div className="hero__actions rise" style={{ '--i': 2 }}>
          <a href={resolvePath('home/#songs')} className="btn btn--primary">
            Back to the collection
            <Icon.ArrowRight />
          </a>
        </div>
      </div>
    </header>
  </PageShell>
);

const SongPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const slugFromPath = extractSlugFromPath() || (searchParams.get('slug') || '').toLowerCase();
  const songIdParam = parseInt(searchParams.get('id'), 10);

  const song = useMemo(() => {
    if (slugFromPath) {
      return songsData.find((item) => slugify(item.title) === slugFromPath);
    }
    if (!Number.isNaN(songIdParam)) {
      return songsData.find((item) => item.id === songIdParam);
    }
    return null;
  }, [slugFromPath, songIdParam]);

  useEffect(() => {
    if (song) document.title = `${song.title} (${song.titleHebrew}) — The Zikaron Project`;
  }, [song]);

  useReveal([song]);

  if (!song) return <NotFound />;

  const number = songsData.indexOf(song) + 1;

  return (
    <PageShell current="songs">
      <header className="page-hero on-ink">
        <div className="song-hero__media" aria-hidden="true">
          <img src={thumbnailFor(song, 'mqdefault')} alt="" />
        </div>
        <div className="song-hero__veil" aria-hidden="true"></div>
        <div className="container song-hero__content">
          <div className="song-hero__top rise">
            <a href={resolvePath('home/#songs')} className="back-link">
              <Icon.ArrowLeft />
              Back to collection
            </a>
            <ShareButton />
          </div>
          <p className="eyebrow rise" style={{ '--i': 1 }}>
            No. {pad(number)} · {song.artist}
          </p>
          <h1 className="display song-hero__title rise" style={{ '--i': 2 }}>{song.title}</h1>
          {song.titleHebrew && (
            <p className="hebrew song-hero__hebrew rise" lang="he" style={{ '--i': 3 }}>{song.titleHebrew}</p>
          )}
          {song.credits && <p className="song-hero__credits rise" style={{ '--i': 4 }}>{song.credits}</p>}
        </div>
      </header>

      <Player song={song} />
      <Story song={song} />
      <Lyrics song={song} />
      <Pager song={song} />
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SongPage />);
