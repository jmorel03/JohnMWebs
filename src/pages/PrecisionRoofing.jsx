import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PrecisionRoofing.css'

import heroImg from '../assets/precision-roofing/aerial-roof-replacement.jpg'
import shingleImg from '../assets/precision-roofing/shingle-installation.jpg'
import metalImg from '../assets/precision-roofing/metal-roof-installation.jpg'
import tileImg from '../assets/precision-roofing/tile-roof-installation.jpg'
import flatRoofImg from '../assets/precision-roofing/flat-roof-waterproofing.jpg'
import aerialImg from '../assets/precision-roofing/aerial-shingle-replacement.jpg'

const services = [
  {
    image: shingleImg,
    alt: 'Asphalt shingle installation',
    title: 'Asphalt Shingles',
    description:
      'The most popular roofing choice — durable, affordable, and available in a wide range of colors and styles to match your home.',
  },
  {
    image: metalImg,
    alt: 'Metal roof installation',
    title: 'Metal Roofing',
    description:
      'Long-lasting and energy-efficient. Metal roofs withstand extreme weather and can last 50+ years with minimal maintenance.',
  },
  {
    image: tileImg,
    alt: 'Tile roof installation',
    title: 'Tile Roofing',
    description:
      'Classic tile roofing that adds curb appeal and stands up to heat and moisture. Ideal for Mediterranean and Spanish-style homes.',
  },
  {
    image: flatRoofImg,
    alt: 'Flat roof waterproofing',
    title: 'Flat & Commercial Roofing',
    description:
      'Expert torch-down and membrane roofing for flat roofs on commercial buildings and multi-family properties.',
  },
]

export default function PrecisionRoofing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setFormState('sending')
    await new Promise((r) => setTimeout(r, 1000))
    setFormState('sent')
    form.reset()
  }

  return (
    <div className="pr-root">
      {/* ── NAV ── */}
      <header className="pr-nav">
        <div className="pr-nav-inner">
          <div className="pr-brand">
            <span className="pr-brand-icon">⬡</span>
            <span className="pr-brand-name">Precision Roofing</span>
          </div>

          <button
            className={`pr-hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`pr-nav-links${menuOpen ? ' open' : ''}`}>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#contact" className="pr-nav-cta" onClick={() => setMenuOpen(false)}>
              Free Estimate
            </a>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pr-hero">
        <img src={heroImg} alt="Aerial view of roof replacement in progress" className="pr-hero-bg" />
        <div className="pr-hero-overlay" />
        <div className="pr-hero-content">
          <p className="pr-hero-eyebrow">Licensed &amp; Insured · Serving the Greater Metro Area</p>
          <h1 className="pr-hero-headline">
            Roofing Done Right.<br />The First Time.
          </h1>
          <p className="pr-hero-sub">
            Precision Roofing delivers expert installation, repair, and replacement for residential and commercial properties — on time and on budget.
          </p>
          <div className="pr-hero-actions">
            <a href="#contact" className="pr-btn-primary">Get a Free Estimate</a>
            <a href="#services" className="pr-btn-ghost">Our Services</a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="pr-trust-bar">
        <div className="pr-trust-inner">
          <span>⭐ 500+ Roofs Completed</span>
          <span>🏆 15+ Years Experience</span>
          <span>✅ Licensed &amp; Fully Insured</span>
          <span>📞 24/7 Emergency Service</span>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="pr-section pr-services">
        <div className="pr-container">
          <p className="pr-section-eyebrow">What We Do</p>
          <h2 className="pr-section-title">Roofing Services</h2>
          <p className="pr-section-sub">
            From simple repairs to full replacements, we handle every roofing job with the same commitment to quality.
          </p>
          <div className="pr-service-grid">
            {services.map((s) => (
              <div key={s.title} className="pr-service-card">
                <div className="pr-service-img-wrap">
                  <img src={s.image} alt={s.alt} />
                </div>
                <div className="pr-service-body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / WHY US ── */}
      <section id="about" className="pr-section pr-about">
        <div className="pr-container pr-about-inner">
          <div className="pr-about-img">
            <img src={aerialImg} alt="Roofing crew working on a residential roof" />
          </div>
          <div className="pr-about-copy">
            <p className="pr-section-eyebrow">Why Precision Roofing</p>
            <h2 className="pr-section-title">Built on Trust. Proven by Results.</h2>
            <p>
              We're a locally owned roofing company that takes pride in every job — whether it's patching a single shingle or replacing an entire commercial roof. No subcontractors, no shortcuts.
            </p>
            <ul className="pr-checklist">
              <li>Direct communication with your crew lead from start to finish</li>
              <li>Detailed written estimates — no surprise charges</li>
              <li>Clean job sites, every single time</li>
              <li>Workmanship warranty on every project</li>
            </ul>
            <a href="#contact" className="pr-btn-primary">Get Your Free Estimate</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="pr-section pr-contact">
        <div className="pr-container pr-contact-inner">
          <div className="pr-contact-copy">
            <p className="pr-section-eyebrow">Contact Us</p>
            <h2 className="pr-section-title">Let's Talk About Your Roof</h2>
            <p>Fill out the form and we'll get back to you within one business day with a free, no-obligation estimate.</p>
            <div className="pr-contact-details">
              <div className="pr-contact-item">
                <span className="pr-contact-icon">📞</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="pr-contact-item">
                <span className="pr-contact-icon">✉️</span>
                <span>info@precisionroofing.com</span>
              </div>
              <div className="pr-contact-item">
                <span className="pr-contact-icon">📍</span>
                <span>Serving the Greater Metro Area</span>
              </div>
            </div>
          </div>

          <form className="pr-form" onSubmit={handleSubmit}>
            <div className="pr-form-row">
              <label>
                Name
                <input type="text" name="name" required placeholder="John Smith" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" placeholder="(555) 000-0000" />
              </label>
            </div>
            <label>
              Email
              <input type="email" name="email" required placeholder="john@example.com" />
            </label>
            <label>
              Service Needed
              <select name="service">
                <option value="">Select a service...</option>
                <option>Asphalt Shingles</option>
                <option>Metal Roofing</option>
                <option>Tile Roofing</option>
                <option>Flat / Commercial Roofing</option>
                <option>Roof Repair</option>
                <option>Emergency Service</option>
                <option>Other / Not Sure</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={4} placeholder="Tell us about your project..." />
            </label>
            <button type="submit" className="pr-btn-primary pr-submit" disabled={formState !== 'idle'}>
              {formState === 'sending' ? 'Sending…' : formState === 'sent' ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pr-footer">
        <div className="pr-footer-inner">
          <div className="pr-brand">
            <span className="pr-brand-icon">⬡</span>
            <span className="pr-brand-name">Precision Roofing</span>
          </div>
          <p className="pr-footer-copy">© 2026 Precision Roofing. All rights reserved.</p>
          <Link to="/" className="pr-footer-back">← Back to JohnMWebs</Link>
        </div>
      </footer>
    </div>
  )
}
