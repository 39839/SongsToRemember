const Navigation = ({ onNavigate }) => {
  const handleNavigation = (section) => {
    if (typeof onNavigate === 'function') {
      onNavigate(section);
      return;
    }

    if (section === 'songs') {
      window.location.href = 'index.html#songs';
    } else if (section === 'about') {
      window.location.href = 'about.html';
    } else {
      window.location.href = 'index.html';
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-sageGreen/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <img
              src="HorizontalLogo.png"
              alt="The Zikaron Project"
              className="h-[72px] w-auto transform hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          <div className="flex gap-8 items-center">
            <button
              onClick={() => handleNavigation('songs')}
              className="text-earthBrown hover:text-deepRed transition-colors duration-300 font-semibold text-lg relative group"
            >
              Songs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepRed transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="text-earthBrown hover:text-deepRed transition-colors duration-300 font-semibold text-lg relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-deepRed transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
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
