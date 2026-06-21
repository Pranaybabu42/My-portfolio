import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

function SocialDock({ profile, links }) {
  const socialLinks = links ?? profile?.links ?? {}
  const items = [
    socialLinks?.linkedin
      ? { href: socialLinks.linkedin, label: 'LinkedIn profile', icon: <Linkedin size={18} strokeWidth={1.8} /> }
      : null,
    socialLinks?.discord || profile
      ? {
          href: socialLinks.discord ?? 'https://discord.com/',
          label: 'Discord profile',
          icon: <MessageCircle size={18} strokeWidth={1.8} />,
        }
      : null,
    socialLinks?.github
      ? { href: socialLinks.github, label: 'GitHub profile', icon: <Github size={18} strokeWidth={1.8} /> }
      : null,
    socialLinks?.email
      ? { href: socialLinks.email, label: 'Email contact', icon: <Mail size={18} strokeWidth={1.8} /> }
      : null,
  ].filter(Boolean)

  if (items.length === 0) return null

  return (
    <aside
      className="social-left-dock d-none d-md-flex"
      aria-label="Social links"
    >
      <div className="social-left-dock__inner">
        {items.map(({ href, label, icon }) => {
          const isMailto = String(href).startsWith('mailto:')

          return (
            <a
              key={label}
              href={href}
              target={isMailto ? '_self' : '_blank'}
              rel={isMailto ? undefined : 'noreferrer noopener'}
              className="social-left-dock__link"
              aria-label={label}
            >
              {icon}
            </a>
          )
        })}
      </div>
    </aside>
  )
}

export default SocialDock
