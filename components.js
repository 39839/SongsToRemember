const { useState, useEffect, useRef } = React;

const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

const resolvePath = (target) => `${SITE_ROOT}${target}`;

/* --------------------------------------------------------------------------
   Shared helpers
   -------------------------------------------------------------------------- */

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const getYouTubeId = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : url;
};

const thumbnailFor = (song, quality = 'maxresdefault') => {
  const id = getYouTubeId(song.videoUrl);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : '';
};

// YouTube serves a tiny grey placeholder when maxres doesn't exist; fall back to hq.
const handleThumbError = (event) => {
  const img = event.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = img.src.replace('maxresdefault', 'hqdefault');
};

const handleThumbLoad = (event) => {
  const img = event.currentTarget;
  if (!img.dataset.fallback && img.naturalWidth > 0 && img.naturalWidth < 200) {
    handleThumbError(event);
  }
};

const songUrl = (song) => resolvePath(`songs/${slugify(song.title)}/`);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fades `.reveal` elements in as they enter the viewport. Re-run when the list changes.
const useReveal = (deps = []) => {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, deps);
};

/* --------------------------------------------------------------------------
   Icons
   -------------------------------------------------------------------------- */

const Icon = {
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15a.8.8 0 0 0 1.2.7l12.3-7.5a.8.8 0 0 0 0-1.4L8.2 3.8A.8.8 0 0 0 7 4.5z" />
    </svg>
  ),
  Pause: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4.5" width="4" height="15" rx="1" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" />
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  ),
};

/* --------------------------------------------------------------------------
   Share
   -------------------------------------------------------------------------- */

const ShareButton = () => {
  const [tip, setTip] = useState('');

  const flash = (text) => {
    setTip(text);
    setTimeout(() => setTip(''), 2200);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash('Link copied');
    } catch (err) {
      flash('Unable to copy the link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url: window.location.href });
      } catch (err) {
        if (err.name !== 'AbortError') copyToClipboard();
      }
      return;
    }
    copyToClipboard();
  };

  return (
    <div className="share">
      <button type="button" className="share__btn" onClick={handleShare} aria-label="Share this song">
        <Icon.Share />
        Share
      </button>
      {tip && <div className="share__tip" role="status">{tip}</div>}
    </div>
  );
};

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: 'Home', key: 'home', href: 'home/' },
  { label: 'Songs', key: 'songs', href: 'home/#songs' },
  { label: 'About', key: 'about', href: 'about/' },
  { label: 'Requests', key: 'requests', href: 'requests/' },
];

const Navigation = ({ current }) => {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const overlay = !solid || menuOpen;

  return (
    <React.Fragment>
      <nav className={`site-nav ${overlay ? 'site-nav--overlay' : 'site-nav--solid'}`} aria-label="Main">
        <div className="container site-nav__inner">
          <a href={resolvePath('home/')} className="site-nav__brand" aria-label="The Zikaron Project — home">
            <img src={resolvePath('NewHorizontalLogo.png')} alt="The Zikaron Project" />
          </a>

          <div className="site-nav__links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={resolvePath(item.href)}
                className="site-nav__link"
                aria-current={current === item.key ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="site-nav__toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.key}
            href={resolvePath(item.href)}
            onClick={() => setMenuOpen(false)}
            aria-current={current === item.key ? 'page' : undefined}
            tabIndex={menuOpen ? 0 : -1}
            style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : '0ms' }}
          >
            {item.label}
          </a>
        ))}
        <p className="mobile-menu__foot hebrew">יהי זכרם ברוך</p>
      </div>
    </React.Fragment>
  );
};

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */

const FOOTER_QUOTES = [
  {
    hebrew: "וְעַתָּ֗ה כִּתְב֤וּ לָכֶם֙ אֶת־הַשִּׁירָ֣ה הַזֹּ֔את וְלַמְּדָ֥הּ אֶת־בְּנֵֽי־יִשְׂרָאֵ֖ל שִׂימָ֣הּ בְּפִיהֶ֑ם לְמַ֨עַן תִּֽהְיֶה־לִּ֜י הַשִּׁירָ֥ה הַזֹּ֛את לְעֵ֖ד בִּבְנֵ֥י יִשְׂרָאֵֽל׃",
    english: '"And now, write for yourselves this song, and teach it to the Children of Israel. Place it into their mouths, in order that this song will be for Me as a witness for the children of Israel."',
    reference: "Deuteronomy 31:19"
  },
  {
    hebrew: "הַצְּבִי יִשְׂרָאֵל עַל־בָּמוֹתֶיךָ חָלָל אֵיךְ נָפְלוּ גִבּוֹרִים",
    english: '"The glory of Israel lies slain upon your high places. How the mighty have fallen!"',
    reference: "2 Samuel 1:19"
  },
  {
    hebrew: "מִנְּשָׁרִים קַלּוּ מֵאֲרָיוֹת גָּבֵרוּ",
    english: '"They were swifter than eagles, they were stronger than lions."',
    reference: "2 Samuel 1:23"
  },
  {
    hebrew: "וְנָתַתִּי לָהֶם בְּבֵיתִי וּבְחוֹמֹתַי יָד וָשֵׁם... שֵׁם עוֹלָם אֶתֶּן־לוֹ אֲשֶׁר לֹא יִכָּרֵת",
    english: '"And I will give them in My house and within My walls a memorial and a name... an everlasting name that shall not be cut off."',
    reference: "Isaiah 56:5"
  },
  {
    hebrew: "זֵכֶר צַדִּיק לִבְרָכָה",
    english: '"The memory of the righteous is a blessing."',
    reference: "Proverbs 10:7"
  }
];

