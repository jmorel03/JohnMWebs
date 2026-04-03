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
    const sectionIds = ['top', 'about', 'contact']
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
        <p className="eyebrow">JohnMWebs</p>
        <h1>Portfolio Website for Client Work</h1>
        <p className="hero-copy">
          A simple space to showcase my work so clients can quickly see my
          style and capabilities.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="button primary">
            View Portfolio
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <h2>Portfolio</h2>
        <p>
          This is my portfolio website where clients can view my work, style,
          and upcoming projects in one simple place.
        </p>
      </section>

      <section className="cta" id="contact">
        <h2>Ready to Build Something Sharp?</h2>
        <p>
          Tell me what you are launching and I will map out the right site
          structure, visuals, and messaging for your goals.
        </p>
        <button
          type="button"
          className="button primary"
          aria-expanded={isContactOpen}
          aria-controls="contact-form-panel"
          onClick={() => setIsContactOpen((current) => !current)}
        >
          {isContactOpen ? 'Hide Contact Form' : 'Open Contact Form'}
        </button>

        <div
          id="contact-form-panel"
          className={`contact-panel${isContactOpen ? ' open' : ''}`}
        >
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="client-name">Name</label>
            <input id="client-name" name="name" type="text" required />

            <label htmlFor="client-email">Email</label>
            <input id="client-email" name="email" type="email" required />

            <label htmlFor="client-message">Project Details</label>
            <textarea
              id="client-message"
              name="message"
              rows="4"
              placeholder="Tell me what you want to build..."
              required
            />

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
        <p>JohnMWebs</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  )
}

export default App
