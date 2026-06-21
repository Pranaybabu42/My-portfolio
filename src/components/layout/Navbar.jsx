import { BriefcaseBusiness, Code2, FolderGit2, Mail, UserRound } from 'lucide-react'
import { scrollToSection } from '../../utils/scrollToSection'

const navItems = [
  { id: 'about', label: 'ABOUT', shortLabel: 'About', icon: UserRound },
  { id: 'skills', label: 'SKILLS', shortLabel: 'Skills', icon: Code2 },
  { id: 'experience', label: 'EXPERIENCE', shortLabel: 'Exp', icon: BriefcaseBusiness },
  { id: 'projects', label: 'PROJECTS', shortLabel: 'Work', icon: FolderGit2 },
  { id: 'contact', label: 'CONTACT', shortLabel: 'Contact', icon: Mail },
]

function ArcNavLink({ item, activeSection }) {
  const active = activeSection === item.id

  return (
    <a
      href={`#${item.id}`}
      onClick={() => {
        scrollToSection(item.id, false)
        window.history.replaceState(null, '', `#${item.id}`)
      }}
      className={`nav-arc-link d-inline-flex align-items-center px-0 py-1 text-decoration-none ${
        active ? 'fw-bold' : 'fw-semibold'
      }`}
      style={{
        fontSize: '0.72rem',
        lineHeight: 1,
        fontWeight: active ? 800 : 600,
        color: active ? 'var(--nav-active)' : 'var(--nav-inactive)',
      }}
      aria-current={active ? 'page' : undefined}
    >
      <span className="nav-sr">{item.label}</span>
      <span className="nav-swap" aria-hidden="true">
        <span className="nav-swap__base">{item.label}</span>
        <span className="nav-swap__hover">{item.label}</span>
      </span>
    </a>
  )
}

function Navbar({ activeSection }) {
  const signatureName = 'Pranay Thalluri'

  return (
    <header style={{ zIndex: 80, pointerEvents: 'auto' }}>
      <div
        className={`nav-signature-wrap position-fixed top-0 start-0 m-2${activeSection !== 'hero' ? ' is-away-from-hero' : ''}`}
        style={{ zIndex: 80, pointerEvents: 'auto' }}
      >
        <a
          href="#hero"
          className="nav-signature text-decoration-none"
          onClick={() => {
            scrollToSection('hero', false)
            window.history.replaceState(null, '', '#hero')
          }}
          aria-label={`${signatureName} home`}
        >
          {signatureName}
        </a>
      </div>

      <nav
        className="position-fixed top-0 end-0 d-none d-md-flex flex-column align-items-end gap-0 mt-2 me-2"
        style={{ zIndex: 80, pointerEvents: 'auto' }}
      >
        <div className="d-flex flex-column align-items-end gap-0">
          {navItems.map((item) => (
            <ArcNavLink
              key={item.id}
              item={item}
              activeSection={activeSection}
            />
          ))}
        </div>
      </nav>

      <nav className="mobile-bottom-nav d-md-none" aria-label="Primary mobile navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = activeSection === item.id

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                scrollToSection(item.id, false)
                window.history.replaceState(null, '', `#${item.id}`)
              }}
              className={`mobile-bottom-nav__item ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="mobile-bottom-nav__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span className="mobile-bottom-nav__label">{item.shortLabel}</span>
            </a>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
