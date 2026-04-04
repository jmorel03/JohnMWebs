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

const trustPillars = [
  {
    title: 'Rapid Dispatch',
    detail: 'Urgent calls are prioritized so leak and storm damage are addressed before costs climb.',
  },
  {
    title: 'No Surprise Pricing',
    detail: 'Clear written scopes and upfront cost breakdowns keep projects predictable from start to finish.',
  },
  {
    title: 'Storm-Ready Builds',
    detail: 'High-performance roofing systems are installed to stand up to severe weather and heavy rain.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'On-Site Roof Evaluation',
    detail:
      'A detailed inspection identifies wear, leak paths, and structural concerns before any proposal is made.',
  },
  {
    step: '02',
    title: 'Clear Scope & Pricing',
    detail:
      'You get a transparent, line-item estimate with material options that match budget and home style.',
  },
  {
    step: '03',
    title: 'Precision Installation',
    detail:
      'Certified crews complete the build with strict install standards, clean execution, and photo updates.',
  },
  {
    step: '04',
    title: 'Final Walkthrough & Warranty',
    detail:
      'Every project ends with a closeout review, quality checklist, and clear warranty documentation.',
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
            <a href="#why" onClick={() => setMenuOpen(false)}>Why Us</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#contact" className="pr-nav-cta" onClick={() => setMenuOpen(false)}>
              Get Estimate
            </a>
          </nav>
        </div>
      </header>

      <section className="pr-hero">
        <div className="pr-hero-grid pr-container">
          <div className="pr-hero-copy">
            <p className="pr-hero-eyebrow">Free Roof Quotes. Fast Response. Done Right.</p>
            <h1 className="pr-hero-headline">Book Your Free Roofing Quote Before Small Issues Turn Expensive</h1>
            <p className="pr-hero-sub">
              Free quote messaging now leads the page so homeowners instantly know the next step is easy, fast, and risk-free.
            </p>
            <div className="pr-hero-actions">
              <a href="#contact" className="pr-btn-primary">Get My Free Quote</a>
              <a href="tel:+15551234567" className="pr-btn-ghost">Emergency Call Now</a>
            </div>
            <div className="pr-hero-metrics">
              <div className="pr-metric">
                <strong>Same Day</strong>
                <span>Inspection Windows</span>
              </div>
              <div className="pr-metric">
                <strong>0%</strong>
                <span>Guesswork In The Quote</span>
              </div>
              <div className="pr-metric">
                <strong>Top Rated</strong>
                <span>Local Trust Positioning</span>
              </div>
            </div>
          </div>

          <div className="pr-hero-visual">
            <div className="pr-hero-badge">
              <span>Free Quote</span>
              <strong>No-Cost Roof Inspection</strong>
            </div>
            <img src={heroImg} alt="Aerial view of roof replacement in progress" className="pr-hero-photo" />
            <div className="pr-hero-card">
              <p>Free Quote Offer</p>
              <h3>Book A No-Cost Roof Inspection</h3>
              <span>Priority scheduling for leak response, storm checks, and full replacement quotes with no upfront estimate fee.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pr-proof-strip" id="why">
        <div className="pr-container pr-proof-inner">
          <p>Licensed And Fully Insured</p>
          <p>Same-Day Response Priority</p>
          <p>Detailed Written Proposals</p>
          <p>Warranty-Backed Roofing Systems</p>
        </div>
      </section>

      <section className="pr-urgency-band">
        <div className="pr-container pr-urgency-inner">
          <p>Leaks get worse fast. Call now to lock in your free roofing quote and same-day assessment options.</p>
          <a href="tel:+15551234567">Call For Free Quote</a>
        </div>
      </section>

      <section className="pr-section pr-pillar-section">
        <div className="pr-container">
          <p className="pr-section-eyebrow">Why Homeowners Choose Precision</p>
          <h2 className="pr-section-title">Hard-Hitting Trust Signals That Push Action</h2>
          <div className="pr-pillars-grid">
            {trustPillars.map((pillar) => (
              <article key={pillar.title} className="pr-pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="pr-section pr-services">
        <div className="pr-container">
          <p className="pr-section-eyebrow">Service Lineup</p>
          <h2 className="pr-section-title">High-Demand Roofing Services Positioned To Close</h2>
          <p className="pr-section-sub">
            Homeowners quickly identify their exact need, reducing hesitation and driving more free quote requests.
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
          <p className="pr-section-eyebrow">How Projects Run</p>
          <h2 className="pr-section-title">Fast 4-Step Path From First Call To Final Closeout</h2>
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
            <p className="pr-section-eyebrow">Visual Proof</p>
            <h2 className="pr-section-title">Proof-Driven Visuals That Eliminate Doubt</h2>
          </div>
          <div className="pr-gallery-grid">
            <img src={aerialImg} alt="Roofing crew working on a residential roof" className="pr-gallery-large" />
            <img src={tileImg} alt="Tile roof installation" />
            <img src={flatRoofImg} alt="Flat roof waterproofing" />
          </div>
          <blockquote className="pr-quote">
            "They showed up quickly, explained every step, and delivered exactly what they promised."
            <cite>Homeowner Testimonial Placement</cite>
          </blockquote>
        </div>
      </section>

      <section id="contact" className="pr-section pr-contact">
        <div className="pr-container pr-contact-inner">
          <div className="pr-contact-copy">
            <p className="pr-section-eyebrow">Free Quote Request</p>
            <h2 className="pr-section-title">Get Your Free Roofing Quote Today</h2>
            <p>
              Tell us what is happening and get a fast, no-pressure roofing quote without paying for the inspection.
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
            <div className="pr-form-badge">
              <span>Free Quote</span>
              <strong>Zero inspection charge</strong>
            </div>
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
              {formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Quote Request Sent' : 'Request Free Quote'}
            </button>
            <p className="pr-form-note">Free quote requests are typically contacted within the same day.</p>
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
