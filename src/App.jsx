import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import xpensistLogo from './assets/xpensist-logo.svg'

function App() {
  const [activeSection, setActiveSection] = useState('top')
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroShift, setHeroShift] = useState(0)
  const [visibleSections, setVisibleSections] = useState({ top: true })
  const navRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  useEffect(() => {
    const sectionIds = ['top', 'why', 'services', 'about', 'contact']
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
    const sectionIds = ['top', 'why', 'services', 'about', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((current) => {
          const next = { ...current }

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next[entry.target.id] = true
            }
          })

          return next
        })
      },
      {
        rootMargin: '-10% 0px -12% 0px',
        threshold: 0.2,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateScrollEffects = () => {
      const doc = document.documentElement
      const totalScrollable = doc.scrollHeight - doc.clientHeight
      const progress = totalScrollable > 0 ? window.scrollY / totalScrollable : 0

      setScrollProgress(progress)
      setHeroShift(Math.min(window.scrollY * 0.08, 42))
    }

    updateScrollEffects()
    window.addEventListener('scroll', updateScrollEffects, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollEffects)
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
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const projects = [
    {
      title: 'Xpensist',
      description: 'A clean, modern finances app for tracking expenses and managing budgets.',
      image: xpensistLogo,
      imageAlt: 'Xpensist logo',
      link: 'https://xpensist.com',
      linkLabel: 'Visit Live Site',
    },
    {
      title: 'Precision Roofing',
      description: 'A professional service website built for roofing companies to showcase their work and convert local leads.',
      image: null,
      imageAlt: 'Precision Roofing preview',
      link: '/projects/precision-roofing',
      linkLabel: 'View Project',
    },
    {
      title: 'Project Title',
      description: 'Short project description will go here.',
      image: null,
      imageAlt: '',
      link: '',
      linkLabel: 'Project Link',
    },
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
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

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

      <section className={`hero reveal ${visibleSections.top ? 'in-view' : ''}`} id="top">
        <div className="hero-content">
          <p className="eyebrow">Web Design & Development</p>
          <p className="hero-personal">
            I&rsquo;m Jonathan, a web developer focused on building clean,
            high-performing websites for small businesses.
          </p>
          <h1>Custom Websites That Help Local Businesses Get More Customers</h1>
          <p className="hero-copy">
            Fast, modern, conversion-focused websites built from scratch.
          </p>
          <p className="hero-intro">
            No templates. No shortcuts. Just websites built to grow your
            business.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button primary">
              Start Your Website
            </a>
            <a href="#about" className="button outline">
              View Work
            </a>
          </div>
        </div>
        <div
          className="hero-badge"
          aria-hidden="true"
          style={{ transform: `translateY(${heroShift}px)` }}
        >
          <img
            src={logo}
            alt=""
            className="hero-logo"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      <section className={`why-section reveal ${visibleSections.why ? 'in-view' : ''}`} id="why">
        <div className="section-label">Why Choose Me</div>
        <h2>Built With Strategy, Clarity, and Quality</h2>
        <p className="section-copy">
          Every website is designed to look professional, load quickly, and
          give potential customers a clear reason to trust your business.
        </p>
        <div className="reason-grid">
          <article className="reason-card">
            <span className="reason-badge">01</span>
            <h3>Custom Built for Your Business</h3>
            <p>No templates. Your website is designed specifically for your brand, your audience, and your goals.</p>
          </article>
          <article className="reason-card">
            <span className="reason-badge">02</span>
            <h3>Fast, Modern, and Reliable</h3>
            <p>Clean design, mobile-first layouts, and fast load times so your site feels professional and trustworthy.</p>
          </article>
          <article className="reason-card">
            <span className="reason-badge">03</span>
            <h3>Designed to Generate Results</h3>
            <p>Built to turn visitors into leads, calls, and paying customers-not just look good.</p>
          </article>
        </div>
        <p className="reason-summary">
          Your website isn&rsquo;t just a design-it&rsquo;s your first impression,
          your credibility, and your sales tool.
        </p>
      </section>

      <section className={`services-section reveal ${visibleSections.services ? 'in-view' : ''}`} id="services">
        <div className="section-label">Services</div>
        <h2>Websites Built for Local Business Growth</h2>
        <p className="section-copy">
          Everything is built around helping your business look more credible,
          attract more attention, and turn visitors into real customers.
        </p>
        <div className="service-grid">
          <article className="service-card">
            <h3>Custom Website Design</h3>
            <p>Professional website design tailored to your business, your branding, and the customers you want to reach.</p>
          </article>
          <article className="service-card">
            <h3>Mobile-Friendly Development</h3>
            <p>Your website will work smoothly across phones, tablets, and desktops so customers get a strong experience everywhere.</p>
          </article>
          <article className="service-card">
            <h3>Lead-Focused Layouts</h3>
            <p>Every page is structured to clearly present your offer, build trust, and encourage people to contact you.</p>
          </article>
          <article className="service-card">
            <h3>Ongoing Website Updates</h3>
            <p>Need changes later? I can help with edits, content updates, and improvements as your business grows.</p>
          </article>
        </div>
      </section>

      <section className={`about reveal ${visibleSections.about ? 'in-view' : ''}`} id="about">
        <div className="section-label">Portfolio</div>
        <h2>Work That Speaks for Itself</h2>
        <p className="section-copy">
          Browse my projects below to see how I approach design, layout, and
          performance. Each site is built from scratch — no templates.
        </p>
        <div className="project-grid" aria-label="Project placeholders">
          {projects.map((project) => (
            <article className="project-box" key={project.title + project.linkLabel}>
              <div className="project-media" aria-hidden="true">
                {project.image ? (
                  <img src={project.image} alt={project.imageAlt} className="project-logo" />
                ) : (
                  <span>Project Image</span>
                )}
              </div>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.link ? (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <span className="project-link">{project.linkLabel}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`cta reveal ${visibleSections.contact ? 'in-view' : ''}`} id="contact">
        <div className="cta-header">
          <div className="section-label">Contact</div>
          <h2>Get a Website That Brings You Customers</h2>
          <p className="section-copy">
            Tell me about your business and I&rsquo;ll build you a website designed
            to bring in customers.
          </p>
          <button
            type="button"
            className="button primary"
            aria-expanded={isContactOpen}
            aria-controls="contact-form-panel"
            onClick={() => setIsContactOpen((current) => !current)}
          >
            {isContactOpen ? 'Close Form' : 'Start Your Project'}
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
