import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [activeSection, setActiveSection] = useState('top')
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const navRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  useEffect(() => {
    const sectionIds = ['top', 'why', 'about', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) {
        return
      }

      const activeLink = navRef.current.querySelector(
        `a[data-section="${activeSection}"]`
      )

      if (!activeLink) {
        setIndicatorStyle((current) => ({ ...current, opacity: 0 }))
        return
      }

      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)

    return () => {
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeSection])

  const navItems = [
    { id: 'top', label: 'Home' },
    { id: 'why', label: 'Why Me' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    const formData = new FormData(form)
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    }

    setSubmitState('sending')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let result = {}
      try {
        result = await response.json()
      } catch {
        // response body wasn't JSON — treat 2xx as success anyway
      }

      if (!response.ok) {
        throw new Error(result.error || 'Could not send your message.')
      }

      setSubmitState('success')
      setSubmitMessage('Thanks. Your message was sent successfully.')
      form.reset()
    } catch (err) {
      setSubmitState('error')
      setSubmitMessage(err.message || 'Something went wrong. Please try again in a moment.')
    }
  }

  return (
    <main>
      <header className="top-nav" aria-label="Main navigation">
        <a href="#top" className="brand-link">
          <img
            src={logo}
            alt="JohnMWebs logo"
            className="brand-mark"
            width="46"
            height="31"
            loading="eager"
            decoding="async"
          />
          <span className="brand-text">JohnMWebs</span>
        </a>
        <nav ref={navRef}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-section={item.id}
              className={activeSection === item.id ? 'active' : ''}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <span className="nav-indicator" style={indicatorStyle} aria-hidden="true" />
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Web Design & Development</p>
          <h1>Custom Websites That Help Local Businesses Get More Customers</h1>
          <p className="hero-copy">
            Fast, modern, conversion-focused websites built from scratch.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button primary">
              Get in Touch
            </a>
            <a href="#about" className="button outline">
              View Work
            </a>
          </div>
        </div>
        <div className="hero-badge" aria-hidden="true">
          <span>J</span>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="section-label">Why Choose Me</div>
        <h2>Built With Strategy, Clarity, and Quality</h2>
        <p className="section-copy">
          Every website is designed to look professional, load quickly, and
          give potential customers a clear reason to trust your business.
        </p>
        <div className="reason-grid">
          <article className="reason-card">
            <h3>Custom From the Ground Up</h3>
            <p>Your site is built specifically for your business, your brand, and the way you want to be seen online.</p>
          </article>
          <article className="reason-card">
            <h3>Modern and High-Performing</h3>
            <p>Clean design, responsive layouts, and fast load times come standard so your site feels current and credible.</p>
          </article>
          <article className="reason-card">
            <h3>Designed to Convert</h3>
            <p>The goal is not only to look good. It is to help more visitors become real leads, calls, and customers.</p>
          </article>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-label">Portfolio</div>
        <h2>Work That Speaks for Itself</h2>
        <p className="section-copy">
          Browse my projects below to see how I approach design, layout, and
          performance. Each site is built from scratch — no templates.
        </p>
        <div className="project-grid" aria-label="Project placeholders">
          {[1, 2, 3].map((project) => (
            <article className="project-box" key={project}>
              <div className="project-media" aria-hidden="true">
                <span>Project Image</span>
              </div>
              <div className="project-details">
                <h3>Project Title</h3>
                <p>Short project description will go here.</p>
                <span className="project-link">Project Link</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="cta-header">
          <div className="section-label">Contact</div>
          <h2>Let&rsquo;s Work Together</h2>
          <p className="section-copy">
            Have a project in mind? Fill out the form and I&rsquo;ll get back to you.
          </p>
          <button
            type="button"
            className="button primary"
            aria-expanded={isContactOpen}
            aria-controls="contact-form-panel"
            onClick={() => setIsContactOpen((current) => !current)}
          >
            {isContactOpen ? 'Close Form' : 'Start a Project'}
          </button>
        </div>

        <div
          id="contact-form-panel"
          className={`contact-panel${isContactOpen ? ' open' : ''}`}
        >
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="client-name">Name</label>
                <input id="client-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label htmlFor="client-email">Email</label>
                <input id="client-email" name="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="client-message">Project Details</label>
              <textarea
                id="client-message"
                name="message"
                rows="5"
                placeholder="Tell me what you want to build..."
                required
              />
            </div>
            <button
              type="submit"
              className="button primary submit-button"
              disabled={submitState === 'sending'}
            >
              {submitState === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {submitMessage ? (
            <p className={`contact-note ${submitState}`}>{submitMessage}</p>
          ) : null}
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} JohnMWebs</span>
        <a href="#top">↑ Back to top</a>
      </footer>
    </main>
  )
}

export default App
