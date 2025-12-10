const { useState, useMemo, useEffect, useRef } = React;
const { Search, X, Play, BookOpen, Music2, Heart } = LucideReact;

const missionStatement =
  "These videos are part of my project to translate Hebrew remembrance day songs into English, in an effort to offer Jewish communities abroad a way to connect with Israelis in remembrance of those we have lost. Join me in memory of the fallen soldiers of the IDF, in memory of the victims of the Holocaust, and in memory of all the victims of Jewish hate worldwide. These videos also serve to share our pain and experiences with the global community, as well as to be used as an educational tool by both Hebrew and English educators.";

const aboutEssay = `Naama Ben-Dor
Senior Colloquium
December 09, 2025
The Melody of Memory
When I was a kid, one of the ways my family attempted to maintain our connection to Israeli culture from afar was by tuning into Israeli TV shows every now and then. One of my favorites was a reality show called "בית ספר למוזיקה," or "Music School,"— essentially a singing competition for kids. To this day, I remember the performance of nine year-old Gaya Maman, who auditioned with the song "Elifelet." As she began to sing, the audience, judges, and my parents, all became visibly stunned. Since I could not understand the words, which were written in a Tanakhic style of Hebrew, I did not understand their reactions. Confused, my brothers and I asked my mom to explain the song to us, and she did. We went over each word, dissecting the story of a weird and socially estranged boy who launches himself onto a grenade to protect his fellow soldiers. I was the same age as Gaya at the time.
That same year I joined Washington D.C.'s branch of Israeli Scouts, where I attended my first remembrance ceremonies commemorating Israel's national remembrance days for the Holocaust, for the assassination of Israeli prime minister Yitzhak Rabin, and for the fallen soldiers of the IDF and victims of terror. My Hebrew was not advanced enough to understand most of the speeches read at these events— but when the band began playing remembrance songs, the emotion hit me like a truck. As a nine-year old girl, I had never before identified with topics like love and heartbreak that characterized most of the pop songs I had heard on the radio. But these songs felt different: they were an expression of longing and pain and grief for the men and women who I knew sacrificed their own lives to protect my own. In a way, these songs were personal. And even when the language was too advanced for me, the tune and the melody conveyed what the words did not.
As I continued to grow up in the United States, I discovered that remembrance customs and traditions like the ceremonies I had attended, were unique to Israel. They offered me a sense of identification with my people and the Israeli community; one that, until recently, I had never felt particularly compelled to project outwards.
Following the events of October 7th, 2023, two major realizations dawned on me. First, I came to grasp that I severely underestimated the presence, virulence, and ubiquity of antisemitism in my environment. But simultaneously, the unity of the Jewish community both in Israel and abroad became all the more palpable. Before October 7th, I had felt that my Israeli origins separated me from my Jewish peers; but when waves of Jew-hatred began to surge throughout the world again, our differences temporarily vanished and our collective identity strengthened. I watched as my American Jewish friends struggled, no less than I, to grapple with the grief and distress that fell upon our people, and as they, too, felt helpless and isolated by the physical distance from our mourning and traumatized Israeli community. But whereas I found comfort in the remembrance songs that expressed the pain I felt, and provided a means of connection with Israelis abroad, my English-speaking American-Jewish friends had no such option.
Beyond my growing sense of need to share this music with my Jewish friends, I developed a separate desire to share it with non-Jews as well. Every day, as I woke up to news headlines featuring either Palestinian children or Israeli military equipment, I noticed a striking pattern in the global narrative being shared about the war, and a shortcoming in the Jewish community's response to it, in America as in Israel. The anti-Israel camp pursued an emotionally evocative dehumanization strategy against Israelis. By showcasing photos of thin children and crumbling buildings, and pushing unfounded, inflammatory terms like "genocide," they implicitly painted a narrative of one-sided pain and aggression that echoed historically antisemitic tropes depicting Jews as bloodthirsty, cruel, and inhumane.
In response, Israeli activists countered their false claims with hasbara: legal explanations debunking accusations like genocide, fact-checking images of purportedly starving children who were discovered to have underlying medical conditions and briefing viewers on the history of Israeli-Palestinian conflict. As I learned through one particularly memorable interaction at my school, these efforts, though necessary, are not enough. A few weeks after October 7th, 2023, I passed by a student taping up "Ceasefire Now!" flyers on my way to class. So soon after the horrific violence of the attacks, I was dumbfounded by the call for a ceasefire, and decided to ask him whether or not he agrees that Israel has a responsibility to target Hamas and what might be a more appropriate response to an attack of such scale and barbarity. In response, he said that the reason he condemns this war is because Israel has such a powerful and technologically advanced military, that they could completely avoid civilian casualties if they wished.
My thoughts instantly flashed back to the Nazi-era caricature depicting an evil, all-powerful Jewish puppet master, pulling the strings of the world with an evil sneer. In his eyes, I realized, Israel was a heartless and omnipotent entity, capable of anything and therefore guilty for any human error that might be legitimized or excused as an inevitable consequence of war for any other nation similarly seeking to retaliate and engage in self-defense. How, I thought, could my peers in the United States fail to realize that— in a country with mandatory military service, in which such a high percentage of parents must send their children to battle— war is a highly dreaded event? How could they not realize that we were fighting for our lives and for our right to exist in safety— not playing a game of whack-a-mole? It dawned on me that by focusing our efforts entirely on combating the false accusations made against our people, we failed to share our own story and our own pain.

Over centuries of hardship and spatial separation, the Jewish people have used the foundational text of their ancestors to hold their nation together. We see many examples of this in the Hebrew Bible itself; when leading the Israelites out of Egypt, Moses instructs them to commemorate the occasion year after year, and "explain to your child on that day, 'It is because of what יהוה [G-d] did for me when I went free from Egypt.'" (Exodus 13:8)
The creation of the synagogue is itself a testament to the role of a shared language, Hebrew, in uniting our people. After the destruction of the Second Temple, when Jews could no longer worship God through sacrifices, they began to worship God through prayer— to congregate wherever they were, and to remember the stories of their ancestors recorded in the Tanakh, the Hebrew Bible.
Now, as our people face new challenges and tragedies that we cannot allow ourselves to forget, we must find new ways to remember. Just as text and music have been crucial in preserving the national memory of generations of Jews, remembrance songs have already become a crucial method among modern-day Israelis for chronicling their shared experience. Since 1951, when David Ben-Gurion established a "Public Council for Soldiers' Commemoration" which designated the 4th of Iyar as a "General Memorial Day for the Heroes of the War of Independence" (later enacted into law in 1963), Israelis have marked the date each year with nation-wide remembrance ceremonies and the sounding of a two-minute siren to designate a moment of silence throughout the country in honor of the fallen., At remembrance day ceremonies and events like shira betzibur— communal singing— music has become a tool for Israelis to relate their experiences and find comfort in each other. It is this music, therefore, that can succeed in connecting the Jewish people once again, and serve as the truest expression of their pain, humanity, and peoplehood. Just as translations of the Torah were crucial in maintaining the Jewish identity over centuries of diaspora, translating remembrance songs, too, can bridge the divide between the Jewish communities of today— and between Jewish and non-Jewish worlds.
With the revival of the Hebrew language in the late 19th-century and the establishment of the state of Israel, as well as a growing hostility towards Jews worldwide, the Jewish people face both unprecedented challenges and unprecedented tools. Ultimately, we cannot fight the dehumanization of Jews with facts and military strategies alone— nor can Jews maintain their sense of peoplehood and shared identity, in an increasingly secular world, through scripture and prayer alone. By translating Hebrew remembrance songs and creating visually engaging lyric videos, my project aims to provide a means for Jews and non-Jews alike to connect to the Israeli– and thereby Jewish - story, and in the process to commemorate and eternalize the lives of those we have lost.`;

