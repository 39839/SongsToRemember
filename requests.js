const { useState } = React;
const { PageShell, Icon } = window.SharedComponents || {};
const { resolvePath, useReveal } = window.Zikaron || {};

if (!PageShell) {
  throw new Error('Shared components missing on requests page.');
}

const EMPTY_FORM = {
  name: '',
  email: '',
  songTitle: '',
  artist: '',
  songLink: '',
  message: ''
};

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Please share your name.';
  if (!data.email.trim()) errors.email = 'Please add an email so we can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'That email address doesn’t look complete.';
  if (!data.songTitle.trim()) errors.songTitle = 'Which song would you like translated?';
  if (!data.artist.trim()) errors.artist = 'Please add the artist or composer.';
  if (data.songLink.trim() && !/^https?:\/\/\S+$/i.test(data.songLink.trim())) errors.songLink = 'Links should start with http:// or https://';
  return errors;
};

const Field = ({ id, label, optional, error, children }) => (
  <div className={`field ${error ? 'field--error' : ''}`}>
    <label htmlFor={id}>
      <span>{label}</span>
      {optional && <span className="opt">(Optional)</span>}
    </label>
    {children}
    {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
  </div>
);

const RequestsPage = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  useReveal([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.getElementById(Object.keys(found)[0]);
      if (first) first.focus();
      return;
    }

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

    setTimeout(() => {
      setStatus('success');
      setFormData(EMPTY_FORM);
    }, 1000);
  };

  const inputProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <PageShell current="requests">
      <header className="page-hero on-ink">
        <div className="page-hero__media">
          <img src={resolvePath('assets/wheat.webp')} alt="A wheat field in the Jezreel Valley at first light" />
        </div>
        <div className="page-hero__veil" aria-hidden="true"></div>
        <div className="container page-hero__content">
          <p className="eyebrow rise">Share Your Voice</p>
          <h1 className="display page-hero__title rise" style={{ '--i': 1 }}>
            Request a Song Translation
          </h1>
          <p className="page-hero__lede rise" style={{ '--i': 2 }}>
            Have a Hebrew remembrance song that speaks to you? Share it with us, and we'll consider translating it for the collection.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container request-layout">
          <div className="reveal">
            {status === 'success' && (
              <div className="notice" role="status">
                <div>
                  <strong>Thank You!</strong>
                  <p>Your email client should have opened. Please send the email to submit your request.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="form" noValidate>
              <div className="form__row">
                <Field id="name" label="Your Name *" error={errors.name}>
                  <input type="text" autoComplete="name" placeholder="Your full name" {...inputProps('name')} />
                </Field>
                <Field id="email" label="Your Email *" error={errors.email}>
                  <input type="email" autoComplete="email" placeholder="your.email@example.com" {...inputProps('email')} />
                </Field>
              </div>

              <div className="form__row">
                <Field id="songTitle" label="Song Title *" error={errors.songTitle}>
                  <input type="text" placeholder="Song title (Hebrew or English)" {...inputProps('songTitle')} />
                </Field>
                <Field id="artist" label="Artist/Composer *" error={errors.artist}>
                  <input type="text" placeholder="Artist or composer name" {...inputProps('artist')} />
                </Field>
              </div>

              <Field id="songLink" label="Link to Song" optional error={errors.songLink}>
                <input type="url" placeholder="https://www.youtube.com/..." {...inputProps('songLink')} />
              </Field>

              <Field id="message" label="Additional Information" optional>
                <textarea
                  rows="5"
                  placeholder="Tell us why this song is meaningful to you, or share any relevant context..."
                  {...inputProps('message')}
                />
              </Field>

              <div className="form__foot">
                <p className="form__note">* Required fields. Your information will only be used to process your request.</p>
                <button type="submit" className="btn btn--primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Opening Email...' : 'Submit Request'}
                  <Icon.ArrowRight />
                </button>
              </div>
            </form>
          </div>

          <aside className="reveal" style={{ '--i': 1 }}>
            <p className="eyebrow">What Happens Next?</p>
            <ol className="steps">
              <li>Your email client will open with your request pre-filled.</li>
              <li>Review the information and click send from your email client.</li>
              <li>We'll review your request and consider it for future translations.</li>
              <li>While we can't guarantee every request will be fulfilled, we deeply appreciate your contribution to preserving these songs.</li>
            </ol>
          </aside>
        </div>
      </section>
    </PageShell>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RequestsPage />);
