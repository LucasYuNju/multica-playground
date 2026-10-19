import Image from "next/image"
import { Gallery } from "@/components/gallery"
import { Arrow } from "@/components/arrow"
import { enquiry, profile, sessions } from "@/lib/content"

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="#" aria-label={`${profile.name}, home`}>
          {profile.name}
          <span>PHOTOGRAPHER</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#sessions">Sessions</a>
          <a className="nav-contact" href="#contact">
            Let’s talk <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-top reveal">
            <div>
              <p className="eyebrow">
                <span className="small-line" /> PEOPLE · PLACES · THE IN-BETWEEN
              </p>
              <h1 id="hero-title">
                A feeling,
                <br />
                <em>held in a frame.</em>
              </h1>
            </div>
            <div className="hero-note">
              <p>
                Photographs for the things
                <br />
                you want to remember.
              </p>
              <a className="text-link" href="#work">
                Explore selected work <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-image reveal delay-one">
            <Image
              src="/images/mountains.jpg"
              alt="Dramatic mountain peaks rising above a quiet alpine valley"
              fill
              preload
              sizes="(max-width: 700px) 100vw, 92vw"
            />
            <span className="image-label">A STUDY IN STILLNESS</span>
            <span className="image-mark" aria-hidden="true">
              AM.
            </span>
          </div>
          <div className="image-caption">
            <span>Somewhere between here and a little further.</span>
            <a href="#work" aria-label="Scroll to selected work">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section
          id="work"
          className="work-section wrap section-space"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / THE PORTFOLIO</p>
              <h2 id="work-title">
                Selected <em>work.</em>
              </h2>
            </div>
            <p>
              A few places I’ve been.
              <br />A few moments that stayed.
            </p>
          </div>
          <Gallery />
        </section>
        <section
          id="about"
          className="about-section section-space"
          aria-labelledby="about-title"
        >
          <div className="wrap about-grid">
            <div className="about-image">
              <Image
                src="/images/camera.jpg"
                alt="A camera and photography equipment resting on a table"
                fill
                sizes="(max-width: 700px) 90vw, 38vw"
              />
              <span className="about-image-note">
                ALWAYS LOOKING, ALWAYS LEARNING.
              </span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">02 / BEHIND THE LENS</p>
              <h2 id="about-title">
                A slower way
                <br />
                of <em>seeing.</em>
              </h2>
              <p className="intro">{profile.introduction}</p>
              <p>{profile.about}</p>
              <a
                href={enquiry("Let’s make something together")}
                className="text-link"
              >
                A good story starts with a hello <Arrow diagonal />
              </a>
              <div className="signature">
                {profile.name}
                <span>BASED IN {profile.location.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sessions"
          className="sessions-section wrap section-space"
          aria-labelledby="sessions-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / LET’S MAKE SOMETHING</p>
              <h2 id="sessions-title">
                Time well <em>spent.</em>
              </h2>
            </div>
            <p>
              A starting point for our time together.
              <br />
              Every story has its own shape.
            </p>
          </div>
          <div className="pricing-grid">
            {sessions.map((session) => (
              <article className="session" key={session.number}>
                <span className="session-number">/{session.number}</span>
                <h3>{session.name}</h3>
                <p className="session-description">{session.description}</p>
                <p className="price">
                  {session.price.startsWith("$") && <span>FROM </span>}
                  {session.price}
                </p>
                <ul>
                  {session.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a
                  href={enquiry(`${session.name} enquiry`)}
                  className="session-link"
                >
                  {session.name === "Collaborations"
                    ? "Tell me your idea"
                    : "Enquire about a session"}
                  <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
          <p className="pricing-note">
            Starting rates in USD. Travel and additional usage are quoted
            separately. We’ll agree on the details before booking.
          </p>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="wrap">
            <p className="eyebrow">04 / YOUR STORY, NEXT</p>
            <div className="contact-layout">
              <h2 id="contact-title">
                Something
                <br />
                on your <em>mind?</em>
              </h2>
              <div className="contact-copy">
                <p>
                  A place, a person, a feeling.
                  <br />
                  I’d love to hear what you’re thinking.
                </p>
                <a className="contact-email" href={enquiry()}>
                  {profile.email}
                  <Arrow diagonal />
                </a>
                <p className="contact-small">
                  Tell me a little about your idea, where, and when.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a href="#" className="footer-brand">
          {profile.name}
        </a>
        <p>© {new Date().getFullYear()} · Made with a little patience.</p>
        <a href="#main">
          BACK TO TOP <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  )
}
