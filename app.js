const { useState, useMemo, useEffect, useRef } = React;
const { PageShell, Icon } = window.SharedComponents || {};
const {
  resolvePath,
  thumbnailFor,
  songUrl,
  useReveal,
  prefersReducedMotion,
} = window.Zikaron || {};

if (!PageShell) {
  throw new Error('Shared components failed to load.');
}

const songsData = window.songs || [];

const MissionStatement = () => (
  <span>
    <strong>The Zikaron Project</strong> is an effort to translate Hebrew remembrance day songs into English, as a means for both Jews and non-Jews abroad to connect with Israeli pain, memory, and grief. By conveying Israelis' story—as told in their own words—to the international community, this project seeks to offer the global community a truer understanding of the Israeli experience, as well as to provide an educational tool for language educators. Most importantly, The Zikaron Project aims to commemorate and eternalize the memory of our fallen, and share their stories with the world.
  </span>
);

// The people named in each song's story. Linked to the song that remembers them.
const REMEMBERED = [
  { name: 'Alon Scagio', note: 'Capt. · Kfir Brigade, 2024', song: 'Beautiful Things to See' },
  { name: 'Amit Man', note: "Paramedic · Kibbutz Be'eri, 2023", song: 'Nothing Will Hurt Me' },
  { name: 'The victims of the Nova festival', note: "Kibbutz Re'im · October 7, 2023", song: 'Dance' },
  { name: 'Sean Mondschein', note: 'Sgt. · Golani Brigade, 2014', song: 'Good Night, Sean' },
  { name: 'Tom Farkash', note: 'Second Lebanon War, 2006', song: 'In Our Kindergarten' },
  { name: 'Erez Stark', note: 'Lt. · Helicopter disaster, 1997', song: 'Nothing Will Hurt Me' },
  { name: 'Chen Brod', note: 'Second Lt. · Lebanese border, 1985', song: 'Fruit of Your Garden' },
  { name: 'The victims of Ras Burqa', note: 'Sinai · October 5, 1985', song: 'Perach (Flower)' },
  { name: 'Zion Hazan', note: 'Lt. · Lebanon', song: 'Nothing Will Hurt Me' },
  { name: 'Eleven members of one kibbutz', note: 'Yom Kippur War, 1973', song: 'The Wheat Grows Again' },
].filter((person) => songsData.some((song) => song.title === person.song));

const pad = (n) => String(n).padStart(2, '0');

/* --------------------------------------------------------------------------
   Ambient looping video (Higgsfield-generated), with a still poster fallback
   -------------------------------------------------------------------------- */

const saveData = () =>
  typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData;

