"""Generate the static HTML shells for every page of The Zikaron Project."""
import html, json, os, re, subprocess, sys, time

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://thezikaronproject.com"

songs = json.loads(subprocess.check_output(
    ["node", "-e", "global.window={}; require('./songs-data.js'); process.stdout.write(JSON.stringify(window.songs))"],
    cwd=ROOT,
))

FONTS = ("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,300;1,400"
         "&family=Frank+Ruhl+Libre:wght@400;500&family=Manrope:wght@500;600"
         "&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap")


def slugify(text):
    text = re.sub(r"[^a-z0-9\s-]", "", text.lower().strip())
    return re.sub(r"-+", "-", re.sub(r"\s+", "-", text))


# Changes on every build so browsers fetch fresh code after a deploy.
VERSION = str(int(time.time()))


def social_preview(slug, video_id):
    """Create social-previews/<slug>.jpg (1200x630) from the video thumbnail if it doesn't exist yet."""
    out = os.path.join(ROOT, "social-previews", f"{slug}.jpg")
    if os.path.exists(out):
        return f"{SITE}/social-previews/{slug}.jpg"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = os.path.join(ROOT, "social-previews", f".{slug}.src.jpg")
    for variant in ("maxresdefault", "sddefault", "hqdefault"):
        if subprocess.run(["curl", "-L", "--fail", "-sS", f"https://i.ytimg.com/vi/{video_id}/{variant}.jpg", "-o", tmp],
                          capture_output=True).returncode == 0:
            break
    try:
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-vf",
                        "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630", "-q:v", "2", out], check=True)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    return f"{SITE}/social-previews/{slug}.jpg"


def page(prefix, title, description, path, script, image=None, preload=None, image_alt=None):
    e = lambda s: html.escape(s, quote=True)
    image = image or f"{SITE}/assets/og.jpg"
    preload_tag = f'\n  <link rel="preload" as="image" href="{prefix}{preload}">' if preload else ""
    version = VERSION
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>{e(title)}</title>
  <meta name="description" content="{e(description)}">
  <meta name="theme-color" content="#15110e">
  <link rel="canonical" href="{SITE}/{path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="The Zikaron Project">
  <meta property="og:title" content="{e(title)}">
  <meta property="og:description" content="{e(description)}">
  <meta property="og:url" content="{SITE}/{path}">
  <meta property="og:image" content="{image}">
  <meta property="og:image:secure_url" content="{image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{e(image_alt or 'The Zikaron Project')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{e(title)}">
  <meta name="twitter:description" content="{e(description)}">
  <meta name="twitter:image" content="{image}">
  <meta name="twitter:image:alt" content="{e(image_alt or 'The Zikaron Project')}">
  <link rel="icon" type="image/png" sizes="64x64" href="{prefix}assets/favicon.png">
  <link rel="apple-touch-icon" href="{prefix}assets/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://img.youtube.com">
  <link rel="stylesheet" href="{FONTS}">
  <link rel="stylesheet" href="{prefix}styles.css?v={version}">{preload_tag}
  <script>
    window.__SITE_ROOT__ = '{prefix}';
  </script>
</head>
<body>
  <div id="root"></div>
  <noscript><p style="padding:2rem;font-family:Georgia,serif">The Zikaron Project needs JavaScript to display its songs.</p></noscript>

  <script defer src="{prefix}vendor/react.production.min.js"></script>
  <script defer src="{prefix}vendor/react-dom.production.min.js"></script>
  <script defer src="{prefix}js/songs-data.js?v={version}"></script>
  <script defer src="{prefix}js/components.js?v={version}"></script>
  <script defer src="{prefix}js/{script}?v={version}"></script>
</body>
</html>
"""


def write(rel, content):
    full = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote", rel)


SITE_DESC = ("Hebrew remembrance songs, translated into English, so the world can hear Israel's story of memory and loss in its own words.")

write("home/index.html", page("../", "The Zikaron Project — Songs of Remembrance", SITE_DESC, "home/", "app.js", preload="assets/hero.webp"))
write("about/index.html", page("../", "About — The Zikaron Project",
      "Why The Zikaron Project translates Israel's remembrance songs into English, and the story of how it began.", "about/", "about.js",
      preload="assets/jerusalem.webp"))
write("requests/index.html", page("../", "Request a Song — The Zikaron Project",
      "Suggest a Hebrew remembrance song for The Zikaron Project to translate into English.", "requests/", "requests.js",
      preload="assets/wheat.webp"))
write("song.html", page("./", "Song — The Zikaron Project", SITE_DESC, "song.html", "song-page.js"))

for s in songs:
    slug = slugify(s["title"])
    title = f"{s['title']} | Zikaron Project"
    desc = f'Hebrew, transliteration, and English lyrics for "{s["title"]}" by {s["artist"]} on The Zikaron Project.'
    image = social_preview(slug, s["videoUrl"])
    write(f"songs/{slug}/index.html", page("../../", title, desc, f"songs/{slug}/", "song-page.js",
                                          image=image, image_alt=f"{s['title']} video thumbnail"))
