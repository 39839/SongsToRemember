const { useState } = React;
const { Navigation, Footer } = window.SharedComponents || {};
const SITE_ROOT = (typeof window !== 'undefined' && window.__SITE_ROOT__) || './';

if (!Navigation || !Footer) {
  throw new Error('Shared components missing on requests page.');
}

const RequestsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    songTitle: '',
    artist: '',
    songLink: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Create mailto link with form data
    const subject = encodeURIComponent(`Song Translation Request: ${formData.songTitle}`);
    const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}

Song Title: ${formData.songTitle}
Artist: ${formData.artist}
${formData.songLink ? `Link to Song: ${formData.songLink}` : ''}

Message:
${formData.message}

---
Sent from The Zikaron Project Request Form`);

    // Open user's email client
    window.location.href = `mailto:thezikaronproject@outlook.com?subject=${subject}&body=${body}`;

    // Show success message
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        songTitle: '',
        artist: '',
        songLink: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc]">
      <Navigation />

      <header className="relative overflow-hidden bg-gradient-to-br from-[#faf9f5] via-[#f5f3eb] to-[#ebe8dc] text-earthBrown py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-12 left-24 w-72 h-72 bg-deepRed/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-12 right-24 w-96 h-96 bg-oliveGreen/15 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-deepRed to-transparent"></div>
            <img src={`${SITE_ROOT}Flower.png`} alt="" className="h-8 w-auto animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-deepRed to-transparent"></div>
          </div>
          <p className="text-sm uppercase tracking-[0.35em] text-oliveGreen font-bold">Share Your Voice</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-earthBrown via-deepRed to-earthBrown bg-clip-text text-transparent pb-2">
            Request a Song Translation
          </h1>
          <p className="text-xl text-earthBrown/90 leading-relaxed max-w-3xl mx-auto">
            Have a Hebrew remembrance song that speaks to you? Share it with us, and we'll consider translating it for the collection.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        {status === 'success' && (
          <div className="mb-8 bg-gradient-to-r from-oliveGreen/20 to-sageGreen/20 border-2 border-oliveGreen/40 rounded-2xl p-6 text-center">
            <svg className="w-12 h-12 text-oliveGreen mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <h3 className="text-2xl font-bold text-earthBrown mb-2">Thank You!</h3>
            <p className="text-lg text-earthBrown/80">
              Your email client should have opened. Please send the email to submit your request.
            </p>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-sm border-2 border-sageGreen/30 rounded-3xl shadow-2xl p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Song Title and Artist Row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="songTitle" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                  Song Title *
                </label>
                <input
                  type="text"
                  id="songTitle"
                  name="songTitle"
                  value={formData.songTitle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all"
                  placeholder="Song title (Hebrew or English)"
                />
              </div>
              <div>
                <label htmlFor="artist" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                  Artist/Composer *
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all"
                  placeholder="Artist or composer name"
                />
              </div>
            </div>

            {/* Song Link */}
            <div>
              <label htmlFor="songLink" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                Link to Song
                <span className="text-xs font-normal text-earthBrown/60 ml-2">(Optional)</span>
              </label>
              <input
                type="url"
                id="songLink"
                name="songLink"
                value={formData.songLink}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all"
                placeholder="https://www.youtube.com/..."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-earthBrown mb-2 uppercase tracking-wider">
                Additional Information
                <span className="text-xs font-normal text-earthBrown/60 ml-2">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border-2 border-sageGreen/40 bg-white px-4 py-3 text-earthBrown placeholder:text-earthBrown/50 focus:outline-none focus:border-deepRed focus:ring-2 focus:ring-deepRed/20 transition-all resize-none"
                placeholder="Tell us why this song is meaningful to you, or share any relevant context..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group relative px-10 py-5 bg-gradient-to-r from-deepRed via-[#a82724] to-[#7a1715] text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-deepRed/40 transform hover:scale-105 transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'submitting' ? 'Opening Email...' : 'Submit Request'}
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7a1715] via-[#a82724] to-deepRed opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>

            <p className="text-sm text-earthBrown/60 text-center mt-6">
              * Required fields. Your information will only be used to process your request.
            </p>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-sageGreen/20 via-oliveGreen/10 to-transparent border-l-4 border-deepRed rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-earthBrown mb-4 flex items-center gap-3">
            <svg className="w-7 h-7 text-deepRed" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            What Happens Next?
          </h2>
          <ul className="space-y-3 text-lg text-earthBrown/90">
            <li className="flex gap-3">
              <span className="text-deepRed font-bold">1.</span>
              <span>Your email client will open with your request pre-filled.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-deepRed font-bold">2.</span>
              <span>Review the information and click send from your email client.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-deepRed font-bold">3.</span>
              <span>We'll review your request and consider it for future translations.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-deepRed font-bold">4.</span>
              <span>While we can't guarantee every request will be fulfilled, we deeply appreciate your contribution to preserving these songs.</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RequestsPage />);
