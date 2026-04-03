import './App.css'

function App() {
  return (
    <main>
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

      <section className="about">
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
