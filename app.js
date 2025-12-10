const { useState, useMemo, useRef } = React;
const { Navigation, Footer } = window.SharedComponents || {};
const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

if (!Navigation || !Footer) {
  throw new Error('Shared components failed to load.');
}

const missionStatement =
  "These videos are part of my project to translate Hebrew remembrance day songs into English, in an effort to offer Jewish communities abroad a way to connect with Israelis in remembrance of those we have lost. Join me in memory of the fallen soldiers of the IDF, in memory of the victims of the Holocaust, and in memory of all the victims of Jewish hate worldwide. These videos also serve to share our pain and experiences with the global community, as well as to be used as an educational tool by both Hebrew and English educators.";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const songsData = window.songs || [];

const getYouTubeId = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : url;
};

const Hero = ({ onScrollToSongs }) => (
  <header className="relative overflow-hidden bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc] text-earthBrown pt-16 pb-24">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-10 left-20 w-72 h-72 bg-deepRed/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-oliveGreen/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sageGreen/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="space-y-5 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent">
            Bridging Hebrew Remembrance Songs
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">with the World</span>
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-deepRed to-transparent"></div>
          <img src="Flower.png" alt="" className="h-8 w-auto animate-pulse" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-deepRed to-transparent"></div>
        </div>

        <p className="max-w-5xl text-lg sm:text-xl md:text-2xl leading-relaxed text-earthBrown/90 font-light px-4">
          {missionStatement}
        </p>

        <button
          onClick={onScrollToSongs}
          className="group relative px-10 py-5 bg-gradient-to-r from-deepRed via-[#a82724] to-[#7a1715] text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-deepRed/40 transform hover:scale-110 transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explore the Collection
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#7a1715] via-[#a82724] to-deepRed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>
    </div>
  </header>
);

const SongCard = ({ song }) => {
  const videoId = getYouTubeId(song.videoUrl);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
  const songSlug = slugify(song.title);

  return (
    <a href={`${SITE_ROOT}songs/${songSlug}/`} className="block group">
      <article className="song-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform group-hover:-translate-y-3 transition-all duration-500 border-2 border-sageGreen/20 group-hover:border-deepRed/40">
        <div className="relative overflow-hidden h-56">
          <img
            src={thumbnail}
            alt={`${song.title} thumbnail`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <div className="bg-white text-deepRed rounded-full p-6 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3 bg-gradient-to-br from-white to-lightBeige/30">
          <p className="text-xs uppercase tracking-[0.25em] text-oliveGreen font-bold">
            {song.artist}
          </p>
          <h3 className="text-2xl font-bold text-earthBrown group-hover:text-deepRed transition-colors duration-400 leading-tight">
            {song.title}
          </h3>
          {song.titleHebrew && (
            <p className="text-base text-earthBrown/70 font-['Heebo'] leading-relaxed" dir="rtl">
              {song.titleHebrew}
            </p>
          )}
          <div className="w-20 h-1 bg-gradient-to-r from-deepRed via-[#a82724] to-transparent rounded-full"></div>
        </div>
      </article>
    </a>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const songsSectionRef = useRef(null);

  const filteredSongs = useMemo(() => {
    const term = query.toLowerCase();
    return songsData.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.context.toLowerCase().includes(term)
    );
  }, [query]);

  const handleNavigation = (section) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (section === 'songs' && songsSectionRef.current) {
      songsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
      <Navigation onNavigate={handleNavigation} />
      <Hero onScrollToSongs={() => handleNavigation('songs')} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <section id="songs" ref={songsSectionRef} className="py-24">
          <div className="text-center mb-20">
            <div className="inline-block space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-deepRed to-transparent"></div>
                <svg className="w-6 h-6 text-deepRed animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div className="h-px w-24 bg-gradient-to-l from-transparent via-deepRed to-transparent"></div>
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">
                Memorial Collection
              </p>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent leading-tight pb-1 sm:pb-2">
                13 Songs of Remembrance
              </h2>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-deepRed via-oliveGreen to-sageGreen rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
              <input
                type="text"
                placeholder="Search by title, artist, or story..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="relative w-full rounded-2xl border-2 border-sageGreen/40 bg-white/95 backdrop-blur-sm pl-7 pr-7 py-5 text-lg text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-4 focus:ring-deepRed/20 transition-all duration-300 shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
          {filteredSongs.length === 0 && (
            <div className="text-center mt-20 space-y-4">
              <p className="text-3xl font-bold text-earthBrown/70">No songs match your search.</p>
              <p className="text-xl text-earthBrown/50">Please try different keywords.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
