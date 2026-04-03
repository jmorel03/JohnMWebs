import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [activeSection, setActiveSection] = useState('top')
  const navRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  useEffect(() => {
    const sectionIds = ['top', 'about', 'projects', 'contact']
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
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

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
        <h1>Web Experiences That Help Businesses Get Chosen</h1>
        <p className="hero-copy">
          I build fast, high-converting websites for local brands, creators, and
          growing teams that need a strong online presence.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button primary">
            View Portfolio
          </a>
          <a href="#contact" className="button secondary">
            Start a Project
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <h2>What I Do</h2>
        <p>
          From strategy to launch, I design and build portfolio, service, and
          ecommerce sites that look premium and work hard for your business.
        </p>
        <ul className="pill-list">
          <li>Brand-first UI</li>
          <li>Responsive development</li>
          <li>Performance optimization</li>
          <li>SEO setup</li>
        </ul>
      </section>

      <section id="projects" className="projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <article className="project-card">
            <p className="project-type">Service Business</p>
            <h3>Summit Exterior Co.</h3>
            <p>
              Rebuilt a contractor website with clearer offers, before/after
              galleries, and streamlined quote requests.
            </p>
          </article>

          <article className="project-card">
            <p className="project-type">Personal Brand</p>
            <h3>Elena M. Creative</h3>
            <p>
              Crafted a minimal portfolio with storytelling sections and project
              highlights that increased inquiry quality.
            </p>
          </article>

          <article className="project-card">
            <p className="project-type">Retail</p>
            <h3>Northline Goods</h3>
            <p>
              Designed a modern storefront emphasizing product bundles,
              testimonials, and repeat-customer offers.
            </p>
          </article>
        </div>
      </section>

      <section className="cta" id="contact">
        <h2>Ready to Build Something Sharp?</h2>
        <p>
          Tell me what you are launching and I will map out the right site
          structure, visuals, and messaging for your goals.
        </p>
        <a href="mailto:hello@johnmwebs.com" className="button primary">
          hello@johnmwebs.com
        </a>
      </section>

      <footer>
        <p>JohnMWebs</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  )
}

export default App