const songsData = window.songs || [];

const getYouTubeId = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : "";
};

const Hero = ({ onScrollToSongs, onScrollToAbout }) => (
  <header className="relative overflow-hidden bg-gradient-to-b from-lightBeige via-[#dfe6c8] to-[#d0d7b6] text-earthBrown pb-14">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,31,29,0.09),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(138,155,104,0.08),transparent_30%)]" />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-10">
      <div className="flex flex-col items-center text-center gap-6">
        <img
          src="Logo.webp"
          alt="SongsToRemember logo"
          className="logo drop-shadow-md"
        />
        <div className="flex items-center gap-2 text-deepRed uppercase tracking-[0.2em] text-sm font-semibold">
          <Music2 className="w-5 h-5" />
          <span>SongsToRemember</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Bridging Hebrew Remembrance Songs with the World
        </h1>
        <p className="max-w-4xl text-lg sm:text-xl leading-relaxed text-earthBrown/90">
          {missionStatement}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onScrollToSongs}
            className="btn-primary shadow-md shadow-deepRed/15 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Explore Songs
          </button>
          <button
            onClick={onScrollToAbout}
            className="btn-secondary shadow-md shadow-oliveGreen/20 flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            About the Project
          </button>
        </div>
      </div>
    </div>
  </header>
);

