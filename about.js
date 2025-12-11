const { Navigation, Footer } = window.SharedComponents || {};
const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

if (!Navigation || !Footer) {
  throw new Error('Shared components missing on about page.');
}

const missionStatement = "These videos are part of my project to translate Hebrew remembrance day songs into English, in an effort to offer Jewish communities abroad a way to connect with Israelis in remembrance of those we have lost. Join me in memory of the fallen soldiers of the IDF, in memory of the victims of the Holocaust, and in memory of all the victims of Jewish hate worldwide. These videos also serve to share our pain and experiences with the global community, as well as to be used as an educational tool by both Hebrew and English educators.";

const aboutEssay = `
When I was a kid, one of the ways my family attempted to maintain our connection to Israeli culture from afar was by tuning into Israeli TV shows every now and then. One of my favorites was a reality show called "בית ספר למוזיקה," or "Music School,"— essentially a singing competition for kids. To this day, I remember the performance of nine-year-old Gaya Maman, who auditioned with the song "Elifelet." As she began to sing, the audience, judges, and my parents all became visibly stunned. Since I could not understand the words, which were written in a Tanakhic style of Hebrew, I did not understand their reactions. Confused, my brothers and I asked my mom to explain the song to us, and she did. We went over each word, dissecting the story of a weird and socially estranged boy who launches himself onto a grenade to protect his fellow soldiers. I was the same age as Gaya at the time.

That same year I joined Washington D.C.'s branch of Israeli Scouts, where I attended my first remembrance ceremonies commemorating Israel's national remembrance days for the Holocaust, for the assassination of Israeli prime minister Yitzhak Rabin, and for the fallen soldiers of the IDF and victims of terror. My Hebrew was not advanced enough to understand most of the speeches read at these events— but when the band began playing remembrance songs, the emotion hit me like a truck. As a nine-year-old girl, I had never before identified with topics like love and heartbreak that characterized most of the pop songs I had heard on the radio. But these songs felt different: they were an expression of longing and pain and grief for the men and women who I knew sacrificed their own lives to protect my own. In a way, these songs were personal. And even when the language was too advanced for me, the tune and the melody conveyed what the words did not.

As I continued to grow up in the United States, I discovered that remembrance customs and traditions like the ceremonies I had attended were unique to Israel. They offered me a sense of identification with my people and the Israeli community; one that, until recently, I had never felt particularly compelled to project outwards.

Following the events of October 7th, 2023, two major realizations dawned on me. First, I came to grasp that I severely underestimated the presence, virulence, and ubiquity of antisemitism in my environment. But simultaneously, the unity of the Jewish community both in Israel and abroad became all the more palpable. Before October 7th, I had felt that my Israeli origins separated me from my Jewish peers; but when waves of Jew-hatred began to surge throughout the world again, our differences temporarily vanished and our collective identity strengthened. I watched as my American Jewish friends struggled, no less than I, to grapple with the grief and distress that fell upon our people, and as they, too, felt helpless and isolated by the physical distance from our mourning and traumatized Israeli community. But whereas I found comfort in the remembrance songs that expressed the pain I felt and provided a means of connection with Israelis abroad, my English-speaking American-Jewish friends had no such option.

Beyond my growing sense of need to share this music with my Jewish friends, I developed a separate desire to share it with non-Jews as well. Every day, as I woke up to news headlines featuring either Palestinian children or Israeli military equipment, I noticed a striking pattern in the global narrative being shared about the war, and a shortcoming in the Jewish community's response to it, in America as in Israel. The anti-Israel camp pursued an emotionally evocative dehumanization strategy against Israelis. By showcasing photos of thin children and crumbling buildings, and pushing unfounded, inflammatory terms like "genocide," they implicitly painted a narrative of one-sided pain and aggression that echoed historically antisemitic tropes depicting Jews as bloodthirsty, cruel, and inhumane.

In response, Israeli activists countered their false claims with hasbara: legal explanations debunking accusations like genocide, fact-checking images of purportedly starving children who were discovered to have underlying medical conditions, and briefing viewers on the history of Israeli-Palestinian conflict. As I learned through one particularly memorable interaction at my school, these efforts, though necessary, are not enough. A few weeks after October 7th, 2023, I passed by a student taping up "Ceasefire Now!" flyers on my way to class. So soon after the horrific violence of the attacks, I was dumbfounded by the call for a ceasefire, and decided to ask him whether or not he agrees that Israel has a responsibility to target Hamas and what might be a more appropriate response to an attack of such scale and barbarity. In response, he said that the reason he condemns this war is because Israel has such a powerful and technologically advanced military, that they could completely avoid civilian casualties if they wished.

My thoughts instantly flashed back to the Nazi-era caricature depicting an evil, all-powerful Jewish puppet master, pulling the strings of the world with an evil sneer. In his eyes, I realized, Israel was a heartless and omnipotent entity, capable of anything and therefore guilty for any human error that might be legitimized or excused as an inevitable consequence of war for any other nation similarly seeking to retaliate and engage in self-defense. How, I thought, could my peers in the United States fail to realize that— in a country with mandatory military service, in which such a high percentage of parents must send their children to battle— war is a highly dreaded event? How could they not realize that we were fighting for our lives and for our right to exist in safety— not playing a game of whack-a-mole? It dawned on me that by focusing our efforts entirely on combating the false accusations made against our people, we failed to share our own story and our own pain.

Over centuries of hardship and spatial separation, the Jewish people have used the foundational text of their ancestors to hold their nation together. We see many examples of this in the Hebrew Bible itself; when leading the Israelites out of Egypt, Moses instructs them to commemorate the occasion year after year, and "explain to your child on that day, 'It is because of what יהוה [G-d] did for me when I went free from Egypt.'" (Exodus 13:8)

The creation of the synagogue is itself a testament to the role of a shared language, Hebrew, in uniting our people. After the destruction of the Second Temple, when Jews could no longer worship God through sacrifices, they began to worship God through prayer— to congregate wherever they were, and to remember the stories of their ancestors recorded in the Tanakh, the Hebrew Bible.

Now, as our people face new challenges and tragedies that we cannot allow ourselves to forget, we must find new ways to remember. Just as text and music have been crucial in preserving the national memory of generations of Jews, remembrance songs have already become a crucial method among modern-day Israelis for chronicling their shared experience. Since 1951, when David Ben-Gurion established a "Public Council for Soldiers' Commemoration" which designated the 4th of Iyar as a "General Memorial Day for the Heroes of the War of Independence" (later enacted into law in 1963), Israelis have marked the date each year with nationwide remembrance ceremonies and the sounding of a two-minute siren to designate a moment of silence throughout the country in honor of the fallen. At remembrance day ceremonies and events like shira betzibur—communal singing—music has become a tool for Israelis to relate their experiences and find comfort in each other. It is this music, therefore, that can succeed in connecting the Jewish people once again, and serve as the truest expression of their pain, humanity, and peoplehood. Just as translations of the Torah were crucial in maintaining the Jewish identity over centuries of diaspora, translating remembrance songs, too, can bridge the divide between the Jewish communities of today—and between Jewish and non-Jewish worlds.

With the revival of the Hebrew language in the late 19th century and the establishment of the state of Israel, as well as a growing hostility towards Jews worldwide, the Jewish people face both unprecedented challenges and unprecedented tools. Ultimately, we cannot fight the dehumanization of Jews with facts and military strategies alone—nor can Jews maintain their sense of peoplehood and shared identity, in an increasingly secular world, through scripture and prayer alone. By translating Hebrew remembrance songs and creating visually engaging lyric videos, my project aims to provide a means for Jews and non-Jews alike to connect to the Israeli—and thereby Jewish—story, and in the process to commemorate and eternalize the lives of those we have lost.`;

