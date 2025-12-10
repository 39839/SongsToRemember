const { useState, useMemo, useRef } = React;
const { Navigation, Footer } = window.SharedComponents || {};

if (!Navigation || !Footer) {
  throw new Error('Shared components failed to load.');
}

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
  return match ? match[1] : url;
};

const Hero = ({ onScrollToSongs }) => (
  <header className="relative overflow-hidden bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc] text-earthBrown py-28">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-10 left-20 w-72 h-72 bg-deepRed/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-oliveGreen/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sageGreen/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col items-center text-center gap-10">
        <div className="space-y-5 max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-deepRed to-transparent"></div>
            <img src="Flower.png" alt="" className="h-8 w-auto animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-deepRed to-transparent"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent">
            Bridging Hebrew Remembrance Songs
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">with the World</span>
          </h1>
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

  return (
    <a href={`song.html?id=${song.id}`} className="block group">
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
  const aboutSectionRef = useRef(null);

  const filteredSongs = useMemo(() => {
    const term = query.toLowerCase();
    return songsData.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.context.toLowerCase().includes(term)
    );
  }, [query]);

  const scrollToSection = (section) => {
    const ref = section === 'songs' ? songsSectionRef : aboutSectionRef;
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
      <Navigation onNavigate={scrollToSection} />
      <Hero onScrollToSongs={() => scrollToSection('songs')} />

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
        <section
          id="about"
          ref={aboutSectionRef}
          className="py-24"
        >
          <div className="text-center mb-20">
            <div className="inline-block space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-deepRed to-transparent"></div>
                <svg className="w-6 h-6 text-deepRed animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <div className="h-px w-24 bg-gradient-to-l from-transparent via-deepRed to-transparent"></div>
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">
                Our Mission
              </p>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent">
                The Melody of Memory
              </h2>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm border-2 border-sageGreen/30 rounded-3xl shadow-2xl p-12 sm:p-20">
            <p className="whitespace-pre-line leading-relaxed text-xl md:text-2xl text-earthBrown/90 font-light">
              {aboutEssay}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
