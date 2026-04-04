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

const processSteps = [
  {
    step: '01',
    title: 'Inspection & Estimate',
    detail:
      'The team audits roof condition, attic ventilation, and water pathways, then presents a line-item estimate.',
  },
  {
    step: '02',
    title: 'Material Planning',
    detail:
      'Shingle profile, flashing details, and weatherproofing layers are selected to match budget and climate.',
  },
  {
    step: '03',
    title: 'Install & Clean Site',
    detail:
      'Precision crews complete installation with daily cleanup, magnetic sweeps, and documented progress updates.',
  },
  {
    step: '04',
    title: 'Final Walkthrough',
    detail:
      'The project closes with warranty handoff, quality photos, and a checklist review with the property owner.',
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
      <header className="pr-nav">
        <div className="pr-nav-inner">
          <div className="pr-brand">
            <span className="pr-brand-icon">PR</span>
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
            <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#contact" className="pr-nav-cta" onClick={() => setMenuOpen(false)}>
              Free Estimate
            </a>
          </nav>
        </div>
      </header>

      <section className="pr-hero">
        <div className="pr-hero-grid pr-container">
          <div className="pr-hero-copy">
            <p className="pr-hero-eyebrow">Project Spotlight</p>
            <h1 className="pr-hero-headline">Precision Roofing Service Website</h1>
            <p className="pr-hero-sub">
              A conversion-focused roofing site designed to build trust fast, show service depth, and turn traffic into booked estimates.
            </p>
            <div className="pr-hero-actions">
              <a href="#contact" className="pr-btn-primary">Request Estimate</a>
              <a href="#services" className="pr-btn-ghost">Explore Services</a>
            </div>
            <div className="pr-hero-metrics">
              <div className="pr-metric">
                <strong>4</strong>
                <span>Core Service Lines</span>
              </div>
              <div className="pr-metric">
                <strong>1 Day</strong>
                <span>Lead Response Goal</span>
              </div>
              <div className="pr-metric">
                <strong>100%</strong>
                <span>Mobile Optimized Layout</span>
              </div>
            </div>
          </div>

          <div className="pr-hero-visual">
            <img src={heroImg} alt="Aerial view of roof replacement in progress" className="pr-hero-photo" />
            <div className="pr-hero-card">
              <p>Built For</p>
              <h3>Local Roofing Contractors</h3>
              <span>Lead generation, credibility, and service clarity.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pr-proof-strip">
        <div className="pr-container pr-proof-inner">
          <p>Clear offer messaging</p>
          <p>Trust-first visuals</p>
          <p>Service-specific funnels</p>
          <p>Fast mobile contact path</p>
        </div>
      </section>

      <section id="services" className="pr-section pr-services">
        <div className="pr-container">
          <p className="pr-section-eyebrow">Service Architecture</p>
          <h2 className="pr-section-title">Pages Designed To Sell Each Roofing Offer</h2>
          <p className="pr-section-sub">
            Each card represents a dedicated service block with tailored copy, proof framing, and direct CTA paths.
          </p>
          <div className="pr-service-grid">
            {services.map((s, index) => (
              <article key={s.title} className="pr-service-card">
                <div className="pr-service-img-wrap">
                  <img src={s.image} alt={s.alt} />
                </div>
                <div className="pr-service-body">
                  <p className="pr-service-kicker">Service {String(index + 1).padStart(2, '0')}</p>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="pr-section pr-process">
        <div className="pr-container">
          <p className="pr-section-eyebrow">Delivery Framework</p>
          <h2 className="pr-section-title">How The Roofing Funnel Is Structured</h2>
          <div className="pr-process-grid">
            {processSteps.map((item) => (
              <article className="pr-process-card" key={item.step}>
                <span className="pr-step-badge">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="pr-section pr-gallery">
        <div className="pr-container">
          <div className="pr-gallery-head">
            <p className="pr-section-eyebrow">Visual Story</p>
            <h2 className="pr-section-title">Image System Used Across The Build</h2>
          </div>
          <div className="pr-gallery-grid">
            <img src={aerialImg} alt="Roofing crew working on a residential roof" className="pr-gallery-large" />
            <img src={tileImg} alt="Tile roof installation" />
            <img src={flatRoofImg} alt="Flat roof waterproofing" />
          </div>
        </div>
      </section>

      <section id="contact" className="pr-section pr-contact">
        <div className="pr-container pr-contact-inner">
          <div className="pr-contact-copy">
            <p className="pr-section-eyebrow">Lead Capture</p>
            <h2 className="pr-section-title">Request A Roofing Estimate</h2>
            <p>
              This contact module is tuned for quick conversions: short fields, service intent selection, and a clear response promise.
            </p>
            <div className="pr-contact-details">
              <div className="pr-contact-item">
                <span className="pr-contact-label">Phone</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="pr-contact-item">
                <span className="pr-contact-label">Email</span>
                <span>info@precisionroofing.com</span>
              </div>
              <div className="pr-contact-item">
                <span className="pr-contact-label">Service Area</span>
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
              {formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Message Sent' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <footer className="pr-footer">
        <div className="pr-footer-inner">
          <div className="pr-brand">
            <span className="pr-brand-icon">PR</span>
            <span className="pr-brand-name">Precision Roofing</span>
          </div>
          <p className="pr-footer-copy">© 2026 Precision Roofing. All rights reserved.</p>
          <Link to="/" className="pr-footer-back">Back to JohnMWebs</Link>
        </div>
      </footer>
    </div>
  )
}
