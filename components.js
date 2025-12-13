const { useState, useEffect, useRef } = React;

const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

const resolvePath = (target) => `${SITE_ROOT}${target}`;

const ShareButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('Share');

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href
    };

    // Try to use Web Share API (works on mobile and some modern browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setTooltipText('Shared!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Fallback to clipboard if share was cancelled
          copyToClipboard();
        }
      }
    } else {
      // Fallback to clipboard
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setTooltipText('Link copied!');
      setTimeout(() => {
        setTooltipText('Share');
        setShowTooltip(false);
      }, 2000);
    } catch (err) {
      setTooltipText('Unable to copy');
      setTimeout(() => {
        setTooltipText('Share');
        setShowTooltip(false);
      }, 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          if (tooltipText === 'Share') setShowTooltip(false);
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100"
        aria-label="Share this page"
        style={{color: '#2C2C2C'}}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F2F0E4'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50">
          {tooltipText}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

const Navigation = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (section) => {
    if (typeof onNavigate === 'function') {
      if (section === 'home') {
        onNavigate('home');
        setMenuOpen(false);
        return;
      }
      if (section === 'songs') {
        onNavigate('songs');
        setMenuOpen(false);
        return;
      }
    }

    if (section === 'songs') {
      window.location.href = resolvePath('home/#songs');
    } else if (section === 'about') {
      window.location.href = resolvePath('about/');
    } else if (section === 'requests') {
      window.location.href = resolvePath('requests/');
    } else {
      window.location.href = resolvePath('home/');
    }

    setMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'Songs', section: 'songs' },
    { label: 'About', section: 'about' },
    { label: 'Requests', section: 'requests' },
  ];

  const linkClass =
    "relative px-5 py-2 text-[0.9rem] tracking-[0.15em] uppercase font-medium transition-colors duration-300";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto" style={{padding: '0 5%'}}>
        <div className="flex items-center justify-between" style={{height: '85px'}}>
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => handleNavigation('home')}
              className="focus:outline-none transition-opacity duration-300 hover:opacity-80"
              aria-label="Go to home"
            >
              {/* Desktop Logo */}
              <img
                src={resolvePath('NewHorizontalLogo.png')}
                alt="The Zikaron Project"
                className="hidden md:block h-[60px] w-auto"
              />
              {/* Mobile Logo */}
              <img
                src={resolvePath('MobileLogo.png')}
                alt="The Zikaron Project"
                className="block md:hidden h-[50px] w-auto"
              />
            </button>
          </div>

          {/* Navigation Links - Right Side */}
          <div className="hidden md:flex gap-2 items-center ml-auto justify-end" style={{fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif'}}>
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className={`${linkClass} group`}
                style={{color: '#2C2C2C'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9E3E36'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}
              >
                {item.label}
                <span
                  className="absolute left-1/2 -bottom-1 w-0 h-0.5 transition-all duration-300 -translate-x-1/2 group-hover:w-full"
                  style={{backgroundColor: '#9E3E36'}}
                ></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Right Side */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-3 rounded-full border transition-colors"
            style={{borderColor: '#2C2C2C20', color: '#2C2C2C'}}
            onClick={() => setMenuOpen((prev) => !prev)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9E3E36';
              e.currentTarget.style.color = '#9E3E36';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2C2C2C20';
              e.currentTarget.style.color = '#2C2C2C';
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t pt-4 pb-6 space-y-3" style={{borderColor: '#2C2C2C10'}}>
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className="w-full text-left px-5 py-3 rounded-2xl font-semibold tracking-[0.15em] uppercase text-sm transition-colors"
                style={{backgroundColor: '#F2F0E4', color: '#2C2C2C'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9E3E36'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const MemorialCarousel = () => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  const fallenSoldiers = [
    { name: "Itzhak (Itzik) Amir", rank: "Private", image: "https://izkorimagescdn.azureedge.net/fallenimages/515535.jpg" },
    { name: "Arie Hershkovitch", rank: "Private", image: "https://izkorimagescdn.azureedge.net/fallenimages/no_fallen_image.jpg" },
    { name: "Nisim (Avner) Tarango", rank: "First Corporal", image: "https://izkorimagescdn.azureedge.net/fallenimages/004315.jpg" },
    { name: "Yehezkel Mukmal", rank: "", image: "https://izkorimagescdn.azureedge.net/fallenimages/no_fallen_image.jpg" },
    { name: "Alon (Aloni) Yigali", rank: "Corporal", image: "https://izkorimagescdn.azureedge.net/fallenimages/512243.jpg" },
    { name: "Yaakov (Yankale) Yafe", rank: "Sergeant", image: "https://izkorimagescdn.azureedge.net/fallenimages/097537.jpg" },
    { name: "Shalom (Sherly) Algam", rank: "Lance corporal", image: "https://izkorimagescdn.azureedge.net/fallenimages/098654.jpg" },
    { name: "Shalom (Sharel) Ohaion", rank: "Private", image: "https://izkorimagescdn.azureedge.net/fallenimages/008038.jpg" },
    { name: "David Shimonovitch", rank: "", image: "https://izkorimagescdn.azureedge.net/fallenimages/515867.jpg" },
    { name: "Benyamin Gratner", rank: "", image: "https://izkorimagescdn.azureedge.net/fallenimages/no_fallen_image.jpg" },
    { name: "Matan Polivoda", rank: "Staff Sergeant", image: "https://izkorimagescdn.azureedge.net/fallenimages/514739.jpg" },
    { name: "Guy Leo", rank: "Sergeant", image: "https://izkorimagescdn.azureedge.net/fallenimages/515787.jpg" },
    { name: "Moshe Ziporin", rank: "Private", image: "https://izkorimagescdn.azureedge.net/fallenimages/004109.jpg" },
    { name: "Edgar Dreifus", rank: "First Lieutenant", image: "https://izkorimagescdn.azureedge.net/fallenimages/090638.jpg" },
    { name: "Naftali-Yonah Gordon", rank: "Master Sergeant", image: "https://izkorimagescdn.azureedge.net/fallenimages/519335.jpg" }
  ];

  useEffect(() => {
    if (containerRef.current && typeof Swiper !== 'undefined') {
      swiperRef.current = new Swiper(containerRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    }

    return () => {
      if (swiperRef.current && swiperRef.current.destroy) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="memorial-carousel-wrapper">
      <div ref={containerRef} className="swiper">
        <div className="swiper-wrapper">
          {fallenSoldiers.map((soldier, index) => (
            <div key={index} className="swiper-slide" style={{width: '200px'}}>
              <div className="bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={soldier.image}
                    alt={soldier.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  {soldier.rank && <p className="text-xs text-sageGreen/90 mb-1">{soldier.rank}</p>}
                  <p className="text-sm font-medium text-lightBeige">{soldier.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-button-prev" style={{color: '#B6C197'}}></div>
        <div className="swiper-button-next" style={{color: '#B6C197'}}></div>
      </div>
    </div>
  );
};

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
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % FOOTER_QUOTES.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % FOOTER_QUOTES.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevQuote = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev - 1 + FOOTER_QUOTES.length) % FOOTER_QUOTES.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
  <footer className="mt-32 bg-gradient-to-br from-earthBrown via-[#7a6751] to-[#6b5943] text-lightBeige relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deepRed rounded-full blur-3xl"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
      <div className="flex flex-col items-center mb-16">
        <img
          src={resolvePath('NewHorizontalLogo.png')}
          alt="The Zikaron Project"
          className="h-28 w-auto mb-8 filter brightness-0 invert opacity-95 drop-shadow-lg"
        />
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-sageGreen to-transparent"></div>
      </div>

      {/* Quote Carousel */}
      <div className="mb-12">
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-white/10 relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={prevQuote}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sageGreen/20 hover:bg-sageGreen/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous quote"
            >
              <svg className="w-5 h-5 text-lightBeige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextQuote}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sageGreen/20 hover:bg-sageGreen/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next quote"
            >
              <svg className="w-5 h-5 text-lightBeige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Quote Content */}
            <div className="px-8 md:px-12">
              {/* Hebrew Text */}
              <div className={`mb-6 text-center transition-all duration-500 ease-in-out min-h-[5rem] flex items-center justify-center ${
                isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                <p className="text-xl md:text-2xl font-serif text-lightBeige leading-relaxed"
                   style={{direction: 'rtl', fontFamily: 'Frank Ruhl Libre, serif', lineHeight: '1.8'}}>
                  {FOOTER_QUOTES[currentQuote].hebrew}
                </p>
              </div>

              {/* Small Divider */}
              <div className={`flex items-center justify-center my-6 transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-sageGreen to-transparent"></div>
                <div className="mx-3 w-1.5 h-1.5 rounded-full bg-sageGreen"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-sageGreen to-transparent"></div>
              </div>

              {/* English Translation */}
              <div className={`mb-4 text-center transition-all duration-500 ease-in-out min-h-[4.5rem] flex items-center justify-center ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                <p className="text-base md:text-lg italic text-lightBeige/90 leading-relaxed"
                   style={{fontFamily: 'Cardo, serif'}}>
                  {FOOTER_QUOTES[currentQuote].english}
                </p>
              </div>

              {/* Reference */}
              <div className={`text-center transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                <p className="text-sm text-sageGreen/90 font-medium tracking-wide">
                  — {FOOTER_QUOTES[currentQuote].reference} —
                </p>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {FOOTER_QUOTES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote
                        ? 'bg-sageGreen w-8'
                        : 'bg-lightBeige/30 hover:bg-lightBeige/50'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-lightBeige/30 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-base text-lightBeige/70">
          © {new Date().getFullYear()} The Zikaron Project. All rights reserved.
        </p>
        <p className="text-lg text-sageGreen font-bold italic tracking-wide">
          May their memory be a blessing
        </p>
      </div>
    </div>
  </footer>
  );
};

window.SharedComponents = { Navigation, Footer, MemorialCarousel, ShareButton };
