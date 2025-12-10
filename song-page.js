const { useMemo } = React;
const { Navigation, Footer } = window.SharedComponents || {};
const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

if (!Navigation || !Footer) {
  throw new Error('Shared components missing on song page.');
}

const songsData = window.songs || [];

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

const extractSlugFromPath = () => {
  const match = window.location.pathname.match(/song-([a-z0-9-]+)\.html$/i);
  return match ? match[1].toLowerCase() : null;
};

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

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <p className="text-2xl text-earthBrown mb-6">We couldn’t find that song.</p>
          <a
            href={`${SITE_ROOT}home/#songs`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-deepRed text-white rounded-full font-semibold shadow-lg hover:shadow-deepRed/40 transition-transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the collection
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const videoId = getYouTubeId(song.videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
      <Navigation />
      <header className="relative overflow-hidden bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc] py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-6 left-10 w-56 h-56 bg-deepRed/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-6 right-10 w-64 h-64 bg-oliveGreen/15 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`${SITE_ROOT}home/#songs`}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/80 backdrop-blur border border-sageGreen/40 rounded-full text-earthBrown font-semibold shadow-lg hover:-translate-x-1 transition-transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to collection
            </a>
            <span className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">
              The Zikaron Project
            </span>
          </div>
          <div className="space-y-4 text-earthBrown">
            <p className="text-sm uppercase tracking-[0.3em] text-oliveGreen font-bold">
              {song.artist}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {song.title}
            </h1>
            {song.titleHebrew && (
              <p className="text-2xl text-deepRed/80 font-['Heebo']" dir="rtl">
                {song.titleHebrew}
              </p>
            )}
            <p className="text-base text-earthBrown/70 leading-relaxed">
              {song.credits}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-sageGreen/30 bg-white/90">
          <div className="video-wrapper">
            <iframe
              src={embedUrl}
              title={song.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-sageGreen/20 via-oliveGreen/10 to-transparent border-l-4 border-deepRed rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-earthBrown mb-4 flex items-center gap-3">
            <svg className="w-7 h-7 text-deepRed" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Context & Story
          </h2>
          <p className="whitespace-pre-line text-lg leading-relaxed text-earthBrown/90">
            {song.context}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-oliveGreen/40 pb-4">
              <svg className="w-6 h-6 text-deepRed" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
              </svg>
              <h3 className="text-xl font-bold text-earthBrown">English Lyrics</h3>
            </div>
            <div className="english-lyrics whitespace-pre-line bg-white border-2 border-sageGreen/30 rounded-3xl p-7 shadow-lg text-earthBrown text-base leading-relaxed">
              {song.lyricsEnglish}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-oliveGreen/40 pb-4">
              <svg className="w-6 h-6 text-deepRed" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
              </svg>
              <h3 className="text-xl font-bold text-earthBrown">Hebrew Lyrics</h3>
            </div>
            <div className="hebrew-lyrics whitespace-pre-line bg-white border-2 border-sageGreen/30 rounded-3xl p-7 shadow-lg text-earthBrown text-base leading-relaxed">
              {song.lyricsHebrew}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SongPage />);
