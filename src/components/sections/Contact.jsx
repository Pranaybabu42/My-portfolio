import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import './Contact.css'

function Contact({ profile }) {
  const contactLinks = [
    {
      label: 'Email',
      value: profile.email,
      href: profile.links?.email ?? `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: profile.links?.linkedin,
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      value: 'Explore repositories',
      href: profile.links?.github,
      icon: Github,
    },
  ].filter((item) => item.href)

  return (
    <section id="contact" className="contactShowcaseSection">
      <div className="contactShowcaseInner">
        <header className="contactShowcaseHeader">
          <span>Contact</span>
          <h2>Let's build something useful.</h2>
        </header>

        <div className="contactShowcaseGrid">
          <aside className="contactIntroPanel">
            <div>
              <p className="contactIntroKicker">Open to</p>
              <h3>AI products, full-stack platforms, and focused engineering work.</h3>
            </div>

          </aside>

          <div className="contactLinksPanel" aria-label="Contact links">
            <div className="contactLinksIntro">
              <p>Reach out directly</p>
              <h3>Choose the channel that works best.</h3>
            </div>

            <div className="contactLinksGrid">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer noopener" className="contactChannelLink">
                  <span className="contactChannelIcon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <small>{value}</small>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