const Footer = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const goTo = (getNext) => {
    setFading(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(getNext);
      setFading(false);
    }, 600);
  };

  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const interval = setInterval(() => goTo((prev) => (prev + 1) % FOOTER_QUOTES.length), 9000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const quote = FOOTER_QUOTES[current];

  return (
    <footer className="site-footer on-ink">
      <div
        className="container footer-quote"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <img src={resolvePath('assets/flower-sm.png')} alt="" className="footer-quote__flower" />
        <figure className={`footer-quote__body ${fading ? 'footer-quote__body--out' : ''}`} aria-live="polite">
          <blockquote>
            <p className="footer-quote__he" lang="he">{quote.hebrew}</p>
            <p className="footer-quote__en">{quote.english}</p>
          </blockquote>
          <figcaption className="footer-quote__ref">{quote.reference}</figcaption>
        </figure>
        <div className="footer-quote__nav">
          <button
            type="button"
            className="footer-quote__arrow"
            onClick={() => goTo((prev) => (prev - 1 + FOOTER_QUOTES.length) % FOOTER_QUOTES.length)}
            aria-label="Previous verse"
          >
            <Icon.ArrowLeft />
          </button>
          <div className="dots">
            {FOOTER_QUOTES.map((q, index) => (
              <button
                key={q.reference}
                type="button"
                onClick={() => goTo(() => index)}
                aria-label={`Show ${q.reference}`}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="footer-quote__arrow"
            onClick={() => goTo((prev) => (prev + 1) % FOOTER_QUOTES.length)}
            aria-label="Next verse"
          >
            <Icon.ArrowRight />
          </button>
        </div>
      </div>

      <div className="container">
        <div className="footer-base">
          <a href={resolvePath('home/')} className="footer-base__brand" aria-label="The Zikaron Project — home">
            <img src={resolvePath('NewHorizontalLogo.png')} alt="The Zikaron Project" />
          </a>
          <ul className="footer-base__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a href={resolvePath(item.href)}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="mailto:thezikaronproject@outlook.com">Contact</a>
            </li>
          </ul>
          <div className="footer-base__right">
            <p className="footer-base__bless">May their memory be a blessing</p>
            <p className="footer-base__copy">© {new Date().getFullYear()} The Zikaron Project. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --------------------------------------------------------------------------
   Ambient looping video (Higgsfield-generated) over a still poster.

   Safari and every iOS browser get the MP4 inside an <img>, which WebKit plays
   like an animated GIF: it always loops, ignores autoplay rules and Low Power
   Mode, and can never show a play button. Other browsers use a muted <video>.
   -------------------------------------------------------------------------- */

const saveData = () =>
  typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData;

const isAppleWebKit = (() => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const safari = /^((?!chrome|chromium|crios|fxios|edg|opr|android).)*safari/i.test(ua);
  return iOS || safari;
})();

const AmbientVideo = ({ name, alt, playing = true, lazy = false, priority = false, onLive }) => {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [live, setLive] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const stillOnly = prefersReducedMotion() || saveData();
  const small = typeof window !== 'undefined' && window.innerWidth < 900;
  const src = resolvePath(`assets/${name}${small ? '-sm' : ''}.mp4`);
  const poster = resolvePath(`assets/${name}.webp`);

  const markLive = () => {
    if (!live) {
      setLive(true);
      if (onLive) onLive();
    }
  };

  const tryPlay = () => {
    const video = videoRef.current;
    if (!video || !playing || !inView) return;
    const attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(() => {});
  };

  // React never writes the `muted` attribute, and browsers decide on autoplay when
  // loading starts, so mark the video muted/inline first and only then set its source.
  const attachVideo = (node) => {
    videoRef.current = node;
    if (node && !node.dataset.src) {
      node.muted = true;
      node.defaultMuted = true;
      node.setAttribute('muted', '');
      node.setAttribute('playsinline', '');
      node.dataset.src = src;
      node.src = src;
    }
  };

  useEffect(() => {
    if (!lazy || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px' });
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && inView) tryPlay();
    else video.pause();
  }, [playing, inView]);

  const showMotion = !stillOnly && (inView || live);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <img
        src={poster}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding="async"
      />
      {showMotion && isAppleWebKit && (
        <img
          className={`ambient-motion ${live ? 'is-ready' : ''}`}
          src={playing ? src : poster}
          alt=""
          aria-hidden="true"
          onLoad={markLive}
        />
      )}
      {showMotion && !isAppleWebKit && (
        <video
          ref={attachVideo}
          className={live ? 'is-ready' : ''}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={poster}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={tryPlay}
          onPlaying={markLive}
        />
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
   Page shell
   -------------------------------------------------------------------------- */

const PageShell = ({ current, children }) => (
  <React.Fragment>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="grain" aria-hidden="true"></div>
    <Navigation current={current} />
    <main id="main">{children}</main>
    <Footer />
  </React.Fragment>
);

window.SharedComponents = { Navigation, Footer, ShareButton, PageShell, Icon, AmbientVideo };
window.Zikaron = {
  SITE_ROOT,
  resolvePath,
  slugify,
  getYouTubeId,
  thumbnailFor,
  handleThumbError,
  handleThumbLoad,
  songUrl,
  useReveal,
  prefersReducedMotion,
};