const AmbientVideo = ({ name, alt, playing = true, lazy = false, priority = false }) => {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const stillOnly = prefersReducedMotion() || saveData();
  const small = typeof window !== 'undefined' && window.innerWidth < 900;
  const src = resolvePath(`assets/${name}${small ? '-sm' : ''}.mp4`);

  useEffect(() => {
    if (!lazy || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px' });
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && inView) {
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(() => {});
    } else {
      video.pause();
    }
  }, [playing, inView, ready]);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <img
        src={resolvePath(`assets/${name}.webp`)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
      />
      {!stillOnly && (inView || ready) && (
        <video
          ref={videoRef}
          className={ready ? 'is-ready' : ''}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        />
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
   Sections
   -------------------------------------------------------------------------- */

const Hero = () => {
  const [playing, setPlaying] = useState(true);
  const reduced = prefersReducedMotion();

  return (
    <header className="hero on-ink">
      <div className="hero__media">
        <AmbientVideo
          name="hero"
          alt="Dusk over the Judean hills, with red Dam HaMaccabim flowers in the foreground"
          playing={playing}
          priority
        />
      </div>
      <div className="hero__veil" aria-hidden="true"></div>

      <div className="container hero__content">
        <h1 className="display hero__title rise" style={{ '--i': 1 }}>
          <span>Zikaron</span>
          <span className="hebrew" lang="he">זִכָּרוֹן</span>
        </h1>
        <p className="hero__definition rise" style={{ '--i': 2 }}>
          <span>Zi·ka·ron</span>
          <span className="pos">noun</span>
        </p>
        <p className="hero__lede rise" style={{ '--i': 3 }}>
          The Hebrew word for "memory" or "remembrance."
        </p>
        <div className="hero__actions rise" style={{ '--i': 4 }}>
          <a href="#songs" className="btn btn--primary">
            Explore the Collection
            <Icon.ArrowRight />
          </a>
          <a href={resolvePath('about/')} className="btn btn--ghost">
            About
          </a>
        </div>
      </div>

      {!reduced && (
        <div className="hero__meta rise" style={{ '--i': 6 }}>
          <button
            type="button"
            className="media-toggle"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause background video' : 'Play background video'}
          >
            {playing ? <Icon.Pause /> : <Icon.Play />}
          </button>
        </div>
      )}
      <span className="scroll-cue" aria-hidden="true"></span>
    </header>
  );
};

const Mission = () => (
  <section className="section" aria-labelledby="mission-title">
    <div className="container mission">
      <img src={resolvePath('assets/flower-sm.png')} alt="" className="mission__flower reveal" width="54" height="81" loading="lazy" />
      <h2 id="mission-title" className="sr-only">About The Zikaron Project</h2>
      <p className="mission__body reveal" style={{ '--i': 1 }}>
        <MissionStatement />
      </p>
      <div className="reveal" style={{ '--i': 2 }}>
        <a href={resolvePath('about/')} className="link-arrow">
          Our Story
          <Icon.ArrowRight />
        </a>
      </div>
    </div>
  </section>
);

const Memorial = () => (
  <section className="memorial on-ink" aria-labelledby="memorial-title">
    <div className="memorial__media">
      <AmbientVideo name="candle" alt="A memorial candle burning on Jerusalem stone beside a sprig of red flowers" lazy />
    </div>
    <div className="memorial__veil" aria-hidden="true"></div>

    <div className="container">
      <div className="memorial__quote">
        <p className="memorial__hebrew reveal" lang="he" style={{ '--i': 1 }}>
          במותם ציוו לנו את החיים
        </p>
        <p className="memorial__english reveal" style={{ '--i': 2 }}>
          “With their death, they commanded us to live.”
        </p>
      </div>

      <div className="names">
        <div className="names__head reveal">
          <h2 id="memorial-title" className="eyebrow eyebrow--plain">In memory of</h2>
        </div>
        <ul className="names__list">
          {REMEMBERED.map((person, index) => {
            const song = songsData.find((s) => s.title === person.song);
            return (
              <li key={person.name} className="names__item reveal" style={{ '--i': index % 2 }}>
                <a href={songUrl(song)}>
                  <span>
                    <span className="names__rank">{person.note}</span>
                    <span className="names__name">{person.name}</span>
                  </span>
                  <span className="names__song">{song.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

const SongCard = ({ song, number }) => (
  <li className="song-card">
    <a href={songUrl(song)} className="song-card__link">
      <span className="song-card__thumb">
        <img src={thumbnailFor(song, 'mqdefault')} alt="" width="320" height="180" loading="lazy" decoding="async" />
        <span className="song-card__num">{pad(number)}</span>
      </span>
      <span className="song-card__body">
        <span className="song-card__titles">
          <span className="song-card__title">{song.title}</span>
          <span className="song-card__he hebrew" lang="he">{song.titleHebrew}</span>
        </span>
        <span className="song-card__artist">{song.artist}</span>
        {song.summary && <span className="song-card__summary">{song.summary}</span>}
        <span className="song-card__more">
          Read &amp; listen
          <Icon.ArrowRight />
        </span>
      </span>
    </a>
  </li>
);

const Collection = () => {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();

  const numbered = useMemo(() => songsData.map((song, i) => ({ song, number: i + 1 })), []);

  const filtered = useMemo(() => {
    if (!term) return numbered;
    return numbered.filter(({ song }) =>
      [song.title, song.titleHebrew, song.artist, song.summary, song.context, song.credits]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    );
  }, [term, numbered]);

  useReveal([]);

  const searching = term.length > 0;

  return (
    <section id="songs" className="section" style={{ scrollMarginTop: '40px' }} aria-labelledby="songs-title">
      <div className="container">
        <div className="collection__head">
          <div className="reveal">
            <h2 id="songs-title" className="h-section">
              Songs of <em>Remembrance</em>
            </h2>
            <p className="collection__he hebrew" lang="he">שירי זיכרון</p>
          </div>
          <div className="search reveal" style={{ '--i': 1 }} role="search">
            <Icon.Search />
            <label htmlFor="song-search" className="sr-only">Search songs</label>
            <input
              id="song-search"
              type="search"
              placeholder="Search by title, artist, or story..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {searching && (
              <button type="button" className="search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                <Icon.Close />
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {searching ? `${filtered.length} songs found` : ''}
        </p>

        <ol className="song-grid">
          {filtered.map(({ song, number }) => (
            <SongCard key={song.id} song={song} number={number} />
          ))}
        </ol>

        {searching && filtered.length === 0 && (
          <div className="empty">
            <p>No songs match “{query.trim()}”.</p>
            <p>Try a different title, artist, or word from a song's story.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const App = () => {
  useReveal([]);

  // The page renders after load, so honour a #songs link manually.
  useEffect(() => {
    if (window.location.hash === '#songs') {
      const target = document.getElementById('songs');
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  }, []);

  return (
    <PageShell current="home">
      <Hero />
      <Mission />
      <Memorial />
      <Collection />
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
