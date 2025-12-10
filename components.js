const { useState } = React;

const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

const resolvePath = (target) => `${SITE_ROOT}${target}`;

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
    } else {
      window.location.href = resolvePath('home/');
    }

    setMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'Songs', section: 'songs' },
    { label: 'About', section: 'about' },
  ];

  const linkClass =
    "relative px-4 py-2 text-sm tracking-[0.3em] uppercase font-semibold text-earthBrown hover:text-deepRed transition-colors duration-300";

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-sageGreen/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <button
            type="button"
            onClick={() => handleNavigation('home')}
            className="focus:outline-none"
            aria-label="Go to home"
          >
            <img
              src="HorizontalLogo.png"
              alt="The Zikaron Project"
              className="h-[68px] w-auto transform hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
          </button>

          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className={`${linkClass} group`}
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-deepRed transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-3 rounded-full border border-sageGreen/50 text-earthBrown hover:text-deepRed hover:border-deepRed transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
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
          <div className="md:hidden border-t border-sageGreen/30 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className="w-full text-left px-5 py-3 rounded-2xl bg-lightBeige/80 text-earthBrown font-semibold tracking-[0.3em] uppercase text-sm"
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

const Footer = () => (
  <footer className="mt-32 bg-gradient-to-br from-earthBrown via-[#7a6751] to-[#6b5943] text-lightBeige relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deepRed rounded-full blur-3xl"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
      <div className="flex flex-col items-center mb-16">
        <img
          src="HorizontalLogo.png"
          alt="The Zikaron Project"
          className="h-28 w-auto mb-8 filter brightness-0 invert opacity-95 drop-shadow-lg"
        />
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-sageGreen to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="text-center md:text-left space-y-4">
          <h3 className="font-bold text-2xl text-sageGreen">About This Project</h3>
          <p className="text-base text-lightBeige/85 leading-relaxed">
            Honoring the memory of fallen soldiers and victims through translated Hebrew remembrance songs. Created by Naama Ben-Dor.
          </p>
        </div>
        <div className="text-center space-y-4">
          <h3 className="font-bold text-2xl text-sageGreen">In Memory</h3>
          <p className="text-base text-lightBeige/85 leading-relaxed">
            In remembrance of the fallen soldiers of the IDF, victims of the Holocaust, and all victims of hate worldwide.
          </p>
        </div>
        <div className="text-center md:text-right space-y-4">
          <h3 className="font-bold text-2xl text-sageGreen">Educational Tool</h3>
          <p className="text-base text-lightBeige/85 leading-relaxed">
            Serving as a bridge between Jewish communities worldwide and as an educational resource for Hebrew and English educators.
          </p>
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

window.SharedComponents = { Navigation, Footer };