const aboutParagraphs = aboutEssay.split(/\n\s*\n/);

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
    <Navigation />
    <header className="relative overflow-hidden bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc] text-earthBrown py-24">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-12 left-24 w-72 h-72 bg-deepRed/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-24 w-96 h-96 bg-oliveGreen/15 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-8">
        <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">About The Project</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent pb-2">
          The Zikaron Project
        </h1>
        <p className="text-xl text-earthBrown/90 leading-relaxed max-w-3xl mx-auto">
          The Zikaron Project shares the heart of Israel's remembrance tradition with the world through carefully translated lyrics, cinematic storytelling, and reverent design.
        </p>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-24 space-y-16">
      <section className="bg-gradient-to-br from-white via-[#fefdfb] to-lightBeige/20 border-2 border-deepRed/30 rounded-3xl shadow-2xl p-10 space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-deepRed font-bold">Our Story</p>
        <h2 className="text-4xl font-bold text-earthBrown">The Zikaron Project: Our Origins</h2>
        <article className="space-y-6 text-earthBrown/90 text-lg leading-relaxed">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white/95 border-2 border-sageGreen/40 rounded-3xl shadow-2xl p-10 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">Our Mission</p>
          <h2 className="text-3xl font-bold text-earthBrown">Holding Memory in Two Languages</h2>
          <p className="text-lg leading-relaxed text-earthBrown/90">
            {missionStatement}
          </p>
          <a
            href={`${SITE_ROOT}home/#songs`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-deepRed via-[#a82724] to-[#7a1715] text-white rounded-full font-semibold shadow-lg hover:shadow-deepRed/40 transition-transform hover:-translate-y-1"
          >
            Explore the songs
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
        </div>
        <div className="bg-white/80 border-2 border-oliveGreen/30 rounded-3xl shadow-2xl p-10 space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">Who We Serve</p>
          <h2 className="text-3xl font-bold text-earthBrown">Diaspora Communities & Educators</h2>
          <p className="text-lg leading-relaxed text-earthBrown/90">
            These translations help Hebrew and English speakers learn, teach, and mourn together. They are designed for classrooms, ceremonies, and personal reflection.
          </p>
          <ul className="list-disc list-inside text-earthBrown/80 space-y-2">
            <li>Thoughtful translations aiming to preserve poetic nuance</li>
            <li>Contextual backgrounds that honor each song's origin</li>
            <li>Visual storytelling to engage non-Hebrew speakers</li>
          </ul>
        </div>
      </section>

      <section className="bg-white border-2 border-oliveGreen/30 rounded-3xl shadow-2xl p-10 space-y-5">
        <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">About Our Logo</p>
        <h2 className="text-3xl font-bold text-earthBrown">Dam HaMaccabim & the Promise of Zikaron</h2>
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="rounded-3xl shadow-lg border border-sageGreen/40 overflow-hidden flex-shrink-0" style={{width: '325px', height: '325px'}}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/DamHamacabim_ST_06.jpg/500px-DamHamacabim_ST_06.jpg"
              alt="Dam HaMaccabim HaAdom flower"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-earthBrown/90 flex-1">
            <p>
              The flower featured in our logo is the Dam HaMaccabim HaAdom (Helichrysum sanguineum), known in English as the Maccabi blood flower. Due to its vivid red bracts, which are believed by some to resemble drops of blood, the Dam HaMaccabim HaAdom has become the official symbol of Yom HaZikaron, Israel's Memorial Day. Pins and stickers bearing this flower are worn across the country in ceremonies, echoing the legend that the plant blooms wherever the Maccabees shed their blood. As often said at the conclusion of remembrance ceremonies in Israel, "במותם ציוו לנו את החיים״. In English, this phrase translates to the words, "with their death, they commanded us to live." Just as the story of the Maccabees, the sacrifice of our fallen heroes has ensured our survival.
            </p>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutPage />);