const SongCard = ({ song, onClick }) => {
  const videoId = getYouTubeId(song.videoUrl);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";

  return (
    <article
      className="song-card bg-white/75 border border-oliveGreen/30 rounded-xl overflow-hidden shadow-sm flex flex-col"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={`${song.title} thumbnail`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000088] via-transparent to-transparent flex items-center justify-center">
          <div className="bg-white/80 text-deepRed rounded-full p-3 shadow">
            <Play className="w-7 h-7" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-oliveGreen font-semibold">
          {song.artist}
        </p>
        <h3 className="text-xl font-semibold text-earthBrown">{song.title}</h3>
        <p className="text-sm text-earthBrown/80 max-h-16 overflow-hidden">
          {song.context}
        </p>
      </div>
    </article>
  );
};

const DetailModal = ({ song, onClose }) => {
  const videoId = getYouTubeId(song?.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0`
    : "";

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content shadow-2xl border border-oliveGreen/30"
        onClick={stopPropagation}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-oliveGreen font-semibold">
                {song.artist}
              </p>
              <h2 className="text-3xl font-bold text-earthBrown leading-tight">
                {song.title}
              </h2>
              <p className="text-sm text-earthBrown/80 mt-1">{song.credits}</p>
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
            <div className="video-wrapper">
              <iframe
                src={embedUrl}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="context-box text-earthBrown">
            <h3 className="text-xl font-semibold mb-3 text-earthBrown flex items-center gap-2">
              <SparklesIcon />
              Context & Story
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-earthBrown/90">
              {song.context}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-earthBrown">
                <BookOpen className="w-5 h-5 text-oliveGreen" />
                English Lyrics
              </h4>
              <div className="english-lyrics whitespace-pre-line bg-white/70 border border-oliveGreen/25 rounded-lg p-4 shadow-inner text-earthBrown">
                {song.lyricsEnglish}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 text-earthBrown">
                <BookOpen className="w-5 h-5 text-deepRed" />
                Hebrew Lyrics
              </h4>
              <div className="hebrew-lyrics whitespace-pre-line bg-white/70 border border-oliveGreen/25 rounded-lg p-4 shadow-inner text-earthBrown">
                {song.lyricsHebrew}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = () => {
  const Icon = LucideReact?.Sparkles || (() => null);
  return <Icon className="w-5 h-5 text-deepRed" />;
};

const App = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [query, setQuery] = useState("");
  const songsSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedSong ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSong]);

  const filteredSongs = useMemo(() => {
    const term = query.toLowerCase();
    return songsData.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.context.toLowerCase().includes(term)
    );
  }, [query]);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-lightBeige text-earthBrown">
      <Hero
        onScrollToSongs={() => scrollToSection(songsSectionRef)}
        onScrollToAbout={() => scrollToSection(aboutSectionRef)}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <section ref={songsSectionRef} className="py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-oliveGreen font-semibold flex items-center gap-2">
                <Music2 className="w-5 h-5" />
                Song Library
              </p>
              <h2 className="text-3xl font-bold">13 Videos of Memory and Hope</h2>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earthBrown/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, artist, or story..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-oliveGreen/40 bg-white/80 pl-10 pr-3 py-2 text-earthBrown placeholder:text-earthBrown/60 shadow-inner focus:outline-none focus:ring-2 focus:ring-oliveGreen/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} onClick={() => setSelectedSong(song)} />
            ))}
          </div>
          {filteredSongs.length === 0 && (
            <p className="mt-6 text-earthBrown/70">
              No songs match that search yet. Try a different name or story word.
            </p>
          )}
        </section>

        <section
          ref={aboutSectionRef}
          className="py-12 sm:py-16 border-t border-oliveGreen/30"
        >
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-oliveGreen font-semibold mb-3">
            <BookOpen className="w-5 h-5" />
            About SongsToRemember
          </div>
          <h2 className="text-3xl font-bold mb-4">The Melody of Memory</h2>
          <div className="bg-white/80 border border-oliveGreen/35 rounded-xl shadow-md p-6 sm:p-8">
            <p className="whitespace-pre-line leading-relaxed text-lg text-earthBrown/90">
              {aboutEssay}
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-earthBrown text-lightBeige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <Heart className="w-5 h-5 text-sageGreen" />
            SongsToRemember
          </div>
          <p className="text-sm text-lightBeige/80">
            © {new Date().getFullYear()} SongsToRemember. In memory, with hope.
          </p>
        </div>
      </footer>

      {selectedSong && <DetailModal song={selectedSong} onClose={() => setSelectedSong(null)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
